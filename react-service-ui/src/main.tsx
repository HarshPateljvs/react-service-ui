import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer />
    <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </StrictMode>
  </>
);
