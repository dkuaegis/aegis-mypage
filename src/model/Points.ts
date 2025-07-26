export type PointType = 'EARN' | 'USE';

export interface RawPointTransaction {
  pointTransactionId: number;
  type: PointType;
  amount: number;
  reason: string;
  createdAt: string;
}

export interface RawPointSummaryRes {
  balance: number;
  history: RawPointTransaction[];
}

export interface PointTransactionView extends RawPointTransaction {
  sign: '+' | '-';
  label: '적립' | '사용';
  signedAmount: number;
}

export interface PointSummaryView {
  balance: number;
  history: PointTransactionView[];
}