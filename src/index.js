import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//before app.js
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="675814895484-jgq1e98qkn9ic9ccnaotqkb53d23bhql.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      ;
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
