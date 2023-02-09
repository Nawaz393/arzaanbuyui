import React,{useEffect} from 'react';
import { motion } from 'framer-motion';
import { image } from './Anime';
const Item = ({link,title}) => {
    return (
        <div className='my-10 h-80 w-auto'>

   <motion.div

            variants={image}
            whileHover='animate'
   
   style={{
    backgroundImage:`url(${link})`,
            }}
            // lg:w-80   md:w-10/12  w-10/12
            className='w-full h-full bg-cover bg-center rounded-sm shadow-lg'
   ></motion.div>
           
           <h5
           
           className='text-center text-xl font-bold py-4 font-quick'
           >{title}</h5>
           
           
        </div>
    );
}

export default Item;
