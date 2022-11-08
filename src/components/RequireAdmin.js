import { Navigate, Outlet, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenUrl } from "../Urls";
import { useEffect } from "react";
import { fetchTokenSuccess } from "../action/Token";
import GeoLocation from "./Location";


const RequireAdmin = (props) => {
    const dispatch = useDispatch()
    const token = useSelector(p => p.token?.token)
    
    return (
        token !== null ? <GeoLocation><Outlet/> </GeoLocation>: <Navigate to={'/login'} replace/>
    )
}

export default RequireAdmin;