import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/notFoundImage.png";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2F3F8",
        fontFamily: 'SUIT, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, textAlign: "center" }}>
        Whoops!<br />Not Found 🥲
      </h1>
      <p style={{ color: "#7E7E7E", fontSize: 18, margin: "16px 0 32px 0", textAlign: "center" }}>
        The page you are looking for does not exist.
      </p>
      <img
        src={notFoundImage}
        alt="not found"
        style={{ width: 250, marginBottom: 40 }}
      />
      <button
        style={{
          background: "#FFFFFF",
          border: "none",
          borderRadius: 15,
          boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
          padding: "16px 32px",
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        go to home
      </button>
    </div>
  );
};

export default Notfound;
