import { publicGateway } from "../../services/gateway"
import { maya } from "../../services/urls"

// api/auth.js
export const signIn = async (credentials, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.login, credentials, {
            withCredentials: true,
        });

        // Axios already parses the response data
        const responseData = response.data;
        if (onSuccess) {
            onSuccess(responseData);
        }
        if (responseData.role === 'admin') {
            localStorage.setItem("role", responseData.role)
        }
        return responseData;
    } catch (error) {
        // Axios wraps the response in error.response
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Authentication failed';

        // Create enhanced error object
        const authError = new Error(errorMessage);
        authError.response = error.response;
        authError.status = error.response?.status;

        if (onError) {
            onError(authError);
        } else {
            throw authError;
        }
    }
};

// OTP Generation
export const generateOtp = async ({ email }, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.generateOtp, { email }, {
            withCredentials: true,
        });

        if (onSuccess) onSuccess(response.data);
        return response.data;

    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Failed to generate OTP';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
};

// OTP Verification
export const verifyOtp = async ({ email, otp }, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.verifyOtp, { email, otp }, {
            withCredentials: true,
        });

        if (onSuccess) onSuccess(response.data);
        return response.data;

    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'OTP verification failed';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
};

// User Signup
export const signUp = async ({ email, password }, { onSuccess, onError } = {}) => {
    try {
        const response = await publicGateway.post(maya.signup, { email, password });
        
        if (onSuccess) onSuccess(response.data);
        return response.data;

    } catch (error) {
        const errorData = error.response?.data || {};
        const errorMessage = errorData.message || error.message || 'Signup failed';
        const enhancedError = new Error(errorMessage);
        enhancedError.response = error.response;

        if (onError) {
            onError(enhancedError);
        } else {
            throw enhancedError;
        }
    }
};

