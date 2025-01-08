import { ACTIONS } from '../constants/actions';

export default function isNameInputDisabled(property, action) {
    return (property !== 'variant-name' && action !== ACTIONS.createLine) 
    || (property === 'variant-name' && action !== ACTIONS.createVariant);
}
