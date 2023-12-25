import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Tables from "./components/Cooks/Tables";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import OrderWaiters from "./components/Waiter/OrdersWaiters";
import useAuth from "./components/hooks/useAuth";

const AppRoutes = () => {
        const { login } = useAuth();
        return (
         <>
                     <BrowserRouter>
                        <Routes>
                                {login.isAuth ? (
                                     <>
                                          <Route path="/*" element={<Navigate to='/orders' />} />
                                          <Route path="/orders" element={<OrderWaiters />} />
                                          <Route path="/tables" element={<Tables />} />    
                                     </>
                                ) : (
                                     <>
                                         <Route path="/" element={<Navigate to='/login' />} />
                                         <Route path="/login" element={<Login />} />
                                     </>
                                )}
                                <Route path="/tables" element={<Tables />} />
                                <Route path="/menu/*" element={<CartItemsMenu />} />
                                <Route path="/menu/:category" element={<DataMenu />} />
                               
                                 
                        </Routes>
                </BrowserRouter>
         </>
        );
};

export default AppRoutes;
