import NepaliDate from "nepali-datetime"
import { NewCalendarData } from "@miti/types"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { useCalendarData } from "@miti/query/calendar"
import { Event } from "@/components/calendar/EventList"
import { CalendarOff } from "lucide-react"
import YearMonthPicker from "@/components/YearMonthPicker"
import { nepaliMonths } from "@/constants/mahina"
import { relativeTimeFromDates } from "@/helper/dates"
import useLanguage from "@/helper/useLanguage"
import { useTranslation } from "react-i18next"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

function UpcomingEvents() {
  const { BSYear, BSMonth } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const onlyHolidays = searchParams.get("onlyHolidays") === "true"

  const validYearAndMonth = useMemo(() => {
    if (!BSYear || !BSMonth) return new NepaliDate()
    const year = parseInt(BSYear)
    const month = parseInt(BSMonth)
    const isValid = year >= 2075 && year <= 2085 && month >= 1 && month <= 12

    if (isValid) return new NepaliDate(year, month - 1, 1)
    return new NepaliDate()
  }, [BSYear, BSMonth])

  const [currentNepaliDate, setCurrentNepaliDate] =
    useState<NepaliDate>(validYearAndMonth)

  useEffect(() => {
    const baseUrl = `/events/${currentNepaliDate.getYear()}/${
      currentNepaliDate.getMonth() + 1
    }`
    const url = onlyHolidays ? `${baseUrl}?onlyHolidays=true` : baseUrl
    history.replaceState(null, "", url)
  }, [currentNepaliDate, onlyHolidays])

  const toggleHolidayFilter = (checked: boolean) => {
    const baseUrl = `/events/${currentNepaliDate.getYear()}/${
      currentNepaliDate.getMonth() + 1
    }`
    if (!checked) {
      navigate(baseUrl)
    } else {
      navigate(`${baseUrl}?onlyHolidays=true`)
    }
  }

  const { data: calendarData } = useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const eventDetails: Event[] = []
  monthData.forEach((day) => {
    if (day.eventDetails.length > 0) {
      day.eventDetails.forEach((event) => {
        eventDetails.push({
          date: day.calendarInfo.dates.bs.day.np ?? "",
          enDate: day.calendarInfo.dates.ad.full.en ?? "",
          isHoliday: event.isHoliday,
          day: day.calendarInfo.days.dayOfWeek.np ?? "",
          title: event.title.np ?? "",
          fullDate: day.calendarInfo.dates.bs.full.np ?? "",
          npDate: day.calendarInfo.dates.bs.full.np ?? "",
        })
      })
    }
  })

  const filteredEvents = useMemo(() => {
    if (onlyHolidays) {
      return eventDetails.filter((event) => event.isHoliday)
    }
    return eventDetails
  }, [eventDetails, onlyHolidays])

  const holidayCount = useMemo(() => {
    return eventDetails.filter((event) => event.isHoliday).length
  }, [eventDetails])

  const currentMonthName = useMemo(() => {
    return nepaliMonths[currentNepaliDate.getMonth()]
  }, [currentNepaliDate])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-tight text-muted-foreground mb-1">
            {onlyHolidays ? t("navbar.Holidays") : t("navbar.Events")}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {onlyHolidays
              ? t("navbar.Upcoming_Holidays")
              : t("navbar.Upcoming_Events")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {currentMonthName?.np}{" "}
            <span className="font-mono tabular-nums">
              {currentNepaliDate.getYear()}
            </span>
          </p>
        </div>

        <YearMonthPicker
          className="w-full md:w-auto"
          currentNepaliDate={currentNepaliDate}
          setCurrentNepaliDate={setCurrentNepaliDate}
        />
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Switch
            id="holidays-filter"
            checked={onlyHolidays}
            onCheckedChange={toggleHolidayFilter}
          />
          <label
            htmlFor="holidays-filter"
            className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer"
          >
            {t("navbar.Holidays_only")}
            {holidayCount > 0 && (
              <Badge variant="secondary" className="font-mono tabular-nums">
                {holidayCount}
              </Badge>
            )}
          </label>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {filteredEvents.length} result
          {filteredEvents.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 mt-12 rounded-md border border-dashed border-border bg-card px-4 py-16">
          <CalendarOff className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {onlyHolidays
              ? "यस महिनामा कुनै बिदाहरू छैनन्।"
              : "यस महिनामा कुनै कार्यक्रमहरू छैनन्।"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  const { isNepaliLanguage } = useLanguage()
  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border border-border bg-card p-3",
        "transition-colors duration-150 hover:border-foreground/30 hover:bg-accent/40"
      )}
    >
      <div
        className={cn(
          "kbd-surface flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-md",
          event.isHoliday && "bg-destructive/10 border-destructive/30"
        )}
      >
        <span
          className={cn(
            "text-lg font-semibold leading-none tabular-nums",
            event.isHoliday ? "text-destructive" : "text-foreground"
          )}
        >
          {event.date}
        </span>
        <span
          className={cn(
            "text-[9px] mt-1 uppercase tracking-tight font-mono leading-none",
            event.isHoliday ? "text-destructive/80" : "text-muted-foreground"
          )}
        >
          {event.day}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "text-sm font-medium tracking-tight leading-snug",
            event.isHoliday ? "text-destructive" : "text-foreground"
          )}
        >
          {event.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {event.fullDate}
        </p>
        <p className="text-[11px] text-muted-foreground/80 font-mono">
          {event.enDate}
        </p>
      </div>

      <span className="kbd-surface flex-shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
        {relativeTimeFromDates(new Date(event.enDate), isNepaliLanguage)}
      </span>
    </div>
  )
}

export default UpcomingEvents
