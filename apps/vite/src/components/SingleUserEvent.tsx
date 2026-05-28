import colors from "../constants/colors"
import { useState } from "react"
import useLanguage from "../helper/useLanguage"
import EventDetailsDialog from "./EventDetailsDialog"
import { CalendarEvent } from "@miti/types"
import { eventDuration } from "../helper/dates"
import { cn } from "@/lib/utils"

function SingleUserEvent({ event }: { event: CalendarEvent }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { isNepaliLanguage } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => setModalOpen(true)}
      className={cn(
        "group flex w-full items-start gap-3 rounded-md border border-border bg-card px-3 py-2.5",
        "text-left transition-colors duration-150",
        "hover:border-foreground/30 hover:bg-accent/40"
      )}
    >
      {modalOpen && (
        <EventDetailsDialog
          modalOpen={modalOpen}
          event={event}
          onClose={() => setModalOpen(false)}
        />
      )}
      <span
        className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full"
        style={{
          backgroundColor: event.colorId
            ? colors[event.colorId]
            : "hsl(var(--muted-foreground))",
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium tracking-tight text-foreground truncate">
          {event.summary}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground font-mono tabular-nums">
          {eventDuration(event, isNepaliLanguage)}
        </p>
        <p className="text-[11px] text-muted-foreground/80 truncate">
          {event.calendarSummary}
        </p>
      </div>
    </button>
  )
}

export default SingleUserEvent
