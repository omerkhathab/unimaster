import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AddFacultyModal from "../components/AddFacultyModal";

const Faculty = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [Faculties, setFaculties] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    facultyLoader()
      .then((response) => {
        setIsLoading(false);
        setFaculties(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/admin/error");
        setFaculties([]);
      });
  }, [navigate, pathname, addModalToggle]);

  return isLoading ? (
    <Loader />
  ) : addModalToggle === true ? (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <AddFacultyModal toggle={setAddModalToggle} />
    </div>
  ) : (
    <div className="h-auto md:w-[95%] sm:w-[60%] w-[70%] m-auto my-4">
      <nav className="flex">
        <h1 className="lg:w-[93%] md:w-[85%] w-3/4 text-4xl font-semibold font-sans text-gray-800 dark:text-white">
          Faculties
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
      <section className="min-h-full rounded-md p-9 mt-5 grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {Faculties.length > 0
          ? Faculties.map((faculty, i) => {
            return <Card faculty={faculty} key={i} />;
          })
          : `No Faculties`}
      </section>
    </div>
  );
};

export async function facultyLoader() {
  try {
    return axios
      .get("http://localhost:5000/faculties/allfaculties")
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

export default Faculty;