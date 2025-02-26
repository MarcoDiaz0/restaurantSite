import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/layout/Navbar"
import Sign from "./pages/Sign";

function App() {

  return (
    <div className=" text-dark min-h-[100vh] overflow-x-hidden">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign" element={<Sign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
