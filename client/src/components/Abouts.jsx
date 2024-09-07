import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";

export default function Abouts() {
  const [cat,setCat]=useState([]);
  const {search}=useLocation();

  // useEffect(()=>{
  //   const getcategory=async()=>{
  //     try{
  //       let category=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories/`+search,{
  //         method:"GET",
  //         headers:{
  //           'Content-Type':'application/json'
  //         }
  //       })
  //       category=await category.json();
  //       setCat(category);
  //     }catch(error){
  //       console.error('Error fetching categories:',error);
  //     }
  //   }
  //      getcategory();
  // },[search]);

  return (
    <div className="my-3 flex flex-col items-center">
        <hr />
        <div className="text-center text-xl">ABOUT ME</div>
        <hr />
        <img className="mx-auto my-3 h-60 w-52"src="/assets/aboutme.jpg" alt="" />
        <div className="text-center text-xl ">Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit.
         Amet quos velit magnam?</div>
        <hr className="my-2"/>
        <div className="text-center">CATEGORIES</div>
        <hr className="my-2" />
        {/* <div className="flex gap-4 justify-center">
            <ul className="flex gap-3 flex-wrap max-w-12">
             {cat.length>0 ? (
             cat.map((c)=>{
               <Link to={`/?cat=${c.name}`}>
              <li key={c._id}>{c.name}</li>
              </Link>
            })
             ): (
              <li>Loading categories...</li>
            )
             }
            </ul>
        </div> */}
        <hr className="my-2"/>
        <div className="text-center">FOLLOW US</div>
        <hr  className="my-2"/>
        <ul className="flex gap-2 text-xl justify-center">
        <i className="fa-brands fa-facebook"></i>
       <i className="fa-brands fa-instagram"></i>
       <i className="fa-brands fa-twitter"></i>
       <i className="fa-brands fa-pix"></i>
        </ul>
    </div>
  )
}