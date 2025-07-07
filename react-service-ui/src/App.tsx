import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Layout from "./Library/Components/Common/Layout";
import UserList from "./Components/Master/User/UserList";
import Demoredux from "./Components/Master/User/Demoredux";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="users" element={<UserList />} />
          <Route path="demoredux" element={<Demoredux />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
