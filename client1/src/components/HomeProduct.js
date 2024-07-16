// src/components/HomeProduct.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const HomeProduct = ({ pdata }) => {
    const { AddtoCartItem } = useContext(UserContext);

    if (!pdata) {
        return null;
    }

    const { _id, imageUrl, price, productname, category } = pdata;

    return (
        <Link  to={"/product/" +_id}>
        <li className=" flex flex-col justify-center items-center custom-shadow border border-gray-400 w-52  m-2 max-h-[40vh] px-4 py-4 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
            <img
                src={imageUrl}
                alt="product"
                className="w-[100px] h-28 m-auto mb-1 object-cover rounded"
            />
            <span className="text-blue-800 text-sm font-semibold block text-center mb-1">{productname}</span>
            <span className="text-gray-800 text-sm font-semibold block text-center mb-1">Category: {category}</span>
            <span className="text-sm font-semibold text-gray-800"><span className='text-blue-800 text-sm font-semibold'>Price: </span>${price}</span>
            <button onClick={() => AddtoCartItem(_id)}  className='flex items-center mt-1 h-[30px] w-[100px] gap-2 bg-blue-500 rounded-md px-3 py-[2px] text-white text-sm'>
               ADD CART
            </button> 
        </li>
        </Link>
    );
};

export default HomeProduct;
