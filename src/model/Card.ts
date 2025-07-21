// 포인트 카드용 props
export interface PointCardProps {
  type: "point";
  title: string;
  date: string;
  amount: number;
}

// 쿠폰 카드용 props
export interface CouponCardProps {
  type: "coupon";
  price: string;
  desc: string;
  status: "사용전" | "사용후";
}

export type CardProps = PointCardProps | CouponCardProps; 