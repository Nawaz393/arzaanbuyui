import React from 'react';

const Grids = () => {
    return (
        <section  className='grid lg:grid-cols-4 gap-x-2 gap-y-7 md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 py-10 px-28'>
            <div  className=' border-dashed md:border-r-2 md:border-dashed'>
<h1 className='text-xl font-bold font-open leading-10'>
    Lastest React & Redux
</h1>
<p className='font-semibold text-gray-800'>Latest React and Redux used.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
            <h1 className='text-xl font-bold font-open leading-10'>Mega Menu</h1>        
            <p className='font-semibold text-gray-800'>Mega Menu is the door that has the entrance to every pages of your site. It navigates things for bringing ease.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
            <h1 className='text-xl font-bold font-open leading-10'>Responsive Design</h1>
            <p className='font-semibold text-gray-800'>Flone is super responsive & work perfectly in all devices.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
<h1 className='text-xl font-bold font-open  leading-10'>Real Support</h1>
<p className='font-semibold text-gray-800'>We provide 7 days a week one by one real support.</p>
            </div>
        </section>
    );
}

export default Grids;
