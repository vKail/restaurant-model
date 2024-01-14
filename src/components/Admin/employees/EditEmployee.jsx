import AdminAside from "../../Nav/AdminAside";
import FormEmployees from "./FormEmployees";
import { useEmployee } from "../../hooks/useEmployee";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditEmployee = () => {
    const employeeDetails = useSelector(state => state.employee.employeeById);
    const params = useParams();
    const employeeId = params.employeeId;
    const { employee, handlerGetEmployeeById, handlerUpdateEmployee } = useEmployee();
    const [formData, setFormData] = useState({
        first_name: employeeDetails?.first_name || '',
        last_name: employeeDetails?.last_name || '',
        username: employeeDetails?.username || '',
        email: employeeDetails?.email || '',
        role: employeeDetails?.role || '',
    });
    useEffect(() => {
        if (!employeeDetails || employeeDetails.id !== parseInt(employeeId)) {
            handlerGetEmployeeById(employeeId);
        }
    }, [employeeId, employeeDetails, handlerGetEmployeeById]);

    // Este useEffect se ejecutará cada vez que employeeDetails cambie.
    useEffect(() => {
        if (employeeDetails) {
            setFormData({
                first_name: employeeDetails.first_name || '',
                last_name: employeeDetails.last_name || '',
                username: employeeDetails.username || '',
                email: employeeDetails.email || '',
                role: employeeDetails.role || '',
            });
        }
    }, [employeeDetails]);
    


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Aquí manejarías la actualización del empleado
        handlerUpdateEmployee(employeeId, formData);
        console.log(formData);
    };
    return (
        <div className="flex m-5">
            <div className="w-1/4">
                <AdminAside />
            </div>
            <div className="w-3/4">
                <h1 className="font-bold text-2xl m-10">DATOS DEL EMPLEADO</h1>
                <FormEmployees value={formData} onChange={onChange} onSubmit={onSubmit} isEditing={true} />
            </div>
        </div>
    );
};

export default EditEmployee;
