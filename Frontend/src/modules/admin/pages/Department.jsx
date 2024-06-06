import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

export default function Department() {
  const [isLoading, setIsLoading] = useState(true);
  const [Departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData()
      .then((response) => {
        setIsLoading(false);
        setDepartments(response);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        navigate("/admin/error");
      });
  }, [navigate]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-auto w-[95%] m-auto my-4">
      <div className="mt-5 grid gap-y-3">
        <div className="rounded-lg shadow scale-90 py-3  grid gap-y-1 dark:text-white">
          <div className="w-[95%] mr-auto font-semibold lg:text-4xl text-3xl">
            Departments
          </div>
        </div>
        {Departments.length > 0
          ? Departments.map((department) => {
              return (
                <div
                  key={department.deptid}
                  className="border bg-white rounded-lg shadow hover:bg-blue-100 cursor-pointer scale-90 py-3  grid gap-y-1">
                  <div className="w-[95%] mx-auto font-semibold lg:text-2xl text-xl">
                    {department.deptname}
                  </div>
                  <div className="w-[95%] mx-auto capitalize lg:text-xl font-normal">
                    {department.headofdept}{" "}
                    <span className="text-sm font-normal">
                      (head of the department)
                    </span>{" "}
                  </div>
                  <div className="w-[95%] mx-auto lg:text-base text-xs font-normal">
                    {department.StudentCount === null ? 0 : department.StudentCount}{" "}students
                  </div>
                </div>
              );
            })
          : `No Departments`}
      </div>
    </div>
  );
}

async function loadData() {
  try {
    return axios
      .get("http://localhost:5000/departments/getdepartments")
      .then((res) => res.data)
      .then((response) => {
        return response.data;
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