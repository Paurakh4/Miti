import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid"
import NepaliDate from "nepali-datetime"
import NepaliDatePicker from "../components/NepaliDatePicker"
import { np_nepaliMonths as nepaliMonths } from "../constants/mahina"
import nepaliNumber from "../helper/nepaliNumber"

import { type ChangeEvent, useState } from "react"
import useLanguage from "../helper/useLanguage"

import { format } from "date-fns"

const DateConverter = () => {
  const [date, setDate] = useState(new Date())
  const nepaliDate = new NepaliDate(date)
  const minDate = "1943-04-14"
  const maxDate = "2034-04-13"

  const { t } = useLanguage()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value

    const inputDate = new Date(inputValue)

    if (inputDate > new Date(minDate) && inputDate < new Date(maxDate)) {
      setDate(inputDate)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <p className="text-xs font-mono uppercase tracking-tight text-muted-foreground mb-1">
          Tool
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
          {t("dc.Date_Converter")}
        </h1>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* BS */}
          <div className="flex-1">
            <label className="block text-xs font-mono uppercase tracking-tight text-muted-foreground mb-2">
              {t("dc.B.S")} · Nepali
            </label>
            <NepaliDatePicker date={date} setDate={setDate} />
          </div>

          {/* Divider/swap */}
          <div className="flex items-center justify-center sm:px-2 sm:pb-2">
            <div className="kbd-surface flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground">
              <ArrowsRightLeftIcon
                className="h-4 w-4 rotate-90 sm:rotate-0"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* AD */}
          <div className="flex-1">
            <label
              htmlFor="ad-date"
              className="block text-xs font-mono uppercase tracking-tight text-muted-foreground mb-2"
            >
              {t("dc.A.D")} · Gregorian
            </label>
            <input
              id="ad-date"
              type="date"
              value={format(date, "yyyy-MM-dd")}
              onChange={handleChange}
              className="w-full appearance-none rounded-md border border-input bg-card px-3 py-2 text-sm font-mono tabular-nums text-foreground shadow-[inset_0_1px_0_0_hsl(0_0%_0%/0.02)] transition-colors duration-150 hover:border-foreground/30 focus-visible:outline-none"
              max={maxDate}
              min={minDate}
            />
          </div>
        </div>

        {/* Result */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <ResultCard label="नेपाली · Nepali">
            {`${nepaliNumber(`${nepaliDate.getYear()}`)} ${
              nepaliMonths[nepaliDate.getMonth()]
            } ${nepaliNumber(
              `${nepaliDate.getDate()}, ${nepaliDate
                .getDateObject()
                .toLocaleString("ne-NP", { weekday: "long" })}`
            )}`}
          </ResultCard>
          <ResultCard label="Gregorian">
            {`${date.toLocaleString("default", {
              weekday: "long",
            })} ${date.getDate()}, ${date.toLocaleString("default", {
              month: "long",
            })} ${date.getFullYear()}`}
          </ResultCard>
        </div>
      </div>
    </div>
  )
}

const ResultCard = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="rounded-md border border-border bg-background p-4">
    <p className="text-[10px] font-mono uppercase tracking-tight text-muted-foreground mb-2">
      {label}
    </p>
    <p className="text-base font-medium tracking-tight text-foreground">
      {children}
    </p>
  </div>
)

export default DateConverter
