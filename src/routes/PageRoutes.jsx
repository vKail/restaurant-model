import Tables from "../components/Waiter/Tables";
import OrdersCooks from "../components/Cooks/OrdersCooks";
import OrdersCreated from "../components/Waiter/OrdersCreated";
import useAuth from "../components/hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useTables } from "../components/hooks/useTables";
import { useProducts } from "../components/hooks/useProducts";
import { useEffect } from "react";
import { useOrder } from "../components/hooks/useOrder";
import { useEmployee } from "../components/hooks/useEmployee";
import UpdateOrders from "../components/Waiter/UpdateOrders";
import NewOrder from "../components/Waiter/NewOrder";
import Invoices from "../components/Cashier/Invoices";
import OrderInvoice from "../components/Cashier/OrderInvoice";
import Dashboard from "../components/Admin/Dashboard";
import NewEmployee from "../components/Admin/employees/NewEmployee";
import TableEmployees from "../components/Admin/employees/TableEmployees";
import NewProduct from "../components/Admin/products/NewProduct";
import TableProducts from "../components/Admin/products/TableProducts";
import TableTables from "../components/Admin/tables/TableTables";
import EditEmployee from "../components/Admin/employees/EditEmployee";
import NewTable from "../components/Admin/tables/NewTable";
import EditProduct from "../components/Admin/products/EditProduct";

const PageRoutes = () => {
    const { login } = useAuth();
    const { handlerGetTables } = useTables();
    const { handlerGetProducts } = useProducts();
    const { handlerGetOrders } = useOrder();
    const { handlerGetEmployees } = useEmployee();

    useEffect(() => {
        handlerGetOrders();
        handlerGetTables();
        handlerGetProducts();
    }, []);
    console.log(login);

    if (!login.employee) return null;

    return (
        <>
            <main>
                <Routes>
                    {login.employee?.role === 'admin' && (
                        <>
                            <Route path="/*" element={<Navigate to='/admin/dashboard' />} />
                            <Route path="/admin/dashboard" element={<Dashboard />} />
                            <Route path="/admin/newEmployee" element={<NewEmployee />} />
                            <Route path="/admin/tableEmployees" element={<TableEmployees />} />
                            <Route path="/admin/newProduct" element={<NewProduct />} />
                            <Route path="/admin/editProduct/:productId" element={<EditProduct />} />
                            <Route path="/admin/tableProducts" element={<TableProducts />} />
                            <Route path="/admin/tableTables" element={<TableTables />} />
                            <Route path="/admin/editEmployee/:employeeId" element={<EditEmployee />} />
                            <Route path="/admin/newTable" element={<NewTable />} />

                        </>
                    )}
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
                    {login.employee?.role === 'cashier' && (
                        <>
                            <Route path="/*" element={<Navigate to='/invoices' />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/invoices/:orderId" element={<OrderInvoice />} />
                        </>
                    )}
                </Routes>
            </main>
        </>

    );
}

export default PageRoutes;