import DatePicker from "react-datepicker"

import { useDispatch, useSelector } from "react-redux"
import 'react-datepicker/dist/react-datepicker.css';
import { changeValidFromDate } from "../../../store/slices/lineCreatorFormSlice";
import styles from './ValidFromInput.module.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { pl } from 'date-fns/locale/pl';
import { useContext } from "react";
import CreatorContext from "../../../context/creator";
import { useValidFromInput } from "../../../hooks/useValidFromInput";
registerLocale('pl', pl)

export default function ValidFromInput() {
    const {validFrom, handleValidFromDateChange, handleKeyDown} = useValidFromInput();
    

    return (
        <div className={styles.container}>
            <label className={styles.label}>Rozkład ważny od:</label>
            <DatePicker
                locale='pl'
                dateFormat={'dd.MM.yyyy'}
                calendarClassName={styles.calendar}
                customInput={<input className={styles.input} onKeyDown={handleKeyDown} onChange={(event) => handleValidFromDateChange(event.target.value)}/>}
                selected={validFrom}
                onChange={handleValidFromDateChange}
                ></DatePicker>
        </div>
    )
}