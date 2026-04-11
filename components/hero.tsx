import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="/images/hero-turf.jpg"
        alt="Beautiful backyard with artificial turf and paver patio"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-56 lg:px-8 lg:pb-72">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/80">
            Premium Outdoor Solutions
          </p>
          <h1 className="font-serif font-black text-5xl leading-tight tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl text-balance">
            $5K. New Turf. New Pavers. New Outdoor Space. Done.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90 max-w-xl">
            Transform your yard into a neighborhood showpiece with our expert artificial turf, putting green, and paver installations. Year-round perfection, zero maintenance.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="#free-quote">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
