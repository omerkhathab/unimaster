import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AddStudentModal from "../components/AddStudentModal";
import StudentDetailsModal from "../components/StudentDetailsModal";

const Student = () => {
  const [Students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    studentLoader()
      .then((response) => {
        if (response.isSuccess) {
          setStudents(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        navigate("/admin/error");
      });
  }, [navigate, addModalToggle, refresh]); 

  return isLoading ? (
    <Loader />
  ) : addModalToggle === true ? (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <AddStudentModal toggle={setAddModalToggle} />
    </div>
  ) : (
    <main className="h-auto w-[95%] m-auto my-4">
      {/* navbar */}
      <nav className="flex">
        <h1 className="lg:w-[92%] md:w-4/5 w-3/4 text-4xl font-semibold dark:text-white">
          Students
        </h1>
        <button
          onClick={() => setAddModalToggle(true)}
          className="lg:w-1/4 md:w-[15%] rounded-lg shadow-md hover:bg-blue-500 cursor-pointer scale-90 hover:scale-95 transition-all duration-1000 bg-blue-600 text-white py-2 px-4 font-medium gap-2 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="text-lg">Add Student</span>
        </button>
      </nav>

      <div className="h-auto w-full mt-10 border shadow-lg rounded-lg dark:text-white">
        <ol className="w-full m-auto">
          <li className="flex justify-between items-center text-lg px-4 py-2 border-b bg-gray-100 dark:bg-gray-800">
            <div className="w-1/6 text-center font-semibold">Name</div>
            <div className="w-1/6 text-center font-semibold">Gender</div>
            <div className="w-1/6 text-center font-semibold">Dept</div>
            <div className="w-1/5 text-center font-semibold">Email</div>
            <div className="w-1/6 text-center font-semibold">Phone</div>
          </li>

          {Students.map((student, index) => (
            <li
              className={`flex justify-between items-center text-lg px-4 py-2 ${index !== Students.length - 1 ? "border-b" : ""} cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700`}
              key={student?.sid}
              onClick={() => setSelectedStudent(student)}>
              <div className="capitalize w-1/6 text-center truncate">{student?.FullName}</div>
              <div className="capitalize w-1/6 text-center truncate">{student?.Gender}</div>
              <div className="capitalize w-1/6 text-center truncate">{student?.DeptName}</div>
              <div className="w-1/5 text-center truncate">{student?.Email}</div>
              <div className="capitalize w-1/6 text-center truncate">{student?.Phone}</div>
            </li>
          ))}
        </ol>
      </div>

      {selectedStudent && (
        <StudentDetailsModal student={selectedStudent} toggle={setSelectedStudent} refresh={setRefresh} />
      )}
    </main>
  );
};

async function studentLoader() {
  try {
    const response = await axios.get(
      "http://localhost:5000/students/studentinfo"
    );
    console.log(response.data.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default Student;