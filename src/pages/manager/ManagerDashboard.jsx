import React, { useState } from 'react'
import Topbar from '../../components/topbar';
import EventTile from '../../components/events/EventTile';
import { useNavigate } from 'react-router-dom';
import { getAssignedEvents } from '../../api/manager/events';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ManagerTopBar from '../../components/manager/ManagerTopbar';

function ManagerDashboard() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        getAssignedEvents({
            onSuccess: (data) => {
                setEvents(data);
                setIsLoading(false);
            },
            onError: (error) => {
                console.error(error);
                setIsLoading(false);
            }
        });
        setIsLoading(false)
    }, []);
    return (
        <div className="h-screen relative bg-[#121212] text-white p-6">
            <ManagerTopBar title="Dashboard" />
            <div className="flex-wrap flex pt-5 gap-6  overflow-y-scroll scrollbar-custom w-full h-full pb-20">
                {
                    isLoading ? (
                        <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
                            <Loader2 className="animate-spin" size={24} />
                        </div>
                    ) : events && events.length > 0 ? (
                        events.map((event) => (
                            <EventTile
                                key={event.id}
                                event={event}
                                onClick={(selectedEvent) => {
                                    navigate(`/event/${selectedEvent.eventid}`);
                                }}
                            />
                        ))
                    ) : (

                        < div >
                            <h1 className='text-xl font-bold text-center mt-10'>Hold tight! Your admin will assign you an event shortly—stay tuned!</h1>
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default ManagerDashboard
