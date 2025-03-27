import React, { useState } from "react";
import Topbar from "../components/topbar";
import EventName from "../components/storage/StoredEvents";
import EventImages from "../components/storage/StoredImage";

const Storage = () => {
  const [eventDetails] = useState({
    name: "Anand & Radhika",
    type: "Reception",
    date: "1 October 2024",
    totalSize: "2.3 GB",
    totalImages: 73434,
  });

  return (
    <div className="h-screen bg-[#121212] text-white w-full p-6">
      <Topbar title="Storage" date="20th Oct 2024" />
      <div className="h-full overflow-y-scroll p-8 pb-20 scrollbar-custom">
        {/* Event Details */}
        <EventName eventDetails={eventDetails} />

        {/* Image Upload & Grid */}
        <EventImages />
      </div>
    </div>
  );
};

export default Storage;
