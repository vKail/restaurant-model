import AdminAside from "../../Nav/AdminAside";
import FormTable from "./FormTables";
import { useTables } from "../../hooks/useTables";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const EditTable = () => {
    const params = useParams();
    const tableId = params.tableId;
    const { tables, handlerGetTableById } = useTables();
    const tableDetails = useSelector(state => state.table.tableById);
    useEffect(() => {
        if (!tableDetails || tableDetails.id !== parseInt(tableId)) {
            handlerGetTableById(tableId);
        }
    }, [tableId, tableDetails, handlerGetTableById]);
    // Este useEffect se ejecutará cada vez que tableDetails cambie.
    useEffect(() => {
        if (tableDetails) {
            setFormData({
                number: tableDetails.number || '',
                capacity: tableDetails.capacity || '',
            });
        }
    }, [tableDetails]);
    const [formData, setFormData] = useState({
        number: tableDetails?.number || '',
        capacity: tableDetails?.capacity || '',
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const onSubmit = (e) => {
        e.preventDefault();
        handlerAddTable();
    };
    return (
        <div className="flex m-5">
            <div className="w-1/4">
                <AdminAside />
            </div>
            <div className="w-3/4">
                <h1 className="font-bold text-2xl m-10">DATOS DE LA MESA</h1>
                <FormTable value={tables} onChange={onChange} onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default EditTable;