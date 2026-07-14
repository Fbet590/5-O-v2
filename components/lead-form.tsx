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

const TOTAL_STEPS = 3

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
  isValid,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
  isValid: boolean
}) {
  const showError = formData.email.trim() !== "" && !isValid

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          {"What's your email address?"}
        </h3>
      </div>
      <div>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={cn(
            "h-14 text-lg rounded-xl px-5",
            showError && "border-red-500 focus-visible:ring-red-500"
          )}
          autoFocus
        />
        {showError && (
          <p className="mt-2 text-sm text-red-500">
            Please enter a valid email address
          </p>
        )}
      </div>
    </div>
  )
}

function StepPhone({
  formData,
  setFormData,
  isValid,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
  isValid: boolean
}) {
  const digitsOnly = formData.phone.replace(/\D/g, '')
  const showError = digitsOnly.length >= 10 && !isValid

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          {"What's the best mobile number to reach you on?"}
        </h3>
      </div>
      <div>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="(555) 123-4567"
          className={cn(
            "h-14 text-lg rounded-xl px-5",
            showError && "border-red-500 focus-visible:ring-red-500"
          )}
          autoFocus
        />
        {showError && (
          <p className="mt-2 text-sm text-red-500">
            Please enter a valid 10-digit US phone number
          </p>
        )}
      </div>
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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const disposableDomains = ['tempmail', 'throwaway', 'fakeinbox', 'mailinator', 'guerrillamail', 'sharklasers', 'trashmail']
    const domain = email.split('@')[1]?.toLowerCase() || ''
    return emailRegex.test(email) && !disposableDomains.some(d => domain.includes(d))
  }

  const isValidPhone = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, '')
    // Must have 10 digits (US) and not be all same digit or sequential
    if (digitsOnly.length !== 10) return false
    if (/^(\d)\1{9}$/.test(digitsOnly)) return false // all same digit
    if (digitsOnly.startsWith('0') || digitsOnly.startsWith('1')) return false // invalid area code
    return true
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.name.trim().length >= 2
      case 1:
        return isValidEmail(formData.email.trim())
      case 2:
        return isValidPhone(formData.phone.trim())
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
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectTypes: formData.projectTypes.join(", "),
        budget: formData.budget,
        budgetFlexibility: formData.budgetFlexibility,
      }

      // Send to both webhooks in parallel
      await Promise.allSettled([
        fetch(
          "https://services.leadconnectorhq.com/hooks/ESXofJNHbRPkOF25Yiyj/webhook-trigger/Wg87a8lNfjfHzR7TOaph",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        ),
        fetch(
          "https://hooks.zapier.com/hooks/catch/24750736/4yub4pj/",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        ),
      ])
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
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
                See If You Qualify for Our $5K Outdoor Transformation
              </h2>
              <p className="mt-3 text-foreground leading-relaxed">
                This package applies to New Builds.
                <br />
                <br />
                No Pressure. No Obligation. Less than 13 Seconds.
              </p>
            </div>
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
                      <StepName
                        formData={formData}
                        setFormData={setFormData}
                      />
                    )}
                    {step === 1 && (
                      <StepEmail
                        formData={formData}
                        setFormData={setFormData}
                        isValid={isValidEmail(formData.email.trim())}
                      />
                    )}
                    {step === 2 && (
                      <StepPhone
                        formData={formData}
                        setFormData={setFormData}
                        isValid={isValidPhone(formData.phone.trim())}
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
