import { useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useClient } from "../hooks/useClient";
import { useDispatch } from "react-redux";
import { useInvoice } from "../hooks/useInvoice";
import NavCashier from "../Nav/NavCashier";
import ButtonWrapper from "./ButtonWraper";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const OrderInvoice = () => {
    const [newClientCedula, setNewClientCedula] = useState('');
    const [newClientFirstName, setNewClientFirstName] = useState('');
    const [newClientLastName, setNewClientLastName] = useState('');
    const [newClientEmail, setNewClientEmail] = useState('');
    const [newClientAddress, setNewClientAddress] = useState('');
    const [newClientPhone, setNewClientPhone] = useState('');
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioExistente, setMostrarFormularioExistente] = useState(true);
    const [clientInput, setClientInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { clients, handlerGetClients, handlerCreateClient } = useClient();
    const { handlerCreateInvoice } = useInvoice();
    const dispatch = useDispatch();
    // Función para cambiar la visibilidad de ambos formularios
    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
        setMostrarFormularioExistente(!mostrarFormularioExistente);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    useEffect(() => {
        handlerGetClients();
    }, []);
    useEffect(() => {
        if (searchQuery !== '') {
            const results = clients.filter(client =>
                client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                client.first_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredClients(results);
        } else {
            setFilteredClients([]);
        }
    }, [searchQuery, clients]);
    const params = useParams();
    const orderId = params.orderId;
    // const orderId = useParams();
    const { orders, handlerGetOrdersById, handlerUpdateOrderStateCancel } = useOrder();
    const numericOrderId = parseInt(orderId, 10);
    useEffect(() => {
        handlerGetOrdersById(numericOrderId);
        console.log(orders, 45);
        console.log('NumeroParseado', numericOrderId);
        console.log('useParams', orderId);
        console.log(handlerGetOrdersById(parseInt(orderId)));
    }, [numericOrderId]);
    const orderDetails = useSelector(state => state.order.ordersById);
    if (!orderDetails || orderDetails.length === 0) {
        return <div>Cargando detalles de la orden...</div>;
    }
    // Función para seleccionar un cliente de la lista de búsqueda
    const selectClient = (clientId) => {
        setSelectedClientId(clientId);
        // Encuentra el cliente seleccionado en la lista de clientes filtrados
        const selectedClient = filteredClients.find(client => client.id === clientId);
        if (selectedClient) {
            // Actualiza el campo de búsqueda con el ID del cliente seleccionado
            setSearchQuery(selectedClient.id.toString());
            // Limpia los resultados de búsqueda para que la lista desplegable no se muestre
            setFilteredClients([]);
        }
    };

    // Función para crear un nuevo cliente (podrías usar el formulario existente)

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Validadores
    const validateNumberInput = (value) => /^[0-9]*$/.test(value);
    const validateTextInput = (value) => /^[a-zA-Z\s]*$/.test(value);

    // Manejadores de eventos actualizados con validaciones
    const handleClientCedulaChange = (e) => {
        if (validateNumberInput(e.target.value)) {
            setNewClientCedula(e.target.value);
        }
    };

    const handleClientFirstNameChange = (e) => {
        if (validateTextInput(e.target.value)) {
            setNewClientFirstName(e.target.value);
        }
    };

    const handleClientLastNameChange = (e) => {
        if (validateTextInput(e.target.value)) {
            setNewClientLastName(e.target.value);
        }
    };

    const handleClientEmailChange = (e) => {

        setNewClientEmail(e.target.value);
    };

    const handleClientPhoneChange = (e) => {
        if (validateNumberInput(e.target.value)) {
            setNewClientPhone(e.target.value);
        }
    };

    const handleClientAddressChange = (e) => {
        if (validateTextInput(e.target.value)) {
            setNewClientAddress(e.target.value);
        }
    };


    // Función para crear una nueva factura
    const handleSubmitInvoice = () => {
        if (selectedClientId && paymentMethod && orderId) {
            const newInvoiceData = {
                client_id: selectedClientId,
                order_id: numericOrderId,
                payment_method: paymentMethod,
                // Asegúrate de proporcionar cualquier otra información necesaria que tu backend requiera
            };
            handlerCreateInvoice(newInvoiceData);
            handlerUpdateOrderStateCancel(numericOrderId);

        } else {
            alert('Por favor, asegúrate de que todos los campos necesarios están completos.');
        }
    };
    const createNewClient = async () => {
        toggleFormulario();
        const clientData = {
            id: newClientCedula,
            first_name: newClientFirstName,
            last_name: newClientLastName,
            email: newClientEmail,
            address: newClientAddress,
            phone: newClientPhone,
        };

        const createdClient = await handlerCreateClient(clientData);
        if (createdClient) {
            selectClient(createdClient.id); // Suponiendo que 'createdClient' tiene una propiedad 'id'
            setSearchQuery(createdClient.id); // Establece el input de búsqueda para mostrar la cédula del cliente recién creado
            // Oculta el formulario de creación de cliente
        }
    };
    return (
        <div className="">
            <ToastContainer />
            <NavCashier />
            <div className="flex flex-col w-full justify-center items-center">

                <div className="border rounded-lg w-5/6 p-10 m-14 bg-white shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">
                        Facturación de la Orden: {orderDetails.order.order_number}
                    </h1>
                    {mostrarFormularioExistente && (
                        <div className="flex flex-row items-center justify-start m-2">
                            <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300 font-bold mr-2">Cliente</label>
                            <div className="relative w-full "> {/* Asegúrate de que este contenedor tenga un ancho definido */}

                                <input
                                    type="text"
                                    placeholder="Buscar cliente por cédula..."
                                    className="block mt-0 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {filteredClients.length > 0 && (
                                    <ul className="absolute w-full bg-white shadow-md max-h-60 overflow-y-auto z-10 border border-gray-300 mt-1 rounded-md">
                                        {filteredClients.map(client => (
                                            <li
                                                key={client.id}
                                                onClick={() => selectClient(client.id)}
                                                className="px-4 py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                            >
                                                {client.id} {client.first_name} {client.last_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                    )}
                    <button
                        className="px-6 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        onClick={toggleFormulario}
                    >
                        Nuevo cliente
                    </button>
                    {mostrarFormulario && (
                        <div className="grid grid-cols-2 p-4 gap-x-4 m-2  border rounded-lg">
                            {/* Aquí van los campos para crear un nuevo cliente */}
                            <input
                                type="text"
                                placeholder="Cédula del cliente"
                                value={newClientCedula}
                                maxLength={10}
                                onChange={handleClientCedulaChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={newClientFirstName}
                                maxLength={20}
                                onChange={handleClientFirstNameChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Apellido"
                                maxLength={20}
                                value={newClientLastName}
                                onChange={handleClientLastNameChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Coreo electrónico"
                                maxLength={30}
                                value={newClientEmail}
                                onChange={handleClientEmailChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Dirección "
                                maxLength={30}
                                value={newClientAddress}
                                onChange={handleClientAddressChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <input
                                type="text"
                                placeholder="Telefono "
                                maxLength={10}
                                value={newClientPhone}
                                onChange={handleClientPhoneChange}
                                className="block mt-0 m-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                            />
                            <button
                                className="px-6 py-2 ml-2  m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                onClick={createNewClient}
                            >
                                Crear cliente
                            </button>
                            {/* Más campos según sea necesario */}
                        </div>
                    )}
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Producto</th>
                                <th className="px-4 py-2">Precio</th>
                                <th className="px-4 py-2">Cantidad</th>
                                <th className="px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.items.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-4 py-2">{item.product.name}</td>
                                    <td className="px-4 py-2">${item.product.price}</td>
                                    <td className="px-4 py-2">{item.quantity}</td>
                                    <td className="px-4 py-2">${item.subtotal}</td>
                                </tr>
                            ))}
                            <tr className="border-b">
                                <td className="px-4 py-2 font-bold">Total</td>
                                <td className="px-4 py-2 font-bold"></td>
                                <td className="px-4 py-2 font-bold"></td>
                                <td className="px-4 py-2 font-bold">${orderDetails.order.total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <select
                        onChange={
                            handlePaymentMethodChange} value={paymentMethod}
                    >
                        <option value="">Método de pago...</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="pago_tarjeta">Tarjeta</option>
                        <option value="pasarela_pago">PayPal</option>
                    </select>
                    <button className="px-6 py-2 m-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        onClick={handleSubmitInvoice}
                    >
                        Listo
                    </button>
                    {
                        (paymentMethod === 'pasarela_pago' || paymentMethod === 'pago_tarjeta') && (
                            <div className="w-full flex justify-center text-center">
                            <ButtonWrapper
                                showSpinner={false}
                                order={orderDetails}
                            />
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default OrderInvoice