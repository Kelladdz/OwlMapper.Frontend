import {useEffect} from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { SideBarProvider } from "../../context/sideBar";
import { CreatorProvider } from "../../context/creator";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import FlexContainer from "../../components/Containers/FlexContainer/FlexContainer";
import SideBar from "../../components/SideBar/SideBar";
import { PATHS } from "../../constants/paths";
import { HEADER_MODES } from "../../constants/headerModes";
import { useAdminPanel } from "../../hooks/useAdminPanel";
import { login } from "../../store";


export default function AdminPanel() {
    const accessToken = useSelector(state => state.auth.accessToken);
    const refreshToken = useSelector(state => state.auth.refreshToken);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     if (accessToken.length === 0 || refreshToken.length === 0) {
    //         navigate(PATHS.signIn);
    //     }
    // },[accessToken, refreshToken, dispatch]);
    return (
        <>
            <Header mode={HEADER_MODES.admin}/>
            <FlexContainer>
                <SideBarProvider>
                    <SideBar />
                    <CreatorProvider>
                            <Outlet />
                    </CreatorProvider>
                </SideBarProvider>
            </FlexContainer>
        </>
    )
}