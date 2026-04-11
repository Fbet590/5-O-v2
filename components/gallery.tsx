"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

const galleryItems = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Completed backyard with artificial turf and paver patio",
    label: "Backyard Transformation",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Close-up of turf meeting stone pavers with clean edging",
    label: "Precision Edging",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Custom residential putting green with flag holes",
    label: "Custom Putting Green",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Front yard with artificial turf and paver walkway",
    label: "Curb Appeal Upgrade",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Paver patio with outdoor dining and turf play area",
    label: "Outdoor Living Space",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Aerial view of backyard with turf, pavers, and putting green",
    label: "Full Project Aerial",
  },
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((index + galleryItems.length) % galleryItems.length)
    },
    []
  )

  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxPrev = useCallback(
    () =>
      setLightboxIndex(
        (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
      ),
    []
  )
  const lightboxNext = useCallback(
    () =>
      setLightboxIndex((prev) => (prev + 1) % galleryItems.length),
    []
  )

  useEffect(() => {
    if (!lightboxOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowLeft") lightboxPrev()
      if (e.key === "ArrowRight") lightboxNext()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxOpen, lightboxPrev, lightboxNext])

  // How many thumbnails to show based on breakpoint (handled via CSS)
  const getVisibleItems = () => {
    const items = []
    for (let i = 0; i < galleryItems.length; i++) {
      const index = (currentIndex + i) % galleryItems.length
      items.push({ ...galleryItems[index], originalIndex: index })
    }
    return items
  }

  const visibleItems = getVisibleItems()

  return (
    <>
      <section id="gallery" className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Our Work
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
              See the 5-O Turf Difference
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Browse through our recent projects and see why homeowners trust us
              to transform their outdoor spaces.
            </p>
          </div>

          {/* Slideshow */}
          <div className="relative">
            {/* Main visible images */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.slice(0, 3).map((item, i) => (
                <button
                  key={`${item.label}-${i}`}
                  onClick={() => openLightbox(item.originalIndex)}
                  className={`group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    i === 0
                      ? ""
                      : i === 1
                      ? "hidden sm:block"
                      : "hidden lg:block"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-8 w-8 text-background mb-2" />
                    <span className="text-sm font-semibold text-background">
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground shadow-lg transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-primary/25 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxPrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-6">
              <span className="rounded-full bg-foreground/70 px-5 py-2 text-sm font-medium text-background">
                {galleryItems[lightboxIndex].label} &mdash;{" "}
                {lightboxIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              lightboxNext()
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryItems.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(i)
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === lightboxIndex
                    ? "w-6 bg-background"
                    : "w-2 bg-background/40 hover:bg-background/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
