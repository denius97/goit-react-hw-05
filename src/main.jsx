import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import "../node_modules/modern-normalize/modern-normalize.css";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
