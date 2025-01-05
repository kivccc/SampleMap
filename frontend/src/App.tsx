import Auth from "./components/Auth/index";
import Main from "./components/Main/index";
import Login from "./components/Login/index";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login/oauth2/callback/kakao" element={<Auth />} />
      <Route path="/main" element={<Main />}/>
    </Routes>
  );
}

export default App;