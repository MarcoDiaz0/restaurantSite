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
import SideBar from "./components/layout/SideBar";
import { authSlice } from "./Store/user";
import { CreatePlate } from "./pages/CreatePlate";
import  Favourites  from "./pages/Favourites";

function App() {
  const {
    auth: { _id },
  } = authSlice();
  return (
    <div className=" text-dark min-h-screen ">
      <BrowserRouter>
        <NavBar />
        {_id && <SideBar />}
        <Routes>
          <Route path="/sign" element={<Sign />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/restaurantHome" element={<RestaurantHome />} />
          <Route path="/createPlate" element={<CreatePlate />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
        <Footer />
        <Alert />
      </BrowserRouter>
    </div>
  );
}

export default App;
