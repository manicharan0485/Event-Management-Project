import React from 'react';
import NoEventImg from '/TRemainder pic.jpg';
import { Link } from 'react-router-dom';

function NoEvents() {
  return (
    <section>
        <div className='m-auto sm:w-300'>
            <h1 className='text-center box-content mt-6 text-2xl text-purple-300 font-bold'>Be More Productive With Daily Event Reminder <br /> From <span className='text-center text-2xl text-green-300 font-bold mt-5'></span></h1>
            <div className='text-center'>
                <figure className='grid place-content-center'>
                    <img src={NoEventImg} className='w-[24rem] mt-0 text-center' title='No Event Added. Add Event Now!!' alt="No Event Available Image" />
                    <figcaption className='md:text-2xl font-bold text-teal-400'>OOPS!! No Event Added Today!</figcaption>
                </figure>
            </div>
        </div>
        <div className='flex justify-center items-center mt-4'>
            <Link to={'/addEvent'} className='text-xl sm:text-2xl font-semibold bg-green-500 px-3 rounded-sm text-white'>Add Event</Link>
        </div>
    </section>
  )
}

export default NoEvents;
