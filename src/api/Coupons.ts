const API_BASE_URL = 'https://dev-api.dkuaegis.org';
import type { Coupons } from "../model/Coupons";

export async function getCoupons(): Promise<Coupons[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/coupons/me`, {
      method: 'GET',
      credentials: 'include',  // 세션 쿠키를 전송
      headers: {
        accept: 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data: Coupons[] = await res.json();
    return data;  // { issuedCouponId, couponName, discountAmount, isValid }
  } catch (e) {
    console.error('발급된 쿠폰 조회 실패:', e);
    throw e;
  }
}
