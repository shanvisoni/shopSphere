import { useState,useEffect } from "react";
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;


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
