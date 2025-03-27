import Topbar from "../components/topbar";
import EventTile from "../components/events/EventTile";
import { IoAddOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getEvent } from "../api/events1";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState([]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Error loading events.
      </div>
    );
  }

  return (
    <div className="h-screen relative bg-[#121212] text-white p-6">
      <Topbar title="Events" />
      <div className="flex-wrap flex pt-5 gap-6 overflow-y-scroll scrollbar-custom w-full h-full pb-20">
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventTile
              key={event.id}
              event={event}
              onClick={(selectedEvent) => {
                navigate(`/event/${selectedEvent.eventid}`);
              }}
            />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <button
        className="p-4 bg-purplePrimary rounded-2xl absolute bottom-10 right-10"
        onClick={() => {
          navigate("new");
        }}
      >
        <IoAddOutline size={25} />
      </button>
    </div>
  );
};

export default Events;
