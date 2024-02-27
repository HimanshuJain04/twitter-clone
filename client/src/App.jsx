import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authVerifyToken } from "./redux/slices/authSlice.js";
import { useEffect, useState } from "react"


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



function App() {

  const { pathname } = useLocation();
  const isAuthOrLandingPage = pathname.startsWith('/auth') || pathname === '/';

  const navigate = useNavigate();
  const [tokenVerified, setTokenVerified] = useState(false);

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth.user);

  const tokenVerificationHandler = async () => {
    await dispatch(authVerifyToken())
      .then(() => {
        if (!authState) {
          navigate("/home")
        }
      })
  }

  useEffect(() => {

    if (!authState) {
      tokenVerificationHandler();
      if ((pathname.startsWith('/auth') || pathname === '/')) {
        navigate(pathname);
      } else {
        navigate("/");
      }
    }
  }, [pathname, authState]);





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

            <Route path="/" exact element={<Landing />} />

            {/* ***************AUTH*************** */}
            <Route path="/auth" >
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password-email" element={<ForgotPassword />} />
              <Route path="verify-otp" element={<VerifyOtp />} />
              <Route path="forgot-password-change-password" element={<ForgotChangePassword />} />
            </Route>

            {/* ******************OTHER PAGES************* */}
            <Route path="home" element={<Home />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="edit-profile/:username" element={<EditProfile />} />
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
