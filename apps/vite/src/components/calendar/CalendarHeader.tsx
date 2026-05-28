import React from "react"
import YearMonthPicker from "../YearMonthPicker"
import NepaliDate from "nepali-datetime"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

type CalendarHeaderProps = {
  currentNepaliDate: NepaliDate
  setCurrentNepaliDate: (date: NepaliDate) => void
  view: "calendar" | "event"
  setView: (view: "calendar" | "event") => void
  scope: "week" | "day"
  setScope: (scope: "week" | "day") => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentNepaliDate,
  setCurrentNepaliDate,
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="font-medium"
          onClick={() => setCurrentNepaliDate(new NepaliDate())}
        >
          {t("navbar.today")}
        </Button>
      </div>
      <YearMonthPicker
        className="w-full md:w-auto"
        currentNepaliDate={currentNepaliDate}
        setCurrentNepaliDate={setCurrentNepaliDate}
      />
    </div>
  )
}

export default CalendarHeader
