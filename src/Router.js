import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
