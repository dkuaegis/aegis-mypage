const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginImage.webp";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import "../style/LoginAuth.css";

const LoginAuth = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      const verifyAuth = async () => {
        await checkAuthStatus(true); // 네비게이션 활성화
      };

      verifyAuth();
    }
  }, [navigate, checkAuthStatus]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-auth-container">
      <div className="login-auth-image">
        <img src={loginImage} alt="login lock" />
      </div>
      <h1 className="login-auth-title">잠깐!<br />먼저 단국대학교<br />구글 계정으로<br />로그인 해주세요</h1>
      <p className="login-auth-desc">처음 방문하신다면, 동아리가입을 먼저 진행해주세요</p>
      <div className="button-group-section">
        <Button text={"동아리가입하기"} type={"SIGNUP"} onClick={() => (window.location.href = "https://join.dkuaegis.org/")} />
        <Button text={"Google로 로그인"} type={"LOGIN"} onClick={handleGoogleLogin} /> 
      </div>
    </div>
  );
};

export default LoginAuth;
