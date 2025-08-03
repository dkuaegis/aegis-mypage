import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/AuthCheck";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        navigate("/");
      } else {
        navigate("/login/auth");
      }
    };

    verify();
  }, [navigate]);

  return <div>로그인 확인 중입니다...</div>;
};

export default OAuthRedirect;