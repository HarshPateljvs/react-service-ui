import { AVTUseState } from "../../../customHooks";
import { API } from "../../../services/API/api";
import { AuthAPI } from "../../../../URLS/Masters";
import CommonInput from "../../Form/CommonInput";
import CommonButton from "../../Form/CommonButton";
import { setUser } from "../../../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { UserRole } from "../../../../Components/Routes/UserRole";
import { AuthService } from "../../../../Components/Routes/AuthService";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setRole: (role: UserRole) => void;
}
const Login = ({ setRole }: LoginProps) => {
  const [email, setEmail] = AVTUseState("login_email", "");
  const [password, setPassword] = AVTUseState("login_password", "");
  const [showRegister, setShowRegister] = AVTUseState("show_register", false);
  const [validate, setValidate] = AVTUseState("login_validate", false);
  const [loading, setLoading] = AVTUseState("login_loading", false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    setValidate(true);
    if (!email || !password) return;

    setLoading(true);
    const payload: LoginRequest = { email, password };
    const response = await API.POST<LoginResponse>(AuthAPI.LOGIN, payload);
    setLoading(false);
    if (response) {
      localStorage.setItem("access_token", response.Token);
      AuthService.setRole(response.AppUser.RoleId as UserRole);
      dispatch(setUser(response.AppUser));
       setRole(response.AppUser.RoleId as UserRole);
      //window.location.href = "/Dashboard";
      navigate("/Dashboard");
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
        validateTrigger={validate}
      />
      <CommonInput
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        validateTrigger={validate}
      />
      <CommonButton onClick={handleLogin} loading={loading}>Login</CommonButton>

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
