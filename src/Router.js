import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";
import InvitationCreateProcess1 from "./pages/invitation/InvitationCreateProcess1";
import InvitationCreateProcess2 from "./pages/invitation/InvitationCreateProcess2";
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingCreate from './pages/funding/FundingCreate';
import FundingList from './pages/funding/FundingList';
import FundingDetail from './pages/funding/FundingDetail';
import FundingParticipate from './pages/funding/FundingParticipate';

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
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
      <Route path="/funding/create/:productOptionsId" element={<FundingCreate />} />
      <Route path="/couples/:coupleId/fundings" element={<FundingList />} />
      <Route path="/fundings/:fundingId" element={<FundingDetail />} />
      <Route path="/fundings/:fundingId/participate" element={<FundingParticipate />} />
    </Routes>
  );
}

export default Router;