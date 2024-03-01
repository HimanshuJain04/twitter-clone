import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authVerifyToken } from "./redux/slices/authSlice.js";
import { useEffect, useState } from "react"
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
import Landing from "./pages/Landing";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";


// *************COMPONENTS**************
import FeatureSidebar from "./components/common/FeaturSidebar";
import TrendingSidebar from "./components/common/TrendingSidebar";
import { RxVercelLogo } from "react-icons/rx";
import PostPage from "./pages/PostPage.jsx";



function App() {

  const { pathname } = useLocation();
  const isAuthOrLandingPage = pathname.startsWith('/auth');


  const dispatch = useDispatch();

  useEffect(() => {
    // Call the authentication verification function here
    dispatch(authVerifyToken());
  }, [dispatch]);


  return (
    <>
      <div className="flex justify-center items-center bg-black w-screen">
        <div className='min-h-screen justify-between items-start  w-10/12 flex flex-row'>

          {
            !isAuthOrLandingPage &&
            <div>
              <FeatureSidebar />
            </div>
          }


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

          {
            !isAuthOrLandingPage &&
            <div>
              <TrendingSidebar />
            </div>
          }

        </div>

      </div >
    </>
  )
}

export default App;
