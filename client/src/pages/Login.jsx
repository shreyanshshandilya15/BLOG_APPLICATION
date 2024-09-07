import { useContext ,useRef,useEffect} from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { Context } from "../context/Context.jsx";

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
    <div>      
       <Navbar/>
       <div className='' style={{backgroundImage:"url(http://source.unsplash.com/random/?user)"}} >
       <button className="text-white bg-green-600 mx-1 my-10 w-28">Register</button>
       <form action="" className="m-13 flex-col text-center" >
             <div className=" text-3xl">Login</div>
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
            >Login</button>
       </form>
    </div>
    </div>
  )
}
