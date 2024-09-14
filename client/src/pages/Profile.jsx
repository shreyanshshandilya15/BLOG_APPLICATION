import Navbar from "../components/Navbar"
import Abouts from "../components/Abouts"
import { useContext, useState } from "react"
import { Context } from "../context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import NavbarMobile from "../components/NavbarMobile.jsx";
 
export default function Profile() {
    const { user ,dispatch} = useContext(Context);
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const PF=`${import.meta.env.VITE_BACKEND_URL}/images/`;

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
                toast.error("Error occured while uploading informations");
            } try {
                const res=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${user._id}`, updatedUser);
                //  <Navigate to={"/post/"+res.data._id}/>
                //  window.location.replace("/post/"+res.data._id);
                //  console.log(res.data);
                console.log(res.data);
                dispatch({type:"UPDATE_SUCCESS",payload:res.data});
                window.location.reload();
                toast.success("user profile has been updated !");
            } catch (err) {
                dispatch({type:"UPDATE_FAILURE"});
                toast.error("Fill other details too!");
                console.log(err);
            }
        }
    }

    return (
        <div>
             <div className="hidden lg:block">
            <Navbar/>
            </div>
            <div className="block lg:hidden">
             <NavbarMobile />
             </div>
            <div className="flex sm:flex-col lg:flex-row lg:justify-between lg:mx-36 sm:mx-10">
                <div className="flex-grow-2">
                    <div className="flex items-center justify-between">
                    <span className="text-xl text-yellow-600">Update Your Account</span>
                    <span className=" text-red-600">Delete Account</span>
                    </div>
                    <form action="" onSubmit={handlesubmit}>
                        <div className="my-2 text-blue-500">Profile Picture</div>
                        <img src={file ? URL.createObjectURL(file) : PF+user.profile} className="h-28 my-4 w-28 object-cover " alt="" />
                        <label htmlFor="addtitle">
                            <i className="text-green-500 mr-2 text-2xl fa-regular mx-2 fa-square-plus"></i>
                        </label>
                        <input
                            type="file"
                            className="hidden mx-4"
                            name=""
                            id="addtitle"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <div className="my-2 text-2xl">Username</div>
                        <input 
                             type="text" 
                             name="" 
                             id="" 
                             placeholder={user.name}
                             onChange={(e)=>setName(e.target.value)}
                             className="border-b-2 "
                        />
                        <div className="my-2 text-2xl">Email</div>
                        <input 
                             type="email" 
                             name="" 
                             placeholder= {user.email} 
                             onChange={(e)=>setEmail(e.target.value)} 
                             id=""
                             className="border-b-2" 
                        />
                        <div className="my-2 text-2xl">Password</div>
                        <input 
                            type="password" 
                            className="my-2 border-b-2" 
                            name="" 
                            id="" 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <div></div>
                        <button className="text-white bg-green-900 w-20 rounded p-2" type="submit">Update</button>
                    </form>
                </div>
                <div className="flex-grow-1">
                    <Abouts />
                </div>
            </div>
        </div>
    )
}
