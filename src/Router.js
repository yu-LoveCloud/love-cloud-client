import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitation" element={<InvitationDashboard />} />
    </Routes>
  );
}

export default Router;
