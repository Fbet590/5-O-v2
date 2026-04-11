import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LeadForm } from "@/components/lead-form"
import { Services } from "@/components/services"
import { Reviews } from "@/components/reviews"
import { Gallery } from "@/components/gallery"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LeadForm />
      <Services />
      <Reviews />
      <Gallery />
      <Footer />
    </main>
  )
}
