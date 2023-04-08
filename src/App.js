import "./App.css";
import Advocates from "./Pages/Advocates/Advocates";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let routes;

  if (localStorage.getItem("token")) {
    routes = (
      <div className="AppGlass">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/users" element={<Users />} />
            <Route path="/advocates" element={<Advocates />} />
          </Routes>
        </Router>
      </div>
    );
  } else {
    routes = (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return <div className="App">{routes}</div>;
}

export default App;
