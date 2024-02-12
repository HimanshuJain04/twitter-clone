import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"

function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>

      </div>
    </>
  )
}

export default App
