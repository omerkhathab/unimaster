import { useState } from "react";
import Profile from "../../../images/Profile.jpg"
import EditModal from "../components/EditModal"; 

function getDate(datetime) {
  let date = new Date(datetime.toString());
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  let datestring = year + "-" + month + "-" + day;
  return datestring;
}

const Home = () => {
  const [editModalToggle, setEditModalToggle] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const Student = JSON.parse(localStorage.getItem("studentInfo"));
  
  return (
    <div className="z-0 relative min-h-screen py-16 w-full">
      {editModalToggle ? (
        <EditModal toggle={setEditModalToggle} />
      ) : (
        <div className="px-8 h-auto">
          <div className="p-8 bg-white border rounded-xl shadow relative">
            <button
              onClick={() => setEditModalToggle(true)}
              className="absolute top-5 right-5"
              title="Edit profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="black"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>{" "}
            <div className="grid grid-cols-1  md:grid-cols-1 ">
              {" "}
              <div className="">
                {" "}
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl    flex items-center justify-center text-indigo-500 scale-100 hover:scale-105 cursor-pointer transition-transform duration-1000">
                  <img
                    src={Profile}
                    alt={`${Student.FullName} \n profile`}
                    className="w-full h-full m-auto rounded-full object-cover  "
                  />
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-5 text-center border-b pb-12">
              {" "}
              <h1 className="text-4xl font-medium text-gray-700 flex justify-center items-center gap-3 mb-3">
                <p className="font-light text-gray-500 first-letter:uppercase">
                  {Student.FullName}
                </p>
              </h1>{" "}
              <a
                href={`mailto:${Student.email}`}
                className="font-light text-blue-600 py-10">
                {Student.Email}
              </a>{" "}
              <p className="mt-8 text-gray-500">
                {Student.DeptName + " Department"}
              </p>{" "}
              <p className="mt-2 text-gray-900 font-semibold text-xl">
                <b>Anna University</b>
              </p>{" "}
            </div>{" "}
            <div className="mt-8 flex flex-col justify-center">
              {showMore && (
                <ul className="min-h-[50vh] w-full overflow-hidden  mb-4 grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-1000 ">
                  <fieldset className="h-full w-full border rounded-xl p-5">
                    <legend className="px-2 text-md font-extralight uppercase">
                      Personal Details{" "}
                    </legend>
                    <ul className="w-full h-full ">
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Student Id:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.Sid}
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Department Id:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.DeptId}
                        </div>
                      </li>

                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Name:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.FullName}
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Email:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.Email}
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Phone:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.Phone}
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          DOB:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {getDate(Student.DOB)}
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Blood Group:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.Blood}
                        </div>
                      </li>
                      <hr className="my-3" />
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          Address:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          {Student.Address}
                        </div>
                      </li>
                    </ul>
                  </fieldset>
                  <fieldset className="h-full w-full border rounded-xl p-5">
                    <ul>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">
                          College Name:
                        </div>
                        <div className="w-2/3 first-letter:capitalize break-words">
                          College of Engineering Guindy
                        </div>
                      </li>
                      <li className="flex">
                        <div className="w-1/3 font-semibold  uppercase">Passing Year:</div>
                        <div className="w-2/3 first-letter:capitalize break-words">2026</div>
                      </li>
                    </ul>
                  </fieldset>
                </ul>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-indigo-500 py-2 px-4 font-medium ">
                {showMore ? "Hide" : "Show"} Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
