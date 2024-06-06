import { useState } from "react";
import axios from "axios";
import { studentLoader } from "../pages/Dashboard";
import Loader from "./Loader";
import Profile from "../../../images/Profile.jpg";

const EditModal = ({ toggle }) => {
  const [Student, setStudent] = useState(
    JSON.parse(localStorage.getItem("studentInfo"))
  );
  const [IsLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObject = Object.fromEntries(formData.entries());
    if(!formObject.password && !formObject.phone && !formObject.address){
      alert("There is nothing to update"); 
    } else {
    try {
    await axios
      .post("http://localhost:5000/students/updatedetails", formObject)
      .then((res) => {
        if (res.data.isSuccess) {
          studentLoader().then((response) => {
            if (response.isSuccess) {
              localStorage.setItem(
                "studentInfo",
                JSON.stringify(response.data[0])
              );
            }
            alert("You data is updated successfully!");
            console.log(response.data);
            setIsLoading(true);
            setTimeout(() => {
              toggle(false);
              setIsLoading(false);
            }, 2000);
          });
        } else {
          alert("something went wrong! please try again some time late.");
        }
      });
    } catch (error) {
      console.error(error);
    }}
  };
  return IsLoading ? (
    <div className="absolute top-0 left-0 h-full w-full bg-white flex justify-center items-center">
      <Loader/>
    </div>
  ) : (
    <div className="z-10 absolute h-auto py-10 w-full top-0 left-0 px-10">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full  relative border rounded-xl px-10"
      >
        <button
          onClick={() => toggle(false)}
          className="absolute top-3 right-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-2 flex items-center flex-col justify-center  gap-5">
                  <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full border border-gray-900 flex items-center justify-center text-indigo-500 scale-100 hover:scale-105 cursor-pointer transition-transform duration-1000">
                    <img
                      src={Profile}
                      alt={`${Student.FullName} \n profile`}
                      className="w-full h-full m-auto rounded-full object-cover  "
                    />
                  </div>{" "}

                </div>
                <fieldset className="mt-5 flex justify-around items-center rounded-xl border py-2 px-3">
                  <div className="text-center">
                    {" "}
                    <p className="font-bold text-gray-700 text-xl">
                      {Student.DeptName || 0}
                    </p>{" "}
                    <p className="text-gray-400">Department</p>{" "}
                  </div>{" "}
                  <div className="text-center">
                    {" "}
                    <p className="font-bold text-gray-700 text-xl">
                      {Student.Sid.toString()|| 0}
                    </p>{" "}
                    <p className="text-gray-400">Student Id</p>{" "}
                  </div>{" "}
                </fieldset>{" "}
              </div>
            </div>
          </div>

          {/* personal information */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              You can change only the following fields.
            </p>

            <div className="lg:grid grid-cols-2 gap-x-6 gap-y-4 lg:mt-2 p-2 w-full flex flex-col justify-center items-center">
              {/* password */}
              <div className="lg:col-span-1 col-span-3 text-gray-500 lg:w-auto w-[85%]">
                <label htmlFor="Password" className="block">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setStudent({ ...Student, [e.target.name]: e.target.value })
                  }
                  value={Student.password}
                  type="password"
                  id="Password"
                  name="password"
                  display-message="Password "
                  placeholder="Password "
                  className="text-md p-2 rounded-md outline-none lg:w-[97%] w-full border-2 border-grey-200 focus:bg-gray-200"
                />
              </div>
              <input type="hidden" name="sid" id="sid" value={Student.Sid} />
              {/* phone number */}
              <div className="lg:col-span-1 col-span-3 text-gray-500 lg:w-auto w-[85%]">
                <label htmlFor="phone" className="block">
                  Phone
                </label>
                <input
                  onChange={(e) =>
                    setStudent({ ...Student, [e.target.name]: e.target.value })
                  }
                  value={Student.phone}
                  type="number"
                  name="phone"
                  id="phone"
                  display-message="Phone Number"
                  placeholder="Phone Number"
                  className="text-md p-2 rounded-md outline-none lg:w-[95%] w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-2 border-grey-200 focus:bg-gray-200"
                />
              </div>
              {/* Address */}
              <div className="lg:col-span-2 text-gray-500 col-span-3 lg:w-auto w-[85%]">
                <label htmlFor="address" className="block">
                  Address
                </label>
                <input
                  onChange={(e) =>
                    setStudent({ ...Student, [e.target.name]: e.target.value })
                  }
                  value={Student.address}
                  type="text"
                  id="address"
                  name="address"
                  display-message="Residential Address"
                  placeholder="Residential Address"
                  className="text-md p-2 rounded-md outline-none lg:w-[97%] w-full border-2 border-grey-200 focus:bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => toggle(false)}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >Cancel</button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
