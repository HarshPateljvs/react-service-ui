import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./Components/Master/User/Routes/AppRouter";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
