import { Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";

const WaiterLogin = () => {

    return (
        <div className="flex flex-col place-content-center min-h-screen w-full md:w-auto items-center shadow-lg bg-gradient-to-t from-blue-400">
            <div className="flex flex-col h-full justify-center align-middle items-center place-content-center shadow-lg bg-white rounded-md m-10 md:flex-row md:w-8/12 md:p-6">
            <img className='w-64 h-64 rounded-md m-5' src="./images/logo-restaurant.jpg" alt="" />
            <div  className="flex flex-col   p-10 w-full h-full rounded-2xl items-center">
            <TEInput
                required
                type="email"
                label="Email address"
                size="lg"
                className="mb-6 "
              ></TEInput>
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg" 
              ></TEInput> 
               <div className="text-center lg:text-center">
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>
              </div>
            </div>
            
            </div>
        </div>
    );
}

export default WaiterLogin;