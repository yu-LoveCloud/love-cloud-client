import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvitationDashboard from "./pages/invitation/InvitationDashboard";
import LoginForm from "./pages/UserAccount/LoginForm";
import SignUp from "./pages/UserAccount/SignUp";
import InvitationCreateProcess1 from "./pages/invitation/InvitationCreateProcess1";
import InvitationCreateProcess2 from "./pages/invitation/InvitationCreateProcess2";
<<<<<<< HEAD
import DetailOrder from "./pages/orderManagement/DetailOrder";
import ListOrder from "./pages/orderManagement/ListOrder";
=======
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingParticipation from './pages/funding/FundingParticipation';
>>>>>>> 14a7685d0a3d539f36c65e2ba8317fe2b5e64c7f

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
<<<<<<< HEAD
      <Route path="/orders/:orderId" element={<DetailOrder />} />
      <Route path="/orders" element={<ListOrder />} />
=======
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
      <Route path="/funding/create/:productOptionsId" element={<FundingParticipation />} />
>>>>>>> 14a7685d0a3d539f36c65e2ba8317fe2b5e64c7f
    </Routes>
  );
}

export default Router;