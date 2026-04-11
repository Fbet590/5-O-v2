"use client"

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"

const TOTAL_STEPS = 4

interface FormData {
  projectTypes: string[]
  budget: string
  budgetFlexibility: string
  name: string
  email: string
  phone: string
}

const initialFormData: FormData = {
  projectTypes: [],
  budget: "",
  budgetFlexibility: "",
  name: "",
  email: "",
  phone: "",
}

const flexibilityOptions = [
  {
    value: "yes",
    label: "Yes, I prefer premium quality even if the cost increases slightly",
  },
  {
    value: "maybe",
    label: "Maybe, depends on the options presented",
  },
  {
    value: "no",
    label: "No, I have a fixed budget",
  },
]

function ProgressBar({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100

  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span className="font-medium text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function StepFlexibility({
  formData,
  setFormData,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          Are you flexible with your budget to guarantee premium-quality
          materials and workmanship?
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {flexibilityOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                budgetFlexibility: option.value,
              })
            }
            className={cn(
              "rounded-xl border-2 p-5 text-left font-medium leading-relaxed transition-all",
              formData.budgetFlexibility === option.value
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepName({
  formData,
  setFormData,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          Enter your name:
        </h3>
      </div>
      <Input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Your full name"
        className="h-14 text-lg rounded-xl px-5"
        autoFocus
      />
    </div>
  )
}

function StepEmail({
  formData,
  setFormData,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          {"What's your email address?"}
        </h3>
      </div>
      <Input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="you@example.com"
        className="h-14 text-lg rounded-xl px-5"
        autoFocus
      />
    </div>
  )
}

function StepPhone({
  formData,
  setFormData,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          {"What's the best mobile number to reach you on?"}
        </h3>
      </div>
      <Input
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="(555) 123-4567"
        className="h-14 text-lg rounded-xl px-5"
        autoFocus
      />
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <CheckCircle className="h-10 w-10 text-primary" />
      </div>
      <h3 className="font-serif text-3xl tracking-tight text-foreground">
        {"You're All Set!"}
      </h3>
      <p className="mt-3 text-lg text-muted-foreground max-w-md leading-relaxed">
        {
          "Thank you for your interest. Our team will review your project details and reach out shortly with a free personalized quote."
        }
      </p>
      <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5 max-w-sm w-full">
        <p className="text-sm font-semibold text-foreground mb-2">
          What happens next?
        </p>
        <ul className="text-sm text-muted-foreground flex flex-col gap-2 text-left">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {"We review your project details"}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {"A specialist contacts you to discuss"}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {"You receive a detailed, no-obligation quote"}
          </li>
        </ul>
      </div>
    </div>
  )
}

export function LeadForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const formRef = useRef<HTMLElement>(null)

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.budgetFlexibility !== ""
      case 1:
        return formData.name.trim() !== ""
      case 2:
        return formData.email.trim() !== ""
      case 3:
        return formData.phone.trim() !== ""
      default:
        return false
    }
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const changeStep = (newStep: number, dir: "forward" | "back") => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(newStep)
      setAnimating(false)
      scrollToForm()
    }, 250)
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = async () => {
    if (step < TOTAL_STEPS - 1) {
      changeStep(step + 1, "forward")
    } else {
      setIsSubmitting(true)
      try {
        await fetch(
          "https://services.leadconnectorhq.com/hooks/ESXofJNHbRPkOF25Yiyj/webhook-trigger/a7eb3c99-55aa-428a-8db2-0f5023623faf",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              projectTypes: formData.projectTypes.join(", "),
              budget: formData.budget,
              budgetFlexibility: formData.budgetFlexibility,
            }),
          }
        )
      } catch {
        // Still show success — webhook is fire-and-forget
      }
      // Fire Facebook Lead conversion event
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: formData.projectTypes.join(", "),
          value: formData.budget,
          currency: "USD",
        })
      }
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    if (step > 0) changeStep(step - 1, "back")
  }

  return (
    <section
      ref={formRef}
      id="free-quote"
      className="relative z-20 -mt-40 lg:-mt-56 pt-0 pb-20 lg:pb-28 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <SuccessState />
            ) : (
              <>
                <ProgressBar currentStep={step} />
                <div className="min-h-[280px] overflow-hidden">
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out",
                      animating
                        ? direction === "forward"
                          ? "opacity-0 translate-x-8"
                          : "opacity-0 -translate-x-8"
                        : "opacity-100 translate-x-0"
                    )}
                  >
                    {step === 0 && (
                      <StepFlexibility
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 1 && (
                      <StepName
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 2 && (
                      <StepEmail
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 3 && (
                      <StepPhone
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleNext}
                    disabled={!canProceed() || isSubmitting}
                    className="gap-2 px-8"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : step === TOTAL_STEPS - 1
                        ? "Submit"
                        : "Next"}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
