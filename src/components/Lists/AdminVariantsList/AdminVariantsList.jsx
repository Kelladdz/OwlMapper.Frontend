import { useAdminVariantsList } from "../../../hooks/useAdminVariantsList";
import PlusSign from '../../../assets/plusSignBlack.svg';
import EditVariantIcon from '../../../assets/editVariantIcon.svg';
import DeleteVariantIcon from '../../../assets/minusSignBlack.svg';


import styles from './AdminVariantsList.module.css';
import AdminIconButton from "../../Buttons/AdminIconButton/AdminIconButton";

export default function AdminVariantsList() {
    const {onNavigate, handleEditVariantButton, handleCreateVariantButton, onVariantDelete, selectedLine, variants, error, isLoading,} = useAdminVariantsList();
    
    return (
        <div className={styles.container}>
            <span className={styles.label}>Warianty połączeń</span>
            {variants && !isLoading && <div className={styles.list}>
                {variants && !isLoading && variants.map((item, index) => {
                    return (
                        
                        <div key={index} className={styles['variant-box']}>
                                <div key={index} className={styles.variant}>{item.variant.route}</div>
                                <div className={styles.btns}>
                                    <AdminIconButton onClick={() => handleEditVariantButton(item.variant)} icon={EditVariantIcon} alt='edit-variant-icon'/> 
                                    <AdminIconButton onClick={() => {onVariantDelete(item.variant.id)}} icon={DeleteVariantIcon} alt='delete-variant-icon'/>
                                </div>
                            </div>)
                            
                        })}
                        <AdminIconButton onClick={handleCreateVariantButton} icon={PlusSign}  alt='plus-sign'/>   
                    
                </div>}
        </div>)
}