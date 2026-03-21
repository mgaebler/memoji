import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const docRoot = document.getElementById("root");

if (docRoot) {
  const root = createRoot(docRoot);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
