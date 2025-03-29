import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/layout/Navbar";
import Sign from "./pages/Sign";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Policy from "./pages/Policy";
import ContactUs from "./pages/ContactUs";
import { RestaurantHome } from "./pages/RestaurantHome";
import Footer from "./components/layout/Footer";
import { Alert } from "./components/common/Alert";

function App() {
    
  return (
    <div className=" text-dark min-h-screen ">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/sign" element={<Sign />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/restaurantHome" element={<RestaurantHome />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
        <Footer /> 
        <Alert />
      </BrowserRouter>
    </div>
  );
}

export default App;
