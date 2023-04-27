import React from 'react';

const Grids = () => {
    return (
        <section  className='grid lg:grid-cols-4 gap-x-2 gap-y-7 md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 py-10 px-28'>
            <div  className=' border-dashed md:border-r-2 md:border-dashed'>
<h1 className='text-xl font-bold font-open leading-10'>
Savor the Savings
</h1>
<p className='font-semibold text-gray-800'>Find Exclusive Deals and Discounts on Your Favorite Restaurants Today!.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
            <h1 className='text-xl font-bold font-open leading-10'>Stay Fashion-Forward </h1>        
            <p className='font-semibold text-gray-800'>Find the latest styles and trends at the best prices.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
            <h1 className='text-xl font-bold font-open leading-10'>Shop Smarter, Not Harder </h1>
            <p className='font-semibold text-gray-800'>Find Exclusive Deals and Discounts on Your Favorite Stores Today!.</p>
            </div>
            <div className=' border-dashed md:border-r-2 md:border-dashed'>
<h1 className='text-xl font-bold font-open  leading-10'>Real Support</h1>
<p className='font-semibold text-gray-800'>We provide 7 days a week one by one real support.</p>
            </div>
        </section>
    );
}

export default Grids;
