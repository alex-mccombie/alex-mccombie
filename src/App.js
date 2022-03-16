import './App.css';

import WeatherReport from './WeatherReport';
import NodeFetchData from './NodeFetchData';

//const host='localhost'; const port=3334;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App 2</h1>

        <WeatherReport name="Raining"/>
        <NodeFetchData lat="51.5129903" long="-0.1185895" />

      </header>
    </div>
  );
}

export default App;
