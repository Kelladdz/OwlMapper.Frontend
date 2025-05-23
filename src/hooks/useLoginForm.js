import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { PATHS } from "../constants/paths";
import { useEffect, useState } from "react";
import {  loginFail, loginSuccess } from "../store/slices/authSlice";
import axios from "axios";

export function useLoginForm() {
    const userName = useSelector(state => state.loginForm.userName);
    const password = useSelector(state => state.loginForm.password);

    const accessToken = useSelector(state => state.auth.accessToken);

    const [loginErrors, setLoginErrors] = useState('');

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let errorData = '';
        
        await axios.post('https://localhost:7033/api/auth/login', {
            userName,
            password
        },{ withCredentials: true }).
        then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                dispatch(loginSuccess(res.data));
            }
        })
        .catch(errs => {
            console.log(errs);
            if (errs.response.status === 401 || errs.response.data.includes('NullReferenceException'))
                errorData = 'Niepoprawna nazwa użytkownika lub hasło';
                dispatch(loginFail(errorData));
        });
    }

      useEffect(() => {
		if (accessToken) {
			navigate(PATHS.admin);
		}
	},[accessToken, navigate]);

    return {handleSubmit, loginErrors};
}