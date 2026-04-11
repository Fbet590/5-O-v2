import { Shield, Droplets, Clock, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Built to Last",
    description:
      "Our installations use premium-grade materials engineered for durability, backed by industry-leading warranties.",
  },
  {
    icon: Droplets,
    title: "Water-Smart",
    description:
      "Artificial turf eliminates the need for watering, saving thousands of gallons each year and reducing your water bill.",
  },
  {
    icon: Clock,
    title: "Zero Maintenance",
    description:
      "No mowing, no fertilizing, no weeding. Enjoy a perfect yard every single day with virtually no upkeep.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description:
      "Our skilled team brings years of experience and attention to detail to every project, ensuring flawless results.",
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif font-extrabold text-4xl tracking-tight text-primary-foreground sm:text-5xl text-balance">
            The 5-O Turf Difference
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
            We don't just install turf and pavers. We transform outdoor spaces with quality you can see and feel.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-primary-foreground/10 p-8 backdrop-blur-sm border border-primary-foreground/10 transition-colors hover:bg-primary-foreground/15"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15 mb-5">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/75">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
