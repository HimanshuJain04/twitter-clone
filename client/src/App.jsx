import { Routes, Route, useNavigate } from "react-router-dom";
import { authVerifyToken } from "./services/authService.js";
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
import { useEffect } from "react";



function App() {

  const navigate = useNavigate();

  const authVerifyToken = async () => {
    await authVerifyToken()
      .then((res) => {
        console.log(res)
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  }

  useEffect(() => {
    authVerifyToken();
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

export default App
