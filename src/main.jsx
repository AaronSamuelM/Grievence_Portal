import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { WarningProvider } from "./context/WarningContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WarningProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WarningProvider>
  </React.StrictMode>
);
