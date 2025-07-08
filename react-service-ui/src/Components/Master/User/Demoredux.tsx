import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSelectors";
import { logout, setUser } from "../../../redux/user/userSlice";
import CommonButton from "../../../Library/Components/Form/CommonButton";

const Demoredux = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const handleLogin = () => {
    dispatch(
      setUser({
        Id: 1,
        Name: "Harsh",
        Email: "harsh@example.com",
        Password: "123",
        PhoneNumber: "7984304065",
        Address: "1213232",
        DateOfBirth: "2022-07-07",
      })
    );
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>{currentUser?.Name}</h2>
      {/* <CommonButton onClick={handleLogin}>Login</CommonButton>
      <CommonButton onClick={handleLogout}>Logout </CommonButton> */}
      <h1>Demo redux</h1>
    </div>
  );
};
export default Demoredux;
