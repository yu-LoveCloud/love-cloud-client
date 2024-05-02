import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";

function Router() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
