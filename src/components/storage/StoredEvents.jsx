import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../api/events";

const EventName = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent({ id }),
  });

  if (isLoading) return <div>...</div>;
  // if (error) return <div>Error fetching event details</div>;

  const { event } = data;

  return (
    <div className="bg-black rounded-xl p-6 flex justify-between items-center mb-6 shadow-lg">
      <div className="flex flex-col gap-1 items-start justify-center w-fit h-fit">
        <p className="text-2xl text-left font-bold">{event.eventname}</p>
        <p className="text-base font-semibold">{event.description}</p>
        <p className="text-sm">
          {new Date(event.startDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default EventName;
