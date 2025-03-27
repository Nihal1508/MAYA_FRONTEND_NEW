import React from 'react'
import { acceptEventInvitation, rejectEventInvitation } from '../../api/manager/work';
import { toast } from 'react-toastify';

function WorkInvitaionListItem({ event, handleClose }) {
    const handleAccept = () => {
        acceptEventInvitation({
            eventId: event.eventid
        }, {
            onSuccess: (data) => {
                console.log(data);
                toast.success("Event invitation accepted successfully! \n Reload your page");
                handleClose();
            },
            onError: (error) => {
                console.error(error);
                alert(error.message || "Failed to accept event invitation. Please try again.");
            }
        });
        console.log("Accepted:", event.eventname);
        handleClose();
    };
    const handleDeny = () => {
        rejectEventInvitation({ eventId: event.eventId }, {
            onSuccess: (data) => {
                console.log(data);
                handleClose();
            },
            onError: (error) => {
                console.error(error);
                alert(error.message || "Failed to accept event invitation. Please try again.");
            }
        });
        console.log("Denied:", event.eventname);
        handleClose();
    };
    return (
        <div className={`flex justify-between items-center py-1 pl-4 border-l-2 border-white mb-3`}>
            <div className='flex flex-col items-start'>
                <p className="text-base text-left">{event.eventname}</p>
                <p className="text-gray-400 text-sm text-left">{event.description}</p>
            </div>
            <div className="flex space-x-2">
                <button onClick={handleDeny} className="px-8 py-[6px] h-fit  border border-[#ffffffaf] text-xs font-bold rounded hover:bg-[#ffffff0f]">Deny</button>
                <button onClick={handleAccept} className="px-8 py-[6px] h-fit text-black text-xs font-bold bg-white rounded hover:bg-[#ffffffdf]">Accept</button>
            </div>
        </div>
    )
}

export default WorkInvitaionListItem
