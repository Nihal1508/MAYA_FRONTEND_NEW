import React, { useState, useEffect } from 'react'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import AdminRequestsListItem from '../dashboard/AdminRequestsListItem'
import { allAdmins } from '../../api/user'

function AdminRequests() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch initial admin requests
    useEffect(() => {
        const fetchInitialRequests = async () => {
            try {
                const response = await allAdmins({
                    status: 'pending', // or your desired initial status
                    email: '' // can specify email or leave empty
                })
                setRequests(response.data || [])
            } catch (err) {
                console.error("Error loading admin requests:", err)
                setError("Failed to load admin requests")
            } finally {
                setLoading(false)
            }
        }

        fetchInitialRequests()
    }, [])

    const handleViewMore = async () => {
        setLoading(true)
        try {
            const response = await allAdmins({
                status: 'pending', // same as initial or different
                email: '' 
            })
            setRequests(prev => [...prev, ...(response.data || [])])
        } catch (err) {
            console.error("Error loading more requests:", err)
            setError("Failed to load more requests")
        } finally {
            setLoading(false)
        }
    }

    if (loading && requests.length === 0) {
        return (
            <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-5">Admin Requests</h3>
                <p className="text-gray-400">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-5">Admin Requests</h3>
                <p className="text-red-400">{error}</p>
            </div>
        )
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
                            onClick={handleViewMore}
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
    )
}

export default AdminRequests