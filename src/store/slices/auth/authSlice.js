import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = JSON.parse(localStorage.getItem("login")) || {
    isAuth: false,
    employee: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: initialLoginState,
    },
    reducers: {
        authSuccess: (state, action) => {
            state.login = {
                isAuth: true,
                employee: action.payload.user,
                token: action.payload.token
            }
        },
        authLogout: (state) => {
            state.login = {
                isAuth: false,
                employee: undefined,
                token: undefined
            }
        },
    },
});

export const { authSuccess, authLogout } = authSlice.actions;