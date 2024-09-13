import { Link } from "react-router-dom";

export default function Card({post}) {

    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`;
     
  return (
    <Link to={`/post/${post._id}`}>
    <div className="flex-col my-6 mx-2 p-2 shadow-lg  md:max-w-lg transform transition-transform duration-300 hover:-translate-y-2">
      {post.photo &&  <img  className="object-cover w-96 h-72 mx-auto"src={PF + post.photo} />}
       {post.categories.map((cat)=>{
            <span key={cat._id} className="text-center text-xs text-gray-500  ">{post.categories.name}</span>
       })}
      <div className="text-center text-bold text-xl my-2">{post.title}</div>
       <div className="text-center text-xs text-gray-500 my-1">{new Date(post.createdAt).toDateString()}</div>
       <div className="text-center justify-center mx-2 align-middle">{post.description}</div>
    </div>
    </Link>
  )
}