import { useDispatch, useSelector } from "react-redux";

import { LOGIN_INPUTS_PROPERTIES } from "../constants/loginInputsProperties";
import { handleChangeUserName, handleChangePassword } from "../store/slices/loginFormSlice";

export function useLoginInput(property) {
    const userName = useSelector(state => state.loginForm.userName);
    const password = useSelector(state => state.loginForm.password);
    
    const dispatch = useDispatch()

    const type = property === LOGIN_INPUTS_PROPERTIES.userName ? 'text' : 'password';
    const value = property === LOGIN_INPUTS_PROPERTIES.userName ? userName : password;

    const handleInputChange = (event) => {
        event.preventDefault();
        property === LOGIN_INPUTS_PROPERTIES.userName 
        ? dispatch(handleChangeUserName(event.target.value)) 
        : dispatch(handleChangePassword(event.target.value));
    }

    return {
        type,
        value,
        handleInputChange
    }
}