import { getAllEmployees, getEmployeeById, newEmployee, removeEmployee, editEmployee } from "../services/employeeService";
import { setEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeByIdt } from "../../store/slices/employee/employeeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useEmployee = () => {
    const navigate = useNavigate();
    const { employee } = useSelector((state) => state.employee);
    const dispatch = useDispatch();

    const handlerGetEmployees = async () => {
        try {
            const response = await getAllEmployees();
            if (response.status === 200) {
                sessionStorage.setItem("id", JSON.stringify(response.data));
                dispatch(setEmployee(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerGetEmployeeById = async (id) => {
        try {
            const response = await getEmployeeById(id);
            if (response.status === 200) {
                dispatch(getEmployeeByIdt(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerCreateEmployee = async (Employee) => {
        try {
            const response = await newEmployee(Employee);
            if (response.status === 200 || response.status === 201) {
                dispatch(createEmployee(response.data));
                navigate("/admin/tableEmployees");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerDeleteEmployee = async (id) => {
        try {
            const response = await removeEmployee(id);
            if (response.status === 200) {
                dispatch(deleteEmployee(id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerUpdateEmployee = async (id, employee) => {
        try {
            const response = await editEmployee(id, employee);
            if (response.status === 200 || response.status === 201) {
                dispatch(updateEmployee({ id }));
                handlerGetEmployees();
                navigate("/admin/tableEmployees");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        employee,
        handlerGetEmployees,
        handlerGetEmployeeById,
        handlerCreateEmployee,
        handlerDeleteEmployee,
        handlerUpdateEmployee,
    }
}
