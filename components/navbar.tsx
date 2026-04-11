"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="5-O Turf & Pavers logo"
            width={280}
            height={140}
            className="h-[91px] w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Services
          </Link>
          <Link href="#why-us" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Why Us
          </Link>
          <Link href="#free-quote" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
          <Button asChild>
            <Link href="#free-quote">Get a Free Quote</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="#why-us"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Why Us
            </Link>
            <Link
              href="#free-quote"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Button asChild className="w-full">
              <Link href="#free-quote" onClick={() => setMobileOpen(false)}>
                Get a Free Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
