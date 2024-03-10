import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home/Home";
import FlightListing from "@/pages/FlightListing/FlightListing";
import Result from "@/pages/Result/Result";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: 'flight-listing',
    element: <FlightListing />
  },
  {
    path: 'result',
    element: <Result />
  }
]);

export { router };