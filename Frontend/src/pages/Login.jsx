import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sign_In from "../images/Signin.jpg";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());

    const isAdminEmail = /^admin/i.test(formObject.email);
    if (isAdminEmail) {
      // if(formObject.password == "123")
      navigate('/admin');
      // else alert("Wrong Password")
    } else {
      try {
        await axios
          .post("http://localhost:5000/students/auth", formObject)
          .then((res) => {
            let response = res.data;
            if (response.isSuccess) {
              if (Object.keys(response.data).length === 0) {
                alert("invalid email or password");
              } else {
                let studentData = response.data[0];
                localStorage.setItem("loggedIn", studentData.Sid);
                navigate("/student");
              }
            } else {
              alert("Something went wrong! please try again later");
              alert(response.displayMessage);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex sm:flex-col-reverse lg:flex-row justify-center items-center lg:flex-wrap w-full h-full overflow-hidden">
        <div className="lg:w-1/2 w-full h-full p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="mt-5 lg:mt-0 text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  id="email"
                  name="email"
                  display-message="Email Address"
                  placeholder="Email"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  id="password"
                  name="password"
                  display-message="Password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Sign In</span>
                </button>
                <p className="mt-6 text-xs flex justify-between text-gray-600 text-center">
                  <Link to="/forgot" className="w-full btn btn-sm btn-link sm:w-auto">
                    Forgot password?
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 hidden sm:block w-full">
          <img
            className="object-contain w-full h-96"
            src={Sign_In}
            alt="Sign In"
          />
        </div>
      </div>
    </div>
  );
}
