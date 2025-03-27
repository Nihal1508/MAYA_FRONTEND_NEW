import React from 'react'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
const admins = [
    { id: 1, name: "Shaniya N", email: "shaniyanaeem2003@gmail.com" },
    { id: 2, name: "Nihal Muhammed Riyaz", email: "nihalmuhammedriyaz@gmail.com" },
];
function ActiveAdmins() {
    return (
        <div className="bg-[#0B0B0B] p-10 my-6 rounded-2xl text-left">
            <h3 className="text-xl font-medium mb-4">Admins</h3>
            {admins.map((admin) => (
                <div key={admin.id} className="flex justify-between items-center mt-4  border-gray-700 pb-3">
                    <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-gray-400 text-sm">{admin.email}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white"><IoIosRemoveCircleOutline size={28} /></button>
                </div>
            ))}
        </div>
    )
}

export default ActiveAdmins
