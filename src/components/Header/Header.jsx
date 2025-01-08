
import WhiteLogo from '../../assets/logo.svg';
import BlackLogo from '../../assets/logoBlack.svg'

import styles from './Header.module.css';
import { useRef, useEffect } from 'react';
import { HEADER_MODES } from '../../constants/headerModes';
import { useHeader } from '../../hooks/useHeader';

export default function Header({mode}) {
    const headerRef = useRef();

    const {logo} = useHeader(mode);

    useEffect(() => {
        if (mode && headerRef.current) {
            const header = headerRef.current;
            switch (mode) {
                case HEADER_MODES.admin:
                    header.classList.add(styles.admin);
                    break;
                case HEADER_MODES.user:
                    header.classList.add(styles.user);
                    break;
                case HEADER_MODES.auth:
                    header.classList.add(styles.auth);
                    break;
                default:
                    break;
            }
             
        }
    },[mode, headerRef])

    return (
    <header ref={headerRef} className={styles.header}>
        <div>
            <img src={logo} alt='logo' />
        </div>
    </header>
    )
}