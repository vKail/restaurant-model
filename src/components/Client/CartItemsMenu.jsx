import {menucategories} from '../data/menucategories';
import DataMenu from './DataMenu';
import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
const CartItemsMenu = () => {
    return(
        <div className='flex flex-col space-y-5 w-full p-4  justify-center md:flex-row min-h-screen bg-gradient-to-t from-red-300'>
            <div className='flex flex-row justify-start'>
            <img className='flex w-40 rounded-full shadow-sm ' src="./images/menu-suki.jpeg" alt="" />
            <h1 className='font-sans text-2xl p-10 text-center font-bold italic '>🖤 SUKI'S MENU 🖤</h1>
            </div>
           { menucategories.map((menucategory) => {
                return (
                    <div key={menucategory.name} className='flex flex-row justify-between text-center items-center shadow-lg bg-white m-0  rounded-md' >
                        <div className='flex justify-center rounded-md  md:h-52 md:w-32'>
                            <img className=' p-4 w-28'  src={menucategory.img} alt={menucategory.name} />
                        </div>
                            <div className='flex flex-col justify-center align-top text-justify'>
                                <h2 className='text-xl'>{menucategory.name}</h2>
                        </div>
                        <div className='ml'>
                            <Link to={`/menu/${menucategory.category}`} className='flex bg-sky-200 w-20  h-100  rounded-lg justify-center content-center'>+</Link>

                        </div>
                    </div>
                )
            })
        }
        </div>
    );
};
export default CartItemsMenu;