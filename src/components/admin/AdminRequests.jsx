import React, { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import AdminRequestsListItem from '../dashboard/AdminRequestsListItem';
import { allAdmins } from '../../api/user';

function AdminRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log('Current token:', token);
        
        if (!token) {
            console.error('No access token found!');
            // Handle redirect to login here if needed
            return;
        }
        fetchAdminRequests();
    }, []);

    const fetchAdminRequests = async (isLoadMore = false) => {
        setLoading(true);
        setError(null);
        
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }
    
            const response = await allAdmins({ status: 'pending', email: '' });
    
            console.log("API Response:", response); // Debugging log
    
            // Ensure response is an object and extract admins array
            const adminRequests = Array.isArray(response) ? response 
                               : Array.isArray(response.admins) ? response.admins 
                               : null;
    
            if (!adminRequests) {
                throw new Error("Invalid response format");
            }
    
            setRequests(prev => isLoadMore ? [...prev, ...adminRequests] : adminRequests);
            setPage(prev => prev + 1);
    
        } catch (error) {
            console.error("Error fetching admin requests:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
 
    if (loading && requests.length === 0) {
        return (
            <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-5">Admin Requests</h3>
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-5">Admin Requests</h3>
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
            <h3 className="text-xl font-medium mb-5">Admin Requests</h3>
            
            {requests.length > 0 ? (
                <>
                    {requests.map((request) => (
                        <AdminRequestsListItem key={request.id} request={request} />
                    ))}
                    
                    <div className="flex justify-center">
                        <button 
                            onClick={() => fetchAdminRequests(true)}
                            disabled={loading}
                            className={`text-gray-400 text-sm mt-2 items-center px-10 py-2 flex cursor-pointer ${
                                loading ? 'opacity-50' : ''
                            }`}
                        >
                            {loading ? 'Loading...' : 'View More'}
                            <MdKeyboardDoubleArrowDown size={20} color="#ffffff" className="ml-1" />
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-400">No admin requests found</p>
            )}
        </div>
    );
}

export default AdminRequests;
