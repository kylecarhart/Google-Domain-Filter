import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "../../redux/store";
import App from "./App";
import ListPage from "./pages/DomainListPage/ListPage";
import React from "react";

import "normalize.css";
import "./index.css";

const { store, persistor } = getStore();

const router = createMemoryRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ListPage listType="filterList" />,
      },
      {
        path: "preferenceList",
        element: <ListPage listType="preferenceList" />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

// Firefox fix for window resize causing drag and drop not to work?
window.addEventListener("resize", (e) => {
  e.stopImmediatePropagation();
});
