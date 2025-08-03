import loginImage from "../assets/loginImage.png";
import Button from "../components/Button";
import "../style/LoginAuth.css";

const LoginAuth = () => {

  return (
    <div className="login-auth-container">
      <div className="login-auth-image">
        <img src={loginImage} alt="login lock" />
      </div>
      <h1 className="login-auth-title">잠깐!<br />먼저 단국대학교<br />구글 계정으로<br />로그인 해주세요</h1>
      <p className="login-auth-desc">처음 가입하신다면, 동아리가입을 먼저 진행해주세요</p>
      <Button text={"동아리가입하기"} type={"SIGNUP"} onClick={() => (window.location.href = "https://join.dkuaegis.org/")} />
        <Button text={"Google로 로그인"} type={"LOGIN"} onClick={() => (window.location.href = "https://dev-api.dkuaegis.org/oauth2/authorization/google")} /> 
    </div>
  );
};

export default LoginAuth;