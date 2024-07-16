// src/components/Home.js
import React, { useContext, useEffect } from 'react';


import { UserContext } from '../context/UserContext';
import Header from './Header';
import EarphonesCard from './EarphonesCard';
import TrimmersCard from './TrimmersCard';
import SpeakersCard from './SpeakersCard';
import ProccessorCard from './ProccessorCard';

const Home = () => {
    const { categorizedProducts, fetchProducts } = useContext(UserContext);


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="h-screen w-screen">
            <div>
                <Header />
                <div className="pt-4 px-3 h-[90vh] overflow-y-auto scrollbar-none pb-8 pt-24 custom-scrollbar">
                    <h2 className="text-2xl font-semibold pl-[3vw] mb-3">
                        All Products
                    </h2>
                    <ul className="flex flex-col gap-6 px-4">
                        <EarphonesCard category={"earphones"} heading={"Popular Earphones"} data={categorizedProducts["earphones"]} />
                        <TrimmersCard category={"trimmers"} heading={"Popular Trimmers"} data={categorizedProducts["trimmers"]} />
                        <SpeakersCard category={"speakers"} heading={"Popular Speakers"} data={categorizedProducts["speakers"]} />
                        <ProccessorCard category={"processor"} heading={"Most popular Processor"} data={categorizedProducts["processor"]} />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
