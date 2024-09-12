import { useContext ,useRef,useEffect} from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { Context } from "../context/Context.jsx";
import NavbarMobile from "../components/NavbarMobile.jsx";

export default function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {user,dispatch,isFetching}=useContext(Context);  
  const handlesubmit=async(e)=>{
    e.preventDefault();
    dispatch({  type:'LOGIN_START' });
    try{
        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,{
          name:userRef.current.value,
          password:passwordRef.current.value
        }
        );
        await dispatch({
          type:'LOGIN_SUCCESS',
          payload:response.data
        });
    }
    catch(err){
      await dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  useEffect(()=>{
    console.log(user);
  },[user]);

  return (   
    <div className="overflow-hidden">      
       <div className="hidden lg:block">
      <Navbar/>
      </div>
      <div className="block lg:hidden">
        <NavbarMobile />
      </div>
       <div className="bg-[url('./assets/login.jpg')] bg-cover bg-center h-[92vh] ">
       <button className="text-white bg-green-800 w-24 py-1 float-end my-10 mx-4 rounded-md">Register</button>
       <form className="h-80 w-80 bg-white rounded-full flex m-auto" >
             {/* <div className=" text-3xl">Login</div>
             <div className="py-2">Username</div>
             <input ref={userRef} type="text" className="text-center bg-white py-1 rounded" name="" id="name" placeholder="Enter your name" />
             <div className="py-2">Password</div>
             <input ref={passwordRef} type="password" className="text-center bg-white py-1 rounded" name=""placeholder="Enter your Passoword" id="password" />
             <div></div>
             <button 
                  disabled={isFetching} 
                  onClick={handlesubmit}
                  className="bg-blue-600 my-3 text-white w-20 rounded-sm" 
                  type="submit"
                  style={{cursor:isFetching? 'not-allowed' :'pointer'}}
            >Login</button> */}
       </form>
    </div>
    </div>
  )
}
