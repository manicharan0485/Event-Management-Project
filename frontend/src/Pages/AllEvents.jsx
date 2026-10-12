import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function AllEvents(props) {
    const events = props.data;

    const navigate = useNavigate();

    return (
        <div>
            {/* <h1 className='mb-8 text-center box-content mt-6 text-xl sm:text-2xl text-pink-700 font-bold'>"Be More Productive With Daily Event Reminders <br /> From <span className='text-center text-2xl text-orange-600 font-bold mt-5'>Event Scheduler </span></h1> */}
            <div className='text-center sm:text-left'>
                <span className='p-3 text-pink-400 text-[15px] sm:text-xl font-bold shadow'>Your All Events({events.length})</span>
            </div>
            <div className='p-4 mt-12'>
                <div className='flex justify-center flex-wrap gap-6'>
                    {events.map((event) => {
                        return (
                            <div key={event._id} className={`w-[300px] sm:w-[340px] shadow-lg border p-3`}>
                                <h2 className="text-2xl font-bold text-neutral-500 mb-2">{event.eventName}</h2>
                                <p className="text-slate-600 mb-2">{event.description}</p>
                                <p className="text-pink-700">
                                    Date: {new Date(event.date).toLocaleDateString()} :{" "}
                                    Time: {new Date(event.date).toLocaleTimeString()}
                                </p>
                                <p className="text-pink-700">Location: {event.location}</p>
                                <div className="flex justify-around items-center">
                                    <button onClick={() => { navigate(`/events/edit/${event._id}`) }} > <FaEdit className="text-xl text-green-600 hover:text-red-500" /> </button>
                                    <button onClick={() => { props.delete(event._id) }} > <MdOutlineDelete className="text-xl text-green-600 hover:text-red-500 " /> </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="text-center mt-4 relative h-5">
                <button
                    onClick={() => { navigate('/addEvent') }}
                    className="AddBtn font-semibold fixed bottom-4 sm:bottom-12 right-2 sm:right-12 end-2 bg-orange-600 hover:bg-pink-700 hover:text-white text-white px-2  text-xl sm:text-2xl"
                >
                    Add
                </button>
                {/* <button
                onClick={addEventHandler}
                className="AddBtn font-semibold absolute end-2 bg-orange-600 hover:bg-pink-700 hover:text-white text-white px-2 text-2xl"
              >
                Add
              </button> */}
            </div>
        </div>
    )
}

export default AllEvents;
