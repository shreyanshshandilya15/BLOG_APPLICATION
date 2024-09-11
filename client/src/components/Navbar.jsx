import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context';

export default function Navbar() {
   const {user,dispatch}=useContext(Context);
   const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`
   const handlelogout=()=>{
         dispatch({type:"LOGOUT"});
   }
  return (
    <div className='flex justify-between m-4'>
       <article className='flex gap-2 text-xl'>
       <a href=""><i className="fa-brands fa-facebook"></i></a>
       <a href=""><i className="fa-brands fa-instagram"></i></a>
       <a href="https://twitter.com/Shreyan80810857"><i className="fa-brands fa-twitter"></i></a>
       <a href=""><i className="fa-brands fa-pix"></i></a>
       </article>
       <ul className='flex gap-3'>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/create">WRITE</Link>
        <Link to="/register" onClick={handlelogout}>{user && "LOGOUT"}</Link>
       </ul>
       <article className='flex items-center gap-2 text-xl'>
        {user ? <>
          <Link to="/profile"><img className="h-8 w-8 rounded object-cover"src={PF+user.profile} alt="Loading..."/></Link>
          <i className="fa-solid fa-magnifying-glass"></i> 
        </>  :
        <>
          <Link to="/login">Login</Link>
          <Link to="/register"className=''>Register</Link>
       </>
       }
       </article>
    </div>
  )
}
