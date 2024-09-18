import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import NavbarMobile from '../components/NavbarMobile.jsx';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Signinbutton from '../components/Signinbutton.jsx';

export default function Register() {
  const Navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");

  const handlesubmit=async(e)=>{
       e.preventDefault();
       try{
          let response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,email:email,password:password})
          })
          response=await response.json();
          console.log(response);
          Navigate("/login");
          toast.success("Registration Successful,Login to write Posts!");
       }catch(error){
        setError(error);
        toast.error(error);
       }
  }
  return (
    
    <div>
       <div className="hidden lg:block">
      <Navbar/>
      </div>
      <div className="block lg:hidden">
        <NavbarMobile />
      </div>
      <div className="bg-[url('/assets/back.jpg')] bg-cover bg-center h-[92vh] ">
        <Link to={`/login`}><button className="text-white bg-green-800 w-24 py-1 my-10 mx-4 rounded-md">Login</button></Link>
        <div className='w-80 flex max-w-full m-auto justify-center h-80 rounded-full items-center flex-col my-4'>
        <form className="flex flex-col items-center">
          <div className=" text-3xl">Register</div>
          <div className='py-2'>Name</div>
          <input 
              type="text" 
              className="text-center  py-1 rounded" 
              name="" 
              id="" 
              placeholder="Enter your name" 
              onChange={(e)=>setName(e.target.value)}
              />
          <div className="py-2">Email</div>
          <input 
              type="email" 
              className="text-center py-1 rounded" 
              name="" 
              id="" 
              placeholder="Enter your email" 
              onChange={(e)=>setEmail(e.target.value)}
              />
          <div className="py-2">Password</div>
          <input 
              type="password" 
              className="text-center py-1 rounded" 
              name="" 
              placeholder="Enter your Passoword" 
              id="" 
              onChange={(e)=>setPassword(e.target.value)}
              />
          <div></div>
          <button 
              className="bg-blue-500 my-3 py-2 rounded-md text-white w-20" 
              type="submit"
              onClick={handlesubmit}
              >SignUp</button>
              {error && <span className='text-center text-red-500'>Something went wrong!!</span>}
        </form>
        <span>or</span>
        <Signinbutton />
        </div>
      </div>
    </div>
  )
}