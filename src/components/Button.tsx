import "../style/Button.css"
import type { ButtonProps } from "../model/Button"; 

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {
    return (
        <button 
        onClick={onClick} 
        className={`Button Button_${type}`}
        >
            {text}
            {type === "POINT" && (
                <span className="point-arrow">{'>'}</span>
            )}
        </button>
    );
}

export default Button;