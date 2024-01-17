import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormEmployees = ({ value, onChange, onSubmit, isEditing }) => {
    const navigate = useNavigate();
    const [validation, setValidation] = useState({
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        password: true,
        role: true
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'first_name':
            case 'last_name':
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value); // Solo letras y espacios
            case 'username':
                return /^[a-zA-Z0-9]+$/.test(value); // Solo letras y números
            case 'password':
                return value.length >= 6; // Mínimo 6 caracteres
            default:
                return value.trim() !== ''; // No vacío para los demás campos
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(e);
        setValidation({ ...validation, [name]: validateField(name, value) });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = Object.keys(value).every((key) => validateField(key, value[key]));
    
        if (isValid) {
            onSubmit(e);
        } else {
            toast.error("Por favor, completa todos los campos correctamente.");
            setValidation({
                first_name: validateField('first_name', value.first_name),
                last_name: validateField('last_name', value.last_name),
                username: validateField('username', value.username),
                email: validateField('email', value.email),
                password: validateField('password', value.password),
                role: validateField('role', value.role)
            });
        }
    }

    return (
        <div className="m-10">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="flex flex-col  bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                {/* First Name Field */}
                <div className="grid grid-cols-3 gap-4 items-center mb-4">
    <label htmlFor="first_name" className="text-gray-700 font-semibold">Nombre</label>
    <input type="text" name="first_name" value={value.first_name} onChange={handleChange} placeholder="Nombre" className={`col-span-2 border-2 ${!validation.first_name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`} />
    {!validation.first_name && <p className="col-span-3 text-red-500 text-xs italic mt-1">El nombre solo debe contener letras y no puede estar vacío.</p>}
</div>


                {/* Last Name Field */}
                <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <label htmlFor="last_name" className="text-gray-700 font-semibold">Apellido</label>
                    <input type="text" name="last_name" value={value.last_name} onChange={handleChange} placeholder="Apellido" className={`col-span-2 border-2 ${!validation.last_name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`} />
                    {!validation.last_name && <p className="col-span-3 text-red-500 text-xs italic mt-1">El apellido solo debe contener letras y no puede estar vacío.   </p>}
                </div>

                {/* Username Field */}
                <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <label htmlFor="username" className="text-gray-700 font-semibold">Nombre de usuario</label>
                    <input type="text" name="username" value={value.username} onChange={handleChange} placeholder="Nombre de usuario" className={`col-span-2 border-2 ${!validation.username ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`} />
                    {!validation.username && <p className="col-span-3 text-red-500 text-xs italic mt-1">Este campo es obligatorio.</p>}
                </div>

                {/* Email Field */}
                <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                    <input type="email" name="email" value={value.email} onChange={handleChange} placeholder="Email" className={`col-span-2 border-2 ${!validation.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`} />
                    {!validation.email && <p className="col-span-3 text-red-500 text-xs italic mt-1">Este campo es obligatorio.</p>}
                </div>

                {/* Password Field */}
                {!isEditing && (
                    // Password Field
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <label htmlFor="password" className="text-gray-700 font-semibold">Password</label>
                        <input type="password" name="password" value={value.password} onChange={handleChange} placeholder="Password" className={`col-span-2 border-2 ${!validation.password ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`} />
                        {!validation.password && <p className="col-span-3 text-red-500 text-xs italic mt-1">La contraseña debe tener un mínimo de 6 caracteres.</p>}
                    </div>
                )}

                {/* Role Field */}
                <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <label htmlFor="role" className="text-gray-700 font-semibold">Rol</label>
                    <select name="role" value={value.role} onChange={handleChange} className={`col-span-2 border-2 ${!validation.role ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md focus:outline-none focus:border-blue-500`}>
                        <option value="">Seleccionar...</option>
                        <option value="waiter">Mesero</option>
                        <option value="cashier">Cajero</option>
                        <option value="chef">Cocinero</option>
                        {/* ...otros roles */}
                    </select>
                    {!validation.role && <p className="col-span-3 text-red-500 text-xs italic mt-1">Este campo es obligatorio.</p>}
                </div>

                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer mt-4"
                >

                    Guardar
                </button>
            </form>
        </div>
    )
}

export default FormEmployees;
