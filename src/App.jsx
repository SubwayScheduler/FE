import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import Timetable from "./pages/Timetable/Timetable";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import AdminCRUD from "./pages/AdminCRUD/AdminCRUD";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/timetable" />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-crud" element={<AdminCRUD />} />
      </Routes>
    </Router>
  );
}
