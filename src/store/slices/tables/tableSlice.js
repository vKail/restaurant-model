import { createSlice } from "@reduxjs/toolkit";

const initialTables = JSON.parse(localStorage.getItem('tables')) || [];

export const tableSlice = createSlice({
    name: "table",
    initialState: {
        tables: initialTables,
    },
    reducers:{
        getTables: (state, action) => {
            state.tables = action.payload;
            
    },
    updateTableStatusRedux: (state, action) => {
        const { id, newStatus } = action.payload;
        const index = state.tables.findIndex(table => table.id === id);
        if (index !== -1) {
          state.tables[index].status = newStatus;
        }
      },

    setTableByIdRedux: (state, action) => {
      state.selectedTableId = action.payload;
    }
    },
});

export const { getTables, updateTableStatusRedux, setTableByIdRedux } = tableSlice.actions;