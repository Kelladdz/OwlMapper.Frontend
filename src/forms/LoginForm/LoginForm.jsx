import { LOGIN_INPUTS_PROPERTIES } from '../../constants/loginInputsProperties'
import styles from './LoginForm.module.css'
import LoginInput from '../../components/Inputs/LoginInput/LoginInput'
import AdminPanelButton from '../../components/Buttons/AdminPanelButton/AdminPanelButton'
import ValidationErrorLabel from '../../components/ValidationErrorLabel/ValidationErrorLabel'
import { useLoginForm } from '../../hooks/useLoginForm'

export default function LoginForm() {
    const {handleSubmit, loginErrors} = useLoginForm();
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <LoginInput property={LOGIN_INPUTS_PROPERTIES.userName}/>
            <LoginInput property={LOGIN_INPUTS_PROPERTIES.password}/>
            <div className={styles['validation-error-box']}>
                <ValidationErrorLabel message={loginErrors}/>  
            </div>
            <AdminPanelButton type='submit' label='Zaloguj' style={{marginLeft: 'calc(50% - 4rem)', marginTop: '1rem'}}/>
        </form>
    )
}