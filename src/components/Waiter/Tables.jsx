import { useSelector } from "react-redux";
import {useTables} from "../hooks/useTables";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";


const Tables = () => {
    const { tables} = useTables();
    return (

        <div className="grid grid-cols-4 gap-5">
            {tables.map((table) => (
                <div className="flex flex-row items-center justify-start w-full max-w-sm mx-auto p-5" key={table.id}>
                    <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                    </div>

                    <div className="w-48 -mt-5 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                        <p>{table.id}</p>
                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{table.status}</h3>

                        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">

                            <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
                                
                            >
                                Ordenar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tables;