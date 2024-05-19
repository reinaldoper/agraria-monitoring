import App from '../pages/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogiIn from '../pages/LogiIn';
import Registered from '../pages/Registered';

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogiIn />}></Route>
          <Route path="/login" element={<App />}></Route>
          <Route path="/register" element={<Registered />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routers
