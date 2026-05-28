import React from "react"
import { cn } from "@/lib/utils"
import { Event } from "./EventList"
import { relativeTimeFromDates } from "@/helper/dates"

const UpcomingEvent: React.FC<{
  event: Event
  isHoliday?: boolean
}> = ({ event, isHoliday }) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-md border border-border bg-card p-2.5",
        "transition-colors duration-150 hover:border-foreground/30 hover:bg-accent/40"
      )}
    >
      {/* Keycap-styled date */}
      <div
        className={cn(
          "kbd-surface flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-md",
          isHoliday && "bg-destructive/10 border-destructive/30"
        )}
      >
        <span
          className={cn(
            "text-base font-semibold leading-none tabular-nums",
            isHoliday ? "text-destructive" : "text-foreground"
          )}
        >
          {event.date}
        </span>
        <span
          className={cn(
            "text-[9px] mt-1 uppercase tracking-tight font-mono leading-none",
            isHoliday ? "text-destructive/80" : "text-muted-foreground"
          )}
        >
          {event.day}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm font-medium tracking-tight truncate",
              isHoliday ? "text-destructive" : "text-foreground"
            )}
          >
            {event.title}
          </p>
          <span className="kbd-surface flex-shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
            {relativeTimeFromDates(new Date(event.enDate))}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground truncate">
          {event.fullDate}
        </p>
      </div>
    </div>
  )
}

export default UpcomingEvent
