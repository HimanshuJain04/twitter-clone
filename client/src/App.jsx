import { Routes, Route, useNavigate } from "react-router-dom";
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
// pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile.jsx";



function App() {

  const navigate = useNavigate();

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
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" exact element={<Landing />} />
          <Route path="/home" element={<Home />} />

          {/* ***************AUTH*************** */}
          <Route path="/auth-login" element={<Login />} />
          <Route path="/auth-signup" element={<Signup />} />
          <Route path="/auth-forgot-password-email" element={<ForgotPassword />} />
          <Route path="/auth-verify-otp" element={<VerifyOtp />} />
          <Route path="/auth-forgot-password-change-password" element={<ForgotChangePassword />} />

          {/* ******************OTHER PAGES************* */}
          <Route path="/profile/:userName" element={<Profile />} />

        </Routes>

      </div>
    </>
  )
}

export default App;
