import Navbar from "../components/Navbar"
import Abouts from "../components/Abouts"
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
    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`;

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
            } catch (error) {
                toast.error("Error occurred while uploading information");
            } try {
                const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${user._id}`, updatedUser);
                dispatch({type:"UPDATE_SUCCESS", payload:res.data});
                window.location.reload();
                toast.success("User profile has been updated!");
            } catch (err) {
                dispatch({type:"UPDATE_FAILURE"});
                toast.error("Please fill all required details!");
                console.log(err);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="hidden lg:block">
                <Navbar/>
            </div>
            <div className="block lg:hidden">
                <NavbarMobile />
            </div>
            
            {/* Main Container */}
            <div className="container mx-auto px-4 sm:px-6 py-6 lg:py-8">
                {/* Profile Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {/* Header Section */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
                                        <div className="mt-2 flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <i className="fas fa-pen-fancy"></i>
                                                <span>{postCount} {postCount === 1 ? 'Post' : 'Posts'}</span>
                                            </div>
                                            {postCount > 0 && (
                                                <button 
                                                    onClick={() => setShowPostsModal(true)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                    <span>View All Posts</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <button className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2">
                                        <i className="fas fa-trash-alt"></i>
                                        <span>Delete Account</span>
                                    </button>
                                </div>
                            </div>

                            {/* Profile Form */}
                            <form onSubmit={handlesubmit} className="p-6">
                                {/* Profile Picture Section */}
                                <div className="flex flex-col items-center space-y-4 mb-8">
                                    <div className="relative">
                                        <img 
                                            src={file ? URL.createObjectURL(file) : PF+user.profile} 
                                            className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-white shadow-lg" 
                                            alt="Profile" 
                                        />
                                        <label 
                                            htmlFor="addtitle" 
                                            className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 sm:p-3 cursor-pointer hover:bg-green-600 transition-colors shadow-md"
                                        >
                                            <i className="fa-regular fa-square-plus text-lg sm:text-xl"></i>
                                        </label>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="addtitle"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        accept="image/*"
                                    />
                                    <p className="text-sm text-gray-500">Click the plus icon to change profile picture</p>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Username
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder={user.name}
                                                onChange={(e)=>setName(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input 
                                                type="email" 
                                                placeholder={user.email}
                                                onChange={(e)=>setEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input 
                                            type="password" 
                                            placeholder="Enter new password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Leave blank to keep current password</p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-8 flex justify-end">
                                    <button 
                                        type="submit"
                                        className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <i className="fas fa-save"></i>
                                        <span>Update Profile</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-6">
                            <Abouts />
                        </div>
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
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-medium text-gray-800">{post.title}</h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{post.desc}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {post.categories.map((cat) => (
                                                    <span key={cat} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
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
    )
}