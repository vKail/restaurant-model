import React, { useEffect, useState } from 'react';
import { menucategories } from '../data/menucategories';
import NavEmployes from '../Nav/NavEmployes';
import { useProducts } from '../hooks/useProducts';
import { useParams } from 'react-router-dom';
import { useTables } from '../hooks/useTables';
import { useSelector } from 'react-redux';
import { useOrder } from '../hooks/useOrder';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { decrementProductCount, incrementProductCount } from '../../store/slices/products/productSlice';
import { useDispatch } from 'react-redux';
import { setProductCount } from '../../store/slices/products/productSlice';


const OrderWaiters = ({ mode }) => {
  const navigate = useNavigate();
  const {handlerUpdateTableStatus} = useTables();
  const [showItems, setShowItems] = useState(false);
  const { orderId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [countByMenuItem, setCountByMenuItem] = useState({});
  const {products, handlerGetProducts} = useProducts();
  const categoryfilter = products.filter((item) => item.category === selectedCategory);
  const { handlerCreateOrder } = useOrder();
  const [alerta, setAlerta] = useState({ tipo: null, mensaje: '' });
  const { tableId } = useParams(); // Obtiene el tableId de la URL
  const dispatch = useDispatch();
    const productos = useSelector((state) => state.product.products);
    const order = useSelector((state) =>
        state.order.orders.find((o) => o.id == orderId)
    );

    useEffect(() => {
      if (mode === 'update' && order) {
          order.items.forEach((item) => {
              dispatch(setProductCount({ productId: item.product.id, count: item.quantity }));
          });
      }
  }, [dispatch, order, mode]);


  const getItems = (category) => {
    setShowItems(true);
    setSelectedCategory(category);
  };

  const addCountItem = (productId) => {
    dispatch(incrementProductCount({ productId }));
  };

  const subtractCountItem = (productId) => {
    dispatch(decrementProductCount({ productId }));
  };

  useEffect(() => {

    }, [countByMenuItem]);


 

  return (
   <div className=''>
        <div className=''>
        <div className="md:grid md:grid-cols-3 md:gap-3 lg:grid lg:grid-cols-4 lg:gap-4 xl:grid xl:grid-cols-5 xl:gap-5">
          {menucategories.map((menucategory) => (
            <div key={menucategory.name} className="flex flex-col items-center justify-start w-full max-w-sm mx-auto p-5 transition duration-300 ease-in-out transform  hover:scale-110 " onClick={() => getItems(menucategory.category)}>
              <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                <img className="w-full h-36 rounded-lg" src={menucategory.img} alt="" />
              </div>

              <div className="w-48 -mt-5 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{menucategory.name}</h3>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                
              
                </div>
              </div>
            </div>
          ))}
          
      </div>
      <div className='md:grid md:grid-cols-3 md:gap-3 lg:grid lg:grid-cols-5 lg:gap-5 align-middle w-full  justify-center '>
      {showItems &&
        categoryfilter.map((dataitem) => (
          
          <div
            className="max-w-xs overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800 my-5 mx-auto w-56 h-48 transition duration-300 ease-in-out transform hover:scale-105"
            key={dataitem.id}
          >
            <div className="px-4 py-2">
              <h1 className="text-xs font-bold text-gray-800 uppercase dark:text-white">
                {dataitem.name}
              </h1>
            </div>
            <img className="w-full h-28 mt-2" src={dataitem.image || ''} alt={dataitem.name} />
            <div className="flex items-center justify-between px-4 py-2 bg-science-blue-900">
              <h1 className="text-lg font-bold text-white">${dataitem.price}</h1>
              <button
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                onClick={() => subtractCountItem(dataitem.id)}
              >
                -
              </button>
              {/* Aquí se muestra la cantidad directamente desde Redux */}
              <span className='text-white'>{dataitem.count}</span>
              <button
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                onClick={() => addCountItem(dataitem.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
    
</div>
        </div>
</div>
  );
};

export default OrderWaiters;