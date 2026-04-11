"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const reviews = [
  {
    name: "Michael R.",
    location: "Scottsdale, AZ",
    rating: 5,
    text: "5-O Turf completely transformed our backyard. The artificial turf looks incredibly real and the installation was flawless. Our kids and dogs love it. Best investment we've made in our home.",
    project: "Artificial Turf",
  },
  {
    name: "Sarah & David L.",
    location: "Paradise Valley, AZ",
    rating: 5,
    text: "We had a putting green and full turf install done. The crew was professional, on time, and the quality is outstanding. Our neighbors keep asking who did the work. Highly recommend!",
    project: "Turf & Putting Green",
  },
  {
    name: "James T.",
    location: "Fountain Hills, AZ",
    rating: 5,
    text: "The paver patio they built is absolutely stunning. The herringbone pattern came out perfect and the drainage is excellent. These guys really know their craft.",
    project: "Paver Installation",
  },
  {
    name: "Linda M.",
    location: "Queen Creek, AZ",
    rating: 5,
    text: "From the initial quote to the final walkthrough, everything was seamless. Our water bill dropped dramatically and the yard looks better than it ever did with real grass.",
    project: "Artificial Turf",
  },
  {
    name: "Carlos & Maria G.",
    location: "Gilbert, AZ",
    rating: 5,
    text: "We got the full package — turf, pavers, and a small putting green. The team was respectful of our property and finished ahead of schedule. It looks like a resort back there now.",
    project: "Full Backyard",
  },
  {
    name: "Patricia W.",
    location: "Chandler, AZ",
    rating: 5,
    text: "I was skeptical about artificial turf but 5-O Turf changed my mind. The quality is incredible, no more muddy paws, and zero maintenance. Worth every penny.",
    project: "Artificial Turf",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goNext = useCallback(
    () => setCurrent((prev) => (prev + 1) % reviews.length),
    []
  )
  const goPrev = useCallback(
    () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length),
    []
  )

  // Auto-rotate every 30 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, 30000)
    return () => clearInterval(timer)
  }, [isPaused, goNext])

  // Progress bar animation
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isPaused) return
    setProgress(0)
    const startTime = Date.now()
    const duration = 30000

    const frame = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        rafId = requestAnimationFrame(frame)
      }
    }
    let rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [current, isPaused])

  const review = reviews[current]

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Customer Reviews
          </p>
          <h2 className="font-serif font-extrabold text-4xl tracking-tight text-foreground sm:text-5xl text-balance">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Don&apos;t just take our word for it. Hear from homeowners who
            trusted 5-O Turf to transform their outdoor spaces.
          </p>
        </div>

        {/* Review carousel */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Review card */}
          <div className="rounded-2xl border border-border bg-card px-8 py-10 sm:px-12 sm:py-14 text-center shadow-sm">
            <StarRating rating={review.rating} />

            <blockquote className="mt-6 text-lg leading-relaxed text-card-foreground/85 sm:text-xl">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-col items-center gap-1">
              <p className="text-base font-semibold text-card-foreground">
                {review.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {review.location}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {review.project}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mx-auto mt-8 h-1 max-w-xs overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => {
              goPrev()
              setProgress(0)
            }}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:-translate-x-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              goNext()
              setProgress(0)
            }}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:translate-x-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i)
                setProgress(0)
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-primary/25 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
