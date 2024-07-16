import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { FiShoppingCart } from "react-icons/fi";


const Cart = () => {

  const [totalPrice,setTotal]=useState(0)
  const [quantity,setQuantity]=useState(0)

  const navigate=useNavigate()

  const { cartProducts,user,RemovetoCartItem} =useContext(UserContext);
  console.log("cart items")
console.log(cartProducts)

const getTotalPriceAndQuantity = () => {
  let totalQty = 0;
  let totalPrice = 0;
  cartProducts.forEach((item) => {
    totalQty += 1;
    totalPrice += item.price;
  });
  setQuantity(totalQty)
  setTotal(totalPrice)

};

useEffect(()=>{
  getTotalPriceAndQuantity()
},[cartProducts])
  return (
    <div className="w-screen h-[85vh] py-5 px-10 pt-24">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Cart</h2>
      <div className="w-full h-full flex gap-8">
      <ul className="flex flex-col gap-3 rounded-lg bg-white h-full w-[60%] overflow-y-scroll scrollbar-none py-4 px-6 border">
          {cartProducts.length === 0 ? (
            <div className="flex h-full  flex-col justify-center items-center">
              <FiShoppingCart className="h-20 w-40 text-blue-700" />
              <p className="text-2xl font-semibold text-gray-900">Your Cart is Empty</p>
              <button onClick={() => navigate("/")} className=" flex items-center mt-1 h-[30px] w-[100px] gap-2 bg-blue-500 rounded-md px-3 py-[2px] text-white text-sm">Shop now</button>
            </div>
          ) : (
            cartProducts.map((cartItem) => {
              return (
                <li
                  className="bg-slate-50 shadow-sm rounded-lg w-full h-full flex"
                  key={cartItem?._id}
                >
                  <div className="h-24 w-28 bg-slate-200 rounded-lg p-2">
                    <img
                      src={cartItem.imageUrl}
                      alt={cartItem?.category}
                      className="h-full w-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="py-2 px-4 w-full">
                    <span className="text-md font-semibold text-ellipsis line-clamp-1">
                      {cartItem.productname}
                    </span>
                    <span className="text-md font-semibold text-ellipsis line-clamp-1">
                      Category : {cartItem.category}
                    </span>
                    <span className="text-md font-semibold text-ellipsis line-clamp-1">
                      Price: ${cartItem.price}
                    </span>
                    <div className="flex justify-around">
                      <button onClick={() => RemovetoCartItem(cartItem._id)} className="bg-red-400 self-stretch text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Remove
                      </button>
                      <button className="bg-green-400 self-stretch text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>

        <div className="w-[40%] flex flex-col gap-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold bg-red-500 text-white rounded-sm pb-2 pt-1">
              Summary
            </h3>
          </div>
          <div className="bg-white w-full rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 text-lg font-medium">
              <span className='text-blue-800 text-xl font-semibold'>Total Quantity :</span>{quantity}
              </span>
              
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 text-lg font-medium">
              <span className='text-blue-800 text-xl font-semibold'>Total Price :</span>${totalPrice}
              </span>
              <span className="text-red-500 text-lg font-semibold">
                {/*displayInrCurrency(totalDetails.totalPrice)*/}
                
              </span>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-blue-600 trasition-all rounded-full text-white font-semibold w-full py-1.5">
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
