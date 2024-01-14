import AdminAside from "../../Nav/AdminAside";
import FormTable from "./FormTables";
import { useTables } from "../../hooks/useTables";

const NewTable = () => {
    const { tables, handlerAddTable } = useTables();
    const onSubmit = (e) => {
        e.preventDefault();
        handlerAddTable();
    };
    const onChange = (e) => {
        console.log(e.target.value);
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

export default NewTable;