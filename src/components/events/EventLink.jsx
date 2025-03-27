import React from "react";

const ActionButtons = ({ onCopyLink, images, size }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onCopyLink}
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
      >
        Copy Link
      </button>
      <div className="text-gray-500 text-sm text-right">
        <p>{images} Images uploaded</p>
        <p>{size} GB used</p>
      </div>
    </div>
  );
};

export default ActionButtons;
