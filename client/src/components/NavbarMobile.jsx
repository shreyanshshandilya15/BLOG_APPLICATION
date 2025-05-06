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

     const getProfileImage = () => {
       if (!user) return null;
       // If user has a photoURL from Google Auth
       if (user.profile && user.profile.includes('googleusercontent.com')) {
         return user.profile;
       }
       // If user has uploaded a custom profile picture
       if (user.profile && !user.profile.includes('googleusercontent.com')) {
         return PF + user.profile;
       }
       // For no profile picture, return gray avatar
       return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
     }

  return (
    <div>
      <div className='flex justify-between items-center px-4 py-3'>
        <div className="flex-1 flex justify-center">
          <button onClick={() => setShowNav(prev => !prev)} className="text-2xl">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <article className='flex items-center justify-center gap-8 text-xl'>
            <a href="" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="" className="hover:text-pink-600 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://twitter.com/Shreyan80810857" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-twitter"></i></a>
            <a href="" className="hover:text-gray-600 transition-colors"><i className="fa-brands fa-pix"></i></a>
          </article>
        </div>
      </div>
      
      <div className={`fixed top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ${shownav ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setShowNav(prev => !prev)} className="absolute top-4 right-4 text-2xl">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <ul className="flex flex-col items-center justify-center h-full gap-4 text-xl">
          <Link to="/" className="my-1">HOME</Link>
          <hr className="border-2 border-gray-600 w-2/3" />
          <Link to="/about" className="my-1">ABOUT</Link>
          <hr className="border-2 border-gray-600 w-2/3" />
          <Link to="/contact" className="my-1">CONTACT</Link>
          <hr className="border-2 border-gray-600 w-2/3" />
          <Link to="/create" className="my-1">COMPOSE</Link>
          <hr className="border-2 border-gray-600 w-2/3" />
          {user ? (
            <>
              <Link to="/register" onClick={handlelogout} className="my-1">LOGOUT</Link>
              <hr className="border-2 border-gray-600 w-2/3" />
            </>
          ) : (
            <>
              <Link to="/login" className="my-1">LOGIN</Link>
              <hr className="border-2 border-gray-600 w-2/3" />
              <Link to="/register" className="my-1">REGISTER</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
