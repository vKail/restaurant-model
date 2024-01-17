import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useOrdersChannel2 =  (handlerGetOrders) => {
    useEffect(() => {
        handlerGetOrders();
    try {
      
      // Manejar los datos recibidos de la API
  
      // Crear una instancia de WebSocket
      const ws = new WebSocket('ws://localhost:3000/cable');
  
      // Manejar la apertura de la conexión WebSocket
      ws.onopen = () => {
        console.log('WebSocket connection opened');
        ws.send(JSON.stringify({ command: 'subscribe', identifier: JSON.stringify({ channel: 'OrderChannel' }) }));
      };
  
      // Manejar los mensajes WebSocket recibidos
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ping') {
          return;
        }
        if (data.type === 'welcome') {
            return;
          }
        if (data.type === 'confirm_subscription') {
            return;
          } 
        if (data.message.action === 'updated') {
            if (data.message.order.status == 'ready') {
                toast.success('La orden ' + data.message.order.order_number + ' está lista para servirse');
            }
          }
        
        console.log('WebSocket received:', data);
        console.log('Hola Mundo',event);
        handlerGetOrders();

  
        // Aquí puedes manejar las actualizaciones WebSocket según tus necesidades
      };
      
      // Manejar errores de la conexión WebSocket
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      // Suscribirse al canal de OrderChannel
      
  
    } catch (error) {
      throw error;
  }
  return () => {
    if (ws.current) {
        ws.current.close();
        ws.current = null;
    }
};
    }, []); // Asegúrate de que useEffect no tenga dependencias para evitar el ciclo infinito
  };