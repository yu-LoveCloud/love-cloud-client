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
import OrderCreateProcess2 from "./pages/orderManagement/OrderCreateProcess2";
import OrderCreateProcess1 from "./pages/orderManagement/OrderCreateProcess1";
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingParticipation from "./pages/funding/FundingParticipation";
=======
<<<<<<< HEAD
<<<<<<< HEAD
import DetailOrder from "./pages/orderManagement/DetailOrder";
import ListOrder from "./pages/orderManagement/ListOrder";
=======
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingParticipation from './pages/funding/FundingParticipation';
>>>>>>> 14a7685d0a3d539f36c65e2ba8317fe2b5e64c7f
=======
import DetailOrder from "./pages/orderManagement/DetailOrder";
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/ProductDetail";
import FundingParticipation from "./pages/funding/FundingParticipation";
>>>>>>> e4ad945a73434492651edc3f4c3abd1c3d2f7777
>>>>>>> 837716ccd6084caf77b1208c2fa909b67274252a

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
      <Route path="/orders/create-process1" element={<OrderCreateProcess1 />} />
      <Route path="/orders/create-process2" element={<OrderCreateProcess2 />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
=======
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/orders/:orderId" element={<DetailOrder />} />
      <Route path="/orders" element={<ListOrder />} />
=======
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
      <Route path="/funding/create/:productOptionsId" element={<FundingParticipation />} />
>>>>>>> 14a7685d0a3d539f36c65e2ba8317fe2b5e64c7f
=======
      <Route path="/orders/:orderId" element={<DetailOrder />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/items/:productOptionsId" element={<ProductDetail />} />
>>>>>>> 837716ccd6084caf77b1208c2fa909b67274252a
      <Route
        path="/funding/create/:productOptionsId"
        element={<FundingParticipation />}
      />
<<<<<<< HEAD
=======
>>>>>>> e4ad945a73434492651edc3f4c3abd1c3d2f7777
>>>>>>> 837716ccd6084caf77b1208c2fa909b67274252a
    </Routes>
  );
}

export default Router;
