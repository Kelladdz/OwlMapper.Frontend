import DeleteDepartureButton from '../../../assets/deleteDepartureButton.svg'

import styles from './DepartureTimesList.module.css'

export default function DepartureTimesList({sortedTimes, onAppropriateRemoveAction}) {

    
    return (
    <div className={styles.container}>
        {sortedTimes.map((time, index) => {
            return (
                <span className={styles.time}>
                    {`${time.time}${time.isOnlyInSchoolDays ? 'S' : ''}${time.isOnlyInDaysWithoutSchool ? 'W' : ''}`}
                    <div onClick={() => onAppropriateRemoveAction(time)} className={styles['delete-btn']}>
                        <img  src={DeleteDepartureButton} alt='delete-departure-button'/>
                    </div>
                </span>)
            })
        }
    </div>)
}