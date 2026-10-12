import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditEvent() {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    date: "",
    location: ""
  });
  const Id = useParams();
const eventId = Id.eventId
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/events/${eventId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const eventData = await response.json();
          console.log(eventData)
          setEventData(eventData.event);
        } else {
          console.error("Failed to fetch event:", response.status);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/events/edit/${eventId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        toast.success("Event updated successfully");
        navigate("/home");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <section>
        <Nav />
      </section>
      <div className='mt-28 sm:mt-24 flex justify-center flex-col items-center'>
        {/* <h1 className='mb-[-1.6rem] sm:mb-[-1rem] text-center box-content mt-4 text-xl sm:text-2xl text-gray-600 font-bold'>Update Your Event Details</h1> */}
        <div className="CreateEvent w-[300px] sm:w-[500px] ">
          <h1 className="text-center text-xl sm:text-2xl font-semibold underline text-pink-700">Edit Event</h1>
          <form className="form">
            <input
              className="title w-full shadow p-2 mt-4"
              name="eventName"
              onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
              type="text"
              value={eventData.eventName}
              placeholder="Event Name"
              autoComplete="off"
            />
            <textarea
              name="eventDescription"
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              rows="6"
              value={eventData.description}
              className="title NoteText p-2 shadow"
              placeholder="Event Description"
            />
            <input
              className="title text-sm w-full shadow p-2 mt-4"
              name="eventDate"
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              type="datetime-local"
              value={eventData.date ? eventData.date.slice(0, 16) : ""}
              placeholder="Date"
              autoComplete="off"
            />
            <input
              className="title text-sm w-full shadow p-2 mt-4"
              name="location"
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              type="text"
              value={eventData.location}
              placeholder="Location"
              autoComplete="off"
            />
            <div className="text-center mt-4 relative h-5">
              <button
                onClick={updateEvent}
                className="AddBtn font-semibold absolute end-2 bg-orange-600 hover:bg-pink-700 hover:text-white text-white px-2 text-2xl"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditEvent;
