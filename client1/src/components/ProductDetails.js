import React, { useContext, useEffect, useState } from "react";

import Header from "./Header";
import {  useParams } from "react-router-dom";

import axios from "axios";
import { UserContext } from '../context/UserContext';


import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import RecommendedProducts from "./RecommendedProducts";


const ProductDetails = () => {

  const [productData, setItemDetails] = useState(null);
  const { productId } = useParams();

  const { AddtoCartItem} = useContext(UserContext);


  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/${productId}`);
        setItemDetails(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    getProductDetails();
  }, []);

  
  return (

    <div className=" min-h-screen w-screen">
      <Header className="fixed top-0 left-0 w-full z-10" />
    <div className="w-screen h-[90vh] overflow-y-scroll scrollbar-none pt-24">
      <div className="flex gap-6 py-8 px-10">
       
        <div className="w-[650px] h-[445px] bg-slate-200 rounded-lg p-4">
          <img
            src={productData?.imageUrl}
            alt={productData?.category}
            className="object-scale-down rounded-lg mix-blend-multiply h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>
            <p className="text-gray-900 text-2xl font-bold mb-1">
              {productData?.productname}
            </p>
            <span className="block text-gray-900 text-md capitalize">
              {productData?.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-lg text-yellow-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
          </div>
          <div className="flex items-center gap-4 mt-3">
          <span className="text-xl font-semibold text-gray-800"><span className='text-blue-800 text-xl font-semibold'>Price: </span>${productData?.price}</span>
          </div>
          <div className="flex items-center gap-5 mt-1">
            <button className="border-2 border-blue-500 text-gray-500 rounded-md py-1 px-20 text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all">
              Buy
            </button>
            <button
              onClick={() => AddtoCartItem(productData?._id)}
              className="text-white bg-red-500 border-2 border-red-500  rounded-md py-1 px-10 text-lg font-semibold hover:bg-red-600 transition-all"
            >
              Add to cart
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg text-red-400 font-semibold mb-1">
              Description
            </h3>
            <p className="text-md font-normal">{productData?.description}</p>
          </div>
        </div>
      </div>
      {productData?.category && (
        <RecommendedProducts
          category={productData?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
    </div>
  );
};

export default ProductDetails;
