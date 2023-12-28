import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
