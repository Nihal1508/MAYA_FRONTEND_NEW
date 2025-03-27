import { publicGateway } from "../../../services/gateway";
import { maya } from "../../../services/urls";

export const getAssignedEvents = async ({ onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.get(maya.getAssignedEvents);
        if (onSuccess) onSuccess(response.data.events);
        return response.data.events;
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to fetch assigned events';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}

export const getEventInvitations = async ({ onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.get(maya.getEventInvitations);
        if (onSuccess) onSuccess(response.data.events);
        return response.data;
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to fetch event invitations';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}