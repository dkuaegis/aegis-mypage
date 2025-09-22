const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        // 브라우저 호환성을 위한 추가 헤더
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    // 응답 상태 코드 확인
    if (!res.ok) {
      console.log(`인증 확인 실패: ${res.status} ${res.statusText}`);
      return false;
    }

    const data = await res.json();

    if (data.status === "COMPLETED") {
      // console.log("로그인 성공");
      return true;
    } else {
      console.log("로그인 실패 상태:", data.status); // PENDING
      return false;
    }
  } catch (err) {
    console.error("인증 확인 실패:", err);
    return false;
  }
}