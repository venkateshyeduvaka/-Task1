import React from 'react'
import HomeProduct from './HomeProduct'

const TrimmersCard =({category,heading,data}) => {
    return (
      <div>
        <h1 className='text-xl font-semibold pl-[3vw] mb-1'>{heading}</h1>
        <div className='flex overflow-y-scroll scrollbar-none'>
          {data.map((each)=><HomeProduct id={each._id} pdata={each}/>)}
        </div>
      </div>
    )
  }

export default TrimmersCard
