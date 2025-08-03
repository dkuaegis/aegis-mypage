const API_BASE_URL = "https://dev-api.dkuaegis.org";

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
      },
    });

    const data = await res.json();

    if (data.status === "PENDING") {
      console.log("로그인 성공");
      return true;
    } else {
      console.log("로그인 실패 상태:", data.status);
      return false;
    }
  } catch (err) {
    console.error("인증 확인 실패:", err);
    return false;
  }
}