import React, { useEffect, useState } from 'react';
import OrderWaiters from "./OrdersWaiters";
import NavEmployes from "../Nav/NavEmployes";
import { useParams } from 'react-router-dom';
import {useOrder} from '../hooks/useOrder';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Importa tu hook o método para obtener los detalles de una orden existente

const UpdateOrders = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const orderDetails = useSelector(state =>
    state.order.orders.find(order => order.id === parseInt(orderId))
  );
  const { handlerAddItemsOrder } = useOrder();
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);

  const enviarOrdenActualizada = () => {
    const selectedProducts = products.filter(product => product.count > 0);
  
    const items_attributes = selectedProducts.map(({ id, count }) => ({
      quantity: count,
      product_id: id,
    }));
  
    handlerAddItemsOrder(orderId, items_attributes);
    navigate('/ordesCreated');
  };

  return (
    <div>
      <NavEmployes />
        <div className='flex flex-row bg-science-blue-900  rounded-2xl my-5 w-full justify-center'>
        <h1 className='font-bold m-4 text-white'>Actualizar orden {orderId}</h1>
        </div>
      <OrderWaiters  mode="update" />
      <button
                className='font-bold text-white border p-1 w-32 rounded-3xl bg-science-blue-600 transition duration-300 ease-in-out transform  hover:scale-110'
                onClick={() => enviarOrdenActualizada()}
                disabled={products.filter(product => product.count > 0).length === 0}
            >
                Actualizar Orden
            </button>
    </div>
  );
};

export default UpdateOrders;