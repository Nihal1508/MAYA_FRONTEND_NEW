import { publicGateway } from "../../services/gateway";
import { maya } from "../../services/urls";

export const acceptRequest = async (eventId, { onSuccess, onError } = {}) => {
    try {
        const token = localStorage.getItem('access_token'); // Retrieve token
        if (!token) throw new Error("Access token is required");

        const response = await publicGateway.post(maya.acceptRequest, { eventId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });

        const responseData = response.data;
        if (onSuccess) {
            onSuccess(responseData);
        }
        return responseData;

    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Request acceptance failed';

        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;
        enhancedError.status = error.response?.status;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}; 

export const rejectRequest = async (userid, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.rejectRequest, { userid }, {
            withCredentials: true
        });
        
        const responseData = response.data;
        if (onSuccess) {
            onSuccess(responseData);
        }
        return responseData;
        
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Request rejection failed';

        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;
        enhancedError.status = error.response?.status;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
};

export const allAdmins = async (params, { onSuccess, onError } = {}) => {
    try {
        const token = localStorage.getItem('access_token');
        console.log('Using token:', token); // Debug log
        
        const response = await publicGateway.get(maya.requests, {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        
        if (onSuccess) onSuccess(response.data);
        return response.data;
    } catch (error) {
        console.error('Full error:', error);
        if (error.response?.status === 401) {
            // Handle token expiration
            localStorage.removeItem('access_token');
            // Optionally redirect to login
        }
        if (onError) onError(error);
        throw error;
    }
};

export const invite = async (inviteData, { onSuccess, onError } = {}) => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await publicGateway.post(maya.invite, inviteData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        
        const responseData = response.data;
        if (onSuccess) {
            onSuccess(responseData);
        }
        return responseData;
        
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Invitation failed';

        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;
        enhancedError.status = error.response?.status;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
};