import { Routes, Route } from "react-router-dom";

// *********** Import pages ***************
// auth-page
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotOtp from "./pages/auth/ForgotOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ForgotChangePassword from "./pages/auth/ForgotChangePassword";
// pages
import Landing from "./pages/Landing";




function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/auth-login" element={<Login />} />
          <Route path="/auth-signup" element={<Signup />} />
          <Route path="/auth-forgot-password-email" element={<ForgotPassword />} />
          <Route path="/auth-forgot-password-verify-otp" element={<ForgotOtp />} />
          <Route path="/auth-forgot-password-change-password" element={<ForgotChangePassword />} />

        </Routes>

      </div>
    </>
  )
}

export default App
