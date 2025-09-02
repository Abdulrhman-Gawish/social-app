import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessageTest from "@pages/MessageTest";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>BLA BLA BLA</h1>} />
        <Route path="/test" element={<MessageTest />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
