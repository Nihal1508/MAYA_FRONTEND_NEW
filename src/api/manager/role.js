import { publicGateway } from "../../../services/gateway";
import { maya } from "../../../services/urls";

export const checkRole = async ({ onSuccess, onError } = {}) => {
    const accessToken = localStorage.getItem("access_token")
    try {
        const response = await publicGateway.get(maya.checkRole, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (onSuccess) onSuccess(response.data);
        if (response.data.role === 'manager') {
            localStorage.setItem("role", response.data.role)
        }
        console.log(response.data)
        return response.data;
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to check role';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (error.response?.status === 406) {
            window.location.href = '/waiting';
            return;
        }

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
}