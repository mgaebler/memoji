import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const docRoot = document.getElementById("root");

if (docRoot) {
  const root = createRoot(docRoot);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
