import "./App.css";
import AppRouter from "./Components/Routes/AppRouter";
import { AuthService } from "./Components/Routes/AuthService";
import { LicenseInfo } from "@mui/x-license-pro";
import { AVTUseEffect, AVTUseState } from "./Library/customHooks";
import { UserRole } from "./Components/Routes/UserRole";

function App() {
  LicenseInfo.setLicenseKey(
    "e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y"
  );

   const [role, setRole] = AVTUseState<UserRole>("",UserRole.None);

  AVTUseEffect("",() => {
    const storedRole = AuthService.getRole();
    setRole(storedRole);
  }, []);
  return <AppRouter role={role} setRole={setRole} />;
}

export default App;
