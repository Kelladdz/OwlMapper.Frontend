import PlusSign from '../../../assets/plusSign.svg';

import styles from './AddRouteStopButton.module.css';

export default function AddRouteStopButton({onClick}) {
    return (
    <button type='button' onClick={onClick} className={styles['add-route-stop-btn']}>
        <img src={PlusSign} alt='plus-sign'/>
    </button>)
}