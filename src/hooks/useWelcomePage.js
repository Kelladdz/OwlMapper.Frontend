import { useSelector } from "react-redux";

export function useWelcomePage() {
    const firstName = useSelector(state => state.auth.firstName);

    return {firstName}
}