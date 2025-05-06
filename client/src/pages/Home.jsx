import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import Navbar from "../components/Navbar"
import NavbarMobile from "../components/NavbarMobile"
import Slider from "../components/Slider"
import BlogReel from "../components/BlogReel"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

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

            {/* Slider Section */}
            <Slider />

            {/* Blog Reel Section */}
            <BlogReel />

            <div className="container mx-auto px-4 py-8">
                {/* Category Filter */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
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
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="w-full max-w-md relative">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-300"
                        />
                        <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </motion.div>

                {/* Search Results Info */}
                {searchQuery && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mb-8"
                    >
                        <p className="text-gray-600">
                            Showing results for: <span className="font-semibold text-blue-600">{searchQuery}</span>
                        </p>
                    </motion.div>
                )}

                {/* Posts Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {post.photo && (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={PF + post.photo}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                        {post.categories || 'Uncategorized'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                                    {post.title || 'Untitled'}
                                </h2>
                                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                                    {truncateText(post.desc || '')}
                                </p>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <i className="fas fa-user-circle mr-2"></i>
                                        {post.author || 'Unknown'}
                                    </span>
                                    <Link
                                        to={`/post/${post._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                    >
                                        Read More
                                        <i className="fas fa-arrow-right ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredPosts.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-gray-400 text-6xl mb-4">
                            <i className="fas fa-search"></i>
                        </div>
                        <p className="text-gray-500 text-lg">
                            {searchQuery 
                                ? "No posts found matching your search."
                                : "No posts found in this category."}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
