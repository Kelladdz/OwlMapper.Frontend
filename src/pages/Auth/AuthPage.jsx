import { Outlet } from "react-router-dom";
import AuthContainer from "../../components/Containers/AuthContainer/AuthContainer";
import LogoBlack from '../../assets/logoBlack.svg'


export default function AuthPage() {
    return (
        <>
            <img src={LogoBlack} style={{marginLeft: 'calc(50% - 4rem)', marginTop: '6rem'}} alt='Black Owl Logo'/>
            <AuthContainer>
                <Outlet/>
            </AuthContainer>
        </>
        
    )
}