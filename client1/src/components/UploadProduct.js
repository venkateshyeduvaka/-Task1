// AddProduct.js
import React, { useState } from 'react';

import { toast } from 'react-toastify';

import Header from './Header';

import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';

import uploadImageToCloudinary from './uploadImageToCloudinary';

const UploadProduct = () => {
  const [productData, setProductData] = useState({
    imageUrl: '',
    productname: '',
    price: '',
    quantity: '',
    description: '',
    category: '',
    userid: '' // This should be populated based on the logged-in user's ID
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/product/add', productData);
      setProductData({imageUrl: '',productname: '',price: '',quantity: '',description: '',category: '',userid: ''})
      toast.success("Add to Cart Successfully", { position: "bottom-right" });
      //console.log(response.data);
      // Handle success (e.g., display a success message, reset the form, etc.)
    } catch (error) {
       console.log("ded")
      console.error('Error adding product:', error);
      // Handle error (e.g., display an error message)
    }
  };


  const data=localStorage.getItem("user")
  const userData = JSON.parse(data);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const cloudinaryImage = await uploadImageToCloudinary(file);
    setProductData({...productData,imageUrl:cloudinaryImage.url,userid:userData.user._id})
    
  };


  return  (
    <div className=" min-h-screen w-screen">
      <Header className="fixed top-0 left-0 w-full z-10" />
      <div className="pt-16 flex justify-center items-start">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 max-h-[90vh] pb-8 mx-auto bg-white p-6 w-[50vw] rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="flex flex-col gap-1">
                <span className="text-gray-900 font-medium">Image URL:</span>
                <label htmlFor="productImage" className="border border-gray-300 rounded-md h-24 bg-white flex flex-col justify-center items-center cursor-pointer">
                  <FaCloudUploadAlt className="text-3xl text-gray-800" />
                  <span className="text-sm text-gray-900 font-medium">Upload product image</span>
                  <input type="file" id="productImage" value="" onChange={handleUploadImage} className="hidden" />
                </label>
              </div>
              <div className="flex items-center flex-wrap gap-2 mt-2">
                {productData.imageUrl === "" ? (
                  <p className="text-xs text-red-500">*Please upload product images</p>
                ) : (
                  <div className="relative group">
                    <img src={productData.imageUrl} alt="product" className="h-20 w-20 border border-gray-300 bg-slate-50 rounded-md" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Product Name</label>
              <input type="text" name="productname" value={productData.productname} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Price</label>
              <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Quantity</label>
              <input type="number" name="quantity" value={productData.quantity} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Description</label>
              <textarea name="description" value={productData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded" required></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Category</label>
              <select name="category" value={productData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Category</option>
                <option value="trimmers">trimmers</option>
                <option value="speakers">speakers</option>
                <option value="processor">processor</option>
                <option value="earphones">Earphones</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">User ID</label>
              <input type="text" name="userid" value={productData.userid} className="w-full px-3 py-2 border rounded" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default UploadProduct;
