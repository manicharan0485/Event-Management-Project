import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

function CompleteEvent() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetching completed events
  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/completed", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData);
          console.log(eventData);
        } else {
          console.error("Failed to fetch events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchCompletedEvents();
  }, []);

  // Delete event functionality
  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`/events/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Event deleted successfully");
        // Update events list after deletion
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>  
      <Nav />
      <div className='mt-20'>
        <p className='text-center text-zinc-600 sm:mt-24 mt-28 font-semibold'>
          HI YOU HAVE COMPLETED {events.length} EVENTS
        </p>
        <div>
          <div className="w-300 sm:w-[700px] card">
            <div className='font-bold text-black text-xl sm:text-3xl' style={{ borderBottom: '1px solid gray', paddingBottom: '0.7rem', marginBottom: '1rem' }}>
              <h2>Completed Events ({events.length})</h2>
            </div>
            {
              events.map((event) => (
                <div key={event._id} className=' bg-white p-2' style={{ borderBottom: '1px solid lightgray', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="">
                    <p style={{ padding: '0.2rem 0rem' }}> {event.eventName} </p>
                    <p className='text-xs text-green-400' style={{ padding: '0.2rem 0rem', marginTop: '-0.4rem' }}>
                      {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-3" style={{ margin: '-1rem 0rem' }}>
                    <button onClick={() => { deleteEvent(event._id) }} style={{ border: 'none', backgroundColor: 'white' }}>
                      <MdDelete className='deleteIcon text-green-400' />
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default CompleteEvent;
