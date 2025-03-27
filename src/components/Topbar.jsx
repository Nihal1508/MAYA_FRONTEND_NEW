import React, { useState, useRef } from "react";
import AdminRequestsPopup from "./dashboard/AdminRequestsPopup";
import NotificationPopup from "./dashboard/NotificationPopup";
import { FiUserPlus, FiSearch, FiBell } from "react-icons/fi";
import adminsIcon from '../assets/images/adminsno.png';
import bellIcon from '../assets/images/bell.png';
import profileIcon from '../assets/images/profile.png';
const Topbar = ({ title }) => {
  const [showAdminRequestsPopup, setShowAdminRequestsPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const adminRequestsPopupRef = useRef(null);
  const notificationPopupRef = useRef(null);

  const handleAdminsClick = () => {
    // Close notification popup if it's open
    if (showNotificationPopup) {
      if (notificationPopupRef.current && notificationPopupRef.current.handleClose) {
        notificationPopupRef.current.handleClose();
      }
    }

    // Toggle admin requests popup
    if (showAdminRequestsPopup) {
      if (adminRequestsPopupRef.current && adminRequestsPopupRef.current.handleClose) {
        adminRequestsPopupRef.current.handleClose();
      }
    } else {
      setShowAdminRequestsPopup(true);
    }
  };

  const handleNotificationsClick = () => {
    // Close admin requests popup if it's open
    if (showAdminRequestsPopup) {
      if (adminRequestsPopupRef.current && adminRequestsPopupRef.current.handleClose) {
        adminRequestsPopupRef.current.handleClose();
      }
    }

    // Toggle notification popup
    if (showNotificationPopup) {
      if (notificationPopupRef.current && notificationPopupRef.current.handleClose) {
        notificationPopupRef.current.handleClose();
      }
    } else {
      setShowNotificationPopup(true);
    }
  };

  const handleAdminRequestsClosePopup = () => {
    setShowAdminRequestsPopup(false);
  };

  const handleNotificationClosePopup = () => {
    setShowNotificationPopup(false);
  };

  return (
    <div className="flex sticky justify-between items-center z-30 mb-5">
      <div className="text-left">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-white text-sm text-left">30th Jan 2025</p>
      </div>
      <div className="flex items-center gap-8">
        {/* Search Button */}
        <button className="focus:outline-none">
          <FiSearch size={25} />
        </button>

        {/* Admins Button (Toggles Admin Popup) */}
        <button onClick={handleAdminsClick} className="focus:outline-none">
          <FiUserPlus size={25} />
        </button>

        {/* Notifications Button (Toggles Notification Popup) */}
        <button onClick={handleNotificationsClick} className="focus:outline-none relative">
          <FiBell size={25} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white font-semibold text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Button */}
        <button className="focus:outline-none">
          <img src={profileIcon} alt="Profile" className="w-10 h-10 rounded-halfs hover:opacity-75" />
        </button>
      </div>

      {showAdminRequestsPopup &&
        <AdminRequestsPopup
          ref={adminRequestsPopupRef}
          onClose={handleAdminRequestsClosePopup}
        />
      }

      {showNotificationPopup &&
        <NotificationPopup
          ref={notificationPopupRef}
          onClose={handleNotificationClosePopup}
        />
      }
    </div>
  );
};

export default Topbar;