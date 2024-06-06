import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourseModal = ({ toggle }) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    try {
      axios
        .post("http://localhost:5000/courses/add", formObject)
        .then((res) => {
          let response = res.data;
          console.log(response);
          if (response.isSuccess) {
            alert("Course Added succusfully");
            toggle(false);
          }
        })
        .catch((err) => {
          navigate("/admin/error");
        });
    } catch (error) {
      navigate("/admin/error");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="w-3/4 mx-auto my-5 px-4 text-5xl dark:text-white">Add a Course</div>
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto px-4">
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="courseid" id="courseid" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="courseid" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Course Id</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="coursename" id="coursename" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="coursename" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Course Name</label>
            </div>
          </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="deptid"
            id="department"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:bg-transparent dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
            required
          >
            <option value="" disabled selected className="bg-white dark:bg-gray-900">
              Select Department
            </option>
            <option value="1" className="bg-white dark:bg-gray-900">
              Computer Science
            </option>
            <option value="2" className="bg-white dark:bg-gray-900">
              Mathematics
            </option>
            <option value="3" className="bg-white dark:bg-gray-900">
              Physics
            </option>
            <option value="4" className="bg-white dark:bg-gray-900">
              Chemistry
            </option>
            <option value="5" className="bg-white dark:bg-gray-900">
              Biology
            </option>
            <option value="6" className="bg-white dark:bg-gray-900">
              Electrical Engineering
            </option>
            <option value="7" className="bg-white dark:bg-gray-900">
              Mechanical Engineering
            </option>
            <option value="8" className="bg-white dark:bg-gray-900">
              Civil Engineering
            </option>
            <option value="9" className="bg-white dark:bg-gray-900">
              Environmental Science
            </option>
            <option value="10" className="bg-white dark:bg-gray-900">
              Business Administration
            </option>
          </select>
          <label
            htmlFor="department"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Department
          </label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </form>
      <button onClick={()=>toggle(false)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go Back</button>
    </div>
  )
}

export default AddCourseModal;