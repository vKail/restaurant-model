import { menucategories } from '../data/menucategories';
import { Link } from "react-router-dom";

const CartItemsMenu = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full p-4 bg-gray-100 min-h-screen'>
            <div className='flex flex-col items-center mb-5'>
                <img className='w-40 rounded-full shadow-sm mb-3' src="./images/menu-suki.jpeg" alt="SUKI'S MENU" />
                <h1 className='text-2xl font-bold'>🖤 SUKI'S MENU 🖤</h1>
            </div>

            {menucategories.map((menucategory) => (
                <div key={menucategory.name} className='bg-white rounded-lg shadow p-4 mb-4 w-full md:max-w-md'>
                    <div className='flex flex-row items-center'>
                        <img className='mr-4 w-20 h-20 rounded-full' src={menucategory.img} alt={menucategory.name} />
                        <div className='flex flex-col'>
                            <h2 className='text-xl font-semibold'>{menucategory.name}</h2>
                            <Link to={`/menu/${menucategory.category}`} className='mt-2 p-2 bg-sky-200 text-gray-700 rounded-lg text-center'>Ver Más</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItemsMenu;