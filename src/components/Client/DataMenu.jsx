import { dataitemsmenu } from "../data/dataitemsmenu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useEffect } from "react";

const DataMenu = () => {

    const { category } = useParams();
    const {products, handlerGetProducts} = useProducts();

    useEffect(() => {
        handlerGetProducts();
    }, []);
    console.log(products);
    
    const categoryfilter = products.filter(item => item.category === category);
    return (
        <div className="flex flex-col space-y-5 w-full p-4  justify-center md:flex-row min-h-screen bg-gradient-to-t from-red-300">
            
            <div className="flex flex-row items-center ">
                <Link className="p-10 bg-sky-200  text-center rounded-md" to='/menu' >
                    <p >Volver</p>
                </Link>
            
                <h1 className="font-sans text-2xl text-center font-bold italic"> SUKI's MENU</h1>
                
            </div>
            
            {categoryfilter.map((dataitems) => (
                
                    <div key={dataitems.name} className="flex flex-col space-y-5 p-5 w-full justify-center md:flex-row ">
                        <div className="flex flex-row justify-start text-center items-center shadow-lg bg-white m-0 x">
                            <div className="flex justify-center rounded-md md:h-52 md:w-32">
                                <img className="p-4 w-28 rounded-full" src={dataitems.img} alt={dataitems.name} />
                            </div>
                            <div className="flex flex-col justify-center align-top text-justify">
                                <h2 className="underline text-2xl font-bold">{dataitems.name}</h2>
                                <p className="text-xl">{dataitems.price}</p>
                            </div>

                        </div>
                    </div>
                
            ))}
        </div>
    );
};

export default DataMenu;