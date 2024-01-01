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



const OrderWaiters = () => {
  const [showItems, setShowItems] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [countByMenuItem, setCountByMenuItem] = useState({});
  const {products} = useProducts();
  const categoryfilter = products.filter((item) => item.category === selectedCategory);
  const { handlerCreateOrder } = useOrder();
  const [alerta, setAlerta] = useState({ tipo: null, mensaje: '' });
  const { tableId } = useParams(); // Obtiene el tableId de la URL
  const { handlerGetTablesById } = useTables(); // Tu hook personalizado
 const selectedTable = useSelector((state) => 
    state.table.tables.find(table => table.id.toString() === tableId) // Suponiendo que id es un número
  );
  

    useEffect(() => {
        if (tableId) {
            handlerGetTablesById(tableId); // Llama a la función para obtener los detalles de la mesa
        }
    }, [tableId, handlerGetTablesById]);

  const getItems = (category) => {
    setShowItems(true);
    setSelectedCategory(category);
  };

  const addCountItem = (itemId) => {
    const productPrice = products.find(product => product.id === itemId)?.price;

    setCountByMenuItem((prevCount) => ({
      ...prevCount,
      [itemId]: {
        count: (prevCount[itemId]?.count || 0) + 1,
        price: productPrice,
      }
    }));
  };

  const subtractCountItem = (itemId) => {
    const productPrice = products.find(product => product.id === itemId)?.price;
    setCountByMenuItem((prevCount) => ({
      ...prevCount,
      [itemId]: {
        count: prevCount[itemId] && prevCount[itemId].count > 0 ? prevCount[itemId].count - 1 : 0,
        price: productPrice,
      }
    }));
  };


  const calculateTotal = () => {
    return Object.values(countByMenuItem).reduce((total, itemId) => {
      // Asegúrate de que 'count' y 'price' sean números
      const count = Number(itemId.count) || 0;
      const price = Number(itemId.price) || 0;
  
      return total + (count * price);
    }, 0);
  };

  const calculateTotalPerItem = (itemId) => {
    const item = countByMenuItem[itemId];
    if (item) {
      return (item.count || 0) * (item.price || 0);
    }
    return 0;
  };

  useEffect(() => {

    }, [countByMenuItem]);


    const enviarOrdenCompleta = () => {
      // Recuperar el ID del empleado almacenado en localStorage
      const storedLogin = localStorage.getItem("login");
      let employeeId = null;
      if (storedLogin) {
        const loginData = JSON.parse(storedLogin);
        employeeId = loginData.employee.id;
      }
    
      // Crear la estructura de la orden
      const order = {
        date: new Date().toISOString().slice(0, 10), // Formato de fecha YYYY-MM-DD
        table_id: parseInt(tableId, 10),
        employee_id: employeeId,
        items_attributes: Object.entries(countByMenuItem).map(([productId, { count }]) => ({
          quantity: count,
          product_id: parseInt(productId, 10),
        })).filter(item => item.quantity > 0), // Filtra los productos que realmente se van a ordenar
      };
    
      // Aquí enviarías la orden completa a la base de datos o a través de una acción de Redux
      console.log('Enviando orden completa:', order);
      handlerCreateOrder(order);
    };

  return (
   <div >
        <NavEmployes/>
        <ToastContainer  />
        <div className='flex flex-row bg-science-blue-900 p-5 rounded-2xl my-5 w-full  justify-center'>
          <h1 className='font-bold text-white'>MESA {selectedTable.id}</h1>
         
        </div>
        <div className='flex flex-col'>
        <div className="md:flex flex-row md:justify-start">
          {menucategories.map((menucategory) => (
            <div key={menucategory.name} className="flex flex-col items-center justify-start w-full max-w-sm mx-auto p-5 transition duration-300 ease-in-out transform  hover:scale-110 " >
              <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                <img className="w-full h-36 rounded-lg" src={menucategory.img} alt="" />
              </div>

              <div className="w-48 -mt-5 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{menucategory.name}</h3>

                <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                
                  <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-science-blue-950  rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none" onClick={() => getItems(menucategory.category)}>
                    ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
          
      </div>
      <div className='grid grid-cols-5 gap-5 align-middle w-full p-20 justify-center'>
  {showItems == true &&
    categoryfilter.map((dataitems) => (
      <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-auto w-56 h-48 transition duration-300 ease-in-out transform  hover:scale-105" key={dataitems.id}>
        <div className="px-4 py-2">
          <h1 className="text-xs font-bold text-gray-800 uppercase dark:text-white">{dataitems.name}</h1>
          
        </div>
        <img className="w-full h-28 mt-2" src='' alt={dataitems.name}/>
        <div className="flex items-center justify-between px-4 py-2 bg-science-blue-900">
          <h1 className="text-lg font-bold text-white">${dataitems.price}</h1>
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none" onClick={() => subtractCountItem(dataitems.id)}>-</button>
          <p className='text-white'>{countByMenuItem[dataitems.id]?.count || 0}</p>
          <p className='text-white'>TOTAL: ${calculateTotalPerItem(dataitems.id).toFixed(2)}</p>
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none" onClick={()=> addCountItem(dataitems.id)}>+</button>
        </div>
      </div>
    ))}
    
</div>
        </div>
        <button className=' font-bold text-white border border- p-1 w-32 rounded-3xl bg-science-blue-600 transition duration-300 ease-in-out transform  hover:scale-110'
            onClick={() => enviarOrdenCompleta()}
          >Enviar Orden</button>
   </div>
  );
};

export default OrderWaiters;