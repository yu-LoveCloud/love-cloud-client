import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";

function Router() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invitation" element={<InvitationDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
