
import './App.css';
import NodeFetchData from './NodeFetchData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Weather App</h3>
        London
        <NodeFetchData lat="51.5129903" long="-0.1185895" />

        NewYork
        <NodeFetchData lat="40.7195341" long="-74.2226926" />;

        </header>
    </div>
  );
}

export default App;
