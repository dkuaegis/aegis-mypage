import { useNavigate } from "react-router-dom";
import notFoundImage from "../assets/notFoundImage.png";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F3F8] font-suit">
      <h1 className="text-[40px] font-extrabold text-center m-0 leading-tight">
        Whoops!
        <br />
        Not Found 🥲
      </h1>
      <p className="text-[#7E7E7E] text-lg mt-4 mb-8 text-center">
        The page you are looking for does not exist.
      </p>
      <img
        src={notFoundImage}
        alt="not found"
        className="w-[250px] mb-10"
      />
      <button
        onClick={() => navigate("/")}
        className="bg-white border-none rounded-[15px] shadow-md px-8 py-4 text-lg font-bold cursor-pointer"
      >
        go to home
      </button>
    </div>
  );
};

export default Notfound;