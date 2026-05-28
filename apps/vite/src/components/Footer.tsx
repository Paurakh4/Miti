import { Link } from "react-router-dom"
import Octocat from "./Octocat"

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 py-5 md:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/PoskOfficial/Nepali-calendar-web"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Octocat className="h-4 w-4 fill-current" />
          </a>
          <span className="text-sm font-medium text-foreground">
            Miti
          </span>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            The Nepali Calendar
          </span>
        </div>
        <ul className="flex items-center gap-1 text-xs text-muted-foreground">
          <li>
            <Link
              to="/privacy"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li aria-hidden className="text-border">
            ·
          </li>
          <li>
            <Link
              to="/google-api-disclosure"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors"
            >
              Google API Disclosure
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
