import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CartItemsMenu from "./components/Client/CartItemsMenu";
import DataMenu from "./components/Client/DataMenu";
import useAuth from "./components/hooks/useAuth";
import { useTables } from "./components/hooks/useTables";
import { useProducts } from "./components/hooks/useProducts";
import { useEffect } from "react";
import { useOrder } from "./components/hooks/useOrder";
import PageRoutes from "./routes/PageRoutes";

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

                    </Routes>
               </BrowserRouter>
          </>
     );
};

export default AppRoutes;
