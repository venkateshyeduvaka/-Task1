// src/components/EarphonesCard.js
import React from 'react';
import HomeProduct from './HomeProduct';

const EarphonesCard = ({ category, heading, data }) => {
    return (
        <div>
            <h1 className='text-xl font-semibold pl-[3vw] mb-1'>{heading}</h1>
            <div className='flex overflow-x-scroll scrollbar-none'>
                {data.map((each) => <HomeProduct key={each._id} pdata={each} />)}
            </div>
        </div>
    );
};

export default EarphonesCard;
