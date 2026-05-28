import { CalendarEvent, NewCalendarData } from "@miti/types"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import NepaliDate from "nepali-datetime"
import { isSameDay } from "date-fns"
import { DayDialog } from "./DayDialog"
import { DayDetail } from "./DayDetails"
import { useQuery } from "@tanstack/react-query"
import { fetchUserEvents } from "@/helper/api"
import colors from "@/constants/colors"
import { getEventsOfSelectedDay } from "@/helper/events"
import useLanguage from "@/helper/useLanguage"
import nepaliNumber from "@/helper/nepaliNumber"

type CalendarGridProps = {
  monthData: NewCalendarData[]
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ monthData }) => {
  const [dayDialogOpen, setDayDialogOpen] = useState(false)
  const [dayDialogData, setDayDialogData] = useState<NewCalendarData | null>(
    null
  )
  const { isNepaliLanguage } = useLanguage()

  const handleDayClick = (dayData: NewCalendarData) => {
    setDayDialogData(dayData)
    setDayDialogOpen(true)
  }

  const { data: userEventsData } = useQuery<{ events: CalendarEvent[] }>({
    queryKey: [
      "userEvents",
      monthData[0]?.calendarInfo.dates.bs.year.en,
      monthData[0]?.calendarInfo.dates.bs.month.en,
    ],
    queryFn: () =>
      fetchUserEvents(
        monthData[0]?.calendarInfo.dates.ad.full.en ?? "",
        monthData[monthData.length - 1]?.calendarInfo.dates.ad.full.en ?? ""
      ),
    enabled: monthData.length > 0,
  })

  const userEvents = userEventsData?.events || []

  const dayNames = {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    np: ["आइत", "सोम", "मङ्गल", "बुध", "बिहि", "शुक्र", "शनि"],
  }

  const days = isNepaliLanguage ? dayNames.np : dayNames.en

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-border bg-card">
        {days.map((day, index) => (
          <div
            key={day}
            className={cn(
              "py-2 text-center text-[11px] sm:text-xs font-medium uppercase tracking-tight text-muted-foreground",
              "font-mono",
              index === 6 && "text-destructive/80"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        className="grid grid-cols-7 bg-card"
        role="grid"
        aria-label="Calendar"
      >
        {monthData.map((day) => {
          const dayDate = new NepaliDate(
            day.calendarInfo.dates.bs.full.en || ""
          ).getDateObject()

          const isToday = isSameDay(new Date(), dayDate)
          const isHoliday =
            day.eventDetails.filter((event) => event.isHoliday).length > 0 ||
            day.calendarInfo.days.codes.en === "7"

          const singleDayUserEvents = Array.from(
            new Set(
              getEventsOfSelectedDay(
                userEvents,
                new Date(day.calendarInfo.dates.ad.full.en ?? new Date())
              ).map((event) => {
                return event?.colorId || false
              })
            )
          )
          const eventsCount = singleDayUserEvents.length
          const hasEvent = day.eventDetails.length > 0

          return (
            <button
              key={day.calendarInfo.dates.bs.day.np}
              role="gridcell"
              aria-current={isToday ? "date" : undefined}
              aria-label={`${day.calendarInfo.dates.bs.full.en}${
                isHoliday ? ", holiday" : ""
              }${hasEvent ? ", has event" : ""}`}
              className={cn(
                "group relative h-auto min-h-[64px] sm:min-h-[88px]",
                "flex flex-col items-stretch p-1.5 sm:p-2",
                "bg-card text-foreground",
                "border-b border-r border-border",
                "transition-colors duration-100",
                "hover:bg-accent/50",
                "focus:z-10",
                isHoliday && "bg-destructive/[0.025] hover:bg-destructive/[0.07]",
                isToday && "bg-foreground/[0.03]"
              )}
              style={
                monthData.indexOf(day) === 0
                  ? { gridColumnStart: day.calendarInfo.days.codes.en! }
                  : {}
              }
              onClick={() => handleDayClick(day)}
            >
              {/* Top row: AD date + tithi */}
              <div className="flex items-start justify-between gap-1">
                <span
                  className={cn(
                    "font-mono text-[10px] sm:text-[11px] leading-none text-muted-foreground tracking-tight",
                    isHoliday && "text-destructive/80"
                  )}
                >
                  {isNepaliLanguage
                    ? day.calendarInfo.dates.ad.day.np
                    : day.calendarInfo.dates.ad.day.en}
                </span>
                <span className="hidden md:block truncate max-w-[70%] text-[10px] leading-none text-muted-foreground">
                  {day.tithiDetails?.title.np}
                </span>
              </div>

              {/* Center: BS day number */}
              <div className="flex flex-1 items-center justify-center">
                <span
                  className={cn(
                    "inline-flex items-center justify-center",
                    "text-xl sm:text-2xl font-medium tabular-nums tracking-tight",
                    "text-foreground",
                    isHoliday && "text-destructive",
                    isToday && [
                      "h-9 w-9 sm:h-10 sm:w-10 rounded-md",
                      "bg-foreground text-background font-semibold",
                      "shadow-[0_1px_0_0_hsl(var(--foreground)/0.18),inset_0_1px_0_0_hsl(0_0%_100%/0.12)]",
                    ]
                  )}
                >
                  {isNepaliLanguage
                    ? day.calendarInfo.dates.bs.day.np
                    : day.calendarInfo.dates.bs.day.en}
                </span>
              </div>

              {/* Bottom: events / dots */}
              <div className="mt-auto flex flex-col items-center gap-0.5">
                {eventsCount > 0 && (
                  <div className="flex items-center justify-center gap-1">
                    {singleDayUserEvents
                      .slice(0, Math.min(eventsCount, 3))
                      .map((color, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: color ? colors[color] : undefined,
                          }}
                          className={cn(
                            "inline-block h-1.5 w-1.5 rounded-full",
                            !color && "bg-muted-foreground/60"
                          )}
                        />
                      ))}
                    {eventsCount > 3 && (
                      <span className="text-[9px] leading-none text-muted-foreground font-mono">
                        +
                        {isNepaliLanguage
                          ? nepaliNumber((+eventsCount - 3).toString())
                          : +eventsCount - 3}
                      </span>
                    )}
                  </div>
                )}

                {hasEvent && (
                  <p
                    className={cn(
                      "hidden sm:block w-full truncate text-center text-[10px] leading-tight",
                      isHoliday
                        ? "text-destructive/80"
                        : "text-muted-foreground"
                    )}
                  >
                    {isNepaliLanguage
                      ? day.eventDetails[0]?.title.np
                      : day.eventDetails[0]?.title.en}
                  </p>
                )}
                <p className="md:hidden w-full truncate text-center text-[9px] leading-none text-muted-foreground">
                  {day.tithiDetails?.title.np}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {dayDialogData && (
        <DayDialog
          open={dayDialogOpen}
          setOpen={setDayDialogOpen}
          children={<DayDetail dayData={dayDialogData} />}
        />
      )}
    </div>
  )
}

export default CalendarGrid
