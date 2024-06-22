import { Provider } from "react-redux";
import Board from "./screens/Board/Board";
import store from "./store";
import "./reset.css";

function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
