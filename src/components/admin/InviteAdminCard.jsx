import React from 'react'

function InviteAdminCard() {
    return (
        <div className="bg-[#0B0B0B] p-10 mt-6 rounded-2xl text-left">
            <h3 className="text-xl font-medium">Invite admin</h3>
            <input
                type="email"
                placeholder="Email id"
                className="mt-4 w-3/4 block bg-transparent py-2 pl-4 rounded-lg border  border-white text-white"
            />
            <button className="mt-4 px-10 bg-[#9689F1] text-white w-fit py-2 rounded-lg">Invite</button>
        </div>
    )
}

export default InviteAdminCard
