import Navbar from "../components/Navbar"
import Slider from "../components/Slider"
import Abouts from "../components/Abouts"
import { useEffect, useState } from "react"
import Posts from "../components/Posts.jsx"
import { useLocation } from "react-router-dom"
import NavbarMobile from "../components/NavbarMobile.jsx";

export default function Home() {
   const [posts,setPosts]=useState([]);
   const {search}=useLocation();
   const [ismobile,setIsMobile]=useState(true);
   const handlenavbar=()=>{
        setIsMobile(prev=>!prev);
   }
   const getdata=async()=>{
    let response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/`+search,{
      method:"GET",
      headers:{
        'Content-Type':"application/json"
      }
    })
    response=await response.json();
    setPosts(response);
   }
   useEffect(()=>{
    getdata();
   },[search]);
  
  return (
    <>
      <div className="hidden lg:block">
       <Navbar />
       <Slider />
       <div className="flex gap-10 mx-8 flex-row ">
       <div className="flex-grow min-w-[300px]"> 
       <Posts posts={posts}/>
       </div>
        <div className="flex-shrink-0 w-[300px]">
        <Abouts/>
        </div>
       </div>
      </div> 
      <div className="block lg:hidden">
       <NavbarMobile />
      <Slider />
       <div className="flex gap-10 mx-8 flex-col ">
        <Posts posts={posts}/>
        <div className="">
        <Abouts/>
        </div>
       </div>
      </div>
    </>
  )
}
