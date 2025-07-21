import '../style/EmptyState.css';
import cartIcon from "../assets/cart.png";
import type { EmptyStateProps } from '../model/EmptyState';

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const message = `현재 보유하고 있는 ${type === 'point' ? '포인트가' : '쿠폰이'} 없어요!`;

  return (
    <div className="empty-state">
      <img src={cartIcon} alt="No data" className="empty-state-image" />
      <p className="empty-state-text">{message}</p>
    </div>
  );
};

export default EmptyState; 