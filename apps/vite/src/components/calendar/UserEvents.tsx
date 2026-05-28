import {
  Plus,
  User,
  Clock,
  MapPin,
  Users,
  Eye,
  Repeat,
  CalendarDays,
  FileText,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"
import AddEventModal from "../AddEventModal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUserEvents, deleteEvent } from "@/helper/api"
import { CalendarEvent } from "@miti/types"
import { add, startOfDay } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getEventColorInTwClasses } from "@/constants/colors"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

const UserEvents = ({ selectedDate }: { selectedDate: string }) => {
  const baseDate = new Date(selectedDate)
  const { t } = useTranslation()

  const timeMin = startOfDay(baseDate).toISOString()
  const timeMax = add(baseDate, { days: 1 }).toISOString()

  const { data: dayUserEvents } = useQuery<{ events: CalendarEvent[] }>({
    queryKey: ["userEvents", selectedDate],
    queryFn: () => fetchUserEvents(timeMin, timeMax),
    enabled: !!selectedDate,
  })

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            <User size={16} />
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground font-mono">
            {t("modal.User_Events")}
          </h3>
        </div>
        <AddEventModal startDate={baseDate}>
          <Button size="sm" variant="default" className="h-8">
            <Plus className="h-3.5 w-3.5" />
            New
          </Button>
        </AddEventModal>
      </div>

      <div className="space-y-2">
        {dayUserEvents?.events && dayUserEvents.events.length > 0 ? (
          dayUserEvents.events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground rounded-md border border-dashed border-border bg-card px-4 py-3">
            No events scheduled
          </p>
        )}
      </div>
    </div>
  )
}

const EventListItem = ({ event }: { event: CalendarEvent }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userEvents"] })
    },
  })

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteConfirmation(true)
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate()
    setShowDeleteConfirmation(false)
  }

  const formatTime = (dateTimeString?: string, dateString?: string) => {
    if (dateTimeString) {
      const date = new Date(dateTimeString)
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (dateString) {
      return "All day"
    }
    return ""
  }

  const startTime = formatTime(event.start.dateTime, event.start.date)
  const endTime = formatTime(event.end.dateTime, event.end.date)

  const colorStyle = getEventColorInTwClasses(event.colorId)

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={event.id}
          className={cn(
            "rounded-md overflow-hidden border border-border bg-card",
            colorStyle.border
          )}
        >
          <AccordionTrigger
            className={cn(
              "px-3 py-2.5 hover:bg-accent/40 transition-colors !no-underline",
              colorStyle.bg
            )}
          >
            <div className="flex-1 min-w-0 text-left">
              <h4
                className={cn(
                  "text-sm font-medium tracking-tight truncate",
                  colorStyle.text
                )}
              >
                {event.summary}
              </h4>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={11} className="flex-shrink-0" />
                <span className="font-mono tabular-nums">
                  {startTime}
                  {startTime !== "All day" ? ` – ${endTime}` : ""}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 py-3 bg-card border-t border-border space-y-3">
            {event.description && (
              <DetailRow
                icon={<FileText size={13} />}
                label="Description"
              >
                <div
                  className="text-sm text-foreground break-words [&>a]:text-foreground [&>a]:underline [&>a]:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </DetailRow>
            )}

            {event.calendarId && (
              <DetailRow
                icon={<CalendarDays size={13} />}
                label="Calendar"
              >
                <p className="text-sm text-foreground break-words">
                  {event.calendarId}
                </p>
              </DetailRow>
            )}

            {event.location && (
              <DetailRow icon={<MapPin size={13} />} label="Location">
                <p className="text-sm text-foreground break-words">
                  {event.location}
                </p>
              </DetailRow>
            )}

            <DetailRow icon={<Users size={13} />} label="Organizer">
              <p className="text-sm text-foreground break-words">
                {event.organizer.displayName || event.organizer.email}
              </p>
            </DetailRow>

            {event.visibility && (
              <DetailRow icon={<Eye size={13} />} label="Visibility">
                <p className="text-sm text-foreground capitalize">
                  {event.visibility}
                </p>
              </DetailRow>
            )}

            {event.recurrence && (
              <DetailRow icon={<Repeat size={13} />} label="Recurrence">
                <p className="text-sm text-foreground">Recurring event</p>
              </DetailRow>
            )}

            {(event.accessRole === "owner" ||
              event.accessRole === "writer") && (
              <div className="pt-2 border-t border-border">
                <Button
                  onClick={handleDeleteClick}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 size={14} />
                  Delete event
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-semibold">
              <AlertCircle className="text-destructive" size={18} />
              Delete event
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {event.summary}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const DetailRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) => (
  <div className="flex items-start gap-2">
    <span className="mt-0.5 text-muted-foreground flex-shrink-0">{icon}</span>
    <div className="min-w-0 flex-1">
      <span className="block text-[10px] font-mono uppercase tracking-tight text-muted-foreground mb-0.5">
        {label}
      </span>
      {children}
    </div>
  </div>
)

export default UserEvents
