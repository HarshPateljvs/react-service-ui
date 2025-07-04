import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../redux/user/userSelectors";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <nav className="bg-gray-100 px-4 py-2 flex gap-4 shadow-sm">
      <Link to="/" className="hover:text-blue-600 font-medium">
        Home
      </Link>
      <Link to="/users" className="hover:text-blue-600 font-medium">
        Users
      </Link>
      <Link to="/demoredux" className="hover:text-blue-600 font-medium">
        Demoredux
      </Link>
      {currentUser && (
        <span className="text-sm text-gray-700 font-semibold">
          Welcome, {currentUser.email}
        </span>
      )}
    </nav>
  );
};

export default Navbar;
