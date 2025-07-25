const API_BASE_URL = "https://dev-api.dkuaegis.org";

export async function ProfileEdit(iconId: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/members/profile-icon`, {
      method: 'PUT',
      credentials: 'include', // 세션 쿠키 전송
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify({ profileIcon: iconId }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.error('프로필 아이콘 저장 실패:', e);
    throw e;
  }
}