import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from './Layout'; // Make sure the path is correct
import { act } from 'react';

function AdminRoute() {
    const checkAdmin = () => {
        const role = localStorage.getItem("role")
        if (role === 'admin') {
            return true
        }
        return false
    }
    if (!checkAdmin()) {
        return <Navigate to="/" replace />
    }

    return (
    
            <Outlet />
    );
}

export default AdminRoute;