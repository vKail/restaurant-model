import AdminAside from "../Nav/AdminAside"
import { useSelector } from "react-redux"
import { getDayWithMostInvoices } from "./selector"
import { useDispatch } from "react-redux"
import { AreaChart, BarChart, Card, Flex, Switch, Title, Grid, Metric, Text } from "@tremor/react";
import { useInvoice } from "../hooks/useInvoice";
import { useEffect, useMemo } from "react";

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


const Dashboard = () => {


    // Calcular el total de ventas

    const { invoice, handlerGetInvoices } = useInvoice();
    const chartData = useMemo(() => processDataForMonthlySalesChart(invoice), [invoice]);
    const totalSales = invoice.reduce((sum, currentInvoice) => sum + Number(currentInvoice.invoice.total), 0);

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
    return (
        <div className="flex m-5 space-y-8">
            <aside className="w-1/4">
                <AdminAside />
            </aside>
            <div className="w-3/4">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
               <div className="m-5">
               <Grid numItemsSm={2} numItemsLg={3} className='gap-6'>
                    {categories.map((item) => (
                        <Card key={item.title}>
                            <Text>{item.title}</Text>
                            <Metric>{item.metric}</Metric>
                        </Card>
                    ))}
                </Grid>
               </div>
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
            </div>
        </div>
    );
}

export default Dashboard;