import { useCallback, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { useFetchVariantsQuery } from "../store";
import UserInterfaceContext from "../context/userInterface";
import RouteLinePointsContext from "../context/routeLines";

export  function useUserVariantsList() {
    const {selectedLine} = useContext(UserInterfaceContext);
    const {getRouteLinePoints} = useContext(RouteLinePointsContext);
    const {data: variants, error, isLoading} = useFetchVariantsQuery(selectedLine, {skip: selectedLine === ''}) || [];

    const handleMouseEnterOnVariant = useCallback(
        debounce(routeLinePoints => {
            getRouteLinePoints(routeLinePoints)
        }, 500),[getRouteLinePoints]);

    return {variants, error, isLoading, handleMouseEnterOnVariant};
}