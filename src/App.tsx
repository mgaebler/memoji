import { Provider } from "react-redux";
import store from "./store";
import "./reset.css";

import { GameScreen } from "./screens/GameScreen";

function App() {
  return (
    <Provider store={store}>
      <GameScreen />
    </Provider>
  );
}

export default App;
