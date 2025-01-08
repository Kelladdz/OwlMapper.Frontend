import { ACTIONS } from "../constants/actions"

export default function isLineFormLoaded(action, data, isLoading) {
    return ((action !== ACTIONS.createLine && data && !isLoading) || action === ACTIONS.createVariant)
}