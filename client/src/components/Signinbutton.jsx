import { useContext, useEffect, useState } from "react";
import { provider,auth } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { Context } from "../context/Context";
import {GoogleButton} from 'react-google-button';
import { onAuthStateChanged } from "firebase/auth";

export default function Signinbutton() {
    const {user,dispatch,isFetching}=useContext(Context);
    const googleLogin=async()=>{
         try{
          const result=await signInWithPopup(auth,provider);
          console.log(result);
          dispatch({ type:'LOGIN_START' });
          if(result.user){
          const data={
            name:result.user.displayName,
            email:result.user.email,
            profile:result.photoURL
          }
          await dispatch({type:"LOGIN_SUCCESS",payload:data});
          toast.success("logged in successfully !");
          setTimeout(() => {
            window.location.href="/";
          }, 5000);
          }
        }
         catch(error){
          await dispatch({ type: "LOGIN_FAILURE" });
          console.error("Error signing in with google",error);
         }
    }
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const data = {
            name: user.displayName,
            email: user.email,
            profile: user.photoURL || 'defaultProfileUrl',  // Handle missing photo URL
          };
          dispatch({ type: "LOGIN_SUCCESS", payload: data });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      });
  
      return () => unsubscribe();
    }, [dispatch]);
  

  return (
    <div>
        <GoogleButton onClick={googleLogin} className="p-2"/>
    </div>
  )
}
