import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import InvitationCreate from "./pages/invitation/InvitationCreate";
import InvitationCreateDetail from "./pages/invitation/InvitationCreateDetail";

function Router() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default Router;
