import { useContext } from "react"
import { DarkModeContext } from "./DarkModeProvider"
import { useTranslation } from "react-i18next"
import { apiBaseUrl } from "../helper/api"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, LogOut, Settings, Languages, LogIn } from "lucide-react"

const UserSettings = ({
  userData,
  status,
}: {
  userData?: any
  status: "LOGGED_IN" | "NOT_LOGGED_IN" | "OFFLINE"
}) => {
  const { t, i18n } = useTranslation()
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext)

  const isLoggedIn = status === "LOGGED_IN"
  const isOffline = status === "OFFLINE"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full p-0 overflow-hidden"
          aria-label="Settings"
        >
          {isLoggedIn ? (
            <Avatar className="h-full w-full">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={
                  userData?.profilePictureUrl ??
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="User"
              />
              <AvatarFallback className="text-xs font-medium">
                {userData?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Settings className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {!isOffline && (
          <>
            {isLoggedIn ? (
              <DropdownMenuItem asChild className="cursor-pointer">
                <a
                  href={`${apiBaseUrl}/auth/logout`}
                  target="_self"
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("navbar.Sign_out")}</span>
                </a>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild className="cursor-pointer">
                <a
                  href={`${apiBaseUrl}/auth/google?redirect=${window.location.origin}`}
                  target="_self"
                  className="flex items-center"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Sign in with Google</span>
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ne" : "en")
          }
          className="cursor-pointer"
        >
          <Languages className="mr-2 h-4 w-4" />
          <span className="flex-1">
            {i18n.language === "en" ? "नेपाली" : "English"}
          </span>
          <span className="ml-2 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
            {i18n.language === "en" ? "NE" : "EN"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleDarkMode} className="cursor-pointer">
          {darkMode ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              <span className="flex-1">Light mode</span>
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              <span className="flex-1">Dark mode</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserSettings
