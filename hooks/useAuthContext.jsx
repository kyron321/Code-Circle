import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext=()=>{
    const context = useContext(AuthContext)

    //error handling for handling context
    if(!context){
        throw Error("useAuthContext must be inside an AuthContextProvider")
    }

    //the returned context will contain the user property and the dispatched action type
    return context
}