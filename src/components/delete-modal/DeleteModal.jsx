import { useContext, useEffect, useState } from "react"
import {createPortal} from "react-dom"
import ModalsContext from "../../context/modals"
import './delete-modal.css'
import CreatorContext from "../../context/creator";
import ModalButton from "../Buttons/modal-button/ModalButton";
import { useDeleteLineMutation } from "../../store";
import { useDeleteVariantMutation } from "../../store";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({activeModal}) {
    const {toggleModal} = useContext(ModalsContext);
    const {selectedLine, onLineSelect, selectedVariant, onVariantSelect} = useContext(CreatorContext);

    const navigate = useNavigate();
    const [deleteLine, {isLoading}] = useDeleteLineMutation();
    const [deleteVariant, {isLoadingVariant}] = useDeleteVariantMutation();

    const modalPrimaryLabels = {
        'delete-line': {firstLine: `Czy na pewno chcesz usunąć linię`, secondLine: `${selectedLine}?`},
        'delete-variant': {firstLine: `Czy na pewno chcesz usunąć to połączenie?`, secondLine: ``},
        }



    const onDelete= async () => {
        const request = {
            id: selectedVariant,
            lineName: selectedLine    
        }
        try {
            if (activeModal === 'delete-variant') {
                await deleteVariant(request).unwrap();
                
            } else if (activeModal === 'delete-line') {
            await deleteLine(selectedLine).unwrap();
            } 
        } catch (err) {
            if (activeModal === 'delete-line') {
                console.error('Usuwanie linii się nie powiodło.', err)
            } else if (activeModal === 'delete-variant') {
                console.error('Usuwanie połączenia się nie powiodło.', err)
            }
        } finally {
            if (activeModal === 'delete-variant') {
                onVariantSelect(null)
                navigate(`/admin/lines/${selectedLine}/variants/delete/success`);
            };
            if (activeModal === 'delete-line') {
                onLineSelect(null);
                navigate('/admin/lines/delete/success');
            
            toggleModal(null)
            }
        }
    }

    useEffect(() => {
        return () => toggleModal(null)
    },[])
    
    
        return (
            <div>
                {createPortal(<div className='delete-modal'>
                    <div className='delete-modal-box'>
                        <span className='delete-modal-text-primary'>{modalPrimaryLabels[activeModal].firstLine}</span>
                        <span className='delete-modal-text-primary'>{modalPrimaryLabels[activeModal].secondLine}</span>
                        <span className='delete-modal-text-secondary'>Tej zmiany nie będzie można odwrócić</span>
                        <div className='delete-modal-buttons'>
                            <ModalButton className='cancel-modal-btn' onClick={() => toggleModal(null)} label='Anuluj'/>
                            <ModalButton className='delete-modal-btn' onClick={onDelete} label='Usuń'/>
                        </div>
                    </div>
                </div>, document.querySelector('.modal-container'))
            }</div>)   
}