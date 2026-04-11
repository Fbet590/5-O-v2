import Image from "next/image"
import { Shrub, Target, LayoutGrid } from "lucide-react"

const services = [
  {
    icon: Shrub,
    title: "Artificial Turf Installation",
    description:
      "Say goodbye to mowing and hello to year-round perfection with our artificial turf installations. Durable, low-maintenance, and natural-looking, it's the perfect solution for a lush, green lawn without the hassle.",
    image: "/images/artificial-turf.jpg",
    alt: "Lush artificial turf lawn installation",
  },
  {
    icon: Target,
    title: "Putting Green Installation",
    description:
      "Transform your backyard into a golfer's paradise with our custom residential putting greens. Perfectly tailored for practice or play, they bring pro-level quality and a touch of luxury to your home.",
    image: "/images/putting-green.jpg",
    alt: "Custom residential putting green",
  },
  {
    icon: LayoutGrid,
    title: "Paver Installation",
    description:
      "Upgrade your outdoor spaces with expertly crafted paver installations. From stunning patios to durable driveways, we combine functionality and style to create surfaces that stand the test of time.",
    image: "/images/pavers.jpg",
    alt: "Professional paver patio installation",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Our Services
          </p>
          <h2 className="font-serif font-black text-4xl tracking-tight text-foreground sm:text-5xl text-balance">
            Everything Your Yard Needs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            From lush green turf to elegant stone pavers, we deliver premium outdoor transformations that last.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col gap-8 lg:gap-16 lg:items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="relative aspect-[4/3] w-full lg:w-1/2 overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="lg:w-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif font-black text-3xl tracking-tight text-foreground sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
