import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormProducts = ({value, onChange, onSubmit}) => {
    const [validation, setValidation] = useState({
        name: true,
        price: true,
        image: true,
        category: true,
        description: true
    });

    const validateField = (name, value) => {
        if (name === "price") {
            return !(value < 0); // Price should not be negative
        }
        return value.trim() !== ''; // Other fields should not be empty
    }

    const handleChange = (e) => {
        onChange(e);
        setValidation({ ...validation, [e.target.name]: validateField(e.target.name, e.target.value) });
    }

    const handleValidationBeforeSubmit = () => {
        const newValidation = {};
        let isValid = true;
        Object.keys(value).forEach(key => {
            newValidation[key] = validateField(key, value[key]);
            if (!newValidation[key]) {
                isValid = false;
            }
        });

        setValidation(newValidation);
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidationBeforeSubmit()) {
            onSubmit(e);
        } else {
            toast.error("Por favor, completa todos los campos correctamente.");
        }
    }
    return (
        <div className="m-10">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="mb-4 flex items-center">
                    <label htmlFor="name" className="text-gray-700 font-semibold w-1/3 mr-4">Nombre</label>
                    <input type="text" name="name" value={value.name} onChange={handleChange} placeholder="Nombre" className={`border-2 ${!validation.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow`} />
                    {!validation.name && <p className="text-red-500 text-xs italic">Este campo es obligatorio.</p>}
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="price" className="text-gray-700 font-semibold w-1/3 mr-4">Precio</label>
                    <input type="number" name="price" value={value.price} onChange={handleChange} placeholder="Precio" className={`border-2 ${!validation.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow`} />
                    {!validation.name && <p className="text-red-500 text-xs italic">Este campo es obligatorio.</p>}
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="image" className="text-gray-700 font-semibold w-1/3 mr-4">Imagen</label>
                    <input type="text" name="image" value={value.image} onChange={handleChange} placeholder="Imagen"  className={`border-2 ${!validation.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow`} />
                    {!validation.name && <p className="text-red-500 text-xs italic">Este campo es obligatorio.</p>}
                </div>
                <div>
                    <label htmlFor="category" className="text-gray-700 font-semibold w-1/3 mr-4">Categoría</label>
                    <select
                        name="category"
                        value={value.category}
                        onChange={handleChange}
                        className={`border-2 ${!validation.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow`}
                    >
                        <option value="">Seleccionar...</option>
                        <option value="ensalada">Ensalada</option>
                        <option value="hamburguesa">Hamburgesa</option>
                        <option value="pizza">Pizza</option>
                        <option value="gaseosas">Gaseosas</option>
                        <option value="jugos">Jugo</option>
                        {/* ...otros roles */}
                    </select>
                    {!validation.name && <p className="text-red-500 text-xs italic">Este campo es obligatorio.</p>}
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="description" className="text-gray-700 font-semibold w-1/3 mr-4">Descripción</label>
                    <input type="text" name="description" value={value.description} onChange={handleChange} placeholder="Descripción" className={`border-2 ${!validation.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow`} />
                    {!validation.name && <p className="text-red-500 text-xs italic">Este campo es obligatorio.</p>}
                </div>
                <button  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer">
                    Guardar
                </button>
            </form>
        </div>
    )
    }

export default FormProducts;