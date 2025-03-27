import { publicGateway } from "../../services/gateway"
import { maya } from "../../services/urls"

export const signIn = ({ email, password }) => {
    publicGateway
        .post(maya.login, {
            email,
            password
        })
        .then((response) => {
            console.log('sign-in is successful')
            localStorage.setItem('access_token', response.data.accessToken)
            localStorage.setItem('refresh_token', response.data.refreshToken)
            window.location.href = '/dashboard'
        })
        .catch((error) => {
            console.log(error)
        });
}

export const generateOtp = ({ email }) => {
    publicGateway
        .post(maya.generateOtp,
            { email },
            {
                withCredentials: true,
            }
        )
        .then((response) => {
            console.log('otp is generated')
            return response.data
        })
        .catch((error) => {
            console.log("Error sending OTP: ", error);
            throw error;
        });
}

export const verifyOtp = ({ email, otp }) => {
    return publicGateway
        .post(maya.verifyOtp,
            { email, otp },  
            {
                withCredentials: true,
            }
        )
        .then((response) => {
            console.log('OTP is verified');
            return response.data;
        })
        .catch((error) => {
            console.log("Error verifying OTP: ", error);
            throw error;
        });
}

export const signUp = ({ email, password }) => {
    publicGateway
        .post(maya.signup, {
            email,
            password
        })
        .then((response) => {
            console.log('sign-up is successful')
        })
        .catch((error) => {
            console.log(error)
        });
}


