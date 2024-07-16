import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";



const RecommendedProducts = ({ category, heading }) => {

  const [data, setData] = useState([]);
  const { AddtoCartItem, PerticularCategory, categorizedProducts } = useContext(UserContext);

  useEffect(() => {
    if (category) {
      const fetchProducts = async () => {
        PerticularCategory(category);
        setData(categorizedProducts[category]);
      };

      fetchProducts();
    }
  }, [category, PerticularCategory, categorizedProducts]);


  return (
    <div className="px-3 md:px-10 py-1 md:py-3">
      <h1 className="font-semibold text-xl">{heading}</h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-between gap-8 rounded-lg my-3 w-full h-full">
        {data.map((product, i) => {
          return (
            <Link
              to={"/product/"+product?._id}
              key={product?._id + i}
            >
              <li className="bg-white w-56 min-w-56 h-64 md:w-40 md:h-72 shadow-md rounded-lg border">
                <div className="bg-slate-200 min-w-28 md:min-w-28 h-32 md:h-36 p-4 md:p-3 rounded-lg">
                  <img
                    src={product?.imageUrl}
                    alt={product?.category}
                    className="h-full w-full mix-blend-multiply object-scale-down transition-all hover:scale-110"
                  />
                </div>
                <div className="p-2 flex flex-col gap-1 min-w-[60%]">
                  <span className="font-semibold md:text-ellipsis line-clamp-1 text-sm md:text-md">
                    {product?.productname}
                  </span>
                  <span className="capitalize text-sm md:text-md">
                    {product?.category}
                  </span>
                  <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-gray-800"><span className='text-blue-800 text-sm font-semibold'>Price: </span>${product?.price}</span>
                  </div>
                  <button
                  onClick={() => AddtoCartItem(product?._id)}
                    className="bg-red-500 mt-2 mx-2 outline-none text-white pb-0.5 px-3 rounded-full hover:bg-red-600 hover:scale-105"
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendedProducts;
