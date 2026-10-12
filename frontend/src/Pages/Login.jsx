import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [inputData, setInputData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (inputData.email === "" || inputData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/home");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="main_container w-[400px] p-5 shadow-xl mt-12 ">
        <h1 className="text-center text-4xl text-pink-700 font-bold mt-5">
          Event Reminder
        </h1>
        <div className="mt-6">
          <h2 className="text-center text-2xl text-gray-300 font-bold mb-5 underline">
            Login
          </h2>
          <form className="text-center" style={{ position: "relative" }}>
            <input
              type="text"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100"
            />
            <input
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100"
            />
            <button
              onClick={handleLogin}
              className="btn px-7 py-1 rounded-[0.3rem] mt-6"
            >
              Submit
            </button>
          </form>

          <p className="text-center mt-4 text-teal-700">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-700 hover:text-red-600">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
