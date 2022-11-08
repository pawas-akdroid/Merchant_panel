import { useSelector } from "react-redux";

import axios from 'axios'




export const MerchantUrl = axios.create({
    baseURL: `http://localhost:6001/api/v1/merchant`,
  
})  

    

export const MerchantTokenUrl =()=>{
    const token = (JSON.parse(localStorage.getItem("state")))?.token?.token
    const site = (JSON.parse(localStorage.getItem("state")))?.site?.site
   
    
    return axios.create({
        baseURL: `http://localhost:6001/api/v1/merchant`,
        headers:{
            "Authorization":`Bearer ${token}`,
            "site" : site,
            'Access-Control-Allow-Origin': 'https://aa75-27-34-20-114.ngrok.io/api/v1/merchant'
        }
      
    })
} 


export const  GameImgUrl ="https://kinkhelgame.thriftlynepal.com/"
export const  ImgUrl ="https://kinkhelpoint.thriftlynepal.com/"
export const  ImgUrl2 ="http://localhost:6001/"

