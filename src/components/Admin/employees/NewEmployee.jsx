import React, { useState } from 'react';
import AdminAside from '../../Nav/AdminAside';
import FormEmployees from './FormEmployees';
import { useEmployee } from '../../hooks/useEmployee';


const NewEmployee = () => {
    const { employees, handlerCreateEmployee } = useEmployee();
    const [newEmployeeData, setNewEmployeeData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        role: '',
        // ... any other fields you have
    });
    const onSubmit = (e) => {
        e.preventDefault();
        handlerCreateEmployee(newEmployeeData);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex m-2">
           <div className='w-1/4 h-full'>
                <AdminAside />
           </div>
           <div className='w-3/4'>
            <h1 className='font-bold text-2xl m-5'>DATOS DEL EMPLEADO</h1>
            <FormEmployees value={newEmployeeData} onChange={onChange} onSubmit={onSubmit}/>

           </div>
        </div>
    );
}

export default NewEmployee;