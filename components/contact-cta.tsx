"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Contact
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl text-balance">
              {"Let's Work Together"}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Ready to transform your outdoor space? Get in touch for a free consultation and quote. We'd love to bring your vision to life.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quick Response</p>
                  <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Free Estimates</p>
                  <p className="text-sm text-muted-foreground">No-obligation quotes for all our services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">Thank You!</h3>
                <p className="mt-2 text-muted-foreground">
                  {"We've received your message and will be in touch shortly."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName" className="text-card-foreground">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName" className="text-card-foreground">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-card-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone" className="text-card-foreground">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-card-foreground">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full text-base">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
