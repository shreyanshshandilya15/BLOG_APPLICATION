import { useState } from "react";
import { useContext } from "react";
import { Context } from '../context/Context';
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";

export default function NavbarMobile() {
     const [shownav,setShowNav]=useState(false);
     const {user,dispatch}=useContext(Context);
    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`
     const handlelogout=async()=>{
      await auth.signOut();
      dispatch({type:"LOGOUT"});
      toast.success("Logged out successfully !");
         setTimeout(()=>{ 
         window.location.href="/register";
         },5000);
     }
     const handlenav=()=>{
        setShowNav(prev=>!prev);
     }
  return (
    <div>
      <article className='flex text-xl m-4 justify-between items-center'>
        <article className="flex gap-12 mx-auto">
        <a href=""><i className="fa-brands fa-facebook"></i></a>
       <a href=""><i className="fa-brands fa-instagram"></i></a>
       <a href="https://twitter.com/Shreyan80810857"><i className="fa-brands fa-twitter"></i></a>
       <a href=""><i className="fa-brands fa-pix"></i></a>
        </article>
        <i className="fa-solid fa-bars" onClick={handlenav}></i>
       </article>
       {shownav ?
       <div className="shadow-lg m-4 py-2">
       <ul className='flex flex-col gap-4 items-center'>
        <Link to="/">HOME</Link>
        <hr className="border-2 border-gray-600 w-2/3"/>
        <Link to="/about" className="my-1 ">ABOUT</Link>
        <hr className="border-2 border-gray-600 w-2/3"/>
        <Link to="/contact" className="my-1 ">CONTACT</Link>
        <hr className="border-2 border-gray-600 w-2/3"/>
        <Link to="/create" className="my-1">WRITE</Link>
        <hr className="border-2 border-gray-600 w-2/3"/>
        {user ? <><Link to="/register" onClick={handlelogout} className="my-1">{user && "LOGOUT"}</Link>
         <hr className="border-2 border-gray-600 w-2/3 "/>
         <Link to="/profile"><img className="h-12 w-12 rounded-full object-cover"src={user && PF+user.profile } alt="Set"/></Link>
         </>
        : <><Link to="/login" className="my-1">Login</Link>
         <hr className="border-2 border-gray-600 w-2/3"/>
        <Link to="/register"className='my-1'>Register</Link>
        </>
        }
        
       </ul>
       </div>
        :
        <></>}
    </div>
  )
}
