import { useEffect, useState, useLayoutEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../images/logo.jpg";
import greet from "../../../../utils/Greeting";
import Loader from "../components/Loader";
import axios from "axios";

const asideMenuList = [
  {
    icon: (
      <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
          className="fill-current text-blue-400 dark:fill-slate-600"></path>
        <path
          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
          className="fill-current text-blue-200 group-hover:text-blue-300"></path>
        <path
          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
          className="fill-current group-hover:text-blue-300"></path>
      </svg>
    ),
    text: "Dashboard",
    path: "/student",
  },
  {
    icon: (
      <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
          className="fill-current text-blue-400 dark:fill-slate-600"></path>
        <path
          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
          className="fill-current text-blue-200 group-hover:text-blue-300"></path>
        <path
          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
          className="fill-current group-hover:text-blue-300"></path>
      </svg>
    ),
    text: "My Courses",
    path: "/student/courses",
  },
  {
    icon: (
      <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
          className="fill-current text-blue-400 dark:fill-slate-600"></path>
        <path
          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
          className="fill-current text-blue-200 group-hover:text-blue-300"></path>
        <path
          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
          className="fill-current group-hover:text-blue-300"></path>
      </svg>
    ),
    text: "Enroll",
    path: "/student/enrollment",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor">
        <path
          className="fill-current text-gray-600 group-hover:text-blue-600"
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
          clipRule="evenodd"
        />
        <path
          className="fill-current text-gray-300 group-hover:text-blue-300"
          d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
        />
      </svg>
    ),
    text: "Reports",
    path: "/student/reports",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5">
        <path
          className="fill-current text-gray-600 group-hover:text-blue-600"
          fillRule="evenodd"
          d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    text: "Exams",
    path: "/student/exams",
  }
];

const Dashboard = () => {
  const [Student, setStudent] = useState();
  // JSON.parse(localStorage.getItem("studentInfo"))
  const [IsMenuOpen, setIsMenuOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let sid = localStorage.getItem("loggedIn");
    return () => {
      if (!sid) {
        navigate("/login");
      }
    };
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Log Out?")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("studentInfo");
      navigate("/login");
    }
  };
  useEffect(() => {
    setIsLoading(true);
      studentLoader().then((response) => {
        console.log(response);
        if (response.isSuccess) {
          localStorage.setItem("studentInfo", JSON.stringify(response.data[0]));
          setStudent(response.data[0]);
          setIsLoading(false);
        }
      });
  }, [pathname]);
  return (
    <div className="">
      <aside
        className={`fixed overflow-y-hidden z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] ${
          !IsMenuOpen && "ml-[-100%] "
        }`}>
        <div>
          <div className="mx-6 px-6 py-4 border-b h- md:grid place-content-center hidden ">
            <Link to="/" title="home">
              <img src={Logo} className="h-full " alt="university logo" />
            </Link>
          </div>
          <ul className="space-y-2 tracking-wide mt-8 ">
            {asideMenuList?.map((menu, index) => {
              return (
                <li onClick={() => setIsMenuOpen(false)} key={index}>
                  <Link
                    to={menu.path}
                    aria-label={menu.text}
                    className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${
                      menu.path === pathname
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
                        : "text-gray-600 "
                    }  `}>
                    {menu.icon}
                    <span className="-mr-1 font-medium">{menu.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            onClick={handleLogout}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
      <div className=" ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] max-h-screen">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block capitalize">
              {IsLoading ? greet("Student") : greet(Student.FullName)}
            </h5>
            <button
              className="w-12 h-16 -mr-2 border-r lg:hidden"
              onClick={() => setIsMenuOpen(!IsMenuOpen)}>
              {IsMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 my-auto text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 my-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="max-h-[100vh-4rem] w-full overflow-y">
          {IsLoading ? (
            <div className="h-screen w-full overflow-y-hidden bg-cover">
              <Loader />
            </div>
          ) : (
            <Outlet/>
          )}
        </div>
      </div>
    </div>
  );
};


export async function studentLoader() {
  let sid = localStorage.getItem("loggedIn");
  console.log(sid)
  try {
    const res = await axios.post(
      "http://localhost:5000/students/student",{sid}
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export default Dashboard;