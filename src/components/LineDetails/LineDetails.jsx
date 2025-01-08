import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import CreatorContext from "../../context/creator";
import { useFetchVariantsQuery } from "../../store/apis/variantsApi";
import { useAdminVariantsList } from "../../hooks/useAdminVariantsList";

import styles from './LineDetails.module.css';
import DeleteModal from "../delete-modal/DeleteModal";
import ModalsContext from "../../context/modals";
import { useNavigate } from "react-router-dom";

import AdminSectionTitle from "../AdminSectionTitle/AdminSectionTitle";
import AdminVariantsList from "../Lists/AdminVariantsList/AdminVariantsList";
import AdminPanelButton from "../Buttons/AdminPanelButton/AdminPanelButton";

export default function LineDetails() {
    const {toggleModal} = useAdminVariantsList();
    const {selectedLine} = useContext(CreatorContext);
    const {activeModal} = useContext(ModalsContext);

    return (
        <>

            <div className={styles.container}>
                {activeModal && <DeleteModal activeModal={activeModal} />}
                <AdminSectionTitle title={`Linia ${selectedLine}`}/>
                <AdminVariantsList /> 
                <AdminPanelButton type='button' label='Usuń linię' onClick={() => toggleModal('delete-line')} style={{color: 'red', position: 'absolute', bottom: '1rem', right: 'calc(50% - 3rem)'}}/>          
            </div>
        </>
            
    )
}