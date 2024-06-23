import { Provider } from "react-redux";
import Board from "./screens/Board/Board";
import store from "./store";
import "./reset.css";
import { LayoutVertical2080 } from "./layouts/LayoutVertical2080";
import { Menu } from "./components/Menu";

function App() {
  return (
    <Provider store={store}>
      <LayoutVertical2080 panel={<Menu />}>
        <Board />
      </LayoutVertical2080>
    </Provider>
  );
}

export default App;
