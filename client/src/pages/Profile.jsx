import Navbar from "../components/Navbar"
import { useContext, useState, useEffect } from "react"
import { Context } from "../context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarMobile from "../components/NavbarMobile.jsx";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [postCount, setPostCount] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [showPostsModal, setShowPostsModal] = useState(false);
    const PF = `${import.meta.env.VITE_BACKEND_URL}/images/`;

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post?user=${user.name}`);
                setUserPosts(res.data);
                setPostCount(res.data.length);
            } catch (err) {
                console.log(err);
            }
        };
        if (user) {
            fetchUserPosts();
        }
    }, [user]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            name, email, password
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profile = filename;
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`, updatedUser);
            dispatch({type:"UPDATE_SUCCESS", payload:res.data});
            toast.success("Profile updated successfully!");
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"});
            toast.error("Failed to update profile!");
        }
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
                <div className="max-w-4xl mx-auto">
                    {/* Main Content */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Your Profile</h1>
                            <button
                                onClick={() => setShowPostsModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                View All Posts ({postCount})
                            </button>
                        </div>

                        <form onSubmit={handlesubmit} className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src={user.profile ? (user.profile.includes('googleusercontent.com') ? user.profile : PF + user.profile) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666666'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                        <i className="fas fa-camera"></i>
                                    </label>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Posts Modal */}
            {showPostsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold text-gray-800">Your Posts</h2>
                                <button 
                                    onClick={() => setShowPostsModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userPosts.map((post) => (
                                    <div key={post._id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        {post.photo && (
                                            <img
                                                src={PF + post.photo}
                                                alt={post.title}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                        )}
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-medium text-gray-800">{post.title}</h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{post.desc}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                {post.categories}
                                            </span>
                                            <Link 
                                                to={`/post/${post._id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}