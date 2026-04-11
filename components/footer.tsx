import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">5O</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-card-foreground">
                5-O Turf
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Building dreams brick by brick. Premium artificial turf, putting green, and paver installations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-card-foreground mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Artificial Turf
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Putting Greens
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Paver Installation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-card-foreground mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#why-us" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="#free-quote" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="https://www.5oturf.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Main Website
                </Link>
              </li>
            </ul>
          </div>


        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} 5-O Turf. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
