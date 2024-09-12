import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import NavbarMobile from '../components/NavbarMobile.jsx';

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
       }catch(error){
        setError(error);
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
      <div className='max-h-full h-screen' style={{ backgroundImage: "url(http://source.unsplash.com/random/?user)" }} >
        <button className="text-white bg-green-600 mx-1 my-10 w-28">Login</button>
        <form className="m-13 flex-col text-center background: linear-gradient(to bottom, #ffffff 0%, #000000 100%); ">
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
              className="bg-blue-600 my-3 text-white w-20 rounded-sm" 
              type="submit"
              onClick={handlesubmit}
              >SignUp</button>
              {error && <span className='text-center text-red-500'>Something went wrong!!</span>}
        </form>
      </div>
    </div>
  )
}