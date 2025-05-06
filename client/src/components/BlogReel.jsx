import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function BlogReel() {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const PF = `${import.meta.env.VITE_BACKEND_URL}/images/`;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post`);
                setPosts(res.data);
                if (res.data.length > 0) {
                    setCurrentPost(res.data[Math.floor(Math.random() * res.data.length)]);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const getRandomPost = () => {
        if (posts.length === 0) return;
        const randomIndex = Math.floor(Math.random() * posts.length);
        setCurrentPost(posts[randomIndex]);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="relative py-12">
            {/* Explore Button */}
            <div className="text-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                    <i className="fas fa-compass"></i>
                    Explore Blogs
                </motion.button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                            >
                                <i className="fas fa-times text-2xl"></i>
                            </button>

                            {/* Content */}
                            {currentPost && (
                                <div>
                                    {/* Image */}
                                    {currentPost.photo && (
                                        <div className="relative w-full h-[400px] overflow-hidden">
                                            <img
                                                src={PF + currentPost.photo}
                                                alt={currentPost.title}
                                                className="w-full h-full object-contain bg-gray-100"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}

                                    {/* Post Content */}
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                {currentPost.categories}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(currentPost.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                            {currentPost.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 line-clamp-3">
                                            {currentPost.desc}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <i className="fas fa-user-circle text-gray-500 mr-2"></i>
                                                <span className="text-gray-600">{currentPost.author}</span>
                                            </div>
                                            <Link
                                                to={`/post/${currentPost._id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Read Full Post →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className="flex justify-between items-center p-4 border-t border-gray-100">
                                        <button
                                            onClick={getRandomPost}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                        >
                                            <i className="fas fa-random"></i>
                                            Next Blog
                                        </button>
                                        <span className="text-sm text-gray-500">
                                            Click to discover more
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 