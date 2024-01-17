import logo from '/public/images/logo-restaurant.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminAside = () => {
    const {handlerLogout} = useAuth();
    return (
<aside className="w-64 bg-gray-100 p-5 h-screen shadow-md  ">
    <div className="flex justify-center mb-6">
        <img className='w-10 h-10 rounded-md' src={logo} alt="" />
    </div>
    <nav>
        <ul>
            <li className="mb-3">
                <NavLink to="/admin"  className="flex items-center px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                    <i className="fas fa-home mr-3"></i>
                    <span>Inicio</span>
                </NavLink>
            </li>
            <li className="mb-3">
                <NavLink to="/admin/tableEmployees"  className="flex items-center px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                    <i className="fas fa-users mr-3"></i>
                    <span>Empleados</span>
                </NavLink>
            </li>
            <li className="mb-3">
                <NavLink to="/admin/tableTables"  className="flex items-center px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                    <i className="fas fa-chair mr-3"></i>
                    <span>Mesas</span>
                </NavLink>
            </li>
            <li className="mb-3">
                <NavLink to="/admin/tableProducts"  className="flex items-center px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                    <i className="fas fa-utensils mr-3"></i>
                    <span>Productos</span>
                </NavLink>
            </li>
        </ul>
    </nav>
    <div className='my-10'>
        <button className='bg-red-600 text-white border hover:bg-red-700 px-4 rounded-md' onClick={() => handlerLogout()}>Salir</button>
      </div>
</aside>
    );
}

export default AdminAside;