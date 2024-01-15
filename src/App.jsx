import { useState } from 'react'
import './App.css'
import { Provider } from "react-redux";
import AppRoutes from './AppRoutes'
import store from "./store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {


  return (
    <>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <Provider store={store}>
          <div className="App ">
            <ToastContainer />
            <AppRoutes />
          </div>
        </Provider>
      </PayPalScriptProvider>
    </>
  )
}

export default App
