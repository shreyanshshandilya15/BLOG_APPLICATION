import { Link } from "react-router-dom";

export default function Card({post}) {
    const PF = `${import.meta.env.VITE_BACKEND_URL}/images/`;
    
    // Function to get first 30 words
    const getFirstNWords = (text, n) => {
        if (!text) return '';
        const words = text.split(/\s+/);
        return words.slice(0, n).join(' ');
    };
     
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Image Container */}
            {post.photo && (
                <div className="relative w-full h-64 overflow-hidden">
                    <img 
                        className="w-full h-full object-contain bg-gray-100" 
                        src={PF + post.photo} 
                        alt={post.title}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Content Container */}
            <div className="p-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {post.categories}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                </h2>

                {/* Date */}
                <div className="text-sm text-gray-500 mb-3">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>

                {/* Description */}
                <div className="mb-4">
                    {post.desc ? (
                        <>
                            <p className="text-gray-600 line-clamp-3 mb-3">
                                {getFirstNWords(post.desc, 30)}...
                            </p>
                            <Link 
                                to={`/post/${post._id}`}
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Read More
                            </Link>
                        </>
                    ) : (
                        <p className="text-gray-600">No description available</p>
                    )}
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center">
                        <i className="fas fa-user-circle mr-2"></i>
                        {post.author || 'Unknown'}
                    </span>
                </div>
            </div>
        </div>
    );
}