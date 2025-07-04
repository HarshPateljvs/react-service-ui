import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Layout from "./Library/Components/Common/Layout";
import UserList from "./Components/Master/User/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
