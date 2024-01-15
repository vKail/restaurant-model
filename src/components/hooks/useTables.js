import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllTables, updateTableStatus, createTable, deleteTable } from "../services/tableServices";
import { getTables, updateTableStatusRedux, getTableById, deleteTableRedux, addTableRedux } from "../../store/slices/tables/tableSlice";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const useTables = () => {
    const { tables } = useSelector((state) => state.table);
    const { tableId } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handlerGetTables = async () => {
        try {
          const response = await getAllTables();
          if (response.status === 200) {
            dispatch(getTables(response.data));
            sessionStorage.setItem("id", JSON.stringify(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }

    const handlerUpdateTableStatus = async (id, newStatus) => {
      try{
        const response = await updateTableStatus(id, newStatus);
        if(response.status === 200){
          dispatch(updateTableStatusRedux({id, newStatus}))
        }
        else {
          console.log(response)
        }
      }
      catch(error){
        console.log(error)
      }
    }

    const handlerAddTable = async (table) => {
      try {
        const response = await createTable(table);
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("table", JSON.stringify(response.data));
          dispatch(addTableRedux(response.data));
          navigate("/admin/tableTables");
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handlerGetTablesById = async (id) => {
      try {
        const response = await getTableById(id);
        if (response.status === 200) {
          dispatch(getTableByIdRedux(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    const handlerDeleteTable = async (id) => {
      try {
        const response = await Swal.fire({
          title: "¿Estas seguro?",
          text: "No podras revertir esta accion!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
        if (response.isConfirmed) {
          const response = deleteTable(id);
          if (response.status === 200) {
            dispatch(deleteTableRedux({ id }));
            handlerGetTables();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      if (tableId) {
          handlerGetTablesById(tableId);
      }
  }, [tableId, handlerGetTablesById]);

    return { tables, handlerGetTables, handlerUpdateTableStatus, handlerGetTablesById, handlerAddTable, handlerDeleteTable };
}




