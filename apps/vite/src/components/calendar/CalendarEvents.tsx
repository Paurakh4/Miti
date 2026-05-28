import useLanguage from "@/helper/useLanguage"
import { cn } from "@/lib/utils"
import { EventDetail } from "@miti/types"
import { CalendarFold } from "lucide-react"
import { useTranslation } from "react-i18next"
interface CalendarEventsProps {
  events: EventDetail[]
}
const CalendarEvents = ({ events }: CalendarEventsProps) => {
  const { t } = useTranslation()
  const { isNepaliLanguage } = useLanguage()
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-muted-foreground">
          <CalendarFold size={16} />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground font-mono">
          {t("modal.Calendar_Events")}
        </h3>
      </div>
      {events.length > 0 ? (
        <div className="space-y-2">
          {events.map((event, index) => (
            <div
              key={index}
              className={cn(
                "rounded-md border border-border bg-card p-3",
                event.isHoliday &&
                  "border-destructive/30 bg-destructive/[0.04]"
              )}
            >
              <h4
                className={cn(
                  "text-sm font-medium tracking-tight",
                  event.isHoliday ? "text-destructive" : "text-foreground"
                )}
              >
                {isNepaliLanguage
                  ? event.title.np
                  : event.title.en ?? event.title.np}
              </h4>
              {(event.details.np || event.details.en) && (
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {isNepaliLanguage
                    ? event.details.np
                    : event.details.en ?? event.details.np}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground rounded-md border border-dashed border-border bg-card px-4 py-3">
          No events available
        </p>
      )}
    </div>
  )
}

export default CalendarEvents
