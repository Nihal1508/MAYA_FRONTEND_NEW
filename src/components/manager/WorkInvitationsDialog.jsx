import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { IoIosClose } from "react-icons/io";
import WorkInvitaionListItem from "./WorkInvitationListItem";
import { getEventInvitations } from "../../api/manager/events";
import { toast } from "react-toastify";
const WorkInvitationDialog = forwardRef(({ onClose }, ref) => {
    const [eventInvitations, setEventInvitations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
            getEventInvitations({
                onSuccess: (data) => {
                    setEventInvitations(data);
                    setIsLoading(false);
                }
                , onError: (error) => {
                    console.error(error);
                    toast.error(error.message || "Failed to fetch event invitations. Please try again.");
                    setIsLoading(false);
                }
            })
        }
    }, []);

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
        <div className={`absolute bg-[#0B0B0B] top-16 right-0 max-h-[80vh] h-fit overflow-y-scroll scrollbar-custom p-6 rounded-2xl shadow-2xl shadow-[#3532382f]   transition-all duration-300 ease-in-out ${animationClasses}`} >
            <div
                className={` text-white w-[500px] `}
            >
                <h2 className="text-lg text-left font-semibold mb-4">Job Invitations</h2>

                {eventInvitations.map((invitation, index) => (
                    <WorkInvitaionListItem key={index} event={invitation} handleClose={handleClose} />
                ))}
                {
                    eventInvitations.length === 0 && (
                        <div className="flex items-center justify-center h-full w-full">
                            <h1 className='text-lg tracking-widest font-thin text-center mt-3'>No invitations Now!</h1>
                        </div>
                    )
                }
                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-4 right-4 primary text-gray-400 hover:text-white">
                    <IoIosClose size={28} />
                </button>
            </div>
        </div>
    );
});

export default WorkInvitationDialog;