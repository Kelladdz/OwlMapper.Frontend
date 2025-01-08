import AuthLabel from "../../components/Labels/AuthLabel/AuthLabel";
import LoginForm from '../../forms/LoginForm/LoginForm';
import { AUTH_LABELS } from "../../constants/authLabels";


export default function LoginPage() {
    return (
        <>
            <AuthLabel label={AUTH_LABELS.signIn}/>
            <LoginForm />
        </>
    )
}