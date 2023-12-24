import App from "./App";
import "normalize.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "../../redux/store";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container!);
const { store, persistor } = getStore();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
