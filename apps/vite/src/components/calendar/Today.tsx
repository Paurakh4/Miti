import useLanguage from "@/helper/useLanguage"
import { NewCalendarData } from "@miti/types"
import { useTranslation } from "react-i18next"
import { Sunrise, Sunset, Clock } from "lucide-react"

type TodayProps = {
  data: NewCalendarData | undefined
  isLoading: boolean
}

const Today = ({ data, isLoading }: TodayProps) => {
  const { isNepaliLanguage } = useLanguage()
  const { t } = useTranslation()

  if (isLoading || !data) return <TodaySkeleton />

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Date header — keycap style */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-muted/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="kbd-surface flex h-14 w-14 flex-col items-center justify-center rounded-md flex-shrink-0">
            <span className="text-2xl font-semibold tabular-nums leading-none text-foreground">
              {isNepaliLanguage
                ? data.calendarInfo.dates.bs.day.np
                : data.calendarInfo.dates.bs.day.en}
            </span>
            <span className="text-[10px] mt-0.5 uppercase tracking-tight text-muted-foreground font-mono">
              {isNepaliLanguage
                ? data.calendarInfo.days.dayOfWeek.np?.slice(0, 3)
                : data.calendarInfo.days.dayOfWeek.en?.slice(0, 3)}
            </span>
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight text-foreground truncate">
              {isNepaliLanguage
                ? data.calendarInfo.dates.bs.month.np
                : data.calendarInfo.dates.bs.month.en}{" "}
              <span className="font-mono tabular-nums">
                {isNepaliLanguage
                  ? data.calendarInfo.dates.bs.year.np
                  : data.calendarInfo.dates.bs.year.en}
              </span>
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {isNepaliLanguage
                ? data.calendarInfo.dates.ad.full.np
                : data.calendarInfo.dates.ad.full.en}
            </div>
            <div className="text-[11px] text-muted-foreground/80 mt-0.5 truncate">
              {isNepaliLanguage ? "ने.सं." : "N.S."}{" "}
              <span className="font-mono">
                {data.calendarInfo.nepaliEra.nepalSambat.year.np}
              </span>{" "}
              · {data.calendarInfo.nepaliEra.nepalSambat.month.np}
            </div>
          </div>
        </div>

        <span className="kbd-surface flex-shrink-0 rounded-md px-2 py-1 text-[10px] font-mono uppercase tracking-tight text-muted-foreground">
          {t("navbar.today")}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-border">
        <Stat
          label={t("today.Sunrise")}
          value={data.panchangaDetails?.times.sunrise ?? "--:--"}
          icon={<Sunrise size={14} className="text-muted-foreground" />}
        />
        <Stat
          label={t("today.Sunset")}
          value={data.panchangaDetails?.times.sunset ?? "--:--"}
          icon={<Sunset size={14} className="text-muted-foreground" />}
        />
        <Stat
          label={t("today.Tithi")}
          value={data.tithiDetails?.title?.np ?? "—"}
          icon={<Clock size={14} className="text-muted-foreground" />}
          truncate
        />
      </div>
    </div>
  )
}

const Stat = ({
  label,
  value,
  icon,
  truncate,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  truncate?: boolean
}) => (
  <div className="flex flex-col gap-1 px-3 py-3 min-w-0">
    <div className="flex items-center gap-1 text-[10px] uppercase tracking-tight text-muted-foreground font-mono">
      {icon}
      <span>{label}</span>
    </div>
    <div
      className={
        "text-sm font-medium text-foreground tabular-nums " +
        (truncate ? "truncate" : "")
      }
    >
      {value}
    </div>
  </div>
)

const TodaySkeleton = () => (
  <div className="rounded-lg border border-border bg-card overflow-hidden animate-pulse">
    <div className="flex items-center gap-3 p-4 border-b border-border">
      <div className="h-14 w-14 rounded-md bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="h-3 w-44 rounded bg-muted" />
        <div className="h-3 w-28 rounded bg-muted" />
      </div>
      <div className="h-6 w-12 rounded-md bg-muted" />
    </div>
    <div className="grid grid-cols-3 divide-x divide-border">
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-12 rounded bg-muted" />
        <div className="h-3.5 w-14 rounded bg-muted" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-12 rounded bg-muted" />
        <div className="h-3.5 w-14 rounded bg-muted" />
      </div>
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-12 rounded bg-muted" />
        <div className="h-3.5 w-16 rounded bg-muted" />
      </div>
    </div>
  </div>
)

export default Today
