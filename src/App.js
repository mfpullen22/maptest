import logo from './logo.svg';
import './App.css';
import Map from "./components/map";
import Legend from "./components/legend";

function App() {
  return (
    <div className="Container">
      <Map />
      <Legend />
    </div>
  );
}

export default App;
