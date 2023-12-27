import { useSelector } from "react-redux";
import {useTables} from "../hooks/useTables";
import { useEffect } from "react";
import { Link, Navigate, NavLink,Route,Routes } from "react-router-dom";


const Tables = () => {
    const { tables, handlerUpdateTableStatus} = useTables();
    return (

       <div className="h-screen  ">
             <div className="grid grid-cols-5 gap-5 bg-white  h-full">
            {tables.map((table) => (
                <div className="flex flex-row items-center w-full max-w-sm mx-auto p-5" key={table.id}>
                    <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md ">
                    </div>

                    <div className={`w-full overflow-hidden ${table.status === 'free' ? 'bg-green-200' : 'bg-red-200'} rounded-lg shadow-2xl md:w-64 dark:bg-gray-800` } >
                        <p className="text-2xl">MESA {table.id}</p>
                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{table.status}</h3>

                        <div className={`flex items-center justify-between px-3 py-2 ${table.status === 'free' ? 'bg-green-600' : 'bg-red-600'} dark:bg-gray-700`}>

                            <NavLink className="px-2 py-1 text-xs font-semibold text-slate-900 uppercase transition-colors duration-300 transform bg-gray-100 rounded hover:bg-gray-800 hover:text-white focus:bg-gray-700 focus:outline-none"
                                to={`/orders/${table.id}`} 
                                onClick={() => handlerUpdateTableStatus(table.id, 'free')}
                            >
                                Ordenar
                            </NavLink>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
       </div>
       
    );
};

export default Tables;