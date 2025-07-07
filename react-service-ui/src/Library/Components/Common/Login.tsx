import { useNavigate } from "react-router-dom";
import { AVTUseState } from "../../../Library/customHooks";
import { API } from "../../../Library/services/API/api";
import { AuthAPI } from "../../../URLS/Masters";
import CommonInput from "../Form/CommonInput";
import CommonButton from "../Form/CommonButton";

const Login = () => {
  const [email, setEmail] = AVTUseState("login_email", "");
  const [password, setPassword] = AVTUseState("login_password", "");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload: LoginRequest = { email, password };
    const response = await API.POST<LoginResponse>(AuthAPI.LOGIN, payload);
    console.log(response);
    if (response != null) {
      localStorage.setItem("token", response.token);

      navigate("/users");
    }
  };

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
      <CommonButton  onClick={handleLogin}>Login</CommonButton>
    </div>
  );
};

export default Login;
