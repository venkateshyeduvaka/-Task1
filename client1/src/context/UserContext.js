
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ fullname: "", username: "", gender: "", password: "", address: "" });
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [product, setProduct] = useState({imageUrl: '',productname: '',price: '',quantity: '',description: '',category: '',userid: '' });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categorizedProducts, setCategorizedProducts] = useState({
        earphones: [],
        trimmers: [],
        speakers: [],
        processor: []
    });

    
    const [categoryProducts,setCategoryProducts]=useState([])

    const [cartProducts,setCartProducts]=useState([])

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchProducts();
        updateCartCount();
        loadCartProducts()
    }, []);

    const loadCartProducts = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.user && userData.user.cart) {
            const productDetails = await Promise.all(userData.user.cart.map(id => fetchProductDetails(id)));
            setCartProducts(productDetails);
        }
    };

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/product/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    const updateCartProduct = async (id) => {
        const productDetail = await fetchProductDetails(id);
        if (productDetail) {
            setCartProducts((prevCartProducts) => [...prevCartProducts, productDetail]);
        }
    };

    const updateCartCount = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.user && userData.user.cart) {
            setCartCount(userData.user.cart.length);
        } else {
            setCartCount(0);
        }
    };


    const handleChange = (e, isLogin = false, isProduct = false) => {
        if (isLogin) {
            setLoginData({ ...loginData, [e.target.name]: e.target.value });
        } else if (isProduct) {
            if (e.target.name === "image") {
                setProduct({ ...product, [e.target.name]: e.target.files[0] });
            } else {
                setProduct({ ...product, [e.target.name]: e.target.value });
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const registerUser = async (user, navigate) => {
        setError("");

        if (!user.fullname || !user.username || !user.gender || !user.password) {
            setError("All fields are required except address");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:4000/user/register", user);
            console.log("Registration successful:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Register User Successfully", { position: "bottom-right" });
            navigate("/");
        } catch (err) {
            setError("Registration failed");
            console.error("Registration error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const loginUser = async (loginData, navigate, toast) => {
        setError("");

        if (!loginData.username || !loginData.password) {
            setError("All fields are required");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:4000/user/login", loginData);
            console.log("Login successful:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Login Successfully", { position: "bottom-right" });
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product/');
            const fetchedProducts = response.data;
            categorizeProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const categorizeProducts = (products) => {
        const categorized = {
            earphones: [],
            trimmers: [],
            speakers: [],
            processor: []
        };

        products.forEach((product) => {
            const { category } = product;
            if (categorized[category]) {
                categorized[category].push(product);
            }
        });

        setCategorizedProducts(categorized);
    };


    const PerticularCategory = (category) => {
        console.log("Fetching particular category:", category); // Debug statement
        const data = categorizedProducts[category];
        console.log("Fetched category data:", data); // Debug statement
        setCategoryProducts(data);
    };

  

    const AddtoCartItem = async (id) => {
        const data = { productId: id };
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData) {
            setError("User not logged in");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/user/addcart/${userData.user._id}`, data);
            console.log("Added to cart:", response.data.user.cart);
            const updatedUser = { ...userData, user: { ...userData.user, cart: response.data.user.cart } };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setCartCount(response.data.user.cart.length);
            setUser(updatedUser.user);
            await updateCartProduct(id);
            toast.success("Add to CartItem Successfully", { position: "bottom-right" });

        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const RemovetoCartItem = async (id) => {
        console.log("RemovetoCartItem")
        const data = { productId: id };
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (!userData) {
            setError("User not logged in");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/user/removecart/${userData.user._id}`, data);
            console.log("Removed from cart:", response.data.user.cart);
            const updatedUser = { ...userData, user: { ...userData.user, cart: response.data.user.cart } };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setCartCount(response.data.user.cart.length);
            setUser(updatedUser.user);

            // Update cartProducts state
            setCartProducts((prevCartProducts) => prevCartProducts.filter(item => item._id !== id));
            toast.success("Remove to CartItem Successfully", { position: "bottom-right" });
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };


    return (
        <UserContext.Provider value={{
            user, loginData, product, categorizedProducts, error, isSubmitting,cartCount,cartProducts,
            handleChange, registerUser, loginUser,  fetchProducts, AddtoCartItem,RemovetoCartItem,PerticularCategory
        }}>
            {children}
        </UserContext.Provider>
    );
};
