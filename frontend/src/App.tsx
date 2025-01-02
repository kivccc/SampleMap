import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/index";
import Auth from "./components/Auth/index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login/oauth2/callback/kakao" element={<Auth />} />
    </Routes>
  );
}

export default App;