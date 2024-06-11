import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true;
