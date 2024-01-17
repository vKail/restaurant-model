import React, { useState, useEffect } from 'react';
import { useProducts } from "../../hooks/useProducts";
import { NavLink } from 'react-router-dom';
import AdminAside from '../../Nav/AdminAside';


const TableProducts = () => {
    const { products, handlerGetProducts, handlerDeleteProduct } = useProducts();
    useEffect(() => {
        handlerGetProducts();
    }, [])
    console.log(products);
    return (
<div className='flex m-5'>
    <aside className='w-1/4'>
        <AdminAside />
    </aside>
    <div className='w-3/4'>
        <div className='flex flex-row justify-between'>
        <h1 className='font-bold p-2 m-2'>Lista de productos</h1>
        <NavLink
            className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
            to="/admin/newProduct"  
        >
            Nuevo producto
        </NavLink>
        </div>
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className='px-4 py-2'>Categoria</th>
                    <th className="px-4 py-2">Precio</th>
                    <th className="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-b">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.description}</td>
                        <td className='px-4 py-2'>{product.category}</td>
                        <td className="px-4 py-2">{product.price}</td>
                        <td>
                            <NavLink
                                className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                to={`/admin/editProduct/${product.id}`}
                            >
                                Editar
                            </NavLink>
                            <button
                                className="px-6 py-1 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                                onClick={() => handlerDeleteProduct(product.id)}
                                
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
    )
}

export default TableProducts