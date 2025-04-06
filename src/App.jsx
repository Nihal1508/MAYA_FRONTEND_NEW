import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Storage from "./pages/storage";
import ManageEvent from "./pages/manageevent";
import Dashboard from "./pages/dashboard";
import Addevent from "./pages/addevent";
import Manageadmins from "./pages/manageadmins";
import PrivateRoute from "./components/PrivateRoute";
import Events from "./pages/Events";
import Storageplus from "./pages/storageplus";
import EventImages from "./components/storage/StoredImage";
import EventDetails from "./components/events/EventDetails";
import WaitingAdminResponse from "./pages/manager/WaitingAdminResponse";
import AdminRoute from "./components/AdminRoute";
import ManagerDashboard from "./pages/manager/ManagerDashboard";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/waiting" element={<WaitingAdminResponse />} />
      <Route element={<PrivateRoute />}>

        <Route path="/managerdashboard" element={<ManagerDashboard />} />

        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/storageplus" element={<Storageplus />} />
        <Route path="/manageevent" element={<ManageEvent />} />
        <Route path="/storage/:id" element={<EventImages />} />
        <Route element={<AdminRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/manageadmins" element={<Manageadmins />} />
          <Route path="/manageevent/:id" element={<ManageEvent />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
