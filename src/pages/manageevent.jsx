import React from "react";
import Topbar from "../components/topbar";
import EventDetails from "../components/events/EventDetails";
import EventCoverImage from "../components/events/EventImage";
import ActionButtons from "../components/events/EventLink";
import FloatingEditButton from "../components/events/EventEdit";
import Cover from "../assets/images/cover.png";

const ManageEvents = () => {
  const handleCopyLink = () => {
    alert("Link copied to clipboard!");
  };

  const handleEditEvent = () => {
    alert("Redirecting to edit event page...");
  };

  return (
    <div className="max-h-screen bg-black text-white flex">
      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Topbar */}
        <Topbar title="Manage Events" />

        {/* Event Card */}
        <div className="bg-[#ffffff11] p-6 rounded-lg shadow-lg">
          <EventDetails
            name="Anand & Radhika"
            type="Reception"
            date="1 October 2024"
            admins="Nived G, Noel Paul George, Shaniya N, Nihal Muhammer Riyaz"
          />
          <EventCoverImage cover={Cover} />
          <ActionButtons onCopyLink={handleCopyLink} images={0} size={0} />
        </div>
      </div>

      {/* Floating Edit Button */}
      <FloatingEditButton onEdit={handleEditEvent} />
    </div>
  );
};

export default ManageEvents;
