import { useState,useEffect } from "react";
import axios from 'axios';
const API = window.location.origin.includes("localhost")
  ? "http://localhost:5080/api/v1"
  : "https://shopsphere-1-jxst.onrender.com/api/v1";


export default function useCategory(){
    const [categories,setCategories]=useState([]);

    const getCategories=async()=>{
        try {
            const {data}=await axios.get(`${API}/category/get-category`);
            setCategories(data?.category);
        } catch (error) {
        }
    };
    useEffect(()=>{
        getCategories();
    },[]);
    return categories;
}
