import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import useAuth from "./components/hooks/useAuth";
import PageRoutes from "./routes/PageRoutes";
import Invoices from "./components/Cashier/Invoices";
import OrderInvoice from "./components/Cashier/OrderInvoice";


const AppRoutes = () => {
     const { login } = useAuth();
     return (
          <>
               <BrowserRouter>
                    <Routes>
                         {login.isAuth ? (
                              <>

                                   <Route path="/*" element={<PageRoutes />} />


                              </>
                         ) : (
                              <>
                                   <Route path="/*" element={<Navigate to='/login' />} />
                                   <Route path="/login" element={<Login />} />
                              </>

                         )}
                         <Route path="/menu" element={<CartItemsMenu />} />
                         <Route path="/menu/:category" element={<DataMenu />} />
                         <Route path="/invoices" element={<Invoices />} />
                         <Route path="/invoices/:orderId" element={<OrderInvoice />} />


                    </Routes>
               </BrowserRouter>
          </>
     );
};

export default AppRoutes;
