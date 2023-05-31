import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Auth/Admin";
import Hotels from "./Hotels/Hotels";
import { useSelector } from "react-redux";
import Booking from "./Booking/Booking";
import { adminActions, userActions } from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./Profile/UserProfile";
import AdminProfile from "./Profile/AdminProfile";



function App() {

  const dispatch = useDispatch()

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  console.log("Admin", isAdminLoggedIn)
  console.log("User", isUserLoggedIn)

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login())
    }
    if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login())
    }
  }, [])

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/booking/:hotelId" element={<Booking />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
