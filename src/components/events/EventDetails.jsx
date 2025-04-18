import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../api/events1";
import Topbar from "../topbar";

function EventDetails({name,type,date}) {
  const { eventId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eventId", eventId],
    queryFn: () => getEvent({ eventId }),
  });

  if (isLoading) return <p>...</p>;
  if (isError) return <p>Error loading event details.</p>;

  const { event } = data;

  return (
    <div className="h-screen bg-[#121212] text-white p-6">
      <Topbar title="Manage Event" />

      {data&&(<div className="bg-black rounded-xl p-6 flex justify-between items-center mb-6 shadow-lg">
        <div className="flex-wrap flex pt-5 gap-6  scrollbar-custom w-full h-full pb-20">
          <div className="flex flex-col gap-1 items-start justify-center w-fit h-fit">
            <p className="text-2xl text-left font-bold">{name}</p>
            <p className="text-base font-semibold">{type}</p>
            <p className="text-sm">
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default EventDetails;
