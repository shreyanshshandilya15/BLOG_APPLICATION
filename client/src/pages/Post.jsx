import Navbar from "../components/Navbar"
import Abouts from "../components/Abouts"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Post() {
  const PF = `${import.meta.env.VITE_BACKEND_URL}/images/`;
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { user } = useContext(Context);

  const getpost = async () => {
    try{
      let respost = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/` + path, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      respost = await respost.json();
      setPost(respost);
      setTitle(respost.title);
      setDesc(respost.description);

    }catch(err){
      console.error("error fetching post:",err);
    }
  };

  useEffect(() => {
    getpost();
  }, [path]);

  const handledelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}`,
        { data: { name: user.name } });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit=async()=>{
    try{
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/${post._id}`,
       {name:user.name,title,description:desc},
      );
      window.location.reload();
      setUpdateMode(false);
    }catch(err){
      console.log(err.response);
      toast.error("some error occured !");
    }
 };
 
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 justify-center mx-8 lg:flex-row">
        <div className="flex-grow-3 max-h-full">
          {post.photo && 
          <img 
             src={PF + post.photo} 
             alt="oops" 
             className=" rounded-xl object-cover w-full my-3 object-cover" 
             style={{ maxHeight: "calc(100vh / 3)" }} 
             />
             }
          {updateMode ? 
          <input 
             type="text" 
             onChange={(e)=>setTitle(e.target.value)} 
             value={title} 
             className="py-5 px-2 text-2xl w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
             /> :
            <><h2 
                 className="text-black-700 text-3xl text-center ">
                  {post.title}
                  </h2>
              {post.author === user?.name && <>
                <i onClick={() => setUpdateMode(true)} className="fa-regular fa-pen-to-square mx-2 text-blue-500 "></i>
                <i onClick={handledelete} className="fa-solid fa-trash text-red-500"></i>
              </>}
            </>
          }
          <div className="flex justify-between my-2 text-yellow-600">
            <span className="my-3">Author:<Link to={`/?user=${post.author}`}>{post.author}</Link></span>
            <span className="my-2">{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? 
          <textarea 
               value={desc} 
               onChange={(e)=>setDesc(e.target.value)} 
               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" 
               type="text"
               /> : 
               <div>{post.description}</div>}
          {updateMode && <button 
              onClick={handleEdit} 
              className="bg-green-700 text-white px-4 float-right mx-2 my-2" 
              type="submit"
          >Update
          </button>}
        </div>
        <div className="flex-grow">
          <Abouts />
        </div>
      </div>
    </div>
  )
}
