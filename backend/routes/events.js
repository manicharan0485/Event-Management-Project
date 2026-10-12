import express from "express";
import verifyToken from "../middleware/auth.js";
import { User } from "../model/user.js";

const router = express.Router();

// creating a new event
router.post("/events", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const { eventName, description, date, location } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newEvent = {
      eventName,
      description,
      date,
      location,
      organizer: userId, // Assign the current user as the organizer of the event
    };

    console.log(userId)

    user.events.push(newEvent);
    await user.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for getting all events
router.get("/events", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("events");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ events: user.events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a specific event
router.get('/events/:eventId', verifyToken, async (req, res)=> {
  try {
    const userId = req.userId;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const event = user.events.find(event => event._id.toString() === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event found successfully", event });

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// updating a specific event
router.put("/events/edit/:eventId", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const eventId = req.params.eventId;

    const { eventName, description, date, location } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const eventIndex = user.events.findIndex(
      (event) => event._id.toString() == eventId
    );

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update the event
    user.events[eventIndex].eventName = eventName;
    user.events[eventIndex].description = description;
    user.events[eventIndex].date = date;
    user.events[eventIndex].location = location;

    await user.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: user.events[eventIndex],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deleting a specific event
router.post("/events/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const Id = req.body;
    const eventId = Id.id

    const user = await User.findById(userId);
console.log(eventId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const eventIndex = user.events.findIndex(
      (event) => event._id.toString() == eventId
    );

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove event from array
    user.events.splice(eventIndex, 1);

    await user.save();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for getting remaining events only
router.get("/remaining", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("events");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();
    const remainingEvents = user.events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate;
    });


    res.status(200).json(remainingEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// for getting completed events only
router.get("/completed", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("events");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();
    const completedEvents = user.events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });

    res.status(200).json(completedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
