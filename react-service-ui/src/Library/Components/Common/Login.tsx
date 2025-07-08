import { AVTUseState } from "../../../Library/customHooks";
import { API } from "../../../Library/services/API/api";
import { AuthAPI } from "../../../URLS/Masters";
import CommonInput from "../Form/CommonInput";
import CommonButton from "../Form/CommonButton";
import { setUser } from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { UserRole } from "../../../Components/Routes/UserRole";
import { AuthService } from "../../../Components/Routes/AuthService";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = AVTUseState("login_email", "");
  const [password, setPassword] = AVTUseState("login_password", "");
  const [selectedRole, setSelectedRole] = AVTUseState<UserRole | "Admin">(
    "login_role",
    UserRole.Admin
  );
  const [showRegister, setShowRegister] = AVTUseState("show_register", false);

  const dispatch = useDispatch();
  const handleLogin = async () => {
    const payload: LoginRequest = { email, password };
    const response = await API.POST<LoginResponse>(AuthAPI.LOGIN, payload);

    if (response) {
      localStorage.setItem("access_token", response.Token);
      AuthService.setRole(selectedRole as UserRole);
      dispatch(setUser(response.AppUser));
       window.location.href = "/Dashboard";
      //naviage("/Dashboard");
    }
  };

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} />;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <CommonInput
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <CommonInput
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select
        className="w-full border p-2 rounded mt-4"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
      >
        <option value={UserRole.Admin} selected>
          Admin
        </option>
        <option value={UserRole.Teacher}>Teacher</option>
        <option value={UserRole.Student}>Student</option>
      </select>
      <CommonButton onClick={handleLogin}>Login</CommonButton>

      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setShowRegister(true)}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
