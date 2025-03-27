import React from "react";

const EventCoverImage = ({ cover }) => {
  return (
    <div className="mb-4">
      <p className="text-gray-400 mb-1">Cover Image</p>
      <img src={cover} alt="Event Cover" className="rounded-lg w-half object-cover" />
    </div>
  );
};

export default EventCoverImage;
