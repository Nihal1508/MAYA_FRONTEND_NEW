import React from 'react';
import Topbar from "../components/topbar";
import Donut2 from "../assets/images/2donut.png";
import StorageAnalyticsCard from '../components/dashboard/StorageAnalyticsCard';
import EventsAnalysisCard from '../components/dashboard/EventsAnalysisCard';
import PlatformUsageAnalysisCard from '../components/dashboard/PlatformUsageAnalysisCard';

export default function Dashboard() {
    return (
        <div className="bg-[#121212] relative h-screen w-full text-white p-6 flex flex-col ">
            <Topbar title="DashBoard" />

            <div className="flex gap-10 h-56 my-5">
                <div className="flex h-56 relative bg-[#0B0B0B] rounded-2xl w-full items-center pl-10 justify-between">
                    <h3 className="text-lg text-left font-semibold mb-4">Turn Moments into Memories <br /> with Maya</h3>
                    <img src={Donut2} alt="2donut" className="w-48 mix-blend-lighten absolute right-0 bottom-0" />
                </div>
                <StorageAnalyticsCard />
            </div>

            <div className="h-full flex gap-10 overflow-y-hidden mt-5">
                <EventsAnalysisCard />
                <PlatformUsageAnalysisCard />
            </div>

        </div>
    );
}


