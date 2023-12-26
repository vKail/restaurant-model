import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Tables from "./components/Waiter/Tables";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import OrderWaiters from "./components/Waiter/OrdersWaiters";
import useAuth from "./components/hooks/useAuth";
import {useTables} from "./components/hooks/useTables";
import { useEffect } from "react";

const AppRoutes = () => {
        const { login } = useAuth();
            const { handlerGetProducts} = useTables();
               useEffect(() => {
                    handlerGetProducts();
               }, []);
        return (
         <>
                     <BrowserRouter>
                        <Routes>
                                {login.isAuth ? (
                                     <>
                                          <Route path="/*" element={<Navigate to='/orders' />} />
                                          <Route path="/tables" element={<Tables />} /> 

                                             <Route path="/orders" element={<OrderWaiters />} />   
                                     </>
                                ) : (
                                     <>
                                         <Route path="/*" element={<Navigate to='/login' />} />
                                         <Route path="/login" element={<Login />} />
                                     </>
                                     
                                )}
                                             <Route path="/menu" element={<CartItemsMenu />} />
                                             <Route path="/menu/:category" element={<DataMenu />} />
                                 
                        </Routes>
                </BrowserRouter>
         </>
        );
};

export default AppRoutes;
