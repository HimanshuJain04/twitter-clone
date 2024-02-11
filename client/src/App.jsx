import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"

function App() {


  return (
    <>
      <div className="min-h-screen w-screen bg-black">

        <Routes>

          <Route path="/" element={<Landing />} />

        </Routes>

      </div>
    </>
  )
}

export default App
