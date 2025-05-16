// import logo from './logo.svg';
import "./App.css";
import Login from "./components/login/Login";
import SignIn from "./components/login/SignIn";
import Routing from "./components/Routing/Routing";
import Calculator from "./components/ToolOperations/Calculator";
import Formulas from "./components/ToolOperations/Formulas";
import GraphsAndGeomatry from "./components/ToolOperations/GraphsAndGeomatry";
import Quizes from "./components/ToolOperations/Quizes";

function App() {
  return (
    <div className="App">
      <Routing />
      {/* <Calculator /> */}
      {/* <Formulas />- */}
      {/* <GraphsAndGeomatry /> */}
      {/* <Quizes /> */}
    </div>
  );
}

export default App;
