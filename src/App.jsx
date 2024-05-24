import Login from "../pages/login";
import NotFound from "../pages/NotFound";
import UserSideBar from "../layouts/UserSideBar";
import NotAuthorized from "../pages/NotAuthorized";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User
import UserSetting from "../pages/User/UserSetting";
import UserDashboard from "../pages/User/UserDashboard";
import UserPrediction from "../pages/User/UserPrediction";
import UserPatientList from "../pages/User/UserPatientList";
import UserViewPatient from "../pages/User/UserViewPatient";
import UserDataVisualisation from "../pages/User/UserDataVisualisation";

// Admin
import AdminView from "../pages/Admin/AdminView";
import AdminSideBar from "../layouts/AdminSideBar";
import AdminDoctor from "../pages/Admin/AdminDoctor";
import AdminAddDoctor from "../pages/Admin/AdminAddDoctor";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminDepartment from "../pages/Admin/AdminDepartment";
import AdminViewPatient from "../pages/Admin/AdminViewPatient";
import AdminDatavisualisation from "../pages/Admin/AdminDataVisualisation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserSideBar />}>
          <Route index element={<UserDashboard />} />
          <Route path="setting" element={<UserSetting />} />
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
          <Route path="add/doctor" element={<AdminAddDoctor />} />
        </Route>
        <Route path="/NotAuthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
