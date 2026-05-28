import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUser } from "@miti/query/user"
import InstallPWA from "./InstallBtn"
import UserSettings from "./UserSettings"
import { cn } from "@/lib/utils"
import { apiBaseUrl } from "../helper/api"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Navbar() {
  const navigation = [
    { name: "navbar.Home", href: "/" },
    { name: "navbar.Events", href: "/events" },
    { name: "navbar.Date_Converter", href: "/converter" },
    { name: "navbar.About", href: "/about" },
  ]

  const location = useLocation()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { data, status } = useUser(apiBaseUrl)

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" || location.pathname.startsWith("/calendar")
    return location.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon-sm" aria-label="Toggle menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2 bg-card">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="flex items-center px-4 pt-2">
                  <img
                    src="/icons/icon-512x512.png"
                    alt="Miti"
                    className="h-8 w-auto mr-2"
                  />
                  <span className="font-semibold tracking-tight text-foreground">
                    Miti
                  </span>
                </Link>
                <nav className="flex flex-col space-y-1 px-2">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center py-2.5 px-3 rounded-md text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {t(item.name)}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <InstallPWA>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-sm font-medium px-3"
                      >
                        Install
                      </Button>
                    </InstallPWA>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-md px-1.5 py-1"
          >
            <img
              src="/icons/icon-512x512.png"
              alt="Miti"
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline-block font-semibold tracking-tight text-foreground">
              Miti
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-0.5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {t(item.name)}
            </Link>
          ))}
          <InstallPWA>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Install
            </Button>
          </InstallPWA>
        </nav>

        <div className="flex items-center gap-2">
          <UserSettings status={status} userData={data} />
        </div>
      </div>
    </header>
  )
}
