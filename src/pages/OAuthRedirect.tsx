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
        navigate("/login/unauthorized");
      }
    };

    verify();
  }, [navigate]);

  return <div>로그인 중 ...</div>;
};

export default OAuthRedirect;