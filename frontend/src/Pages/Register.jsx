import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const [inputData, setInputData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (inputData.name === '' || inputData.email === '' || inputData.password === '' || inputData.confirmPassword === '') {
            toast.error("Please fill in all fields!");
        } else if (inputData.password.length < 6 || inputData.confirmPassword.length < 6) {
            toast.error("Password must be at least 6 characters long!");
        } else if (inputData.password !== inputData.confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            try {
                const response = await fetch("http://localhost:4000/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inputData)
                });

                const data = await response.json();

                if (response.ok) {
                    setInputData({ name: '', email: '', password: '', confirmPassword: '' });
                    toast.success("Registration successful. Please login now.");
                    navigate("/login");
                } else {
                    toast.error(data.message || "Something went wrong!");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className='flex justify-center items-center p-8'>
            <div className="main_container w-[400px] p-5 shadow-xl mt-12">
                <h1 className='text-center text-4xl text-pink-700 font-bold mt-5'>Event Reminder</h1>
                <div className="mt-6">
                    <h2 className='text-center text-2xl text-gray-300 font-bold mb-5 underline'>Register Now</h2>
                    <form onSubmit={handleRegister} className='text-center'>
                        <input type="text" name='name' value={inputData.name} onChange={handleChange} placeholder='Enter name' className='registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100' />
                        <input type="email" name='email' value={inputData.email} onChange={handleChange} placeholder='Enter Email' className='registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100' />
                        <input type="password" name='password' value={inputData.password} onChange={handleChange} placeholder='Enter Password' className='registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100' />
                        <input type="password" name='confirmPassword' value={inputData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' className='registerInput text-slate-500 font-bold w-full px-2 py-3 rounded mb-4 bg-slate-100' />
                        <button type='submit' className='btn px-7 py-1 rounded-[0.3rem] mt-3'>Submit</button>
                    </form>
                    <h4 className='text-center mt-4 text-teal-700'>Already have an account? <Link to={'/login'} className='text-blue-700 hover:text-red-600'>Login Now</Link> </h4>
                </div>
            </div>
        </div>
    );
}

export default Register;
