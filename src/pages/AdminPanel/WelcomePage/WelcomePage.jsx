import { useWelcomePage } from "../../../hooks/useWelcomePage";
import styles from './WelcomePage.module.css';
export default function WelcomePage() {
    const {firstName} = useWelcomePage();
    return (
        <div className={styles.container}>
            <span className={styles.label}>Witaj, Alek</span>
        </div>
    )
}