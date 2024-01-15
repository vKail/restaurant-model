import { useState } from 'react'
import './App.css'
import { Provider } from "react-redux";
import AppRoutes from './AppRoutes'
import store from "./store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <Provider store={store}>
      <div className="App ">
        <ToastContainer />
        <AppRoutes/>
      </div>
      </Provider>
    </>
  )
}

export default App
