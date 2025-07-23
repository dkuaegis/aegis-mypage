import { useNavigate } from "react-router-dom";
import type { HeaderProps } from "../model/Header";
import "../style/Header.css";

const Header: React.FC<HeaderProps> = ({ title, leftChild }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (leftChild === "<") {
      navigate("/");
    }
  };

  return (
    <header className="Header">
      <div className="header_left" onClick={handleBack}>
        {leftChild}
      </div>
      <div className="header_center">{title}</div>
    </header>
  );
};

export default Header;