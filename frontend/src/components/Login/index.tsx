import loginImage from '../../img/kakao_login_medium_wide.png';

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div style={{ textAlign: 'center', marginTop: '10rem' }}>
      <div style={{ cursor: "pointer" }} onClick={() => { window.location.href = LOGIN_URL }}>
        <img src={loginImage}></img>
      </div>
    </div>
  );
};

export default Login;