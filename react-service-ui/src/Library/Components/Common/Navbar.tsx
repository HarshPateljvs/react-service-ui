import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 px-4 py-2 flex gap-4 shadow-sm">
      <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
      <Link to="/users" className="hover:text-blue-600 font-medium">Users</Link>
      <Link to="/about" className="hover:text-blue-600 font-medium">About</Link>
    </nav>
  );
};

export default Navbar;
