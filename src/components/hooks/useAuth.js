import { useDispatch, useSelector } from "react-redux";
import { authLogout, authSuccess } from "../../store/slices/auth/authSlice";
import {sign_in, sign_out} from "../services/authService";
import Swal from "sweetalert2";


const useAuth = () => {
    const { login } = useSelector((state) => state.auth);
    const dispach = useDispatch();

    const handlerLogin = async (employee) => {
        try {
            const response = await sign_in(employee)
            if (response.status === 200) {
                const { data } = response
                const { headers } = response
                localStorage.setItem("login", JSON.stringify({ isAuth: true, employee: data.status.data }))
                localStorage.setItem("token", JSON.stringify(headers.authorization).replace(/['"]+/g, ''))
                dispach(authSuccess({ employee: data.status.data, token: headers.authorization }))
            }
        }
        catch (error) {
            console.log()
            Swal.fire("Error Login", "Username o password invalidos", "error");
        }
    }

    const handlerLogout = async (employee) => {
       try {
              const response = await sign_out(employee)
              if (response.status === 200) {
                localStorage.removeItem("login")
                localStorage.removeItem("token")
                dispach(authLogout())
              }
       } catch (error) {
           
       }
    }

    return { login, handlerLogin, handlerLogout }
};
export default useAuth;