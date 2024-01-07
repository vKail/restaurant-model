import Tables from "../components/Waiter/Tables";
import OrderWaiters from "../components/Waiter/OrdersWaiters";
import OrdersCooks from "../components/Cooks/OrdersCooks";
import OrdersCreated from "../components/Waiter/OrdersCreated";
import useAuth from "../components/hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTables } from "../components/hooks/useTables";
import { useProducts } from "../components/hooks/useProducts";
import { useEffect } from "react";
import { useOrder } from "../components/hooks/useOrder";
import UpdateOrders from "../components/Waiter/UpdateOrders";
import NewOrder from "../components/Waiter/NewOrder";

const PageRoutes = () => {
        const {login} = useAuth();
        const { handlerGetTables } = useTables();
        const { handlerGetProducts } = useProducts();
        const { handlerGetOrders } = useOrder();
        useEffect(() => {
             handlerGetOrders();
             handlerGetTables();
             handlerGetProducts();
        }, []);
        console.log(login);

        if(!login.employee) return null;
        
        return (
          <>
          <main>
          <Routes> 
                {login.employee?.role === 'waiter' && (
                    <>
                        <Route path="/*" element={<Navigate to='/tables' />} />
                        <Route path="/tables" element={<Tables />} /> 
                        <Route path="/orders/:tableId" element={<NewOrder />} />  
                        <Route path="/ordersCreated" element={<OrdersCreated />} />
                        <Route path="/ordersCreated/update/:orderId" element={<UpdateOrders />} />

                        
                    </>
                )}
                {login.employee?.role === 'chef' && (
                    <>
                        <Route path="/*" element={<Navigate to='/chef' />} />
                        <Route path="/chef" element={<OrdersCooks />} />
                    </>
                )}
            </Routes>  
          </main>
          </>

        );
}

export default PageRoutes;