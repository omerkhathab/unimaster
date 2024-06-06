import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import greet from "../../../../utils/Greeting";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    text: "Dashboard",
    link: "/admin",
    svg: (
      <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
          className="dark:fill-slate-600 fill-current "></path>
        <path
          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
          className="fill-current  group-hover:text-cyan-300 hover:text-cyan-400"></path>
        <path
          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
          className="fill-current group-hover:text-sky-300"></path>
      </svg>
    ),
  },
  {
    text: "Department",
    link: "/admin/department",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-building-fill group-hover:text-cyan-300 hover:text-cyan-400"
        viewBox="0 0 16 16">
        <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
      </svg>
    ),
  },
  {
    text: "Student",
    link: "/admin/student",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-people-fill   group-hover:text-cyan-300 hover:text-cyan-400"
        viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
      </svg>
    ),
  },
  {
    text: "Faculty",
    link: "/admin/faculty",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-workspace   group-hover:text-cyan-300 hover:text-cyan-400"
        viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
  {
    text: "Courses",
    link: "/admin/courses",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-workspace   group-hover:text-cyan-300 hover:text-cyan-400"
        viewBox="0 0 16 16">
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
      </svg>
    ),
  }
];

export default function AdminPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
//   const dispatch = useDispatch();

  useEffect(() => {
    document.title = `Admin`;
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
    //   dispatch(clearSession());
      // sessionStorage.clear("admin");
      navigate("/");
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <aside
        className={`fixed top-0 z-10  flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 ${
          !isMenuOpen && "ml-[-100%]"
        } lg:ml-0  lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:bg-gray-800 dark:border-gray-700`}>
        <div>
          <p className="w-full mt-5 flex justify-end items-center  lg:hidden">
            <svg
              onClick={() => setIsMenuOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </p>
          <ul className="mt-8 space-y-2 tracking-wide">
            {fields.map((field, i) => {
              return (
                <li key={i}>
                  <Link
                    to={field.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      location.pathname === field.link
                        ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white"
                        : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
                    }`}>
                    {field.svg}
                    <span className="-mr-1 font-medium">{field.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
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
            <span className="group-hover:text-gray-700 dark:group-hover:text-white">
              Logout
            </span>
          </button>
        </div>
      </aside>

      <div className="ml-auto h-screen lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky top-0 h-[10%] border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5">
          <div className="flex items-center justify-between space-x-4 px-6 2xl:container h-full">
            <div
              hidden
              className="text-2xl font-medium text-gray-600 lg:block dark:text-white">
              {greet("Admin")}
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="-mr-2 h-16 w-12 border-r lg:hidden dark:border-gray-700 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto h-6 w-6"
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
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsMenuOpen(false)}
          className="w-full 2xl:container h-[90%] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};