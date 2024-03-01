import { Routes, Route } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { authVerifyToken } from "./redux/slices/authSlice.js";
import { useEffect } from "react"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

// *********** Import pages ***************
// auth-page
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotChangePassword from "./pages/auth/ForgotChangePassword";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";


// *************COMPONENTS**************
import PostPage from "./pages/PostPage.jsx";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Call the authentication verification function here
    dispatch(authVerifyToken());
  }, [dispatch]);


  return (
    <>
      <div className="flex justify-center items-center bg-black w-screen">
        <div className='h-screen w-10/12  '>

          <Routes>

            {/* ***************AUTH*************** */}
            <Route path="/auth" >
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password-email" element={<ForgotPassword />} />
              <Route path="verify-otp" element={<VerifyOtp />} />
              <Route path="forgot-password-change-password" element={<ForgotChangePassword />} />
            </Route>

            {/* ****************** OTHER PROTECTED PAGES ************* */}
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="" exact element={<Home />} />
              <Route path="profile/:username" element={<Profile />} />
              <Route path="edit-profile/:username" element={<EditProfile />} />
              <Route path="post/:postId" element={<PostPage />} />
            </Route>

          </Routes>

        </div>
      </div >
    </>
  )
}

export default App;
