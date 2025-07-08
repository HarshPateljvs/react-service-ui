import "./App.css";
import AppRouter from "./Components/Routes/AppRouter";
import { AuthService } from "./Components/Routes/AuthService";

function App() {
  
  return (
    
      <AppRouter role={AuthService.getRole()} /> 
  );
}

export default App;
