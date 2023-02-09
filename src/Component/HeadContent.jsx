import React from 'react';
import img1 from "../assets/headbackground/img1.png"
import img2 from "../assets/headbackground/img2.png"
import img3 from "../assets/headbackground/img3.png"
import img4 from "../assets/headbackground/img4.png"
import img5 from "../assets/headbackground/img5.png"
import { main } from '../Component/Anime';
import {motion} from 'framer-motion'
const HeadContent = () => {
    return (
        <section className=' '>
<div className=' px-10  py-3 mb-16  lg:z-10 lg:w-2/3  '>
    <h1 className='text-5xl  lg:text-7xl  font-bold font-open px-14 tracking-tight mb-4 leading-tight '
    >Flone-Minimal  React Template</h1>
    <p className='text-gray-500 text-lg lg:px-8 lg:text-2xl font-semibold text-center'> A versatile React eCommerce Template for different purposes that emphasizes creativity,efficiency, and diversity.</p>
</div>
 <motion.div 
 
 
 className='grid grid-cols-3  lg:mt-28 -z-20  lg:-right-8 lg:overflow-hidden lg:top-16'>
  <motion.img
  
  variants={main}
 whileHover='animate'
  src={img1} className="lg:h-80 h-48 absoulte"/>
  <motion.img
  variants={main}
 whileHover='animate'
  src={img2} className="lg:h-80 h-48 absoulte"/>
  <motion.img
  variants={main}
 whileHover='animate'
  src={img3} className="lg:h-80 h-48 absoulte"/>
  <motion.img
  variants={main}
 whileHover='animate'
  src={img4} className="lg:h-80 h-48 absoulte"/>
  <motion.img
  variants={main}
 whileHover='animate'
  src={img5} className="lg:h-80 h-48 absoulte"/>
            </motion.div>

        </section>
    );
}

export default HeadContent;
