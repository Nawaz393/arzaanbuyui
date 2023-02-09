import React,{useState,useEffect,useRef} from 'react';
import Grids from '../Component/Grids';
import HeadContent from '../Component/HeadContent';
import Navbar from '../Component/Navbar';
import Slide from '../Component/Slide';
import Item from '../Component/Item';
import gdata from "./data"
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import {RxDot} from 'react-icons/rx'
import img1 from "../assets/img/img1.jpg"
import img2 from "../assets/img/img2.jpg"
import img3 from "../assets/img/img3.jpg"
import img4 from "../assets/img/img4.jpg"
import {motion} from 'framer-motion'
import { Button,imagechange } from '../Component/Anime';

const Landing = () => {
  
    const [data,setdata]=useState();
    const slide=useRef(null);
    const [index,setindex]=useState(false);
const images=[img1,img2,img3,img4];
const [image,setImage]=useState(0);


    useEffect(()=>{
setdata(gdata);


    },[])


    const nextImage=()=>{
        
        if(image<data?.length-1){
            setImage(image+1)
        }
        else{
            setImage(0)
        }
    
    }


    const prevImage=()=>{


        if(image>0){
setImage(image-1)

        }
        else{
setImage(data?.length-1)
        }
    }
 const id=   setInterval(()=>{

nextImage()

    },10000)


    setTimeout(()=>{
clearInterval(id)
    },100000)
    return (
        <div className='flex flex-col '>
            <header className='w-full fixed '>
                <Navbar/>
                <motion.div
           


           
                
                >
                <Slide/>
                </motion.div>
             
            </header>
            <main className='flex flex-col my-32  absolute -z-10' >

<HeadContent/>

<Grids/>
<section className='my-4'>

    <h1  className='text-center md:text-9xl text-8xl font-bold mb-5 text-pink-500'>38 <sup className='-z-10'>+</sup></h1>
    <h3  className='text-center text-xl font-bold font-quick '>Stunnig Homepages</h3>
    <p className='text-center text-lg text-gray-500'> Choose a homepage to start navigating Flone. Build strong & impressive websites using Flone’s premade templates.</p>
</section>

<section className='my-4 w-full'>

<div className='  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1    px-8 gap-x-8'>
    {
        

data?.map((item,index)=>{


    return(

        <Item key={index} link={item.urls.regular} title={item.user.first_name}/>
    )
})
    }
    </div>
</section>

<section className='w-[97vw] my-16 h-96 relative flex -z-10 items-center justify-center'>

<MdChevronLeft className=' 
absolute top-52 left-16  md:left-28
  h-10 w-10 cursor-pointer'
  onClick={prevImage}
  />

<MdChevronRight className='  h-10 w-10 cursor-pointer absolute top-52 right-16 md:right-28' 

onClick={nextImage}
/>


{data && <motion.div
variants={imagechange}
initial='hidden'
animate='visible'

//https://images.unsplash.com/photo-1661956602153-23384936a1d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDc4Mzh8MXwxfGFsbHw2fHx8fHx8Mnx8MTY3NTg1NjIzOQ&ixlib=rb-4.0.3&q=80&w=1080
style={{backgroundImage:`url(${data[image].urls.regular })`}}
className=" w-10/12 h-full bg-cover bg-center rounded-sm shadow-lg"
>



</motion.div>}


</section>

<section className='my-4 px-2 -z-10  bg-blue-700'>

<h1 className='text-white font-Dance text-4xl  lg:text-6xl font-light px-20 py-10'>Immensity of templates and layouts With andvanced Option</h1>
<div className='flex flex-col md:flex-row'>


    <div >

    <p className='text-orange-400 text-9xl font-bold pl-11'>7<sup className=''>+</sup></p>
<h1 className='text-white font-bold text-3xl pl-11 py-4'>Premade Header</h1>
<p className='text-white lg:w-1/2  pl-11 font-quick'>Power up your pages with beautifully designed header styles. Each style comes with a variety of header options for your choice.</p>
    </div>
    <div>
    <p className='text-orange-400 text-9xl font-bold pl-11'>3<sup className=''>+</sup></p>
<h1 className='text-white font-bold text-3xl pl-11 py-4'>Premade Header</h1>
<p className='text-white  lg:w-1/2 pl-11 font-quick pb-10'>Power up your pages with beautifully designed header styles. Each style comes with a variety of header options for your choice.</p>
    </div>
</div>


</section>

<section className=''>

<div
ref={slide}
className='  overflow-x-scroll  flex scrollbar'>
   
{
data?.map((item,index)=>{
    return(
<img src={item.urls.regular} alt="not found"
key={index}
className='w-52 h-60 object-cover rounded-md mx-4 my-4'
/>
    )
})
}
</div>
<div className='flex justify-center items-center my-5'>
 <motion.div
 
variants={Button}
whileHover={"animate"}
 >
 <RxDot className='h-10 w-10 cursor-pointer'
onClick={()=>{
    slide.current.scrollLeft-=100;
}}
/> 
</motion.div>
<motion.div
variants={Button}
whileHover={"animate"}
>
<RxDot className='h-10 w-10 cursor-pointer'
onClick={()=>{

    slide.current.scrollRight-=100;
}}

/>
</motion.div>

<motion.div
variants={Button}
whileHover={"animate"}



>

<RxDot className='h-10 w-10 cursor-pointer'
onClick={()=>{

    slide.current.scrollLeft+=100;
}}

/>
</motion.div>

</div>



</section>


<section className='my-4 -z-10 '>


<div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6  py-3 px-4'>

{
    images.map((item,index)=>{


        return(
            <motion.img 
            variants={Button}
            whileHover='animate'
            
            src={item} key={index} alt="not found" className='w-full h-96 object-cover rounded-sm'/>
        )
    })
}



</div>


</section>

<section className='my-4 h-[70vh] -z-10 w-full  bottom-0 bg-pink-600  static'>

<div className='flex flex-col justify-center h-full items-center '>

<h1 className='text-white text-4xl font-quick font-bold py-4 '>Feeling in love?<span className='italic'>Purchase Flone !</span> </h1>
<p className='text-white text-bold py-3 '>Impressive design, powerful features, and easy customization</p>
<motion.button 
variants={Button}
whileHover='animate'
className='bg-white py-4 px-6 rounded-md font-semibold  my-4  hover:bg-slate-200' >Purchase Now
</motion.button>
</div>

</section>

            </main>
            
        </div>
    );
}

export default Landing;
