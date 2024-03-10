import React from "react";
import ReactDOM from "react-dom/client";

/** React-Router-Dom */
import { RouterProvider } from "react-router-dom";

/** Router */
import { router } from "./router";

/** Contexts */
import FlightContext from "@/contexts/FlightContext/FlightContext";
import ThemaProvider from "@/contexts/ThemaContext/ThemaContext";

/** React-Toast */
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/** Styles */
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemaProvider>
      <FlightContext>
        <RouterProvider router={router} />
        <ToastContainer />
      </FlightContext>
    </ThemaProvider>
  </React.StrictMode>
);
