import "normalize.css";
import "./index.css";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { FilterListPage, PreferenceListPage } from "./pages/DomainListPage";
import { store } from "./store";

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// Firefox fix for window resize causing drag and drop not to work?
window.addEventListener("resize", (e) => {
  e.stopImmediatePropagation();
});
