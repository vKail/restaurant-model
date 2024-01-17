import AdminAside from "../Nav/AdminAside"
import { useSelector } from "react-redux"
import { getDayWithMostInvoices } from "./selector"
import { useDispatch } from "react-redux"
import { AreaChart, BarChart, Card, Flex, Switch, Title, Grid, Metric, Text, ProgressBar } from "@tremor/react";
import { useInvoice } from "../hooks/useInvoice";
import { useEffect, useMemo, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";



const processDataForMonthlySalesChart = (invoices) => {
    const currentYear = new Date().getFullYear();
    const salesByMonth = {};

    // Inicializar todos los meses con 0 ventas
    for (let month = 1; month <= 12; month++) {
        const monthYear = `${currentYear}-${month.toString().padStart(2, '0')}`; // Formato YYYY-MM
        salesByMonth[monthYear] = 0;
    }

    // Luego sumar las ventas de las facturas existentes
    invoices.forEach(invoice => {
        const monthYear = invoice.invoice.created_at.substring(0, 7);
        salesByMonth[monthYear] += 1;
    });

    return Object.entries(salesByMonth).map(([monthYear, count]) => ({
        date: monthYear,
        'Number of Sales': count
    }));
};

const valueFormatter = (value) => {
    return value
}

const processDataForItemFrequency = (orders) => {
    const itemFrequency = {};

    // Contar la frecuencia de cada artículo
    orders.forEach(order => {
        order.items.forEach(item => {
            const itemName = item.product.name;
            itemFrequency[itemName] = (itemFrequency[itemName] || 0) + item.quantity;
        });
    });

    return Object.entries(itemFrequency).map(([name, count]) => ({
        itemName: name,
        count: count
    }));
};

const Dashboard = () => {


    // Calcular el total de ventas
    const { orders, handlerGetOrders } = useOrder();
    const { invoice, handlerGetInvoices } = useInvoice();
    const chartData = useMemo(() => processDataForMonthlySalesChart(invoice), [invoice]);
    const totalSales = invoice.reduce((sum, currentInvoice) => sum + Number(currentInvoice.invoice.total), 0);
    const itemChartData = useMemo(() => processDataForItemFrequency(orders), [orders]);
    const [activeTab, setActiveTab] = useState('sales')
    // Aquí podrías añadir más categorías si lo necesitas
    const categories = [
        {
            title: 'Total Sales',
            metric: `$ ${totalSales.toFixed(2)}`, // Asegúrate de formatear correctamente a dos decimales
        },
        // ... otras categorías
    ];
    useEffect(() => {
        handlerGetInvoices();
    }, []);

    console.log(chartData);
    // const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDuration, setOrderDuration] = useState(0);

    // Función para manejar el cambio en el select
    const handleSelectChange = (e) => {
        const orderId = e.target.value;
        const order = orders.find(o => o.order.order_number === parseInt(orderId, 10));
        setSelectedOrder(order);

        // Calcular la duración entre la creación y actualización de la orden seleccionada
        if (order) {
            const created = new Date(order.order.created_at);
            const updated = new Date(order.order.updated_at);
            const duration = (updated - created) / 1000; // Duración en segundos
            setOrderDuration(duration);
        }
    };

    // Calcular el valor máximo para la ProgressBar
    const maxDuration = useMemo(() => {
        // Encuentra la duración más larga entre todas las órdenes para establecer el máximo
        return orders.reduce((max, o) => {
            const created = new Date(o.order.created_at);
            const updated = new Date(o.order.updated_at);
            const duration = (updated - created) / 1000;
            return Math.max(max, duration);
        }, 0);
    }, [orders]);

    const [selectedOrder, setSelectedOrder] = useState({
        order: {
            created_at: "2024-01-10T04:45:35.254Z",
            updated_at: "2024-01-15T06:02:11.858Z",
            // ... otras propiedades
        },
    });

    // Calcula la duración y la formatea en horas, minutos y segundos
    const calculateDuration = (created_at, updated_at) => {
        const startDate = new Date(created_at);
        const endDate = new Date(updated_at);
        const seconds = Math.floor((endDate - startDate) / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    };

    // Formato de la duración para mostrarlo en la tarjeta
    const duration = selectedOrder ? calculateDuration(selectedOrder.order.created_at, selectedOrder.order.updated_at) : '0h 0m 0s';

    return (
        <div className="flex m-5 space-y-8">
            <aside className="w-1/4">
                <AdminAside />
            </aside>
            <div className="w-3/4">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                <div className="m-5 ">
                    <Grid numItemsSm={2} numItemsLg={3} className='gap-6'>
                        {categories.map((item) => (
                            <Card key={item.title}>
                                <Text>{item.title}</Text>
                                <Metric>{item.metric}</Metric>
                            </Card>
                        ))}
                                            <div>
                        <select onChange={handleSelectChange} value={selectedOrder?.order.order_number || ''}>
                            {orders.map((o) => (
                                <option key={o.order.order_number} value={o.order.order_number}>
                                    Orden {o.order.order_number}
                                </option>
                            ))}
                        </select>

                        {selectedOrder && (
                            
                               
                                <Card className="max-w-sm mx-auto">
                                    <Text>Duración de la Orden: {duration}</Text>
                                    {/* El resto de tu tarjeta... */}
                                </Card>
                            
                        )}
                    </div>
                    </Grid>

                </div>
                <div className="m-5">
                    <TabGroup>
                        <TabList>
                            <Tab onClick={() => setActiveTab('sales')}>Ventas por Mes</Tab>
                            <Tab onClick={() => setActiveTab('products')}>Productos Más Vendidos</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {/* Contenido de Ventas por Mes */}
                                {activeTab ===
                                    'sales' && (
                                        <div className="m-5">
                                            <Card>
                                                <Title>Ventas por Mes</Title>
                                                <BarChart
                                                    className="mt-6"
                                                    data={chartData}
                                                    index="date"
                                                    categories={["Number of Sales"]}
                                                    colors={["red"]}
                                                    valueFormatter={valueFormatter}
                                                    yAxisWidth={48}
                                                />
                                            </Card>
                                        </div>
                                    )}
                            </TabPanel>
                            <TabPanel>
                                {/* Contenido de Productos Más Vendidos */}
                                {activeTab === 'products' && (
                                    <div className="m-5">
                                        <Card>
                                            <Title>Artículos Más Vendidos</Title>
                                            <BarChart
                                                className="mt-6"
                                                data={itemChartData}
                                                index="itemName"
                                                categories={["count"]}
                                                colors={["green"]}
                                                valueFormatter={valueFormatter}
                                                yAxisWidth={48}
                                            />
                                        </Card>
                                    </div>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;