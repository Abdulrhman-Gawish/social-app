import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageTest from "@pages/MessageTest";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/test" element={<MessageTest />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
