import { createRoot } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { FilterListPage, PreferenceListPage } from "./pages/DomainListPage";

import "normalize.css";
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
  // react-beautiful-dnd issue: https://github.com/atlassian/react-beautiful-dnd/issues/2396#issuecomment-1217797806
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// Firefox fix for window resize causing drag and drop not to work?
window.addEventListener("resize", (e) => {
  e.stopImmediatePropagation();
});
