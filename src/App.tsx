import { Provider } from "react-redux";
import Board from "./screens/Board/Board";
import store from "./store";
import "./reset.css";
import { LayoutVertical2080 } from "./layouts/LayoutVertical2080";
import { MenuPanel } from "./components/MenuPanel/MenuPanel";
import { Panels } from "./components/Panels";

function App() {
  return (
    <Provider store={store}>
      <LayoutVertical2080 panel={<Panels />}>
        <Board />
      </LayoutVertical2080>
    </Provider>
  );
}

export default App;
