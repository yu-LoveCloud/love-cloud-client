import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";

function Router() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
