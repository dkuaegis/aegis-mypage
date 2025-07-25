import { useState, useEffect } from "react";
import type { ProfileEditModalProps } from "../model/ProfileEditModal";
import { PROFILE_ICONS } from "../constants/ProfileIcons";
import type { IconKey } from "../constants/ProfileIcons";
import Button from "./Button";
import "../style/ProfileEditModal.css";
// import { toIconId } from "../utils/Icon";
// import { ProfileEdit } from "../api/ProfileEdit";

const IMAGES_PER_PAGE = 8;

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  selectedKey,
  imageKeys,
  onSelectKey,
  onSave,
  onClose,
}) => {
  const [tempKey, setTempKey] = useState<IconKey>(selectedKey);

  useEffect(() => {
    setTempKey(selectedKey);
  }, [selectedKey]);

  const totalPages = Math.ceil(imageKeys.length / IMAGES_PER_PAGE);
  // 페이지별 이미지 배열
  const pages = Array.from({ length: totalPages }, (_, i) =>
    imageKeys.slice(i * IMAGES_PER_PAGE, (i + 1) * IMAGES_PER_PAGE)
  );

  const handleSave = () => {
    onSelectKey(tempKey);
    onSave();
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <h2 className="profile-title">임세윤님,<br />프로필 이미지를 꾸며보세요</h2>
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