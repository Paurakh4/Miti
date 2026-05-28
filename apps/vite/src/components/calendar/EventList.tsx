import React, { useMemo } from "react"
import UpcomingEvent from "./UpcomingEvent"
import { EventDetail, NewCalendarData } from "@miti/types"
import { ArrowRight, CalendarOff, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import { isBefore } from "date-fns"
import useLanguage from "@/helper/useLanguage"

export type Event = {
  date: string
  enDate: string
  isHoliday: boolean
  day: string
  title: string
  fullDate: string
  npDate: string
}

const EventList: React.FC<{
  data: NewCalendarData[]
  isHoliday?: boolean
  title?: string
  isLoading?: boolean
}> = ({ data, isHoliday, isLoading }) => {
  const { BSYear, BSMonth } = useParams()
  const { isNepaliLanguage } = useLanguage()
  const navigate = useNavigate()

  const today = new NepaliDate()
  const isThisMonth = useMemo(
    () =>
      today.getMonth() + 1 === Number(BSMonth) &&
      today.getYear() === Number(BSYear),
    [BSMonth, BSYear]
  )

  const newEventDetails: Event[] = []
  data.forEach((day) => {
    if (
      isThisMonth &&
      isBefore(
        new Date(day.calendarInfo.dates.ad.full.en ?? new Date()),
        new Date()
      )
    ) {
      return
    }
    if (day.eventDetails.length > 0) {
      day.eventDetails.forEach((event: EventDetail) => {
        newEventDetails.push({
          date: day.calendarInfo.dates.bs.day.np ?? "",
          enDate: day.calendarInfo.dates.ad.full.en ?? "",
          npDate: day.calendarInfo.dates.bs.full.np ?? "",
          isHoliday: event.isHoliday,
          day: day.calendarInfo.days.dayOfWeek.np ?? "",
          title: event.title.np ?? "",
          fullDate: day.calendarInfo.dates.bs.full.np ?? "",
        })
      })
    }
  })

  const filteredEvents = isHoliday
    ? newEventDetails.filter((event) => event.isHoliday)
    : newEventDetails

  const hasEvents = filteredEvents.length > 0

  const handleViewAll = () => {
    const path = isHoliday
      ? `/events/${BSYear}/${BSMonth}/?onlyHolidays=true`
      : `/events/${BSYear}/${BSMonth}`
    navigate(path)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-border bg-card">
        <Loader2 className="animate-spin text-muted-foreground" size={20} />
      </div>
    )
  }

  if (!hasEvents) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-dashed border-border bg-card px-4 py-5">
        <CalendarOff
          size={18}
          className="text-muted-foreground flex-shrink-0"
        />
        <p className="text-sm text-muted-foreground">
          {isNepaliLanguage
            ? isHoliday
              ? "छुट्टी छैन"
              : "कार्यक्रम छैन"
            : isHoliday
            ? "No upcoming holidays"
            : "No upcoming events"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filteredEvents.slice(0, 5).map((event, index) => (
        <UpcomingEvent
          key={index}
          event={event}
          isHoliday={isHoliday && event.isHoliday}
        />
      ))}

      {filteredEvents.length > 5 && (
        <button
          className="group inline-flex w-full items-center justify-center gap-1 rounded-md border border-transparent px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          onClick={handleViewAll}
        >
          View all {filteredEvents.length}
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      )}
    </div>
  )
}

export default EventList
