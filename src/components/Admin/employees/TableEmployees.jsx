import AdminAside from "../../Nav/AdminAside"
import {useEmployee} from "../../hooks/useEmployee"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

const TableEmployees = () => {
    const { employee, handlerGetEmployees } = useEmployee();
    useEffect(() => {
        handlerGetEmployees();
    }, [])
    return (
        <div className='flex m-5'>
            <aside className='w-1/4'>
                <AdminAside />
            </aside>
            <div className='w-3/4'>
               <div className="flex flex-row justify-between">
               <h1 className="font-bold p-2 m-2">Empleados</h1>
                <NavLink
                    className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
                    to="/admin/newEmployee"
                >
                    Nuevo empleado
                </NavLink>
               </div>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Rol</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((emp) => (
                            <tr key={emp.id} className="border-b">
                                <td className="px-4 py-2">{emp.first_name}</td>
                                <td className="px-4 py-2">{emp.last_name}</td>
                                <td className="px-4 py-2">{emp.email}</td>
                                <td className="px-4 py-2">{emp.role}</td>
                                <td>
                                    <NavLink
                                        className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                        to={`/admin/editEmployee/${emp.id}`}
                                    >
                                        Editar
                                    </NavLink>
                                    {emp.role 
                                    !== 'admin' && ( // Check if employee is not an admin
                                        <button
                                            className="px-6 py-1 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                                            // onClick for delete
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableEmployees