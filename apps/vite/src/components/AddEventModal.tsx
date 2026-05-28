import { ReactNode, useEffect, useState } from "react"
import colors from "../constants/colors"
import NepaliDatePicker from "./NepaliDatePicker"
import { useQueryClient } from "@tanstack/react-query"
import { CalendarEvent } from "@miti/types"
import { apiBaseUrl } from "../helper/api"
import DropDown from "./DropDown"
import Spinner from "./Spinner"
import { useCalendarList } from "@miti/query/calendar"
import { useCreateEvent } from "@miti/query/event"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import useMediaQuery from "@/hooks/useMediaQuery"
import { Calendar, MapIcon, Pencil, SwatchBook, Text } from "lucide-react"
import { cn } from "@/lib/utils"

function getCombinedDateTime(date: Date, time: string) {
  const timeParts = time.split(":")
  date.setHours(parseInt(timeParts[0] ?? "", 10))
  date.setMinutes(parseInt(timeParts[1] ?? "", 10))
  return date.toISOString()
}

export type CalendarPayload = Partial<CalendarEvent> & { calendarId: string }

const labelClass =
  "flex items-center gap-2 text-xs font-mono uppercase tracking-tight text-muted-foreground"
const timeInputClass =
  "h-9 w-28 rounded-md border border-input bg-card px-2 py-1 text-sm font-mono tabular-nums text-foreground shadow-[inset_0_1px_0_0_hsl(0_0%_0%/0.02)] transition-colors duration-150 hover:border-foreground/30 focus-visible:outline-none"

function AddEventModal({
  startDate,
  children,
}: {
  startDate: Date
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [isAllDayEvent, setIsAllDayEvent] = useState(false)
  const [eventStartDate, setEventStartDate] = useState(startDate)
  const [eventEndDate, setEventEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
  )
  const [selectedCalendar, setSelectedCalendar] = useState<string | number>("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries(["events"])
    setOpen(false)
  }

  const { mutateAsync, isPending } = useCreateEvent(apiBaseUrl, handleSuccess)

  const { data: calendarList, isLoading: isCalendarListLoading } =
    useCalendarList(apiBaseUrl)

  useEffect(() => {
    if (!calendarList) return
    setSelectedCalendar(calendarList[0]?.value || "")
  }, [calendarList])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const startEndDates = isAllDayEvent
      ? {
          start: {
            date: new Date(eventStartDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
          end: {
            date: new Date(eventEndDate.getTime() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
        }
      : {
          start: {
            dateTime: getCombinedDateTime(
              startDate,
              e.currentTarget.startTime.value
            ),
          },
          end: {
            dateTime: getCombinedDateTime(
              eventEndDate,
              e.currentTarget.endTime.value
            ),
          },
        }

    const eventData = {
      ...startEndDates,
      summary: e.currentTarget.summary.value,
      location: e.currentTarget.location.value,
      description: e.currentTarget.description.value,
      colorId: e.currentTarget.colorId.value || null,
      calendarId: `${selectedCalendar}` || "personal",
    }
    await mutateAsync(eventData)
  }

  const EventForm = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
        <Label htmlFor="all-day" className="text-sm font-medium cursor-pointer">
          All-day event
        </Label>
        <Switch
          id="all-day"
          checked={isAllDayEvent}
          onCheckedChange={() => {
            setIsAllDayEvent(!isAllDayEvent)
            setEventStartDate(new Date(eventStartDate))
            setEventEndDate(new Date(eventEndDate))
          }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className={labelClass}>From</Label>
          <div className="flex flex-wrap items-center gap-2">
            <NepaliDatePicker
              setDate={setEventStartDate}
              date={eventStartDate}
            />
            {!isAllDayEvent && (
              <input
                required
                type="time"
                name="startTime"
                className={timeInputClass}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className={labelClass}>To</Label>
          <div className="flex flex-wrap items-center gap-2">
            <NepaliDatePicker setDate={setEventEndDate} date={eventEndDate} />
            {!isAllDayEvent && (
              <input
                required
                type="time"
                name="endTime"
                className={timeInputClass}
              />
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className={labelClass}>
          <Calendar className="h-3.5 w-3.5" />
          Calendar
        </Label>
        {!isCalendarListLoading ? (
          <DropDown
            items={calendarList}
            selected={selectedCalendar}
            setSelected={setSelectedCalendar}
            className="w-full"
          />
        ) : (
          <Spinner />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className={labelClass}>
          <Pencil className="h-3.5 w-3.5" />
          Title
        </Label>
        <Input id="summary" name="summary" placeholder="Add event title" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className={labelClass}>
          <MapIcon className="h-3.5 w-3.5" />
          Location
        </Label>
        <Input id="location" name="location" placeholder="Add location" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className={labelClass}>
          <Text className="h-3.5 w-3.5" />
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add description"
          className="resize-none min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label className={labelClass}>
          <SwatchBook className="h-3.5 w-3.5" />
          Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(colors).map((color, idx) => (
            <div key={idx} className="relative">
              <input
                type="radio"
                id={`color-${color}`}
                name="colorId"
                value={color}
                className="peer sr-only"
              />
              <label
                htmlFor={`color-${color}`}
                style={{ backgroundColor: colors[color] }}
                className={cn(
                  "block h-7 w-7 rounded-md border border-border cursor-pointer transition-all",
                  "peer-checked:ring-2 peer-checked:ring-foreground peer-checked:ring-offset-2 peer-checked:ring-offset-background",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-foreground peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                  "hover:scale-105"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create event"}
        </Button>
      </div>
    </form>
  )

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="h-[90vh] rounded-t-xl border-0">
          <DrawerHeader className="text-left">
            <DrawerTitle>Create event</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto max-h-[calc(90vh-60px)]">
            <EventForm />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 max-h-[90vh]">
        <DialogHeader className="px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <DialogTitle className="text-base font-semibold tracking-tight">
            Create event
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-60px)]">
          <EventForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddEventModal
