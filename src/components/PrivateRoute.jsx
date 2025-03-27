import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout'; // Make sure the path is correct
import { act } from 'react';

function PrivateRoute() {
    console.log("hello")
    const checkAuth = () => {
        // Check if the user is authenticated
        const accesstoken = localStorage.getItem("access_token")
        const refreshToken = localStorage.getItem("refresh_token")
        console.log(accesstoken + refreshToken)
        if (accesstoken && refreshToken) {
            return true
        }
        return false
    }
    console.log(checkAuth())
    if (!checkAuth()) {
        return <Navigate to="/login" replace />;
    }
    const checkRole = () => {
        const role = localStorage.getItem("role")
        if (role) {
            return true
        }
        return false
    }
    if (!checkRole()) {
        return <Navigate to="/waiting" replace />
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default PrivateRoute;