import "../style/Profile.css";

const Profile: React.FC = () => {
    return (
        <div className="Profile">
            <div className="Profile_img">
                <img src="../src/assets/C.png" alt="profile img" />
            </div>
            <div className="Profile_info">
                <div className="Profile_name">임세윤</div>
                <div className="Profile_greeting">
                    환영합니다!<br />Aegis와 함께해요❤
                </div>
            </div>
        </div>
    );
};

export default Profile;