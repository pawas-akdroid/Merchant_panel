import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTokenSuccess } from "../action/Token";
import GeoLocation from "../components/Location";
import { MerchantTokenUrl } from "../Utilities/Urls";
import { fetchUserSuccess } from "../action/UserAction";


const RequireAdmin = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(p => p.token?.token)
    if (token) {
        useEffect(() => {
            MerchantTokenUrl().get('/verify').catch((err) => {
                console.log(err?.response?.status)
                if (err?.response?.status === 401) {
                    navigate('/login')
                    dispatch(fetchUserSuccess(null))
                    dispatch(fetchTokenSuccess(null))
                }
            }).then((res)=>null)
        }, [])
    }
   

    return (
        token !== null ? <GeoLocation><Outlet /> </GeoLocation> : <Navigate to={'/login'} replace />
    )
}

export default RequireAdmin;