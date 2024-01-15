import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// This value is from the props in the UI
const style = { layout: "vertical" };

const ButtonWrapper = ({ showSpinner, order, setShowModal }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  console.log(order);
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}   
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "SUKI'S RESTAURANT",
                amount: {
                  currency_code: "USD", // Asegúrate de usar el código de moneda correcto.
                  value: order.order.total,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const orders = await actions.order.capture();
          if (orders) {
            console.log(orders);
            if (orders.status === "COMPLETED") {
                toast.success("Pago realizado con éxito");
            }
          }
        }}
      />
    </>
  );
};

export default ButtonWrapper;