import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import EmployeeForm from "./Components/EmployeeForm";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/:token" element={<EmployeeForm />} />
      </Routes>
    </>
  );
}

export default App;
