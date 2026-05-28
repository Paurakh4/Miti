import { cn } from "@/lib/utils"
import { NewCalendarData } from "@miti/types"
import NepaliDate from "nepali-datetime"
import { Calendar, Clock, Moon, Sun, Star, Wind, Earth } from "lucide-react"

export const PanchangTableRow = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5">
      <div className="flex items-center gap-2 min-w-0">
        {icon && (
          <span className="text-muted-foreground flex-shrink-0">{icon}</span>
        )}
        <p className="text-sm text-muted-foreground truncate">{label}</p>
      </div>
      <p className="text-sm font-medium text-foreground tabular-nums truncate">
        {value}
      </p>
    </div>
  )
}

const PanchangSection = ({
  title,
  children,
  icon,
}: {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground font-mono">
          {title}
        </h3>
      </div>
      <div className="rounded-md border border-border bg-card overflow-hidden">
        {children}
      </div>
    </div>
  )
}

const MuhuratItem = ({ name, time }: { name: string; time?: string }) => {
  return (
    <li className="flex items-center justify-between px-4 py-2.5 text-sm">
      <span className="text-foreground">{name}</span>
      {time && (
        <span className="font-mono tabular-nums text-muted-foreground text-xs">
          {time}
        </span>
      )}
    </li>
  )
}

const Panchang = ({ data }: { data: NewCalendarData }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-muted-foreground">
            <Earth size={16} />
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground font-mono">
            पञ्चाङ्ग
          </h3>
        </div>
        <div className="rounded-md border border-border bg-card divide-y divide-border overflow-hidden">
          <PanchangTableRow
            label="तारिख"
            value={new NepaliDate(data.calendarInfo.dates.bs.full.en ?? "")
              .getDateObject()
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            icon={<Calendar size={14} />}
          />

          <PanchangTableRow
            label="चन्द्र राशि"
            value={data.panchangaDetails?.chandraRashi.time.np ?? "—"}
            icon={<Moon size={14} />}
          />
          <PanchangTableRow
            label="सूर्य राशि"
            value={data.panchangaDetails?.suryaRashi.np ?? "—"}
            icon={<Sun size={14} />}
          />
          <PanchangTableRow
            label="ऋतु"
            value={data.hrituDetails?.title.np ?? "—"}
            icon={<Wind size={14} />}
          />
          <PanchangTableRow
            label="नक्षत्र समाप्ति समय"
            value="१७:४३"
            icon={<Star size={14} />}
          />
          <PanchangTableRow
            label="करण १"
            value={data.panchangaDetails?.karans.first.np ?? "—"}
          />
          <PanchangTableRow
            label="करण २"
            value={data.panchangaDetails?.karans.second.np ?? "—"}
          />
          <PanchangTableRow
            label="पक्ष"
            value={data.panchangaDetails?.pakshya.np ?? "—"}
          />
          <PanchangTableRow
            label="योग"
            value={data.panchangaDetails?.yog.np ?? "—"}
          />
          <PanchangTableRow
            label="तिथि"
            value={
              (data.tithiDetails?.title.np ?? "—") +
              (data.tithiDetails?.display.np ?? "")
            }
          />
        </div>
      </div>

      <PanchangSection title="शुभ साइत / मुहूर्त" icon={<Sun size={16} />}>
        {data.auspiciousMoments.sahits.length > 0 ? (
          <ul className="divide-y divide-border">
            {data.auspiciousMoments.sahits.map((sahit, index) => (
              <MuhuratItem key={index} name={sahit.title.np ?? ""} />
            ))}
          </ul>
        ) : (
          <p className="px-4 py-4 text-sm text-muted-foreground italic">
            आज शुभ साइत / मुहूर्त छैन।
          </p>
        )}
      </PanchangSection>

      <PanchangSection title="काल / मुहूर्तम्" icon={<Clock size={16} />}>
        {data.auspiciousMoments.muhurats.length > 0 ? (
          <ul className="divide-y divide-border">
            {data.auspiciousMoments.muhurats.map((muhurat, index) => (
              <MuhuratItem
                key={index}
                name={muhurat.periodName ?? ""}
                time={muhurat.duration ?? ""}
              />
            ))}
          </ul>
        ) : (
          <p className="px-4 py-4 text-sm text-muted-foreground italic">
            आज काल / मुहूर्तम् छैन।
          </p>
        )}
      </PanchangSection>
    </div>
  )
}

export default Panchang
