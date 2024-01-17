import { useEffect } from "react";
import ActionCable from "actioncable";

export const useOrderChannel = (handlerGetOrders) => {
    useEffect(() => {
        // Inicializar y obtener los pedidos al montar el componente
        handlerGetOrders();
    
        // Crear y configurar el consumidor de Action Cable
        const actionCable = ActionCable.createConsumer("ws://localhost:3000/cable");

        const ordersChannel = actionCable.subscriptions.create("OrderChannel", {
          connected() {
            console.log("Connected to OrdersChannel: ", this);
          },
          disconnected() {
            console.log("Disconnected from OrdersChannel: ", this);
            // Manejar desconexión
          },
          received(data) {
            console.log("Received from OrdersChannel: ", data);
            // Asegúrate de que esta condición coincida con los datos que esperas
            if (data.action === "created" ) {
                handlerGetOrders();
            }
          },
        });
    
        // Limpieza al desmontar el componente
        return () => {
          ordersChannel.unsubscribe();
          actionCable.disconnect();
        };
      }, []); // Asegúrate de que useEffect no tenga dependencias para evitar el ciclo infinito
  };