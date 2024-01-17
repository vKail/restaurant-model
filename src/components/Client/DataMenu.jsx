import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";

const DataMenu = () => {

    const { category } = useParams();
    const { products, handlerGetProducts } = useProducts();

    useEffect(() => {
        handlerGetProducts();
    }, []);
    
    const categoryfilter = products.filter(item => item.category === category);

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 bg-gray-100 min-h-screen">
            
            <Link className="mb-5 p-2 bg-gray-300 text-gray-700 rounded" to='/menu'>
                Volver
            </Link>
            
            <h1 className="text-2xl font-bold">SUKI's MENU</h1>
            
            <div className="flex flex-wrap justify-center gap-4 mt-5">
                {categoryfilter.map((dataitems) => (
                    <div key={dataitems.name} className="bg-white rounded-lg shadow p-4 max-w-sm w-64 h-64 flex flex-col items-center">
                        <img className="w-32 h-32 rounded-full" src={dataitems.image} alt={dataitems.name} />
                        <h2 className="text-center text-xl font-semibold mt-2">{dataitems.name}</h2>
                        <p className="text-center text-lg">$ {dataitems.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataMenu;