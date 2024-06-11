import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";
import InvitationCreateProcess1 from "./pages/invitation/InvitationCreateProcess1";
import InvitationCreateProcess2 from "./pages/invitation/InvitationCreateProcess2";
import ChangePassword from "./pages/UserAccount/ChangePassword";
import RefundAccount from "./pages/UserAccount/RefundAccount";
import PartnerConnect from "./pages/Partner/PartnerConnect";
import ConnectCode from "./pages/Partner/ConnectCode";
import MyPage from "./pages/UserAccount/MyPage";
import PracLogin from "./pages/UserAccount/PracLogin";

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
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/refundaccount" element={<RefundAccount />} />
      <Route path="/partnerconnect" element={<PartnerConnect />} />
      <Route path="/connectcode" element={<ConnectCode />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/praclogin" element={<PracLogin />} />
    </Routes>
  );
}

export default Router;
