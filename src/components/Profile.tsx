import { useState, useEffect } from "react";
import { getMyPage } from "../api/MyPage";
import "../style/Profile.css";
import ProfileEditModal from "./ProfileEditModal";
import { PROFILE_ICONS } from "../constants/profileIcons";
import editIcon from "../assets/edit.png";

const Profile: React.FC = () => {
    const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>("");

    // API 호출
        useEffect(() => {
          (async () => {
            const data = await getMyPage();
            setMypage(data);
            setSelectedImage(PROFILE_ICONS[data.profileIcon]);
          })();
        }, []);

    return (
        <div className="Profile">
            <div className="profile_img" style={{ position: 'relative' }}>
                <img src={selectedImage} alt="profile img" />
                <img
                    src={editIcon}
                    alt="edit"
                    className="profile_edit"
                    onClick={() => setShowProfileEditModal(true)}
                />
            </div>
            <div className="profile_info">
                <div className="profile_name">{mypage?.name}</div>
                <div className="profile_greeting">
                    환영합니다!<br />Aegis와 함께해요❤
                </div>
            </div>

            {showProfileEditModal && (
                <ProfileEditModal
                    selectedImage={selectedImage}
                    imageOptions={Object.values(PROFILE_ICONS)}
                    onSelectImage={setSelectedImage}
                    onSave={() => setShowProfileEditModal(false)}
                    onClose={() => setShowProfileEditModal(false)}
                />
            )}
        </div>
    );
};

export default Profile;