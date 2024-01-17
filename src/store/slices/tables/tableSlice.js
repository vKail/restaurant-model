import { createSlice } from "@reduxjs/toolkit";

// Asegúrate de que el estado inicial es coherente con la estructura que esperas
const initialTablesState = {
  tables: JSON.parse(localStorage.getItem('tables')) || [],
  selectedTableId: null, // Añade un estado para el ID de la mesa seleccionada si es necesario
};

export const tableSlice = createSlice({
  name: "table",
  initialState: initialTablesState,
  reducers: {
    // Actualiza el estado de las mesas
    getTables: (state, action) => {
      state.tables = action.payload;
    },
    // Actualiza el estado de una mesa específica
    updateTableStatusRedux: (state, action) => {
      const { id, newStatus } = action.payload;
      const index = state.tables.findIndex(table => table.id === id);
      if (index !== -1) {
        state.tables[index].status = newStatus;
      }
    },
    // Selecciona una mesa por ID
    getTableById: (state, action) => {
      state.selectedTableId = action.payload;
    },
    deleteTableRedux: (state, action) => {
      const { id } = action.payload;
      state.tables = state.tables.filter(
        (table) => table.id !== id
      );
    },
    addTableRedux: (state, action) => {
      state.tables.push(action.payload);
    },
  },
});

export const { getTables, updateTableStatusRedux, getTableById, deleteTableRedux, addTableRedux } = tableSlice.actions;