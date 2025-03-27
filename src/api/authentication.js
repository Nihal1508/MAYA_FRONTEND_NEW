import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL:", API_URL); 

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  console.log("Refresh token retrieved:", refreshToken); 
  return refreshToken;
};

export async function signIn({ email, password }) {
  try {
    console.log("Starting signIn function"); // Debugging: Track function start

    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { data } = response;
    console.log("Sign-in response:", data); // Debugging: Check the response

    console.log("Checking tokens in response..."); // Debugging: Track condition check
    if (data.accessToken && data.refreshToken) {
      console.log("Tokens found in response"); // Debugging: Track if block
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      console.log("Tokens stored in localStorage:", {
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      });
    } else {
      console.error("Tokens not found in response:", data); // Debugging: Track else block
    }

    console.log("End of signIn function"); // Debugging: Track function end
    return data;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
}

export async function signUp({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });

    const { data } = response;
    console.log("Sign-up response:", data); 

    return data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
}

export async function generateOtp({ email }) {
  try {
    const accessToken = getAccessToken();
    console.log("Access token:", accessToken); 
    const response = await axios.post(
      `${API_URL}/auth/signup/sendotp`,
      { email },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { data } = response;
    console.log("Generate OTP response:", data); 

    return data;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw error;
  }
}

export async function verifyOtp({ otp }) {
  try {
    const accessToken = getAccessToken();
    console.log("Access token:", accessToken); 

    const response = await axios.post(
      `${API_URL}/auth/signup/verify`,
      { otp },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { data } = response;
    console.log("Verify OTP response:", data); 
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}