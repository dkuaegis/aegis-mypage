import type { IconKey } from "../constants/ProfileIcons";

export interface ProfileEditModalProps {
  selectedKey: IconKey;
  imageKeys: IconKey[];
  onSelectKey: (key: IconKey) => void;
  onSave: () => void;
  onClose: () => void;
}