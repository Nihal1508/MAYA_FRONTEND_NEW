import { useQuery } from "@tanstack/react-query";
import EventListItem from "./EventListItem";
import { getEvent } from "../../api/events1";

function EventsAnalysisCard() {
  const {
    data: nowEvents,
    isLoading: loadingNow,
    error: errorNow,
  } = useQuery({
     queryKey: ["events", "ongoing"],
     queryFn: () => getEvent("ongoing"),
  });

  const {
    data: upcomingEvents,
    isLoading: loadingUpcoming,
    error: errorUpcoming,
  } = useQuery({
     queryKey: ["events", "upcoming"],
     queryFn: () => getEvent("upcoming"),
  });

  if (loadingNow || loadingUpcoming) return <div>Loading...</div>;
  if (errorNow || errorUpcoming) return <div>Error loading events.</div>;

  return (
    <div className="bg-[#0B0B0B] w-[100%]  rounded-2xl  ">
      <div className="p-12 h-full flex flex-col items-start gap-5">
        <h2 className="text-lg font-semibold">Events</h2>
        <div className="h-full overflow-y-scroll scrollbar-custom">
          <div className="h-fit">
            <h5 className="text-sm font-extralight text-left mb-2">
              Now happening
            </h5>
            <div className="gap-3 flex flex-col mb-8">
              {nowEvents?.events &&
                nowEvents.events.map((event) => (
                  <EventListItem key={event.eventid} event={event} type="now" />
                ))}
            </div>
            <h5 className="text-sm font-extralight text-left mb-2">
              Upcoming events
            </h5>
            <div className="gap-3 flex flex-col">
              {upcomingEvents?.events &&
                upcomingEvents.events.map((event) => (
                  <EventListItem key={event.eventid} event={event} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsAnalysisCard;
