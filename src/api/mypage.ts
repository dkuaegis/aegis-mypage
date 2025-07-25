import type { MyPageInfo } from "../model/MyPageInfo";
const API_BASE_URL = "https://dev-api.dkuaegis.org";

export async function getMyPage(): Promise<MyPageInfo> {
  try {
    const res = await fetch(`${API_BASE_URL}/mypage`, {
      method: 'GET',
      credentials: 'include',  // 세션 쿠키를 전송
      headers: {
        accept: 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;  // { name, profileIcon, pointBalance } 형태
  } catch (e) {
    console.error('마이페이지 조회 실패:', e);
    throw e;
  }
}
