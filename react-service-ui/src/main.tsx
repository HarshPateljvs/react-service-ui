import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import RouteLoader from "./Components/Routes/RouteLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer />
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<RouteLoader/>} persistor={persistor}>
          <App  />
        </PersistGate>
      </Provider>
    </StrictMode>
  </>
);
