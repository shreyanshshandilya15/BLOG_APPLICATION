import { useContext, useState } from "react"
import Navbar from "../components/Navbar"
import { Context } from "../context/Context";
import axios from "axios";
import toast from "react-hot-toast";


export default function Create() {
 
  const {user}=useContext(Context);
  const [file,setFile]=useState("");
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  
  const handlesubmit=async(e)=>{
      e.preventDefault();
      const newPost={
        author:user.name,
        title,
        description:desc
      };

      if(file){
        const data=new FormData();
        const filename=Date.now()+file.name;
        data.append("name",filename);
        data.append("file",file);
        newPost.photo=filename;
        try{
           await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,data);
        }catch(err){
           console.log(console.log(err));
        }try{
          const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/create`,newPost);
        //  <Navigate to={"/post/"+res.data._id}/>
        //  window.location.replace("/post/"+res.data._id);
        //  console.log(res.data);
        if (res.data && res.data._id) {
          window.location.replace("/post/" + res.data._id);
          toast.success("Post Created Successfully !");
        } else {
          console.log("Error: _id not found in response");
          toast.error("Error occured in creating Post");
        }
        }catch(err){
          console.log(err);
        }
      } 
  }
  
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <form className="w-full max-w-lg flex flex-col items-center" onSubmit={handlesubmit}>
         {file && <img
            src={URL.createObjectURL(file)}
            className="h-screen/5 w-full object-cover mb-2"
            alt=""
          /> } 
          <div className="w-full px-4">
            <div className="flex items-center mb-4">
              <label htmlFor="addtitle">
                <i className="text-green-500 mr-2 text-2xl fa-regular mx-2 fa-square-plus"></i>
              </label>
              <input
                type="file"
                className="hidden mx-4"
                name=""
                id="addtitle"
                onChange={(e)=>setFile(e.target.files[0])}
              />
              <input
                type="text"
                className="py-5 px-2 text-2xl w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                name="title"
                placeholder="Title..."
                id="addtitle"
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <textarea
              name="content"
              id=""
              cols="30"
              rows="3" // Set initial number of rows to display
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              style={{ minHeight: '3rem' }} 
              onChange={(e)=>setDesc(e.target.value)}
              // Set minimum height to ensure the text area is always visible
            ></textarea>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
