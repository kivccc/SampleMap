import axios from "axios";
import { useEffect } from "react";

interface ApiResponse {
  result: {
    user_id: string;
    jwt: string;
  };
}

const Auth = () => {
  const code: string | null = new URL(window.location.href).searchParams.get("code");

  console.log(code);

  const kakaoLogin = async() => {
    try{
      const res = await axios.get(`/api/login/oauth2/callback/kakao/${code}`);
        console.log(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, [code]);

  return <div>로그인 중입니다.</div>;
}

export default Auth;