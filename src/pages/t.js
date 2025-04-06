import React, { useState, useEffect } from 'react';
import Topbar from '../components/topbar';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/admins';

// Enhanced API Functions with better error handling
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      data,
      timeout: 10000
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || error.message);
    } else if (error.request) {
      // No response received
      throw new Error('Server is not responding. Please try again later.');
    } else {
      // Other errors
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

const inviteAdmin = (email) => apiRequest('post', '/invite', { email });
const getAdminRequests = () => apiRequest('get', '/requests');
const getActiveAdmins = () => apiRequest('get', '/active');
const updateAdminRequest = (userid, action) => apiRequest('put', `/request/${userid}`, { action });
const removeAdmin = (userid) => apiRequest('delete', `/${userid}`);

// AdminRequestsListItem Component
const AdminRequestsListItem = ({ request, onAccept, onDecline }) => (
  <div className="flex justify-between items-center mt-4 border-b border-gray-700 pb-3">
    <div>
      <p className="font-medium text-white">{request.email}</p>
      <p className="text-gray-400 text-sm">Pending</p>
    </div>
    <div>
      <button
        onClick={onAccept}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg mr-2"
      >
        Accept
      </button>
      <button
        onClick={onDecline}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
      >
        Decline
      </button>
    </div>
  </div>
);

// InviteAdminCard Component
const InviteAdminCard = ({ onInviteSuccess }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setMessage('');
    try {
      await inviteAdmin(email);
      setMessage('Invitation sent successfully');
      setEmail('');
      onInviteSuccess();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0B0B] p-10 mt-6 rounded-2xl text-left">
      <h3 className="text-xl font-medium text-white">Invite Admin</h3>
      <form onSubmit={handleInvite}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="mt-4 w-3/4 block bg-transparent py-2 pl-4 rounded-lg border border-white text-white"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 px-10 ${isLoading ? 'bg-gray-500' : 'bg-[#9689F1] hover:bg-[#7a6ed8]'} text-white w-fit py-2 rounded-lg`}
        >
          {isLoading ? 'Sending...' : 'Invite'}
        </button>
      </form>
      {message && (
        <p className={`mt-2 ${message.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

// AdminRequests Component
const AdminRequests = ({ onRequestAction }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminRequests();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminRequests();
  }, []);

  const handleAction = async (userid, action) => {
    try {
      await updateAdminRequest(userid, action);
      setRequests(prev => prev.filter(req => req.userid !== userid));
      onRequestAction();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  if (loading && requests.length === 0) {
    return (
      <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
        <h3 className="text-xl font-medium mb-5 text-white">Admin Requests</h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
        <h3 className="text-xl font-medium mb-5 text-white">Admin Requests</h3>
        <p className="text-red-400">{error}</p>
        <button 
          onClick={fetchAdminRequests}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] px-10 pt-10 pb-4 mt-6 rounded-2xl text-left">
      <h3 className="text-xl font-medium mb-5 text-white">Admin Requests</h3>
      {requests.length > 0 ? (
        requests.map((request) => (
          <AdminRequestsListItem
            key={request.userid}
            request={request}
            onAccept={() => handleAction(request.userid, 'accept')}
            onDecline={() => handleAction(request.userid, 'decline')}
          />
        ))
      ) : (
        <p className="text-gray-400">No admin requests found</p>
      )}
    </div>
  );
};

// ActiveAdmins Component
const ActiveAdmins = ({ refreshTrigger }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActiveAdmins();
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refreshTrigger]);

  const handleRemove = async (userid) => {
    try {
      await removeAdmin(userid);
      setAdmins(prev => prev.filter(admin => admin.userid !== userid));
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  if (loading && admins.length === 0) {
    return (
      <div className="bg-[#0B0B0B] p-10 my-6 rounded-2xl text-left">
        <h3 className="text-xl font-medium mb-4 text-white">Admins</h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0B0B0B] p-10 my-6 rounded-2xl text-left">
        <h3 className="text-xl font-medium mb-4 text-white">Admins</h3>
        <p className="text-red-400">{error}</p>
        <button 
          onClick={fetchAdmins}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] p-10 my-6 rounded-2xl text-left">
      <h3 className="text-xl font-medium mb-4 text-white">Admins</h3>
      {admins.length > 0 ? (
        admins.map((admin) => (
          <div
            key={admin.userid}
            className="flex justify-between items-center mt-4 border-b border-gray-700 pb-3"
          >
            <div>
              <p className="font-medium text-white">{admin.email}</p>
              <p className="text-gray-400 text-sm">Active</p>
            </div>
            <button
              onClick={() => handleRemove(admin.userid)}
              className="text-gray-400 hover:text-white"
              title="Remove Admin"
            >
              <IoIosRemoveCircleOutline size={28} />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No active admins</p>
      )}
    </div>
  );
};

// Main ManageAdmins Component
const ManageAdmins = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInviteSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleRequestAction = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="h-screen w-full p-6 bg-[#121212] text-white">
      <Topbar title="Manage Admins" />
      <div className="h-full w-full pb-10">
        <div className="h-full overflow-y-scroll scrollbar-custom pr-6">
          <InviteAdminCard onInviteSuccess={handleInviteSuccess} />
          <AdminRequests onRequestAction={handleRequestAction} />
          <ActiveAdmins refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;