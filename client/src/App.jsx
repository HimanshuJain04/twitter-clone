import { Routes, Route } from "react-router-dom";

// *********** Import pages ***************
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";



function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>

      </div>
    </>
  )
}

export default App
