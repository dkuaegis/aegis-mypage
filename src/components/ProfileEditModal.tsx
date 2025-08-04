import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProfileEditModalProps } from "../model/ProfileEditModal";
import { PROFILE_ICONS } from "../constants/ProfileIcons";
import type { IconKey } from "../constants/ProfileIcons";
import Button from "./Button";
import "../style/ProfileEditModal.css";
import { ProfileEdit } from "../api/ProfileEdit";
import { getMyPage } from "../api/Mypage";
// import { toIconId } from "../utils/Icon";

const IMAGES_PER_PAGE = 8;

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  selectedKey,
  imageKeys,
  onSelectKey,
  onClose,
}) => {
  const [tempKey, setTempKey] = useState<IconKey>(selectedKey);
  const [mypage, setMypage] = useState<{ name: string; profileIcon: string; pointBalance: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTempKey(selectedKey);
  }, [selectedKey]);

  const totalPages = Math.ceil(imageKeys.length / IMAGES_PER_PAGE);
  // 페이지별 이미지 배열
  const pages = Array.from({ length: totalPages }, (_, i) =>
    imageKeys.slice(i * IMAGES_PER_PAGE, (i + 1) * IMAGES_PER_PAGE)
  );

  const handleSave = async () => {
   try {
      await ProfileEdit(tempKey);     
      onSelectKey(tempKey);         
      onClose();                
    } catch (e) {
      console.error("프로필 아이콘 저장 실패:", e);
    }
  };

  // 사용자 정보 조회 API 호출
  useEffect(() => {
      (async () => {
        try {
          const data = await getMyPage();
          setMypage(data);
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
          navigate("/login/auth");
        }
      })();
    }, [navigate]);

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <h2 className="profile-title">{mypage?.name},<br />프로필 이미지를 꾸며보세요</h2>
        <img src={PROFILE_ICONS[tempKey]} alt="profile-img" className="profile-current-img" />
        <div className="image-grid">
          {pages.map((keys, pageIdx) => (
            <div className="image-page" key={pageIdx}>
              {keys.map((key) => (
                <img
                  key={key}
                  src={PROFILE_ICONS[key]}
                  alt={key}
                  className={`profile-option-img ${
                    tempKey === key ? "selected" : ""
                  }`}
                  onClick={() => setTempKey(key)}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="button-group">
          <Button text={"나가기"} type={"EDITRETURN"} onClick={onClose} />
          <Button text={"저장"} type={"EDITSAVE"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;