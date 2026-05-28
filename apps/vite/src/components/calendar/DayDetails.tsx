import { cn } from "@/lib/utils"
import { NewCalendarData } from "@miti/types"
import Panchang from "./Panchang"
import CalendarEvents from "./CalendarEvents"
import UserEvents from "./UserEvents"

import { useUser } from "@miti/query/user"
import { apiBaseUrl } from "@/helper/api"
import useLanguage from "@/helper/useLanguage"
import { Sunrise, Sunset } from "lucide-react"

export function DayDetail({ dayData }: { dayData: NewCalendarData }) {
  const { status } = useUser(apiBaseUrl)
  const isHoliday =
    dayData.eventDetails.filter((event) => event.isHoliday).length !== 0 ||
    dayData.calendarInfo.days.codes.en === "7"
  const calendarEvents = dayData.eventDetails

  const { isNepaliLanguage } = useLanguage()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <div
          className={cn(
            "kbd-surface flex h-16 w-16 flex-col items-center justify-center rounded-lg flex-shrink-0",
            isHoliday && "bg-destructive/10 border-destructive/30"
          )}
        >
          <p
            className={cn(
              "text-2xl font-semibold leading-none tabular-nums",
              isHoliday ? "text-destructive" : "text-foreground"
            )}
          >
            {isNepaliLanguage
              ? dayData.calendarInfo.dates.bs.day.np
              : dayData.calendarInfo.dates.ad.day.en}
          </p>
          <p
            className={cn(
              "text-[10px] mt-1 uppercase tracking-tight font-mono leading-none",
              isHoliday ? "text-destructive/80" : "text-muted-foreground"
            )}
          >
            {isNepaliLanguage
              ? dayData.calendarInfo.days.dayOfWeek.np?.slice(0, 3)
              : dayData.calendarInfo.days.dayOfWeek.en?.slice(0, 3)}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xl font-semibold tracking-tight text-foreground truncate">
            {isNepaliLanguage
              ? dayData.calendarInfo.dates.bs.month.np
              : dayData.calendarInfo.dates.ad.month.en}
            ,{" "}
            <span className="font-mono tabular-nums">
              {isNepaliLanguage
                ? dayData.calendarInfo.dates.bs.year.np
                : dayData.calendarInfo.dates.ad.year.en}
            </span>
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {dayData.tithiDetails?.title.np}
            {dayData.panchangaDetails?.pakshya.np && (
              <> · {dayData.panchangaDetails.pakshya.np}</>
            )}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-0.5 truncate">
            ने.सं.{" "}
            <span className="font-mono">
              {dayData.calendarInfo.nepaliEra.nepalSambat.year.np}
            </span>{" "}
            · {dayData.calendarInfo.nepaliEra.nepalSambat.month.np}
          </p>
        </div>

        <div className="hidden sm:flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sunrise size={14} />
            <span className="font-mono tabular-nums text-foreground">
              {dayData.panchangaDetails?.times.sunrise ?? "--:--"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sunset size={14} />
            <span className="font-mono tabular-nums text-foreground">
              {dayData.panchangaDetails?.times.sunset ?? "--:--"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {status === "LOGGED_IN" && (
          <UserEvents
            selectedDate={dayData.calendarInfo.dates.ad.full.en ?? ""}
          />
        )}
        <CalendarEvents events={calendarEvents} />
        <Panchang data={dayData} />
      </div>
    </div>
  )
}
