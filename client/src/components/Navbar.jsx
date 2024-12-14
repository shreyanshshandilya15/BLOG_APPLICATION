import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Navbar() {
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
        ABOUT
        CONTACT
        <Link to="/create">COMPOSE</Link>
        <Link to="/register" onClick={handlelogout}>{user && "LOGOUT"}</Link>
       </ul>
       <article className='flex items-center gap-2 text-xl'>
        {user ? <>
          <Link to="/profile"><img className="h-12 w-12 rounded-full object-cover" src={user && PF+user.profile} alt='set'/></Link>
          <i className="fa-solid fa-magnifying-glass"></i> 
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
