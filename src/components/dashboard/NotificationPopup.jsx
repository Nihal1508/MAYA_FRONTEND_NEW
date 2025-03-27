import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import NotificationPopUpListItem from "./NotificationPopUpListItem";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";


const NotificationPopup = forwardRef(({ onClose }, ref) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(true);

    const notifications = [
        {
            title: "New Event Added",
            description: "A new event has been added to the calendar",
            time: "2 mins ago",
        },
        {
            title: "System Update",
            description: "System will be down for maintenance on Sunday",
            time: "1 hour ago"
        },
        {
            title: "New User Registration",
            description: "User John Doe has requested access",
            time: "Yesterday"
        }
    ];

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to complete before actually closing
        setTimeout(() => {
            onClose();
        }, 300); // Match this with your transition duration
    };

    // Expose the handleClose method to parent components through ref
    useImperativeHandle(ref, () => ({
        handleClose
    }));

    // Set opening animation when component mounts
    useEffect(() => {
        setIsClosing(false);
        setIsOpening(true);

        // Start with the "entering" state and then transition to fully visible
        setTimeout(() => {
            setIsOpening(false);
        }, 50); // Small delay to ensure the entering state is applied first

        return () => {
            // Cleanup if needed
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
                className={`bg-[#0B0B0B] w-[500px] text-white p-6 rounded-2xl shadow-2xl shadow-[#3532382f] 
                    transition-all duration-300 ease-in-out
                    ${animationClasses}`}
            >
                <h2 className="text-lg text-left font-semibold mb-4">Notifications</h2>

                <div className="max-h-[215px] overflow-y-hidden">
                    {notifications.map((notification, index) => (
                        <NotificationPopUpListItem key={index} notification={notification} />
                    ))}
                    {notifications.map((notification, index) => (
                        <NotificationPopUpListItem key={index} type="read" notification={notification} />
                    ))}
                </div>

                {/* Mark All as Read Button */}
                <div className="rounded-3xl overflow-clip">
                    <button className="w-full flex items-center justify-center gap-1 py-1 bg-[#121212] rounded hover:bg-[#272727]">View all <MdKeyboardDoubleArrowDown size={20} color="#ffffff" />
                    </button>
                </div>

                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-4 right-4 primary text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>
        </div>
    );
});

export default NotificationPopup;