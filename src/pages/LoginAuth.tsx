import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginImage.png";
import Button from "../components/Button";
import "../style/LoginAuth.css";

const LoginAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="login-auth-container">
      <div className="login-auth-image">
        <img src={loginImage} alt="login lock" />
      </div>
      <h1 className="login-auth-title">잠깐!<br />먼저 단국대학교<br />구글 계정으로<br />로그인 해주세요</h1>
      <p className="login-auth-desc">처음 가입하신다면, 회원가입을 먼저 진행해주세요</p>
      <Button text={"회원가입하기"} type={"SIGNUP"} onClick={() => navigate("/")} />
        <Button text={"Google로 로그인"} type={"LOGIN"} onClick={() => navigate("/")} /> 
    </div>
  );
};

export default LoginAuth;