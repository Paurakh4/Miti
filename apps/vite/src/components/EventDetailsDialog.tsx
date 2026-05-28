import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import {
  MapPinIcon,
  TrashIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import Spinner from "./Spinner"
import useLanguage from "../helper/useLanguage"
import { useQueryClient } from "@tanstack/react-query"
import { CalendarEvent } from "@miti/types"
import { eventDuration } from "../helper/dates"
import { apiBaseUrl } from "../helper/api"
import { useDeleteEvent } from "@miti/query/event"

export default function EventDetailsDialog({
  modalOpen,
  onClose,
  event,
}: {
  modalOpen: boolean
  onClose: () => void
  event: CalendarEvent
}) {
  const { isNepaliLanguage, t } = useLanguage()

  const queryClient = useQueryClient()

  function closeModal() {
    onClose()
  }

  const handleSuccess = () => {
    queryClient.invalidateQueries(["events"])
    closeModal()
  }

  const { mutateAsync, isPending } = useDeleteEvent(apiBaseUrl, handleSuccess)

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg border border-border bg-card text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex items-start justify-between gap-4 border-b border-border px-5 pt-4 pb-3"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-foreground truncate">
                      {event.summary}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ClockIcon className="h-3.5 w-3.5" />
                      <span className="font-mono tabular-nums">
                        {eventDuration(event, isNepaliLanguage)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </Dialog.Title>

                <div className="px-5 py-4 space-y-3">
                  {event.description && (
                    <div className="flex gap-2">
                      <Bars3BottomLeftIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <p className="text-sm text-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <p className="text-sm text-foreground">
                        {event.location}
                      </p>
                    </div>
                  )}

                  {(event.accessRole === "owner" ||
                    event.accessRole === "writer") && (
                    <div className="flex justify-end pt-3 border-t border-border">
                      <button
                        disabled={isPending}
                        onClick={async () => {
                          await mutateAsync(event)
                          onClose()
                        }}
                        className="inline-flex items-center gap-1.5 rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground shadow-[0_1px_0_0_hsl(0_0%_0%/0.12),inset_0_1px_0_0_hsl(0_0%_100%/0.15)] hover:bg-destructive/95 disabled:opacity-60 transition-colors"
                      >
                        {isPending ? (
                          <Spinner className="h-4 w-4 fill-destructive-foreground" />
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                        {t("homepage.Delete")}
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
