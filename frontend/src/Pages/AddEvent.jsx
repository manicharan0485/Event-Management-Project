import React, { useState } from 'react';
import Nav from './Nav';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function AddEvent() {
  const [inputData, setInputData] = useState({ eventName: "", description: "", date: "", location: "" });

  function getEventInput(e) {
    setInputData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  }

  const navigate = useNavigate();

  const addEventHandler = async (e) => {
    e.preventDefault();

    if (inputData.eventName === "" || inputData.description === "" || inputData.date === "" || inputData.location === "") {
      toast.error("Please fill all input fields");
    } else {
      try {
        const eventRoute = await fetch("http://localhost:4000/events", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inputData),
        });

        const eventData = await eventRoute.json();
        console.log("Event data:", eventData);

        if (eventRoute.ok) {
          toast.success("Event added successfully");
          setInputData({ eventName: "", description: "", date: "", location: "" });
          navigate("/home");
        } else {
          toast.error(eventData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <>
      <Nav />
      <div className='mt-28 sm:mt-24 flex justify-center'>
        {/* <h1 className='mb-[-1.6rem] sm:mb-[-1rem] text-center box-content mt-4 text-xl sm:text-2xl text-purple-300 font-bold'>"The secret of getting ahead is getting started." <br /> <span className='hidden sm:block'>Add your daily Events</span> </h1> */}
        <div className="CreateEvent w-[300px] sm:w-[500px]">
          <h1 className="text-center text-xl sm:text-2xl font-semibold  text-pink-700">
            Add Event
          </h1>
          <form action="" className="form ">
            <input
              className="title w-full shadow p-2 mt-4 "
              name="eventName"
              onChange={getEventInput}
              type="text"
              placeholder="Event Name"
              autoComplete="off"
            />
            <textarea
              name="description"
              onChange={getEventInput}
              rows="6"
              className="title NoteText p-2 shadow"
              placeholder="Event Description"
            />
            <input
              className="title text-sm w-full shadow p-2 mt-4 "
              name="date"
              onChange={getEventInput}
              type="datetime-local"
              placeholder="Date and Time"
              autoComplete="off"
            />
            <input
              className="title text-sm w-full shadow p-2 mt-4 "
              name="location"
              onChange={getEventInput}
              type="text"
              placeholder="Location"
              autoComplete="off"
            />
            <div className="text-center mt-4 relative h-5">
              <button
                onClick={addEventHandler}
                className="AddBtn font-semibold absolute end-2 bg-orange-600 hover:bg-pink-700 hover:text-white text-white px-2 text-2xl"
              >
                Add
              </button>
            </div>
          </form>
        </div>
        {/* <p className='inline mx-2 mt-5 text-blue-600 hover:text-red-600 text-left'>
          <Link to={'/home'}>⬅️ Go Back</Link>
        </p> */}
      </div>
    </>
  )
}

export default AddEvent;