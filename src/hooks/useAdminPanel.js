import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideBarContext from "../context/sideBar";
import CurrentDataContext from "../context/currentData";


import { PATHS } from "../constants/paths";
import { ACTIONS } from "../constants/actions";
import { useNavigate } from "react-router-dom";


export function useAdminPanel() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const refreshToken = useSelector(state => state.auth.refreshToken);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     if (accessToken.length === 0 || refreshToken.length === 0) {
    //         navigate(PATHS.signIn);
    //     }
    // },[accessToken, refreshToken, dispatch]);


    return {accessToken, refreshToken}
}