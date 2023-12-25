import { useState } from 'react'
import './App.css'
import { Provider } from "react-redux";
import AppRoutes from './AppRoutes'
import store from "./store/store";
function App() {


  return (
    <>
      <Provider store={store}>
      <div className="App ">
        <AppRoutes/>
      </div>
      </Provider>
    </>
  )
}

export default App
