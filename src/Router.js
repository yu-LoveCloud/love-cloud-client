import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";
import InvitationCreateProcess1 from "./pages/invitation/InvitationCreateProcess1";
import InvitationCreateProcess2 from "./pages/invitation/InvitationCreateProcess2";
import DetailOrder from "./pages/orderManagement/DetailOrder";
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingParticipation from "./pages/funding/FundingParticipation";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/invitations" element={<InvitationDashboard />} />
      <Route
        path="/invitations/create-process1"
        element={<InvitationCreateProcess1 />}
      />
      <Route
        path="/invitations/create-process2"
        element={<InvitationCreateProcess2 />}
      />
      <Route path="/orders/:orderId" element={<DetailOrder />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
      <Route
        path="/funding/create/:productOptionsId"
        element={<FundingParticipation />}
      />
    </Routes>
  );
}

export default Router;
