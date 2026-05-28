import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { apiBaseUrl } from "../helper/api"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt: () => Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
    transitionend: BeforeInstallPromptEvent
  }
}

const InstallPWA = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null)
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)
  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault()
      deferredPrompt.current = e
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener("beforeinstallprompt", handler)
    window.addEventListener("appinstalled", () => {
      toast.dismiss()
      fetch(`${apiBaseUrl}/installed`, { method: "POST" })
    })
    return () => window.removeEventListener("transitionend", handler)
  }, [])
  const onClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault()
    if (promptInstall == null) {
      return
    }
    promptInstall.prompt()
  }

  if (!supportsPWA) {
    toast.dismiss()
    return null
  }
  // toast.dismiss();
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto flex w-full max-w-md rounded-md border border-border bg-card text-card-foreground shadow-lg`}
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-md border border-border"
                src="/icons/icon-96x96.png"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium tracking-tight text-foreground">
                App installation available
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                ~150KB, works offline
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-border">
          <button
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-none rounded-r-md px-5 py-4 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    ),
    {
      id: "install",
    }
  )
  return <div onClick={onClick}>{children}</div>
}

export default InstallPWA
