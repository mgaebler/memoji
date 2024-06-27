import { Provider } from "react-redux";
import store from "./store";
import 'typeface-roboto'
import "./styles/reset.css";
import "./styles/game.css";

import { GameScreen } from "./screens/GameScreen";

function App() {
  return (
    <Provider store={store}>
      <GameScreen />
    </Provider>
  );
}

export default App;
