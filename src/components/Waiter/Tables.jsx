import { useSelector } from "react-redux";
import {useTables} from "../hooks/useTables";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavEmployes from "../Nav/NavEmployes";


const Tables = () => {
  const navigate = useNavigate();
    const { tables, handlerUpdateTableStatus} = useTables();
    const optionscheck = async (tableId) =>  {
      const { value: accept } = await Swal.fire({
        title: "Mesa correcta?",
        input: "radio",
        inputOptions: {
            '1': 'Sí',
            '0': 'No'
        },
        inputValue: '1',
        confirmButtonText: `
          Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        inputValidator: (result) => {
            if (!result) {
                return "Debes seleccionar una opción";
            }
        }
    });

    if (accept === '1') {
        Swal.fire("Gracias por confirmar :)").then(() => {
            // Redirige a otra página si el usuario selecciona "Sí"
            navigate(`/orders/${tableId}`); // v6
            
        });
    } else if (accept === '0') {
        // Cierra el cuadro de diálogo si el usuario selecciona "No"
        Swal.close();
    }
       }
    return (

       <div className="h-screen  ">
          <NavEmployes/>
             <div className="grid grid-cols-5 gap-5 bg-green-50  h-full ">
            {tables.map((table) => (
                <div className="flex flex-row items-center w-full max-w-sm mx-auto p-5 transition duration-300 ease-in-out transform  hover:scale-110" key={table.id}>
                    <div className=" h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md ">
                    </div>

                    <div className={`flex flex-col items-center w-full overflow-hidden ${table.status === 'free' ? 'bg-green-200' : 'bg-red-200'} rounded-lg shadow-2xl md:w-64 dark:bg-gray-800` } >
                        <p className="text-2xl">MESA {table.id}</p>
                        <img   className="h-10 w-10 justify-center align-middle " src="https://imgs.search.brave.com/zhTUul9dBDM_WTCo53-jwduLqfTorkgrKr0bYAV4WWg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudGhlbm91bnBy/b2plY3QuY29tL3Bu/Zy8yMDYwMzg5LTIw/MC5wbmc" alt="" />
                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{table.status}</h3>

                        <div className={`flex items-center justify-between w-full px-3 py-2 ${table.status === 'free' ? 'bg-green-600' : 'bg-red-600'} dark:bg-gray-700`}>
                        <button  className={`px-2 py-1 text-xs font-semibold text-slate-900 uppercase transition-colors duration-300 transform bg-gray-100 rounded hover:bg-slate-600 hover:text-white focus:bg-gray-700 focus:outline-none ${table.status !== 'free' ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                 onClick={() => table.status === 'free' && optionscheck(table.id)}
                                 disabled={table.status !== 'free'}
    >
                          <p>ORDEN</p>
                        </button>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
       </div>
       
    );
};

export default Tables;