import {useState,useEffect} from "react"
import {useAuth} from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const API = window.location.origin.includes("localhost")
  ? "http://localhost:5080/api/v1"
  : "https://shopsphere-1-jxst.onrender.com/api/v1";


export default function PrivateRoute(){
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
const authCheck = async()=>{
    const res=await axios.get(`${API}/auth/user-auth`)
    if(res.data.ok){
        setOk(true)
    }
    else{
        setOk(false)
    }
}
if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/> :<Spinner/>
}