import React from "react";
import { Provider } from "react-redux";
import Board from "./screens/Board";
import "./reset.css";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Board></Board>
    </Provider>
  );
}

export default App;
