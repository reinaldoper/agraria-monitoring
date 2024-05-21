import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogiIn from '../pages/LogiIn';
import Registered from '../pages/Registered';
import DashBoard from '../pages/DashBoard';
import CreateDevice from "../pages/CreateDevice";

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogiIn />}></Route>
          <Route path="/register" element={<Registered />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/device" element={<CreateDevice />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
