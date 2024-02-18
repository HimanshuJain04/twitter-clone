import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authVerifyToken } from "./redux/slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

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



function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);

  const tokenVerificationHandler = async () => {

    await dispatch(authVerifyToken())
      .then(() => {
        console.log("state: ", state)

        if (state.user) {
          navigate("/home");

        } else {
          navigate("/");
        }
      })
  };

  useEffect(() => {
    tokenVerificationHandler();
  }, []);



  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" exact element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth-login" element={<Login />} />
          <Route path="/auth-signup" element={<Signup />} />
          <Route path="/auth-forgot-password-email" element={<ForgotPassword />} />
          <Route path="/auth-verify-otp" element={<VerifyOtp />} />
          <Route path="/auth-forgot-password-change-password" element={<ForgotChangePassword />} />

        </Routes>

      </div>
    </>
  )
}

export default App;
