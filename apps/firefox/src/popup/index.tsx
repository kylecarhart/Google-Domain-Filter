import "normalize.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {
  FilterListPage,
  PreferenceListPage,
} from "./components/DomainListPage";
import "./index.css";

const router = createMemoryRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FilterListPage />,
      },
      {
        path: "preferenceList",
        element: <PreferenceListPage />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Firefox fix for window resize causing drag and drop not to work?
window.addEventListener("resize", (e) => {
  e.stopImmediatePropagation();
});
