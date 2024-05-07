import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitation" element={<InvitationDashboard />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
