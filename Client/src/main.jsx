import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./Home";
import "./index.css";
import { GlobalStyle } from "./GlobalStyle.jsx";
import { SocketProvider } from "./Context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <SocketProvider>
      <Home />
    </SocketProvider>
  </React.StrictMode>
);
