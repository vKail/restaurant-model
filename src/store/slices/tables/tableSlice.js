import { createSlice } from "@reduxjs/toolkit";

const initialTables = [];

export const tableSlice = createSlice({
    name: "table",
    initialState: {
        tables: initialTables,
    },
    reducers:{
        getTables: (state, action) => {
            state.tables = action.payload;
    },
    updateTableStatus: (state, action) => {
        const { id, newStatus } = action.payload;
        const index = state.tables.findIndex(table => table.id === id);
        if (index !== -1) {
          state.tables[index].status = newStatus;
        }
      }
    },
});

export const { getTables, updateTableStatus } = tableSlice.actions;