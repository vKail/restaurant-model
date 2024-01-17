import { useDispatch, useSelector } from "react-redux"
import { getAllItems } from "../services/itemService"
import { setItem } from "../../store/slices/items/itemSlice"

export const useItem = () => {
    const { item } = useSelector((state) => state.item)
    const dispatch = useDispatch()

    const handlerGetItems = async () => {
        try {
            const response = await getAllItems()
            if (response.status === 200) {
                dispatch(setItem(response.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        item,
        handlerGetItems,
    }
}