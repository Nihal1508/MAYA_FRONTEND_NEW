import React, { useEffect, useState } from "react";
import Topbar from "../components/topbar";
import { useNavigate } from "react-router-dom";
import { getEvent } from "../../src/api/events1";

const Storage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getEvent()
      .then((data) => {
        console.log("Fetched events:", data.events);
        setEvents(data.events);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const StorageTile = ({ event, onClick }) => {
    // Parse additionalImages if it's a string
    const additionalImages = typeof event.additionalImages === 'string' 
      ? JSON.parse(event.additionalImages) 
      : event.additionalImages || [];

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
            <p className="text-base text-left font-semibold line-clamp-2">
              {event.description || "No description"}
            </p>
            <div className="flex flex-col text-sm">
              <span>Start: {new Date(event.startDate).toLocaleDateString()}</span>
              <span>End: {new Date(event.endDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="absolute self-center top-0 bottom-0 my-auto right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col items-end">
            <p className="text-sm font-light text-right leading-3">
              <span className="text-xl font-bold">{additionalImages.length} </span>
              <br /> Media Files
            </p>
          </div>
        </div>
      </div>
    );
  };

  const StorageCoverImage = ({ cover }) => {
    if (!cover) return null;
    return (
      <div className="mb-4 w-full">
        {/* <img 
          src={cover} 
          alt="Storage Cover" 
          className="rounded-lg w-full h-48 object-cover shadow-lg" 
        /> */}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading storage data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Error loading storage data.
      </div>
    );
  }

  return (
    <div className="h-screen relative bg-[#121212] text-white p-6">
      <Topbar title="Storage" />
      <div className="flex-wrap flex pt-5 gap-6 overflow-y-scroll scrollbar-custom w-full h-full pb-20">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.eventid} className="flex flex-col">
              <StorageCoverImage cover={event.coverImage} />
              <StorageTile
                event={event}
                onClick={() => navigate(`/storage/${event.eventid}`)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">No storage events found.</p>
        )}
      </div>
    </div>
  );
};

export default Storage;