import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RemainingEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch remaining events from the server
  useEffect(() => {
    const fetchRemainingEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/remaining", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const remainingEvents = await response.json();
          console.log(remainingEvents)
          setEvents(remainingEvents);
        } else {
          console.error("Failed to fetch remaining events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching remaining events:", error);
      }
    };

    fetchRemainingEvents();
  }, []);

  // Function to update events after deletion
  const updateEventsAfterDeletion = (deletedEventId) => {
    const updatedEvents = events.filter(event => event._id !== deletedEventId);
    setEvents(updatedEvents);
  };

  // Function to delete an event
  const deleteEvent = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/events/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Event deleted successfully");
        updateEventsAfterDeletion(id);
        navigate("#");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // Function to mark event as completed
  const markEventAsCompleted = async (id) => {
    try {
      const response = await fetch("/events/status", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Event completed successfully");
        updateEventsAfterDeletion(id);
        navigate("#");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <Nav />
      <p className='text-center text-zinc-600 sm:mt-24 mt-28 font-semibold'>YOU HAVE {events.length} EVENTS REMAINING</p>
      <div>
        <div className="w-300 sm:w-[700px] card">
          <div className='font-bold text-black text-xl sm:text-3xl' style={{ borderBottom: '1px solid gray', paddingBottom: '0.7rem', marginBottom: '1rem' }}>
            <h2>Remaining Events ({events.length})</h2>
          </div>
          {events.map((event) => (
            <div key={event._id} className='bg-white p-2' style={{ borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ padding: '0.2rem 0rem' }}>{event.eventName}</p>
                <p className='text-xs text-green-400' style={{ padding: '0.2rem 0rem', marginTop: '-0.4rem' }}>{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}</p>
              </div>
              <div className="flex justify-center items-center gap-3" style={{ margin: '-1rem 0rem' }}>
                {/* <button onClick={() => { markEventAsCompleted(event._id) }} style={{ border: 'none', backgroundColor: 'white' }}>
                  <span className='text-blue-400 hover:text-green-500'>Done</span>
                </button> */}
                <button onClick={() => { deleteEvent(event._id) }} style={{ border: 'none', backgroundColor: 'white' }}>
                  <MdDelete className='deleteIcon text-green-500' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RemainingEvent;
