export interface ProfileEditModalProps {
  selectedImage: string;
  imageOptions: string[];
  onSelectImage: (url: string) => void;
  onSave?: () => void;
}