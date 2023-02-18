import { useContext, useDebugValue } from "react"
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
    const { auth } = useContext(AuthContext)
    useDebugValue(auth, auth => auth?.email ? "LOGGED IN" : "LOGGED OUT")
    
    return useContext(AuthContext)
}

export default useAuth
