import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";
import ChangePassword from "./pages/UserAccount/ChangePassword";
import RefundAccount from "./pages/UserAccount/RefundAccount";
import PartnerConnect from "./pages/Partner/PartnerConnect";
import ConnectCode from "./pages/Partner/ConnectCode";
import MyPage from "./pages/UserAccount/MyPage";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invitation" element={<InvitationDashboard />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/refundaccount" element={<RefundAccount />} />
      <Route path="/partnerconnect" element={<PartnerConnect />} />
      <Route path="/connectcode" element={<ConnectCode />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default Router;
