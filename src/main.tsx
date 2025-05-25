import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter is imported
import "./index.css";
import App from "./components/App/App";

// Create root and render your app inside BrowserRouter
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Make sure the router is wrapping the entire app */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
