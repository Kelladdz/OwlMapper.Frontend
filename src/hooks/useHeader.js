import WhiteLogo from '../assets/logo.svg';
import BlackLogo from '../assets/logoBlack.svg'
import { HEADER_MODES } from '../constants/headerModes';

export function useHeader(mode) {
    const logo = mode === HEADER_MODES.auth ? BlackLogo : WhiteLogo;

    return {logo}
}