const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { DrawHistoryItem } from "../model/DrawMe";

export async function getMyDrawHistory(): Promise<DrawHistoryItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/point-shop/draws/me`, {
      method: 'GET',
      credentials: 'include',  // 세션 쿠키를 전송
      headers: {
        accept: 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data: DrawHistoryItem[] = await res.json();
    return data;  // { drawHistoryId, item, transactionId, createdAt } 배열
  } catch (e) {
    console.error('내 뽑기 이력 조회 실패:', e);
    throw e;
  }
}
