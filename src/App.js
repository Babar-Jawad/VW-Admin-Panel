import "./App.css";
import Advocates from "./Pages/Advocates/Advocates";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import UserRequests from "./Pages/UserRequests/UserRequests";
// import Documents from "./Pages/Documents/Documents";
// import previousCases from "./Pages/previousCases/previousCases";
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
            <Route path="/requests" element={<UserRequests />} />
            {/* <Route path="/documents" element={<Documents />} /> */}
            {/* <Route path="/previousCases" element={<previousCases />} /> */}
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
