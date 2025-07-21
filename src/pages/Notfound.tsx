import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/notFoundImage.png";
import Button from "../components/Button";
import "../style/Notfound.css";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">Whoops!<br />Not Found 🥲</h1>
      <p className="notfound-desc">The page you are looking for does not exist.</p>
      <div className="notfound-image">
        <img src={notFoundImage} alt="not found" />
      </div>
      <Button text={"go to home"} type={"HOME"} onClick={() => navigate("/")} />
    </div>
  );
};

export default Notfound;