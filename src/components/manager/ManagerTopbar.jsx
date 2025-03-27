import React, { useState, useRef } from "react";
import AdminRequestsPopup from "../dashboard/AdminRequestsPopup";

import { MdOutlineWork } from "react-icons/md";
import WorkInvitationDialog from "./WorkInvitationsDialog";
const ManagerTopBar = ({ title }) => {
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
                {/* Admins Button (Toggles Admin Popup) */}
                <button onClick={handleAdminsClick} className="focus:outline-none flex items-center gap-2 border border-white py-2 px-6 rounded-full">
                    <MdOutlineWork size={25} />
                    <span className="text-sm font-semibold">Jobs</span>
                </button>
            </div>

            {showAdminRequestsPopup &&
                <WorkInvitationDialog
                    ref={adminRequestsPopupRef}
                    onClose={handleAdminRequestsClosePopup}
                />
            }
        </div>
    );
};

export default ManagerTopBar;