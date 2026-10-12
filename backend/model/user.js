import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who organized the event
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to users who RSVP'd to the event
    }]
});

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function(value) {
                return this.password === value;
            },
            message: "Passwords do not match",
        },
    },
    events: [eventSchema]
});

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();

    } catch (error) {
        next(error);
    }
});

const Event = mongoose.model("Event", eventSchema);
const User = mongoose.model("User", userSchema);

export { Event, User };
