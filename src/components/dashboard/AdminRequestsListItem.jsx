import React from 'react'

function AdminRequestsListItem({ request, type }) {
    return (
        <div className={`flex justify-between items-center py-1 pl-4 border-l-2 border-white mb-3`}>
            <div>
                <p className="text-base text-left">{request.name}</p>
                <p className="text-gray-400 text-sm text-left">{request.email}</p>
            </div>
            <div className="flex space-x-2">
                <button className="px-8 py-[6px] h-fit  border border-[#ffffffaf] text-xs font-bold rounded hover:bg-[#ffffff0f]">Deny</button>
                <button className="px-8 py-[6px] h-fit text-black text-xs font-bold bg-white rounded hover:bg-[#ffffffdf]">Accept</button>
            </div>
        </div>
    )
}

export default AdminRequestsListItem
