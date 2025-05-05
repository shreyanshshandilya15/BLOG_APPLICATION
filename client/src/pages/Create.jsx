import { useContext, useState } from "react"
import { Context } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";
import toast from "react-hot-toast";

export default function Create() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("General");
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`;

    const categories = [
        { value: 'Food', label: 'Food' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Business', label: 'Business' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'General', label: 'General' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !desc) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!user) {
            toast.error("Please login to create a post");
            return;
        }

        const newPost = {
            title,
            desc,
            username: user.username || user.name, // Use username or fallback to name
            author: user.name,
            categories: category
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, data);
            } catch (err) {
                console.error("Error uploading image:", err);
                toast.error("Error uploading image");
                return;
            }
        }

        try {
            console.log("Sending post data:", newPost); // Debug log
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/post/create`, newPost);
            if (res.status === 201) {
                toast.success("Post created successfully!");
                navigate(`/post/${res.data._id}`);
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (err) {
            console.error("Error creating post:", err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else if (err.response?.data?.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("Error creating post. Please try again.");
            }
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
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create a New Post</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter post title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    placeholder="Write your post content here..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Image (Optional)
                                </label>
                                <input
                                    type="file"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    accept="image/*"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Publish Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
