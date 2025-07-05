import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
    const ctx = useContext(UserContext);
    if(!ctx){
        throw new Error("must be used in provider")
    }
    return ctx
}