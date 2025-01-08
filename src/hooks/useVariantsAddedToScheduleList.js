import { useContext, useEffect } from "react";
import { useScheduleCreator } from "./useScheduleCreator";
import CreatorContext from "../context/creator";
import { useDispatch, useSelector } from "react-redux";
import {removeVariantForSchedule, removeDepartureTimesForSchedule} from "../store/slices/scheduleCreatorSlice";

export function useVariantsAddedToScheduleList() {
    const variantsWithSymbols = useSelector(state => state.scheduleCreator.variantsWithLetters);
    const dispatch = useDispatch();
    const {onRemoveVariant, onVariantSelect} = useContext(CreatorContext);

    const variantRemoveHandle = (variant) => {
        onRemoveVariant(variant);
        dispatch(removeVariantForSchedule(variant));
        dispatch(removeDepartureTimesForSchedule(variant));
        onVariantSelect('');
    }

    useEffect(() => {
        if (variantsWithSymbols) {
            console.log('Selected variants and symbols: ', variantsWithSymbols);
        }
    }, [variantsWithSymbols]);

    return {variantsWithSymbols, variantRemoveHandle};
}