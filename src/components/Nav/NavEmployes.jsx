
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const NavEmployes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {handlerLogout} = useAuth();

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
          <img className='w-10 h-10 rounded-md' src="../images/logo-restaurant.jpg" alt="" />
          </div>
          
          {/* Botón de menú móvil */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                {!isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enlaces de menú para pantallas medianas y grandes */}
        <div className={`items-center ${isOpen ? 'flex' : 'hidden'} md:flex`}>
          <div className="flex flex-col mt-2 space-y-1 md:flex-row md:mt-0 md:space-x-8 md:space-y-0">
            {/* Enlaces de navegación aquí */}
            <Link to={'/mesas'} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 ease-in-out transform  hover:scale-110">Mesas</Link>
            <Link to={'/orders-created'} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 ease-in-out transform  hover:scale-110">Pedidos</Link>
            
          </div>
        </div>
        <button className='bg-white text-red-400 border border-red-600 px-4 rounded-md' onClick={() => handlerLogout()}>Salir</button>
      </div>
      
    </nav>
  );
};


export default NavEmployes;