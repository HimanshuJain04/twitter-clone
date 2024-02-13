import { Routes, Route } from "react-router-dom";

// *********** Import pages ***************
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import ForgotOtp from "./pages/ForgotOtp";
import ForgotPassword from "./pages/ForgotPassword";




function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password-email" element={<ForgotPassword />} />
          <Route path="/forgot-password-verify-otp" element={<ForgotOtp />} />

        </Routes>

      </div>
    </>
  )
}

export default App
