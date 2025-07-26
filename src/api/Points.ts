import type { PointSummaryView, PointTransactionView, RawPointSummaryRes, RawPointTransaction } from "../model/Points";

const API_BASE_URL = 'https://dev-api.dkuaegis.org';

type ApiResp<T> = { data: T } | T;

function unwrap<T>(j: ApiResp<T>): T {
  return (typeof j === 'object' && j !== null && 'data' in j)
    ? (j as { data: T }).data
    : (j as T);
}

export async function getPointSummary(): Promise<PointSummaryView> {
  const res = await fetch(`${API_BASE_URL}/points/summary`, {
    method: 'GET',
    credentials: 'include', // 세션에 쿠키 전송
    headers: {
      accept: 'application/json',
    },
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(raw || `HTTP ${res.status} ${res.statusText}`);
  }

  const json = raw ? JSON.parse(raw) : {};
  const data = unwrap<RawPointSummaryRes>(json);
  const balance: number = Number(data.balance ?? 0);

  const rawList: unknown =
    Array.isArray(data.history)
      ? data.history
      : [];

  const list: RawPointTransaction[] = Array.isArray(rawList) ? rawList : [];

  const history: PointTransactionView[] = list
    .map<PointTransactionView>((t) => {
      const isEarn = t.type === 'EARN';
      const sign: '+' | '-' = isEarn ? '+' : '-';
      const label: '적립' | '사용' = isEarn ? '적립' : '사용';

      return {
        ...t,
        sign,
        label,
        signedAmount: isEarn ? t.amount : -t.amount,
      };
    })
    // pointTransactionId 오름차순 정렬
    .sort((a, b) => b.pointTransactionId - a.pointTransactionId);

  return { balance, history };
}