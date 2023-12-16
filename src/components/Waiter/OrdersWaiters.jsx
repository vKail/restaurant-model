import React, { useEffect, useState } from 'react';
import { menucategories } from '../data/menucategories';
import { dataitemsmenu } from '../data/dataitemsmenu';
import { TEInput, TERipple } from "tw-elements-react";
import NavEmployes from '../Nav/NavEmployes';

const OrderWaiters = () => {
  const [showItems, setShowItems] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [countByMenuItem, setCountByMenuItem] = useState({});

  const categoryfilter = dataitemsmenu.filter((item) => item.category === selectedCategory);

  const getItems = (category) => {
    setShowItems(true);
    setSelectedCategory(category);
  };

  const addCountItem = (itemId) => {
    setCountByMenuItem((prevCount) => ({
      ...prevCount,
      [itemId]: (prevCount[itemId] || 0) + 1,
    }));
  };
  useEffect(() => {

    }, [countByMenuItem]);

  return (
   <div >
        <NavEmployes/>
        <div className='bg-blue-950 w-full p-5 m-0 '>
            <h1 className='text-white'>Pedido Mesa 2</h1>
        </div>
        <div className='flex flex-col'>
        <div className="md:flex flex-row md:justify-start">
          {menucategories.map((menucategory) => (
            <div className="flex flex-col items-center justify-start w-full max-w-sm mx-auto p-5" key={menucategory.id}>
              <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                <img className="w-full h-36 rounded-lg" src={menucategory.img} alt="" />
              </div>

              <div className="w-48 -mt-5 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{menucategory.name}</h3>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                
                  <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none" onClick={() => getItems(menucategory.category)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className='grid grid-cols-3 gap-3 align-middle w-full p-20 justify-center'>
  {showItems == true &&
    categoryfilter.map((dataitems) => (
      <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto w-48 h-48">
        <div className="px-4 py-2">
          <h1 className="text-xs font-bold text-gray-800 uppercase dark:text-white">{dataitems.name}</h1>
        </div>

        <img className="w-full h-full mt-2" src={dataitems.img} alt="NIKE AIR"/>

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-lg font-bold text-white">$129</h1>
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Add to cart</button>
        </div>
      </div>
    ))}
</div>
        </div>
   </div>
  );
};

export default OrderWaiters;