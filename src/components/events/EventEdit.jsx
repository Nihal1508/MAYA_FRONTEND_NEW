import React from "react";
import Pencil from "../../assets/images/pencil.png";

const FloatingEditButton = ({ onEdit }) => {
  return (
    <button
      onClick={onEdit}
      className="fixed bottom-10 right-10  p-4 "
    >
      <img src={Pencil} alt="Edit Event" className="w-78px h-78px" />
    </button>
  );
};

export default FloatingEditButton;
