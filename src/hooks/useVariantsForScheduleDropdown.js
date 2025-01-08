import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatorContext from '../context/creator';
import { addVariantForSchedule } from '../store/slices/scheduleCreatorSlice';
import { useFetchVariantsQuery, useFetchFilteredByRouteStopVariantsQuery } from '../store/apis/variantsApi';

import {VARIANTS_FOR_SCHEDULE_DROPDOWN_LABELS} from '../constants/variantsForScheduleDropdownLabels.js';


export function useVariantsForScheduleDropdown() {
    const routeStops = useSelector(state => state.scheduleCreator.routeStops);
    const variantsWithLetters = useSelector(state => state.scheduleCreator.variantsWithLetters);
    const dispatch = useDispatch();

    const {selectedLine, onVariantSelect, onAllOptionsHandle, onOptionsHandle, variantSymbol, nextVariantSymbol, allOptions, routeStopsDisplay, selectedVariantData} = useContext(CreatorContext);
    
    
    const {data: filteredVariantsData, error: filteredVariantsError, isLoading: filteredVariantsIsLoading} = useFetchFilteredByRouteStopVariantsQuery({
        lineName: selectedLine,
        busStopId: routeStopsDisplay.length > 0 ? routeStopsDisplay.find(stop => stop.order === 1).busStopId : ''
    }, {skip: routeStopsDisplay.length === 0}) || selectedVariantData;
    
    const label = variantsWithLetters.length === 0 ? VARIANTS_FOR_SCHEDULE_DROPDOWN_LABELS.selectMainVariant : VARIANTS_FOR_SCHEDULE_DROPDOWN_LABELS.selectNextVariants;
    
    const onFetchedAllVariantsHandle = (variants) => {
        const options = variants.map(variant => {
            return {
                value: variant.variant.id,
                label: variant.variant.route
            }
        });
        onAllOptionsHandle(options);
    }

    const onFetchedVariantsHandle = (variants) => {
        const options = variants.map(variant => {
            return {
                value: variant.variant.id,
                label: variant.variant.route
            }
        });
        onOptionsHandle(options);
    }

    const optionSelectHandle = (option) => {
        const variant = {variantId: option.value, route: option.label};
        onVariantSelect(option.value);
        if (variantsWithLetters.length === 0) {
            dispatch(addVariantForSchedule({...variant, symbol: '1'}))
        } else {
            dispatch(addVariantForSchedule({...variant, symbol: variantSymbol}))
            nextVariantSymbol();
        }
    }

    useEffect(() => {
        if (!filteredVariantsIsLoading && filteredVariantsData) {
            onFetchedVariantsHandle(filteredVariantsData);
        }
    }, [filteredVariantsData, filteredVariantsIsLoading]);

    useEffect(() => {
        if (variantsWithLetters.length === 0) {
            onOptionsHandle(allOptions);
        }
    }, [variantsWithLetters]);

    return {onVariantSelect, label, onFetchedAllVariantsHandle, onFetchedVariantsHandle, optionSelectHandle};
}