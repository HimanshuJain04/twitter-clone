import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authVerifyToken } from "./redux/slices/authSlice.js";
import { useEffect } from "react"

// *********** Import pages ***************
// auth-page
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotChangePassword from "./pages/auth/ForgotChangePassword";
import MyProfile from "./pages/MyProfile";

// pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile.jsx";


// *************COMPONENTS**************
import FeatureSidebar from "./components/common/FeaturSidebar";
import TrendingSidebar from "./components/common/TrendingSidebar";



function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthOrLandingPage = location.pathname.startsWith('/auth') || location.pathname === '/';


  const dispatch = useDispatch();
  let authState = useSelector(state => state.auth);


  const tokenVerificationHandler = async () => {
    dispatch(authVerifyToken())
  }

  useEffect(() => {
    if (authState.user) {
      navigate("/home");
    } else {
      navigate("/");
    }

  }, [authState.user]);



  useEffect(() => {
    tokenVerificationHandler();
  }, []);


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
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="profile/:userName" element={<Profile />} />
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
