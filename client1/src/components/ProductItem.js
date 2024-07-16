import React from 'react'
import { FaRegStar } from "react-icons/fa";

const ProductItem = () => {
  return (
    <div>
        <li className="custom-shadow border border-gray-400 w-64 min-h-[40vh] px-4 py-4 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
            <img
                src="https://res.cloudinary.com/dwhep9ts2/image/upload/v1690553529/sample.jpg"
                alt="product"
                className="w-[150px] h-48 m-auto mb-5 object-cover rounded"
            />
            <span className="text-gray-800 text-lg font-semibold block text-center mb-3">BOOK</span>
            <span className="text-gray-800 text-lg font-semibold block text-center mb-3">DESCRIPCTION</span>
            <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-gray-900">Price: $200</span>
                <div className="flex items-center gap-2 bg-blue-500 rounded-md px-3 py-[2px] text-white">
                    <span>4.5</span>
                    <FaRegStar />
                </div>
            </div>
        </li>
    </div>
  )
}

export default ProductItem
