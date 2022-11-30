import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTokenSuccess } from "../action/Token";
import GeoLocation from "../components/Location";
import { MerchantTokenUrl } from "../Utilities/Urls";
import { fetchUserSuccess } from "../action/UserAction";
import { fetchSiteSuccess } from "../action/SiteSetting";


const RequireAdmin = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(p => p.mToken?.mToken)
    if (token) {
        useEffect(() => {
            MerchantTokenUrl().get('/verify').catch((err) => {
                console.log(err?.response?.status)
                if (err?.response?.status === 401) {
                    navigate('/login')
                    dispatch(fetchUserSuccess(null))
                    dispatch(fetchSiteSuccess(null))
                    dispatch(fetchTokenSuccess(null))
                }
            }).then((res)=>null)
        }, [])
    }
    else{
        navigate('/login')
        dispatch(fetchUserSuccess(null))
        dispatch(fetchSiteSuccess(null))
        dispatch(fetchTokenSuccess(null))
    }
    return (
        token !== null ? <GeoLocation><Outlet /> </GeoLocation> : <Navigate to={'/login'} replace />
    )
}

export default RequireAdmin;