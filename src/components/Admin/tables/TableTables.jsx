import AdminAside from "../../Nav/AdminAside";
import {useTables} from "../../hooks/useTables";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
const TableTables = () => {
    const { tables, handlerGetTables, handlerDeleteTable } = useTables();
    useEffect(() => {
        handlerGetTables();
    }, [])
    return (
        <div className='flex m-5'>
            <aside className='w-1/4'>
                <AdminAside />
            </aside>
            <div className='w-3/4'>
                <div className="flex flex-row justify-between">
                    <h1 className="font-bold p-2 m-2">Mesas</h1>
                    <NavLink
                        className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        to="/admin/newTable"
                    >
                        Nueva mesa
                    </NavLink>
                </div>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Número</th>
                            <th className="px-4 py-2">Capacidad</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table) => (
                            <tr key={table.id} className="border-b">
                                <td className="px-4 py-2">{table.id}</td>
                                <td className="px-4 py-2">{table.capacity}</td>
                                <td>
                                    <button
                                        className="px-6 py-2 m-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
                                        onClick={() => handlerDeleteTable(table.id)}
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

export default TableTables