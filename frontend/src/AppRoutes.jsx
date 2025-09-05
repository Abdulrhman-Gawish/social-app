import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageTest from "@pages/MessageTest";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
