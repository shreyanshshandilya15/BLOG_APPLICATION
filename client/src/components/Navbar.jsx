import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Navbar() {
   const {user,dispatch}=useContext(Context);
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();
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

   const handleSearchChange = (e) => {
     const query = e.target.value;
     setSearchQuery(query);
     navigate(`/?search=${encodeURIComponent(query.trim())}`);
   };

  return (
    <div className='flex justify-between items-center m-4 mt-3'>
       <article className='flex gap-8 text-xl '>
       <a href=""><i className="fa-brands fa-facebook"></i></a>
       <a href=""><i className="fa-brands fa-instagram"></i></a>
       <a href="https://twitter.com/Shreyan80810857"><i className="fa-brands fa-twitter"></i></a>
       <a href=""><i className="fa-brands fa-pix"></i></a>
       </article>
       <ul className='flex gap-3'>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/create">COMPOSE</Link>
        <Link to="/register" onClick={handlelogout}>{user && "LOGOUT"}</Link>
       </ul>
       <article className='flex items-center gap-4 text-xl'>
        {user ? <>
          <Link to="/profile"><img className="h-12 w-12 rounded-full object-cover" src={getProfileImage()} alt={user.name || 'Profile'} /></Link>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>  :
        <>
          <Link to="/login">LOGIN</Link>
          |
          <Link to="/register"className=''>REGISTER</Link>
       </>
       }
       </article>
    </div>
  )
}
