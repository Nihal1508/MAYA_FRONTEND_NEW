import React, { useEffect, useState } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { acceptRequest } from '../../api/user';

function ActiveAdmins() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.error("No access token found. Redirecting to login...");
                    return;
                }
                const response = await acceptRequest();
                setAdmins(response.admins || []);
            } catch (error) {
                console.error("Error fetching admins:", error.message);
            }
        };
        fetchAdmins();
    }, []);
    

    return (
        <div className="bg-[#0B0B0B] p-10 my-6 rounded-2xl text-left">
            <h3 className="text-xl font-medium mb-4">Admins</h3>
            {admins.map((admin) => (
                <div key={admin.id} className="flex justify-between items-center mt-4 border-gray-700 pb-3">
                    <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-gray-400 text-sm">{admin.email}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <IoIosRemoveCircleOutline size={28} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ActiveAdmins;
