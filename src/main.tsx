import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoaderContextProvider } from "./assets/context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoaderContextProvider>
      <App />
    </LoaderContextProvider>
  </React.StrictMode>
);
