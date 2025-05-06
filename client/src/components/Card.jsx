import { Link } from "react-router-dom";

export default function Card({post}) {
    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`;
    
    // Function to get first 30 words
    const getFirstNWords = (text, n) => {
        const words = text.split(/\s+/);
        return words.slice(0, n).join(' ');
    };
     
    return (
    <div className="flex-col my-6 mx-2 p-2 shadow-lg md:max-w-lg transform transition-transform duration-300 hover:-translate-y-2">
      {post.photo &&  <img className="object-cover w-96 h-72 mx-auto" src={PF + post.photo} />}
      <div className="flex flex-wrap gap-2 justify-center my-2">
        {post.categories.map((cat) => (
          <span key={cat._id} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {cat.name}
          </span>
        ))}
      </div>
      <div className="text-center text-bold text-xl my-2">{post.title}</div>
      <div className="text-center text-xs text-gray-500 my-1">{new Date(post.createdAt).toDateString()}</div>
      <div className="text-center justify-center mx-2 align-middle">
        {post.description.length > 30 ? (
          <>
            <p className="text-gray-700 mb-2">{getFirstNWords(post.description, 30)}...</p>
            <Link 
              to={`/post/${post._id}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read More
            </Link>
          </>
        ) : (
          <p className="text-gray-700">{post.description}</p>
        )}
      </div>
    </div>
  );
}