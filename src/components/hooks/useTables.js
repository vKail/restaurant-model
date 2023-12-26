import { useSelector, useDispatch } from "react-redux";
import { getAllTables } from "../services/tableServices";
import { getTables } from "../../store/slices/tables/tableSlice";

export const useTables = () => {
    const { tables } = useSelector((state) => state.table);
    const dispatch = useDispatch();

    const handlerGetProducts = async () => {
        try {
          const response = await getAllTables();
          if (response.status === 200) {
            dispatch(getTables(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }

    return { tables, handlerGetProducts };
}




