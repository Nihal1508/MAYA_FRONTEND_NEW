import React from 'react'
import LineChart from './Linechart'

function PlatformUsageAnalysisCard() {
    return (
        <div className="bg-[#0B0B0B] w-9/12 rounded-2xl flex flex-col p-10 h-full">
            <h3 className="text-lg text-left font-semibold mb-4">Platform Usage</h3>
            <p className='text-left font-extralight text-xs mb-4 leading-6'>Users <br /><strong className='text-lg font-semibold'>310</strong> <span className="text-purplePrimary">+15%</span></p>
            <div className="w-full h-full">
                <LineChart />
            </div>
        </div> 
    )
}

export default PlatformUsageAnalysisCard
