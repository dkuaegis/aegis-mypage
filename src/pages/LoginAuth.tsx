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
    // 브라우저 호환성을 위한 OAuth 리다이렉트 처리
    const oauthUrl = `${API_BASE_URL}/oauth2/authorization/google`;

    // 현재 URL을 state 파라미터로 전달하여 리다이렉트 후 돌아올 수 있도록 설정
    const currentUrl = encodeURIComponent(window.location.origin);
    const finalUrl = `${oauthUrl}?redirect_uri=${currentUrl}`;

    try {
      // 모든 브라우저에서 안전한 리다이렉트
      window.location.assign(finalUrl);
    } catch {
      // 혹시 assign이 실패하면 href로 대체
      window.location.href = finalUrl;
    }
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
