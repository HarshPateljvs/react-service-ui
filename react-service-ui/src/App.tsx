import "./App.css";
import AppRouter from "./Components/Master/User/Routes/AppRouter";
import { AuthService } from "./Components/Master/User/Routes/AuthService";

function App() {
  
  return (
    
      <AppRouter role={AuthService.getRole()} /> 
  );
}

export default App;
