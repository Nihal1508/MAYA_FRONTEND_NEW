import { publicGateway } from "../../../services/gateway";
import { maya } from "../../../services/urls";

export const acceptEventInvitation = async ({eventId}, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.accepEventInvitation
            , {
               eventId,
            }, {
            withCredentials: true,
        });
        if (onSuccess) onSuccess(response.data);
        return response.data;
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to accept event invitation';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}

export const rejectEventInvitation = async ({ eventId }, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.rejectEventInvitation
            , { "eventId": eventId });
        if (onSuccess) onSuccess(response.data);
        return response.data;
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to reject event invitation';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}