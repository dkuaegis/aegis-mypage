import type { HeaderProps } from "../model/Header";
import "../style/Header.css"


const Header: React.FC<HeaderProps> = ({ title, leftChild}) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
    </header>
  );
};

export default Header;