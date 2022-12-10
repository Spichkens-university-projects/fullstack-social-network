import { useTypedSelector } from "./TypedHooks";

export const useAuth = () => useTypedSelector((state) => state.auth);
