import React from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/topbar";
import StorageTile from "../components/storage/StorageTile";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../api/events1";

const Storage = () => {
  const navigate = useNavigate();

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvent,
  });

  const handleClick = (eventId) => {
    navigate(`/storage/${eventId}`);
  };

  return (
    <div className="h-screen bg-[#121212] text-white p-6">
      <Topbar title="Storage" />

      <div className="flex-wrap flex pt-5 gap-6 overflow-y-scroll scrollbar-custom w-full h-full pb-20">
        {events?.map((event) => (
          <StorageTile
            key={event.eventid}
            event={event}
            onClick={() => handleClick(event.eventid)}
          />
        ))}
      </div>
    </div>
  );
};

export default Storage;
