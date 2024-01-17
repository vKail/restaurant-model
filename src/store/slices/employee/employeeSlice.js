import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: [],
        employeeById: [],
    },
    reducers: {
        setEmployee: (state, action) => {
            state.employee = action.payload;
        },
        createEmployee: (state, action) => {
            state.employee.push(action.payload);
        },
        updateEmployee: (state, action) => {
            const { id, newEmployee } = action.payload;
            const index = state.employee.findIndex(employee => employee.id === id);
            if (index !== -1) {
                state.employee[index] = newEmployee;
            }
        },
        deleteEmployee: (state, action) => {
            const { id } = action.payload;
            const index = state.employee.findIndex(employee => employee.id === id);
            if (index !== -1) {
                state.employee.splice(index, 1);
            }
        },
        getEmployeeByIdt: (state, action) => {
            state.employeeById = action.payload;
        }
    },
});

export const { setEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeByIdt } = employeeSlice.actions;