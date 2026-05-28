import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import useLanguage from "../helper/useLanguage"
import { availableYears } from "../constants/availableYears"
import { cn } from "@/lib/utils"
import NepaliDate from "nepali-datetime"
import { nepaliMonths } from "../constants/mahina"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const YearMonthPicker = ({
  currentNepaliDate,
  setCurrentNepaliDate,
  className,
}: {
  currentNepaliDate: NepaliDate
  setCurrentNepaliDate: (date: NepaliDate) => void
  className?: string
}) => {
  const { isNepaliLanguage } = useLanguage()
  const currentYear = currentNepaliDate.getYear()
  const currentMonth = currentNepaliDate.getMonth()

  const handleNextMonth = () => {
    if (currentMonth == 11) {
      setCurrentNepaliDate(new NepaliDate(currentYear + 1, 0, 1))
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth + 1, 1))
    }
  }

  const handlePrevMonth = () => {
    if (currentMonth == 0) {
      setCurrentNepaliDate(new NepaliDate(currentYear - 1, 11, 1))
    } else {
      setCurrentNepaliDate(new NepaliDate(currentYear, currentMonth - 1, 1))
    }
  }

  const isPrevDisabled =
    currentMonth === 0 && currentYear === availableYears[0]?.en
  const isNextDisabled =
    currentMonth === 11 &&
    currentYear === availableYears[availableYears.length - 1]?.en

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={isPrevDisabled}
        onClick={handlePrevMonth}
        aria-label="Previous month"
      >
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </Button>

      <div className="flex flex-1 md:flex-none items-center gap-2">
        <Select
          value={currentMonth.toString()}
          onValueChange={(value) => {
            setCurrentNepaliDate(
              new NepaliDate(currentYear, parseInt(value), 1)
            )
          }}
        >
          <SelectTrigger className="h-8 min-w-[120px] w-full md:w-auto font-medium tracking-tight">
            <SelectValue placeholder="Month" className="select-none" />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {nepaliMonths.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                <span className="flex items-baseline gap-2">
                  <span>{isNepaliLanguage ? month.np : month.en}</span>
                  {month.ad && (
                    <span className="text-[10px] text-muted-foreground tracking-tight">
                      {month.ad}
                    </span>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentYear.toString()}
          onValueChange={(value) => {
            setCurrentNepaliDate(
              new NepaliDate(parseInt(value), currentMonth, 1)
            )
          }}
        >
          <SelectTrigger className="h-8 min-w-[88px] w-auto font-medium tracking-tight font-mono">
            <SelectValue placeholder="Year" className="select-none" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {availableYears.map((year) => (
              <SelectItem key={year.en} value={year.en.toString()}>
                <span className="font-mono">
                  {isNepaliLanguage ? year.np : `${year.en}`}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="icon-sm"
        disabled={isNextDisabled}
        onClick={handleNextMonth}
        aria-label="Next month"
      >
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default YearMonthPicker
