
const FormTable = ({value,onChange,onSubmit}) => {
    return (
        <div className="m-10">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div>
                    <label htmlFor="capacity" className="text-gray-700 font-semibold w-1/3 mr-4">Capacidad</label>
                    <input type="number" 
                    value={value.capacity}
                    onChange={onChange}
                    name="" id="" 
                    className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 flex-grow"/>
                </div> 
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer">
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default FormTable;