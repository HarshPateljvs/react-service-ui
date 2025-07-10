import "./App.css";
import AppRouter from "./Components/Routes/AppRouter";
import { AuthService } from "./Components/Routes/AuthService";
import { LicenseInfo } from "@mui/x-license-pro";

function App() {
  LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
  );

  return <AppRouter role={AuthService.getRole()} />;
}

export default App;
