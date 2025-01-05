import { useState, useEffect } from 'react';
import * as L1 from "./index.styled";

import logoImage from '../../img/logo.png';
import markerImage from '../../img/markerAll.png';
import loginImage from '../../img/kakao_login_medium_wide.png';

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [comment, setComment] = useState<string>(".");
  const fullComment = "여러분의 추억을 기록하세요...";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= fullComment.length) {
        clearInterval(interval);
        return;
      }

      setComment(fullComment.slice(0, index + 1));
      index++;
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <L1.LoginContainer>
      <L1.ImgContainer>
        <L1.LogoImg src={logoImage} />
        <L1.MarkerImg src={markerImage} />
        <L1.Comment> {comment} </L1.Comment>
        <L1.LoginImg src={loginImage} onClick={() => { window.location.href = LOGIN_URL; }}/>
      </L1.ImgContainer>
    </L1.LoginContainer>
  );
};

export default Login;
