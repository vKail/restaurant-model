import { useOrder } from "../hooks/useOrder";
import NavEmployes from "../Nav/NavEmployes";
import Swal from "sweetalert2";

const OrdersCreated = () => {
  const { orders, handlerDeleteOrder } = useOrder();
  const storedLogin = localStorage.getItem("login");
  let employeeId = null;
  if (storedLogin) {
    const loginData = JSON.parse(storedLogin);
    employeeId = loginData.employee.id;
  }
  const ordersFiltered = orders.filter((order) => order.order.employee_id == employeeId);

  const optionscheck = async (tableId) =>  {
    const { value: accept } = await Swal.fire({
      title: "Está seguro de eliminar la orden?",
      input: "radio",
      inputOptions: {
          '1': 'Sí',
          '0': 'No'
      },
      inputValue: '1',
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
          if (!result) {
              return "Debes seleccionar una opción";
          }
      }
  });

  if (accept === '1') {
      Swal.fire("Gracias por confirmar :)").then(() => {
          // Redirige a otra página si el usuario selecciona "Sí" // v6
          handlerDeleteOrder(tableId);
          
      });
  } else if (accept === '0') {
      // Cierra el cuadro de diálogo si el usuario selecciona "No"
      Swal.close();
  }
     }

  return (
      <div className="">
          <NavEmployes />
          <h1 className="p-6">Ordenes en espera</h1>
          <div className="grid grid-cols-4 w-full gap-5 p-5 " >
              {ordersFiltered.map((order) => (
                  <div className="border border-zinc-200 p-5 rounded-2xl shadow-2xl m-5  bg-science-blue-50" key={order.order_number}>
                      <p>Orden {order.order.order_number}</p>
                      <p>Status: {order.order.status}</p>
                      <p>Mesa: {order.order.table_id}</p>
                      {Array.isArray(order.items) && order.items.map((item) => (
                          <div key={item.product.id}>
                              <p>{item.quantity} {item.product.name} </p>
                              
                          </div>
                      ))}
                    <button className='bg-red-600 text-white  px-4 rounded-md my-5 transition duration-300 ease-in-out transform  hover:scale-110' onClick={() => optionscheck(order.order.order_number)}> 
                        Eliminar
                    </button>
                  </div>
                  
              ))}
          </div>
      </div>
  );
}

export default OrdersCreated;