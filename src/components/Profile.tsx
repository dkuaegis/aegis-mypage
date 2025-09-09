import { useState, useEffect } from "react";
import "../style/Profile.css";
import ProfileEditModal from "./ProfileEditModal";
import { PROFILE_ICONS, ICON_KEYS } from "../constants/ProfileIcons";
import type { IconKey } from "../constants/ProfileIcons";
import editIcon from "../assets/edit.svg";

interface ProfileProps {
    mypage: { name: string; profileIcon: string; pointBalance: number } | null;
}

const Profile: React.FC<ProfileProps> = ({ mypage }) => {
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [selectedKey, setSelectedKey] = useState<IconKey>("NONE"); // 기본 키

    // mypage 데이터가 변경될 때 selectedKey 업데이트
    useEffect(() => {
        if (mypage?.profileIcon) {
            setSelectedKey(mypage.profileIcon);
        }
    }, [mypage]);

    return (
        <div className="Profile">
            <div className="profile_img" style={{ position: 'relative' }}>
                {mypage && <img src={PROFILE_ICONS[selectedKey]} alt="profile img" />}
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
                    onClose={() => setShowProfileEditModal(false)}
                />
            )}
        </div>
    );
};

export default Profile;