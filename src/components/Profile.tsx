import { useState, useEffect } from "react";
import { getMyPage } from "../api/mypage";
import "../style/Profile.css";
import ProfileEditModal from "./ProfileEditModal";
import editIcon from "../assets/edit.png";
import C from "../assets/C.png";
import CPP from "../assets/CPP.png";
import CSHARP from "../assets/CSHARP.png";
import DART from "../assets/DART.png";
import GOLANG from "../assets/GOLANG.png";
import JS from "../assets/JS.png";
import JAVA from "../assets/JAVA.png";
import KOTLIN from "../assets/KOTLIN.png";
import PHP from "../assets/PHP.png";
import PYTHON from "../assets/PYTHON.png";
import RUBY from "../assets/RUBY.png";
import RUST from "../assets/RUST.png";
import SWIFT from "../assets/SWIFT.png"

const imageOptions = [C, CPP, CSHARP, DART, GOLANG, JS, JAVA, KOTLIN, PHP, PYTHON, RUBY, RUST, SWIFT];

const Profile: React.FC = () => {
    const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(C);

    // API 호출
        useEffect(() => {
          (async () => {
            const data = await getMyPage();
            setMypage(data);
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
                    imageOptions={imageOptions}
                    onSelectImage={setSelectedImage}
                    onSave={() => setShowProfileEditModal(false)}
                    onClose={() => setShowProfileEditModal(false)}
                />
            )}
        </div>
    );
};

export default Profile;