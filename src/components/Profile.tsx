import { useState, useEffect } from "react";
import { getMyPage } from "../api/Mypage";
import { ProfileEdit } from "../api/ProfileEdit";
import "../style/Profile.css";
import ProfileEditModal from "./ProfileEditModal";
import { PROFILE_ICONS, ICON_KEYS } from "../constants/ProfileIcons";
import type { IconKey } from "../constants/ProfileIcons";
import editIcon from "../assets/edit.png";

const Profile: React.FC = () => {
    const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [selectedKey, setSelectedKey] = useState<IconKey>(ICON_KEYS[0]); // 기본 키

    // API 호출
    useEffect(() => {
        (async () => {
            const data = await getMyPage();
            setMypage(data);
            if (data?.profileIcon) {
                setSelectedKey(data.profileIcon); // 키로 직접 저장
            }
          })();
        }, []);

    const handleSave = async () => {
        try {
        await ProfileEdit(selectedKey);
        setMypage((prev) => prev ? { ...prev, profileIcon: selectedKey } : prev);
        setShowProfileEditModal(false);
        } catch (e) {
        console.error("프로필 아이콘 저장 실패:", e);
        }
    };

    return (
        <div className="Profile">
            <div className="profile_img" style={{ position: 'relative' }}>
                <img src={PROFILE_ICONS[selectedKey]} alt="profile img" />
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
                selectedKey={selectedKey}
                imageKeys={ICON_KEYS}
                onSelectKey={setSelectedKey}
                onSave={handleSave}
                onClose={() => setShowProfileEditModal(false)}
                />
            )}
        </div>
    );
};

export default Profile;