import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllTables, updateTableStatus } from "../services/tableServices";
import { getTables, updateTableStatusRedux, getTableById } from "../../store/slices/tables/tableSlice";

export const useTables = () => {
    const { tables } = useSelector((state) => state.table);
    const { tableId } = useParams(); 
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

    const handlerAddTable = (table) => {
      dispatch(addTableRedux(table));
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

    useEffect(() => {
      if (tableId) {
          handlerGetTablesById(tableId);
      }
  }, [tableId, handlerGetTablesById]);

    return { tables, handlerGetTables, handlerUpdateTableStatus, handlerGetTablesById };
}




