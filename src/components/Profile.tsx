import "../style/Profile.css";
import editIcon from "../assets/edit.png";

const Profile: React.FC = () => {
    return (
        <div className="Profile">
            <div className="profile_img" style={{ position: 'relative' }}>
                <img src="../src/assets/C.png" alt="profile img" />
                <img
                    src={editIcon}
                    alt="edit"
                    className="profile_edit"
                    onClick={() => {}}
                />
            </div>
            <div className="profile_info">
                <div className="profile_name">임세윤</div>
                <div className="profile_greeting">
                    환영합니다!<br />Aegis와 함께해요❤
                </div>
            </div>
        </div>
    );
};

export default Profile;