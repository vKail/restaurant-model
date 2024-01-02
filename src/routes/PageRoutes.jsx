import Tables from "../components/Waiter/Tables";
import OrderWaiters from "../components/Waiter/OrdersWaiters";
import OrdersCooks from "../components/Cooks/OrdersCooks";
import OrdersCreated from "../components/Waiter/OrdersCreated";
import useAuth from "../components/hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";

const PageRoutes = () => {
        const {login} = useAuth();

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
                        <Route path="/orders/:tableId" element={<OrderWaiters />} />  
                        <Route path="/orders-created" element={<OrdersCreated />} />
                        
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