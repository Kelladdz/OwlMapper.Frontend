import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import CreatorContext from "../context/creator";

export function useMarkingsList() {
    const variantsWithLetters = useSelector(state => state.scheduleCreator.variantsWithLetters);

    const {onChangeMarkingsHandle, markings} = useContext(CreatorContext);

    useEffect(() => {
        if (variantsWithLetters.length > 1) {
            let markings = [];
            variantsWithLetters.forEach((variant, index) => {
                if (variant.symbol !== '1') {
                    if (variant.route.split(' - ')[2] && variant.route.split(' - ')[2] === variantsWithLetters[0].route.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs przez: ${variant.route.split(' - ')[1]}`)
                    } else if (variant.route.split(' - ')[2] && variant.route.split(' - ')[2] !== variantsWithLetters[0].route.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs do: ${variant.route.split(' - ')[2]} przez: ${variant.route.split(' - ')[1]}`)
                    } else if (!variant.route.split(' - ')[2] && variant.route.split(' - ')[1] !== variantsWithLetters[0].route.split(' - ')[1]) {
                        markings.push(`${variant.symbol} - Kurs do: ${variant.route.split(' - ')[1]}`)
                    }
                    onChangeMarkingsHandle(markings);
                }               
            })
        }
        if (variantsWithLetters.length === 1 && variantsWithLetters[0].symbol === '1') {
            onChangeMarkingsHandle([]);
        }
    },[variantsWithLetters]);

    return {markings}
}