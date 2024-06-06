import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AddCourseModal from "../components/AddCourseModal";

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    courseLoader()
      .then((response) => {
        setIsLoading(false);
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/admin/error");
        setCourses([]);
      });
  }, [navigate, pathname, addModalToggle, refresh]);

  return isLoading ? (
    <Loader />
  ) : addModalToggle === true ? (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <AddCourseModal toggle={setAddModalToggle} />
    </div>
  ) : (
    <div className="h-auto md:w-[95%] sm:w-[60%] w-[70%] m-auto my-4">
      <nav className="flex">
        <h1 className="lg:w-[93%] md:w-[85%] w-3/4 text-4xl font-semibold font-sans text-gray-800 dark:text-white">
          Courses
        </h1>
        <button
          onClick={() => setAddModalToggle(true)}
          className="lg:w-[10%] md:w-[15%] w-1/4 rounded-lg shadow-md hover:bg-blue-700 bg-blue-600 text-white py-2 px-4 font-medium gap-2 flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-95">
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
          <span className="text-lg">Add</span>
        </button>
      </nav>
      <section className="my-5">
        {Courses.length > 0
          ? Courses.map((course, i) => {
            return <CoursesCard course={course} key={i} setRefresh={setRefresh} />;
          })
          : `No Courses`}
      </section>
    </div>
  
  );
};

export async function courseLoader() {
  try {
    return axios
      .get("http://localhost:5000/courses/getcourses")
      .then((res) => res.data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteCourse(courseid, setRefresh) {
  try {
    return axios.delete(`http://localhost:5000/courses/delete/${courseid}`)
      .then((res) => res.data)
      .then((response) => {
        alert(response.displayMessage);
        setRefresh(prev => !prev);
        return response;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const CoursesCard = ({ course, i, setRefresh }) => {
  return (
    <div key={i}
      className="bg-white dark:bg-gray-800 dark:text-white rounded-lg cursor-pointer scale-90 py-3 grid gap-y-1">
      <div className="flex justify-between">
        <div className="w-5/6 ">
          <div className="w-[95%] mx-auto font-bold lg:text-2xl text-xl">
            {course.courseid}
          </div>
          <div className="w-[95%] mx-auto font-semibold lg:text-2xl text-xl">
            {course.coursename}
          </div>
          <div className="w-[95%] mx-auto capitalize lg:text-xl font-normal">
            Department:{" "}{course.deptname}
          </div>
        </div>
        <div>
        </div>
        <button onClick={() => deleteCourse(course.courseid, setRefresh)} type="button" className="w-1/12 focus:outline-none text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-4">Delete</button>
      </div>
    </div>
  );
}