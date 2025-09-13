import type { DrawResponse } from "../model/Draw";
const API_BASE_URL = 'https://dev-api.dkuaegis.org';

export async function drawPoint(): Promise<DrawResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/point-shop/draw`, {
      method: 'POST',
      credentials: 'include',  // 세션 쿠키를 전송
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      if (res.status === 400) {
        alert('잔액이 부족합니다.');
        throw new Error('잔액 부족');
      }
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data: DrawResponse = await res.json();
    return data;  // { item, remainingBalance, transactionId, drawHistoryId }
  } catch (e) {
    console.error('포인트 뽑기 실행 실패:', e);
    throw e;
  }
}
