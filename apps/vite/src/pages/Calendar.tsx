import { useEffect, useMemo, useState } from "react"
import CalendarHeader from "../components/calendar/CalendarHeader"
import CalendarGrid from "../components/calendar/CalendarGrid"
import EventList from "../components/calendar/EventList"
import Today from "../components/calendar/Today"
import Debugger from "../components/Debugger"
import { useNavigate, useParams } from "react-router-dom"
import NepaliDate from "nepali-datetime"
import { useCalendarData, useTodayData } from "@miti/query/calendar"
import { NewCalendarData } from "@miti/types"
import TimelineView from "@/components/calendar/TimelineView"
import { useTranslation } from "react-i18next"
import { Loader2 } from "lucide-react"

const Calendar = () => {
  const { BSYear, BSMonth } = useParams()
  const [view, setView] = useState<"calendar" | "event">("calendar")
  const [scope, setScope] = useState<"week" | "day">("week")
  const { t } = useTranslation()

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

  const navigate = useNavigate()

  useEffect(() => {
    navigate(
      `/calendar/${currentNepaliDate.getYear()}/${
        currentNepaliDate.getMonth() + 1
      }`,
      { replace: true }
    )
  }, [currentNepaliDate, navigate])

  const { data: calendarData, isLoading: monthDataLoading } =
    useCalendarData(currentNepaliDate)

  const currentMonth = currentNepaliDate.getMonth() + 1

  const monthData = useMemo(() => {
    if (!calendarData) return []
    return calendarData
  }, [calendarData, currentMonth]) as unknown as NewCalendarData[]

  const { data: todayData, isLoading: todayDataLoading } = useTodayData(
    new NepaliDate()
  )

  return (
    <section className="bg-surface">
      <Debugger />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Calendar column */}
          <div className="min-w-0">
            <CalendarHeader
              currentNepaliDate={currentNepaliDate}
              setCurrentNepaliDate={setCurrentNepaliDate}
              view={view}
              setView={setView}
              scope={scope}
              setScope={setScope}
            />
            {view === "calendar" ? (
              monthDataLoading ? (
                <div className="flex h-[50vh] items-center justify-center rounded-lg border border-border bg-card">
                  <Loader2
                    className="animate-spin text-muted-foreground"
                    size={28}
                  />
                </div>
              ) : (
                <CalendarGrid monthData={monthData} />
              )
            ) : (
              <TimelineView monthData={monthData} scope={scope} />
            )}
          </div>

          {/* Sidebar column */}
          <aside className="flex flex-col gap-6 lg:pt-[60px]">
            <Today data={todayData} isLoading={todayDataLoading} />

            <section>
              <SectionHeader title={t("navbar.Events")} />
              <EventList data={monthData} isLoading={monthDataLoading} />
            </section>

            <section>
              <SectionHeader title={t("navbar.Holidays")} />
              <EventList
                data={monthData}
                isHoliday
                isLoading={monthDataLoading}
              />
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-baseline justify-between mb-3">
    <h2 className="text-sm font-semibold uppercase tracking-tight text-muted-foreground font-mono">
      {title}
    </h2>
  </div>
)

export default Calendar
