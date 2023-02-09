import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Anime';
const Slide = () => {
    return (
        <div className='flex items-center justify-between  px-12 h-20 bg-gray-100  opacity-80 '>
            <a href='#' className='text-4xl font-bold font-sans tracking-wide '>
                Flone.
                </a>
<ul className="lg:flex  w-1/4 justify-evenly hidden">
    <li  className="text-lg font-open tracking-tighter font-semibold  hover:underline"><a href='#'>Demos</a></li>
    <li  className='text-lg font-open tracking-tighter font-semibold hover:underline'><a href='#'>Features</a></li>
    <li  className='text-lg font-open tracking-tighter font-semibold hover:underline'><a href='#'>Support</a></li>
</ul>
            <motion.button 
            
            variants={Button}
            whileHover='animate'
            className='text-sm font-quick font-semibold bg-white py-4 px-8 rounded-md'>
                Purchase
             </motion.button>
        </div>
    );
}

export default Slide;
