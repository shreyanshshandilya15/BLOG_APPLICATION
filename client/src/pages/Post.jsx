import Navbar from "../components/Navbar"
import Abouts from "../components/Abouts"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";
import NavbarMobile from "../components/NavbarMobile";
import {toast} from "react-hot-toast";

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
    } catch (error) {
      toast.error("Only Creater can delete the post !");
      console.log(error);
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
    <div className="min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Navbar/>
      </div>
      <div className="block lg:hidden">
        <NavbarMobile />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Post Image */}
            {post.photo && (
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                <img 
                  src={PF + post.photo} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="p-6 md:p-8">
              {/* Title and Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                {updateMode ? (
                  <input 
                    type="text" 
                    onChange={(e)=>setTitle(e.target.value)} 
                    value={title} 
                    className="text-2xl md:text-3xl font-bold w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
                  />
                ) : (
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {post.title}
                    </h2>
                    {post.author === user?.name && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setUpdateMode(true)} 
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <i className="fa-regular fa-pen-to-square text-xl"></i>
                        </button>
                        <button 
                          onClick={handledelete} 
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fa-solid fa-trash text-xl"></i>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Author and Date */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 text-gray-600">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <span className="font-medium">Author:</span>
                  <Link 
                    to={`/?user=${post.author}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {post.author}
                  </Link>
                </div>
                <span className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Category */}
              {post.categories && (
                <div className="mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {post.categories}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                {updateMode ? (
                  <textarea 
                    value={desc} 
                    onChange={(e)=>setDesc(e.target.value)} 
                    className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[200px]" 
                  />
                ) : (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post.description}
                  </div>
                )}
              </div>

              {/* Update Button */}
              {updateMode && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handleEdit} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Update Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <Abouts />
          </div>
        </div>
      </div>
    </div>
  );
}
