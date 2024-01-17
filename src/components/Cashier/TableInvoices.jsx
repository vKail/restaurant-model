
import { useInvoice } from "../hooks/useInvoice";
import { useOrder } from "../hooks/useOrder";
import { useClient } from "../hooks/useClient";
import InvoicePDF from "./InvoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import NavCashier from "../Nav/NavCashier";
import { useState, useEffect } from "react";


const TableInvoices = () => {
    const { invoice, handlerGetInvoices } = useInvoice();
    const order = useSelector(state => state.order.orderById);
    const client = useSelector(state => state.client.clientById);
    const [searchFilter, setSearchFilter] = useState("");
    useEffect(() => {
        handlerGetInvoices();

    }, []);
    const handleSearchChange = (e) => {
        setSearchFilter(e.target.value);
    };

    const filteredInvoices = invoice && invoice.filter((invoiceItem) =>
    invoiceItem && invoiceItem.invoice && invoiceItem.invoice.client_id && invoiceItem.invoice.client_id.includes(searchFilter)
);
    return (
        <div className="grid place-items-center min-h-screen">
           <div className="w-full m-0">
           <NavCashier />
           </div>
            <div className="flex m-6">
                <h1 className="text-2xl font-bold mx-6 ">Facturas</h1>
                <input
                    type="text"
                    placeholder="Buscar por Cliente ID"
                    value={searchFilter}
                    onChange={handleSearchChange}
                    className="mb-4 p-2 border rounded-lg focus:border-blue-400 focus:outline-none w-full focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                />
            </div>

            <table className="w-5/6 table-auto border-collapse shadow overflow-hidden rounded-lg justify-center ">
                <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">Factura Nro</th>
                        <th className="py-3 px-6 text-left">Customer</th>
                        <th className="py-3 px-6 text-center">Descargar</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredInvoices.map((invoiceItem) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={invoiceItem.invoice.invoice_number}>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {invoiceItem.invoice.invoice_number}
                            </td>
                            <td className="py-2  px-6 text-left">
                                {invoiceItem.invoice.client_id}
                            </td>
                            <td className="py-2 px-6 text-center">
                                <PDFDownloadLink document={<InvoicePDF invoice={invoiceItem} filName='factura.pdf' />}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? (
                                            <button className="px-4 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                                Loading...
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
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