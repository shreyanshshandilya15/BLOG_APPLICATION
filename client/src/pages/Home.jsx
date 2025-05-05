import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import Navbar from "../components/Navbar"
import NavbarMobile from "../components/NavbarMobile"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"

export default function Home() {
    const { user } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const PF = `${import.meta.env.VITE_BACKEND_URL}/images/`;
    const location = useLocation();

    const categories = [
        { value: 'All', label: 'All Categories' },
        { value: 'Food', label: 'Food' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Business', label: 'Business' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'General', label: 'General' }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`);
                setPosts(res.data || []);
            } catch (err) {
                console.log(err);
                setPosts([]);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search');
        setSearchQuery(search || "");
    }, [location]);

    const filteredPosts = posts.filter(post => {
        if (!post) return false;
        
        const matchesCategory = selectedCategory === "All" || 
            (post.categories && post.categories === selectedCategory);
        
        const matchesSearch = !searchQuery || 
            (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (post.desc && post.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    const truncateText = (text, wordLimit = 30) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="hidden lg:block">
                <Navbar />
            </div>
            <div className="block lg:hidden">
                <NavbarMobile />
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Results Info */}
                {searchQuery && (
                    <div className="text-center mb-6">
                        <p className="text-gray-600">
                            Showing results for: <span className="font-semibold">{searchQuery}</span>
                        </p>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {post.photo && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={PF + post.photo}
                                        alt={post.title || 'Post image'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        {post.categories || 'Uncategorized'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {post.title || 'Untitled'}
                                </h2>
                                <p className="text-gray-600 mb-4 text-sm">
                                    {truncateText(post.desc || '')}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        By {post.author || 'Unknown'}
                                    </span>
                                    <Link
                                        to={`/post/${post._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchQuery 
                                ? "No posts found matching your search."
                                : "No posts found in this category."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
