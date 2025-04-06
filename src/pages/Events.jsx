import React, { useEffect, useState } from "react";
import Topbar from "../components/topbar";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getEvent } from "../api/events1";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getEvent()
      .then((data) => {
        console.log('Events data:', data.events);
        setEvents(data.events);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading events:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const EventTile = ({ event, onClick }) => {
    return (
      <div
        className="relative group cursor-pointer bg-gray-700 bg-cover bg-center rounded-2xl w-56 h-56 transition-all duration-300 ease-in-out hover:w-96"
        style={{
          backgroundImage: event.coverImage ? `url(${event.coverImage})` : "none",
          borderRadius: "1rem",
        }}
        onClick={() => onClick(event)}
      >
        <div
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
            borderRadius: "1rem",
          }}
          className="relative flex gap-1 items-center justify-between rounded-2xl w-full h-full backdrop-blur-sm p-5"
        >
          <div className="flex flex-col gap-1 items-start justify-center w-fit h-fit">
            <p className="text-2xl text-left font-bold">{event.eventname}</p>
            <p className="text-base text-left font-semibold line-clamp-2">{event.description}</p>
            <p className="text-sm">
              {new Date(event.startDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="absolute self-center top-0 bottom-0 my-auto right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col items-end">
            {event.additionalImages && event.additionalImages.length > 0 && (
              <p className="text-sm font-light text-right leading-3">
                {/* <span className="text-xl font-bold">{event.additionalImages.length} </span> */}
                <br /> Image
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const EventCoverImage = ({ cover }) => {
    if (!cover) return null;
    return (
      <div className="mb-4">
        <img 
          src={cover} 
          alt="Event Cover" 
          className="rounded-lg w-full h-48 object-cover" 
        />
      </div>
    );
  };

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
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.eventid} className="flex flex-col">
              {/* <EventCoverImage cover={event.coverImage} /> */}
              <EventTile
                event={event}
                onClick={() => navigate(`/manageevent/${event.eventid}`)}
              />
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <button
        className="p-4 bg-purplePrimary rounded-2xl absolute bottom-10 right-10"
        onClick={() => navigate('/addevent')}
      >
        <IoAddOutline size={25} />
      </button>
    </div>
  );
};

export default Events;