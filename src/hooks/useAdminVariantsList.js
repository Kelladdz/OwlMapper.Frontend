import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchVariantsQuery, useFetchVariantQuery } from "../store";

import CreatorContext from "../context/creator";
import ModalsContext from "../context/modals";

export function useAdminVariantsList() {
    const {toggleAction, selectedLine, onVariantSelect} = useContext(CreatorContext);
    const {toggleModal} = useContext(ModalsContext);
    const {data, error, isLoading} = useFetchVariantsQuery(selectedLine) || [];

    const [variants, setVariants] = useState();
    const navigate = useNavigate();

    const handleEditVariantButton = (variant) => {
        toggleAction('edit-variant');
        onVariantSelect(variant);
        navigate(`/admin/lines/${selectedLine}/variants/${variant.id}/edit`)
    }

    const onVariantDelete = (id) => {
        onVariantSelect(id);
        toggleModal('delete-variant');
    }

    const handleCreateVariantButton = () => {
        navigate(`/admin/lines/${selectedLine}/variants/create`);
    }

    useEffect(() => {
        if (!isLoading && data) {
            setVariants(data);
        }
    },[isLoading, data])

    return {handleEditVariantButton, onVariantDelete, handleCreateVariantButton, variants, error, isLoading, onVariantSelect, toggleModal}
}