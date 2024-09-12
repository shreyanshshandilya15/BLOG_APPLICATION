import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import Create from "./pages/Create"
import { useContext } from "react"
import { Context } from "./context/Context"
import { Toaster } from "react-hot-toast"

function App() {
    const {user}=useContext(Context);
  return (
    <>
     <Toaster />
     <Router>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Home/> : <Login/>}/>
      <Route path="/register" element={user ? <Home/> : <Register/>}/>
      <Route path="/post/:id" element={<Post/>}/>
      <Route path="/profile" element={user ? <Profile/> : <Register/>}/>
      <Route path="/create" element={user ? <Create/> : <Register/> }/>
     </Routes>
     </Router>
    </>
  )
}

export default App
