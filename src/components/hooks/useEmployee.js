import { getAllEmployees, getEmployeeById, newEmployee, removeEmployee, editEmployee } from "../services/employeeService";
import { setEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeByIdt } from "../../store/slices/employee/employeeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
                handlerGetEmployees();
                navigate("/admin/tableEmployees");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlerDeleteEmployee = async (id) => {
        try {
            const response = await Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras revertir esta accion!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });
            if (response.isConfirmed) {
                const response = await removeEmployee(id);
                if (response.status === 200) {
                    dispatch(deleteEmployee({ id }));
                    handlerGetEmployees();
                    Swal.fire(
                        'Eliminado!',
                        'El empleado ha sido eliminado.',
                        'success'
                    )
                }
            } else if (response.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'El empleado no ha sido eliminado',
                    'error'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Cancelado',
                'El empleado no ha sido eliminado',
                'error'
            )
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
