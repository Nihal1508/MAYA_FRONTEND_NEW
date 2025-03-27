import React from "react";
import { Link } from "react-router-dom";
// Import all images
import homeIcon from '../assets/images/home.png';
import layersIcon from '../assets/images/layers.png';
import databaseIcon from '../assets/images/database.png';
import slackIcon from '../assets/images/slack.png';

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", icon: homeIcon, label: "Dashboard" },
    { path: "/events", icon: layersIcon, label: "Manage Events" },
    { path: "/storage", icon: databaseIcon, label: "Storage" },
    { path: "/manageadmins", icon: slackIcon, label: "Manage Admins" }
  ];

  return (
    <div className="w-64 bg-[#0B0B0Bff] p-6 flex flex-col items-start h-screen text-white">
      <h1 className="text-2xl font-bold mb-16">Maya</h1>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={item.path} className={index < navItems.length - 1 ? "mb-4" : ""}>
              <Link
                to={item.path}
                className="flex items-center space-x-2 hover:text-purple-400"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;