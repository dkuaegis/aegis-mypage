import type { ProfileEditModalProps } from "../model/ProfileEditModal";
import "../style/ProfileEditModal.css";
import Button from "./Button";
import { toIconId } from "../utils/Icon";
import { ProfileEdit } from "../api/ProfileEdit";

const IMAGES_PER_PAGE = 8;

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  selectedImage,
  imageOptions,
  onSelectImage,
  onClose,
}) => {

  const totalPages = Math.ceil(imageOptions.length / IMAGES_PER_PAGE);
  // 페이지별 이미지 배열
  const pages = Array.from({ length: totalPages }).map((_, pageIdx) =>
    imageOptions.slice(pageIdx * IMAGES_PER_PAGE, (pageIdx + 1) * IMAGES_PER_PAGE)
  );

  const handleSave = async () => {
    const iconId = toIconId(selectedImage);
    await ProfileEdit(iconId);
    onClose();
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <h2 className="profile-title">임세윤님,<br />프로필 이미지를 꾸며보세요</h2>
        <img src={selectedImage} alt="profile-img" className="profile-current-img" />
        <div className="image-grid">
          {pages.map((images, pageIdx) => (
            <div className="image-page" key={pageIdx}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Option ${pageIdx * IMAGES_PER_PAGE + idx}`}
                  className={`profile-option-img ${selectedImage === img ? "selected" : ""}`}
                  onClick={() => onSelectImage(img)}
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