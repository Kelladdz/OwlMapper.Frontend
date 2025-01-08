import React,{ useEffect, useContext } from "react"
import { useParams } from "react-router-dom";

import CreatorContext from "../../../context/creator";
import { useFetchVariantQuery } from "../../../store";

import LineForm from "../../../forms/LineForm/LineForm";
import LineCreatorMap from "../../../components/Maps/LineCreatorMap/LineCreatorMap";
import FlexContainer from "../../../components/Containers/FlexContainer/FlexContainer";

import { ACTIONS } from "../../../constants/actions";
import CurrentDataContext from "../../../context/currentData";
import isLineFormLoaded from "../../../conditions/isLineFormLoaded";
import { useLinesCreator } from "../../../hooks/useLinesCreator";

export default function LinesCreator({action}) {
    const params = useParams();

    const {onVariantSelect, selectedVariant} = useContext(CreatorContext);
    const {getParams} = useContext(CurrentDataContext)
    const {getVariant} = useLinesCreator(action, params);

    const {data, error, isLoading} = useFetchVariantQuery({lineName: params.lineName, id: params.variantId}, {skip: action !== ACTIONS.editVariant || !params}) || [];
    
    useEffect(() => {
        if (!isLoading && data) {
            onVariantSelect(data)
            getVariant(data);
        }
    },[isLoading, data])

    useEffect(() => {
        if (params !== undefined) {
        getParams(params)
        }
    }, [params])



    return (
        <FlexContainer>            
            {isLineFormLoaded(action, data, isLoading) ? <LineForm isLoaded={true} action={action}/> : <LineForm isLoaded={false} action={action}/>}
            <LineCreatorMap />        
        </FlexContainer>
    )
}