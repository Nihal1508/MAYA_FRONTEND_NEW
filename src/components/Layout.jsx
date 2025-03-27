import React from 'react';
import Sidebar from './sidebar';

function Layout({ children }) {
    return (
        <div className="h-screen max-h-screen overflow-hidden flex">
            <div>
                <Sidebar />
            </div>
            <div className="w-full h-full flex">
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;