import { useEffect } from "react";
import { useInvoice } from "../hooks/useInvoice";
import { useOrder } from "../hooks/useOrder";
import { useClient } from "../hooks/useClient";
import InvoicePDF from "./InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import NavCashier from "../Nav/NavCashier";


const TableInvoices = () => {
    const { invoice, handlerGetInvoices } = useInvoice();
    const order = useSelector(state => state.order.orderById);
    const client = useSelector(state => state.client.clientById);
    useEffect(() => {
        handlerGetInvoices();

    }, []);
    

    return (
        <div className="">
            <NavCashier />
            <h1 className="text-2xl font-bold mb-5">Facturas</h1>
            <table className="min-w-full table-auto border-collapse shadow overflow-hidden rounded-lg ">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">Factura Nro</th>
                        <th className="py-3 px-6 text-left">Customer</th>
                        <th className="py-3 px-6 text-center">Descargar</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {invoice.map((invoiceItem) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={invoiceItem.invoice.invoice_number}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {invoiceItem.invoice.invoice_number}
                            </td>
                            <td className="py
    -3 px-6 text-left">
                                {invoiceItem.invoice.client_id}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <PDFDownloadLink document={<InvoicePDF invoice={invoiceItem} filName='factura.pdf' />}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? (
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Loading...
                                        </button>
                                        ) : (
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Descargar
                                        </button>
                                        )
                                    }
                                    
                                </PDFDownloadLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableInvoices;