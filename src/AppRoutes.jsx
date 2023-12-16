import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import WaiterLogin from "./pages/WaiterLogin";
import Tables from "./components/Cooks/Tables";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import OrderWaiters from "./components/Waiter/OrdersWaiters";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Navigate to='/login'></Navigate>} />
                <Route  path="/login" element={<WaiterLogin/>} />
                <Route  path="/tables" element={<Tables/>} />
                <Route  path="/menu/*" element={<CartItemsMenu/>}/>
                <Route  path="/menu/:category" element={<DataMenu/>} />
                <Route  path="/orders" element={<OrderWaiters/>} />
                <Route  path="/tables" element={<Tables/>} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
