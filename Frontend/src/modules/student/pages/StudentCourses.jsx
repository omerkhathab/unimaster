import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function StudentCourses() {
  const [isLoading, setIsLoading] = useState(true);
  const [Courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    courseLoader()
      .then((response) => {
        setIsLoading(false);
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/student");
        setCourses([]);
      });
  }, [navigate, pathname, refresh]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-auto md:w-[95%] sm:w-[60%] w-[70%] m-auto my-4">
      <nav className="flex">
        <h1 className="lg:w-[93%] md:w-[85%] w-3/4 text-4xl font-semibold font-sans text-gray-800">
          Courses
        </h1>
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
  const sid = localStorage.getItem("loggedIn");
  console.log(sid);
  try {
    return axios
      .get("http://localhost:5000/courses/mycourses/" + sid)
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

async function unenroll(courseid, setRefresh) {
  const sid = localStorage.getItem("loggedIn");
  console.log(courseid, sid);
  try {
    return axios.post("http://localhost:5000/courses/unenroll/", { courseid, sid })
      .then((res) => res.data)
      .then((response) => {
        console.log(response);
        alert(response.displayMessage);
        setRefresh(prev => !prev);  // Toggle the refresh state
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
      className="border bg-white rounded-lg shadow hover:bg-blue-100 cursor-pointer scale-90 py-3 grid gap-y-1">
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
        <button onClick={() => unenroll(course.courseid, setRefresh)} type="button" className="w-1/6 focus:outline-none text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-3">UnEnroll</button>
      </div>
    </div>
  );
}
