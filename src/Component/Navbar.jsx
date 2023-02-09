import React from 'react';
import {motion} from 'framer-motion';
import { Button } from './Anime';
const Navbar = () => {
    return (
        <nav className=' flex h-14 bg-zinc-800 items-center px-4 '>
                <div>
                    <a href='#'>
                    <span className='text-white  font-nunito text-2xl tracking-wide' >envato</span>
                    <span className='text-green-500  text-2xl font-light tracking-normal '>market</span>
                    </a>
                </div>
            <div className='ml-auto'>
                <motion.button 
                variants={Button}
                whileHover='animate'
                
                className='bg-green-500  text-white font-quick px-5 py-1 rounded-md hover:bg-green-600 tracking-tight'>Buy now</motion.button>
            </div>
        </nav>
    );
}

export default Navbar;
