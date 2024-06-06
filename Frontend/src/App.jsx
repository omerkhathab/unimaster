import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
// admin
import AdminPanel from "./modules/admin/components/AdminPanel.jsx";
import Student from "./modules/admin/pages/Student";
import Faculty from "./modules/admin/pages/Faculty";
import Department from "./modules/admin/pages/Department";
import Courses from "./modules/admin/pages/Courses.jsx";
import Error from "./modules/admin/pages/Error.jsx";
// student
import StudentDashboard from "./modules/student/pages/Dashboard";
import StudentHome from "./modules/student/pages/Home";
import Exam from "./modules/student/pages/Exam";
import Report from "./modules/student/pages/Report";
import StudentCourses from "./modules/student/pages/StudentCourses.jsx";
import Enrollment from "./modules/student/pages/Enrollment.jsx";
// errors
import NotFound from "./pages/Error.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/error" element={<NotFound />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="student" element={<Student />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="courses" element={<Courses />} />
            <Route path="department" element={<Department />} />
            <Route path="error" element={<Error />} />
          </Route>
          <Route path="/student" element={<StudentDashboard />}>
            <Route path="" element={<StudentHome />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="enrollment" element={<Enrollment />} />
            <Route path="reports" element={<Report />} />
            <Route path="exams" element={<Exam />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}