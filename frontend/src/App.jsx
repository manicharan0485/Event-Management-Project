import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddEvent from "./Pages/AddEvent";
import RemainingEvent from "./Pages/RemainingEvent";
import CompleteEvent from "./Pages/CompleteEvent";
import EditEvent from "./Pages/EditEvent";
import NotFound from "./Pages/NotFound";
import addNotification from "react-push-notification";
import logo from "/TRemainder pic.jpg";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchAndCheckEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/remaining", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const events = await response.json();

        events.forEach((event) => {
          const reminderTime = new Date(event.reminderTime);
          const currentTime = new Date();
          // Check if current time matches the reminder time
          if (
            currentTime.getFullYear() === reminderTime.getFullYear() &&
            currentTime.getMonth() === reminderTime.getMonth() &&
            currentTime.getDate() === reminderTime.getDate() &&
            currentTime.getHours() === reminderTime.getHours() &&
            currentTime.getMinutes() === reminderTime.getMinutes()
          ) {
            console.log(reminderTime);
            addNotification({
              title: "Event Reminder",
              message: event.eventName,
              duration: 4000,
              icon: logo,
              native: true,
            });
          }
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchAndCheckEvents();

    // Check events every minute
    const intervalId = setInterval(fetchAndCheckEvents, 60000); // 60000 milliseconds = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/remainingEvent" element={<RemainingEvent />} />
        <Route path="/completedEvent" element={<CompleteEvent />} />
        <Route path="/events/edit/:eventId" element={<EditEvent />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
