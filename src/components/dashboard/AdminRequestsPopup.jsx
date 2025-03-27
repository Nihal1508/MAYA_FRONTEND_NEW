import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import AdminRequestsListItem from "./AdminRequestsListItem";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
const AdminRequestsPopup = forwardRef(({ onClose }, ref) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const adminRequests = [
    { name: "Nived G", email: "nivedganga@gmail.com" },
    { name: "Navaneeth", email: "navaneeth@gmail.com" },
  ];

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useImperativeHandle(ref, () => ({
    handleClose
  }));

  useEffect(() => {
    setIsClosing(false);
    setIsOpening(true);

    setTimeout(() => {
      setIsOpening(false);
    }, 50);

    return () => {
    };
  }, []);

  const animationClasses = isClosing
    ? 'opacity-0 transform translate-y-4 scale-95'
    : isOpening
      ? 'opacity-0 transform translate-y-4 scale-95'
      : 'opacity-100 transform translate-y-0 scale-100';

  return (
    <div className="absolute top-16 right-0 h-fit">
      <div
        className={`bg-[#0B0B0B] text-white p-6 rounded-2xl w-[500px] shadow-2xl shadow-[#3532382f] 
                    transition-all duration-300 ease-in-out
                    ${animationClasses}`}
      >
        <h2 className="text-lg text-left font-semibold mb-4">Admin Requests</h2>

        {adminRequests.map((request, index) => (
          <AdminRequestsListItem key={index} request={request} />
        ))}

        {/* View All Button */}
        <div className="rounded-3xl overflow-clip">
          <button className="w-full flex items-center justify-center gap-1 py-1 bg-[#121212] rounded hover:bg-[#272727]">View all <MdKeyboardDoubleArrowDown size={20} color="#ffffff" />
          </button>
        </div>

        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-4 right-4 primary text-gray-400 hover:text-white">
          <IoIosClose size={28} />
        </button>
      </div>
    </div>
  );
});

export default AdminRequestsPopup;