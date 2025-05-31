import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/layout/Navbar";
import Sign from "./pages/Sign";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import { RestaurantHome } from "./pages/RestaurantHome";
import Footer from "./components/layout/Footer";
import { Alert } from "./components/common/Alert";
import SideBar from "./components/layout/SideBar";
import { authSlice } from "./Store/user";
import { CreatePlate } from "./pages/CreatePlate";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";
import RestaurantPage from "./components/layout/RestaurantPage";
import { CreateRestaurant } from "./components/layout/CreateRestaurant";
import Notification from "./pages/Notification";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetOrders } from "./hooks/useCustomer";
import { useGetOrders_R } from "./hooks/useRestaurant";

function App() {
  const {
    auth: { _id, isOwner },
  } = authSlice();
  const { getOrders } = useGetOrders();
  const { getRestOrders } = useGetOrders_R();
  const [redDote, setRedDot] = useState(false);
  const [notification, setNotification] = useState({
    orders: 0,
    customers: 0,
    customerOrders: 0,
  });
  useEffect(() => {
    if (_id) {
      const interval = setInterval(async () => {
        
        if (_id && !isOwner) getOrders();
        if (_id && isOwner) getRestOrders();

        try {
          const res = await axios.get(
            `/api/${isOwner ? "restaurant" : "customer"}/notification/${_id}`
          );
          if (
            res.data.data.notification > 0 ||
            res.data.data.notification?.newOrder > 0 ||
            res.data.data.notification?.newRate > 0
          ) {
            setRedDot(true);
            setNotification({
              orders: res.data.data.notification?.newOrder || 0,
              customers: res.data.data.notification?.newRate || 0,
              customerOrders: res.data.data.notification || 0,
            });
          }
        } catch (error) {
          console.error("Notification error:", error);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [_id]);

  return (
    <div className=" text-dark min-h-screen ">
      <BrowserRouter>
        <NavBar />
        {_id && <SideBar redDote={redDote} />}
        <Routes>
          <Route path="/sign" element={<Sign />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/notification"
            element={
              <Notification
                setRedDot={setRedDot}
                notification={notification}
                setNotification={setNotification}
              />
            }
          />
          <Route path="/restaurantHome" element={<RestaurantHome />}>
            <Route path="create" element={<CreateRestaurant />} />
            <Route path="page" element={<RestaurantPage />} />
          </Route>
          <Route path="/createPlate" element={<CreatePlate />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
        <Footer />
        <Alert />
      </BrowserRouter>
    </div>
  );
}

export default App;
