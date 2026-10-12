import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import NoEvents from '../Components/NoEvents';
import AllEvents from './AllEvents';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch all events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/events", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData.events); // Assuming events are stored in a property named 'events'
          console.log(eventData.events);
        } else {
          console.error("Failed to fetch events:", response.status);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  // Delete event functionality
  const updateEventsAfterDeletion = (deletedEventId) => {
    const updatedEvents = events.filter(event => event._id !== deletedEventId);
    setEvents(updatedEvents);
  };

  const deleteEvent = async (id) => {
    try {
      const eventRoute = await fetch("http://localhost:4000/events/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
      });
      const eventData = await eventRoute.json();

      if (eventRoute.ok) {
        toast.success("Event deleted successfully");
        updateEventsAfterDeletion(id);
        navigate("/home");
      } else {
        toast.error(eventData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // Update event status
  const updateEventStatus = async (id) => {
    try {
      const eventRoute = await fetch("http://localhost:4000/events/status", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }),
      });
      const eventData = await eventRoute.json();

      if (eventRoute.ok) {
        toast.success("Event Completed!!");
        updateEventsAfterDeletion(id);
        navigate("/home");
      } else {
        toast.error(eventData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <section>
        <Nav />
      </section>
      <div className='mt-24 sm:mt-24'>
        {events.length !== 0 ? <AllEvents data={events} delete={deleteEvent} update={updateEventStatus} /> : <NoEvents />}
      </div>
    </>
  );
}

export default Home;
