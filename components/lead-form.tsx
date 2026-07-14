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
  Home,
  HelpCircle,
  User,
  Mail,
  Phone,
} from "lucide-react"

const TOTAL_STEPS = 4

interface FormData {
  isNewBuild: string
  projectTypes: string[]
  budget: string
  budgetFlexibility: string
  name: string
  email: string
  phone: string
}

const initialFormData: FormData = {
  isNewBuild: "",
  projectTypes: [],
  budget: "",
  budgetFlexibility: "",
  name: "",
  email: "",
  phone: "",
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100
  const labels = ["New Build?", "Your Name", "Email", "Phone"]

  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span className="font-semibold text-primary text-xs uppercase tracking-wider">
          {labels[currentStep]}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i <= currentStep ? "bg-primary" : "bg-secondary"
            )}
          />
        ))}
      </div>
    </div>
  )
}

function StepNewBuild({
  formData,
  setFormData,
  onAutoAdvance,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
  onAutoAdvance: () => void
}) {
  const handleSelect = (value: string) => {
    setFormData({ ...formData, isNewBuild: value })
    setTimeout(onAutoAdvance, 300)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <Home className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About Your Home
          </span>
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          Is your home a new build?
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: "yes", label: "Yes", emoji: "✓", desc: "Built Recently" },
          { value: "no", label: "No", emoji: "✗", desc: "Not A New Home" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={cn(
              "group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
              formData.isNewBuild === option.value
                ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                : "border-border bg-card text-foreground hover:border-primary/50"
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold transition-colors",
                formData.isNewBuild === option.value
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-secondary text-primary"
              )}
            >
              {option.label}
            </span>
            <p
              className={cn(
                "text-sm font-semibold leading-snug transition-colors",
                formData.isNewBuild === option.value
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              {option.desc}
            </p>
            {formData.isNewBuild === option.value && (
              <span className="absolute top-3 right-3">
                <CheckCircle className="h-4 w-4 text-primary-foreground" />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Tap an option to continue automatically
      </p>
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Let&apos;s get acquainted
          </span>
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          What&apos;s your name?
        </h3>
        <p className="text-sm text-muted-foreground">
          So we know who we&apos;re reaching out to.
        </p>
      </div>
      <div className="relative">
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
          className="h-14 text-lg rounded-xl pl-5 pr-5 border-2 focus-visible:border-primary"
          autoFocus
        />
        {formData.name.trim().length >= 2 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <CheckCircle className="h-5 w-5" />
          </span>
        )}
      </div>
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Stay in the loop
          </span>
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          What&apos;s your email address?
        </h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll send your free estimate here.
        </p>
      </div>
      <div className="relative">
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={cn(
            "h-14 text-lg rounded-xl pl-5 pr-12 border-2",
            showError
              ? "border-red-500 focus-visible:ring-red-500"
              : "focus-visible:border-primary"
          )}
          autoFocus
        />
        {isValid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <CheckCircle className="h-5 w-5" />
          </span>
        )}
      </div>
      {showError && (
        <p className="flex items-center gap-2 text-sm text-red-500 -mt-3">
          <HelpCircle className="h-4 w-4 shrink-0" />
          Please enter a valid email address
        </p>
      )}
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
  const digitsOnly = formData.phone.replace(/\D/g, "")
  const showError = digitsOnly.length >= 10 && !isValid

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Almost done
          </span>
        </div>
        <h3 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl text-balance">
          Best number to reach you?
        </h3>
        <p className="text-sm text-muted-foreground">
          A quick call to discuss your outdoor vision.
        </p>
      </div>
      <div className="relative">
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="(555) 123-4567"
          className={cn(
            "h-14 text-lg rounded-xl pl-5 pr-12 border-2",
            showError
              ? "border-red-500 focus-visible:ring-red-500"
              : "focus-visible:border-primary"
          )}
          autoFocus
        />
        {isValid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <CheckCircle className="h-5 w-5" />
          </span>
        )}
      </div>
      {showError && (
        <p className="flex items-center gap-2 text-sm text-red-500 -mt-3">
          <HelpCircle className="h-4 w-4 shrink-0" />
          Please enter a valid 10-digit US phone number
        </p>
      )}
      <div className="rounded-xl bg-secondary/60 border border-border p-4 text-sm text-muted-foreground flex items-start gap-3">
        <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-primary block" />
        </span>
        We only call during business hours and never share your number.
      </div>
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <CheckCircle className="h-10 w-10 text-primary" />
        <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
      </div>
      <h3 className="font-serif text-3xl tracking-tight text-foreground">
        {"You're All Set!"}
      </h3>
      <p className="mt-3 text-lg text-muted-foreground max-w-md leading-relaxed">
        Our team will review your details and reach out shortly with a free personalized quote.
      </p>
      <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-5 max-w-sm w-full text-left">
        <p className="text-sm font-semibold text-foreground mb-3">
          What happens next?
        </p>
        <ul className="text-sm text-muted-foreground flex flex-col gap-3">
          {[
            "We review your project details",
            "A specialist contacts you to discuss",
            "You receive a detailed, no-obligation quote",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const disposableDomains = [
      "tempmail", "throwaway", "fakeinbox", "mailinator",
      "guerrillamail", "sharklasers", "trashmail",
    ]
    const domain = email.split("@")[1]?.toLowerCase() || ""
    return emailRegex.test(email) && !disposableDomains.some((d) => domain.includes(d))
  }

  const isValidPhone = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, "")
    if (digitsOnly.length !== 10) return false
    if (/^(\d)\1{9}$/.test(digitsOnly)) return false
    if (digitsOnly.startsWith("0") || digitsOnly.startsWith("1")) return false
    return true
  }

  const canProceed = () => {
    switch (step) {
      case 0: return formData.isNewBuild !== ""
      case 1: return formData.name.trim().length >= 2
      case 2: return isValidEmail(formData.email.trim())
      case 3: return isValidPhone(formData.phone.trim())
      default: return false
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

  const handleNext = async () => {
    if (step < TOTAL_STEPS - 1) {
      changeStep(step + 1, "forward")
    } else {
      setIsSubmitting(true)
      const isQualified = formData.isNewBuild === "yes"

      if (isQualified) {
        const payload = {
          isNewBuild: formData.isNewBuild,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectTypes: formData.projectTypes.join(", "),
          budget: formData.budget,
          budgetFlexibility: formData.budgetFlexibility,
        }

        await Promise.allSettled([
          fetch(
            "https://services.leadconnectorhq.com/hooks/ESXofJNHbRPkOF25Yiyj/webhook-trigger/Wg87a8lNfjfHzR7TOaph",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          ),
          fetch("https://hooks.zapier.com/hooks/catch/24750736/4yub4pj/", {
            method: "POST",
            body: JSON.stringify(payload),
          }),
        ])

        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: formData.projectTypes.join(", "),
            value: formData.budget,
            currency: "USD",
          })
        }
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
                Fill Out Our Quick Form.
                <br />
                <br />
                No Obligation. Less than 13 Seconds.
              </p>
            </div>
            {submitted ? (
              <SuccessState />
            ) : (
              <>
                <ProgressBar currentStep={step} />
                <div className="min-h-[300px] overflow-hidden">
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
                      <StepNewBuild
                        formData={formData}
                        setFormData={setFormData}
                        onAutoAdvance={() => changeStep(1, "forward")}
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
                        isValid={isValidEmail(formData.email.trim())}
                      />
                    )}
                    {step === 3 && (
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
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step > 0 && (
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
                          ? "Get My Free Estimate"
                          : "Next"}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
