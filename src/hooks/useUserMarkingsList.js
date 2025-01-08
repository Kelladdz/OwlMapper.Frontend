import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import CreatorContext from "../context/creator";
import UserInterfaceContext from "../context/userInterface";

export function useUserMarkingsList() {
    const {variantsWithSymbols, onChangeMarkingsHandle, markings, deps} = useContext(UserInterfaceContext);



    useEffect(() => {
        if (variantsWithSymbols && variantsWithSymbols.length > 1) {
            let markings = [];
            variantsWithSymbols.sort((a,b) => a.variant.symbol - b.variant.symbol).forEach((variant, index) => {
                if (variant.symbol !== '1') {
                    const mainVariant = variantsWithSymbols.find(variant => variant.symbol === '1')
                    console.log('Main variant: ', mainVariant)
                    if (variant.variant.split(' - ')[2] && mainVariant && variant.variant.split(' - ')[2] === mainVariant.variant.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs przez: ${variant.variant.split(' - ')[1]}`)
                    } else if (variant.variant.split(' - ')[2] && mainVariant && variant.variant.split(' - ')[2] !== mainVariant.variant.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs do: ${variant.variant.split(' - ')[2]} przez: ${variant.variant.split(' - ')[1]}`)
                    } else if (!variant.variant.split(' - ')[2] && mainVariant && variant.variant.split(' - ')[1] !== mainVariant.variant.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs do: ${variant.variant.split(' - ')[1]}`)
                    } 
                    onChangeMarkingsHandle(markings);
                }               
            })
        }
        if (variantsWithSymbols && variantsWithSymbols.length === 1 && variantsWithSymbols[0].symbol === '1') {
            onChangeMarkingsHandle([]);
        }
    },[variantsWithSymbols]);

    return {markings}
}