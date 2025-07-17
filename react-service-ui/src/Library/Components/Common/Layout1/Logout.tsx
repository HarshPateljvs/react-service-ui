import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../../Components/Routes/AuthService";
import CommonButton from "../../Form/CommonButton";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  return <CommonButton onClick={handleLogout}>Logout</CommonButton>;
};

export default LogoutButton;
