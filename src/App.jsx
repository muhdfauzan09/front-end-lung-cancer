import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSideBar from "../layouts/UserSideBar";
import Login from "../pages/login";
import UserRegister from "../pages/User/UserRegister";
import UserDashboard from "../pages/User/UserDashboard";
import UserDataVisualisation from "../pages/User/UserDataVisualisation";
import UserPatientList from "../pages/User/UserPatientList";
import UserPrediction from "../pages/User/UserPrediction";
import UserViewPatient from "../pages/User/UserViewPatient";
import AdminDepartment from "../pages/Admin/AdminDepartment";
import AdminDoctor from "../pages/Admin/AdminDoctor";
import AdminView from "../pages/Admin/AdminView";
import AdminSideBar from "../layouts/AdminSideBar";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminDatavisualisation from "../pages/Admin/AdminDataVisualisation";
import NotFound from "../pages/NotFound";
import NotAuthorized from "../pages/NotAuthorized";
import AdminViewPatient from "../pages/Admin/AdminViewPatient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/" element={<UserSideBar />}>
          <Route index element={<UserDashboard />} />
          <Route path="visualisation" element={<UserDataVisualisation />} />
          <Route path="patient" element={<UserPatientList />} />
          <Route path="prediction" element={<UserPrediction />} />
          <Route path="view/patient/:id" element={<UserViewPatient />} />
        </Route>
        <Route path="/admin" element={<AdminSideBar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="view/:id" element={<AdminView />} />
          <Route path="view/patient/:id" element={<AdminViewPatient />} />
          <Route path="visualisation" element={<AdminDatavisualisation />} />
          <Route path="department" element={<AdminDepartment />} />
          <Route path="doctor" element={<AdminDoctor />} />
        </Route>
        <Route path="/NotAuthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
