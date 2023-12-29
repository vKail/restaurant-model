import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tables from "./components/Waiter/Tables";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import OrdersCook from "./components/Cooks/OrdersCooks";
import OrderWaiters from "./components/Waiter/OrdersWaiters";
import useAuth from "./components/hooks/useAuth";
import {useTables} from "./components/hooks/useTables";
import { useProducts } from "./components/hooks/useProducts";
import { useEffect } from "react";
import { useOrder } from "./components/hooks/useOrder";
import    PageRoutes from "./routes/PageRoutes";

const AppRoutes = () => {
     const {handlerGetOrders} = useOrder();
     useEffect(() => {
         handlerGetOrders();
     }, []);
          const { login } = useAuth();
            const { handlerGetTables} = useTables();
               useEffect(() => {
                    handlerGetTables();
               }, []);
               const {handlerGetProducts} = useProducts();
                    useEffect(() => {
                         
                         handlerGetProducts();
                    }, []);


        return (
         <>
                     <BrowserRouter>
                        <Routes>
                                {login.isAuth ? (
                                     <>
                                        
                                        <Route path="/*" element={<PageRoutes/>} />

                                         
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
