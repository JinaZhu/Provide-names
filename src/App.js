import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import Teams from "./components/teams/teams";
import Board from "./components/board/board";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Teams />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
