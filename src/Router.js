import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import InvitationCreate from "./pages/invitation/InvitationCreate";
import InvitationCreateDetail from "./pages/invitation/InvitationCreateDetail";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitations" element={<InvitationDashboard />} />
      <Route
        path="/invitations/create-process1"
        element={<InvitationCreate />}
      />
      <Route
        path="/invitations/create-process2"
        element={<InvitationCreateDetail />}
      />
    </Routes>
  );
}

export default Router;
