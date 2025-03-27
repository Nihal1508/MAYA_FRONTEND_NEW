import React from "react";
import Topbar from "../components/topbar";
import InviteAdminCard from "../components/admin/InviteAdminCard";
import AdminRequests from "../components/admin/AdminRequests";
import ActiveAdmins from "../components/admin/ActiveAdmins";



const ManageAdmins = () => {
  return (
    <div className="h-screen w-full p-6 bg-[#121212] text-white ">
      <Topbar title="Manage Admins" />
      <div className="h-full w-full pb-10">
        {/* Invite Admin Section */}
        <div className="h-full overflow-y-scroll scrollbar-custom pr-6">
          <InviteAdminCard />

          {/* Admin Requests Section */}

          <AdminRequests />
          {/* Admins Section */}
          <ActiveAdmins />
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;
