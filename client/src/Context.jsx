import axios from "axios";
import React,{createContext,useState,useEffect} from "react";
import ProductApi from "./API/ProductApi";
import UserApi from "./API/UserApi";

export const Context = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    const refreshToken =async () => {
        const res = await axios.get("http://localhost:5000/user/refresh_token")
        setToken(res.data.accessToken) 
    }
    const state ={
        token : [token, setToken],
        ProductApi: ProductApi(),
        UserApi: UserApi(token)
    }
    useEffect(() => {
       const firstLogin = localStorage.getItem("firstLogin")
        if(firstLogin) refreshToken()
    }, []);

    return(
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    )
}


