import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelectors";
import { logout, setUser } from "../../../redux/user/userSlice";

const Demoredux = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const handleLogin = () => {
    dispatch(setUser({ id: 1, name: "Harsh", email: "harsh@example.com" }));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>{currentUser?.name}</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Demoredux;
