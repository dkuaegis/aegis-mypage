const API_BASE_URL = 'https://dev-api.dkuaegis.org';

export interface QRIssueRes {
  base64: string;
}

export async function issueQRCode(): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/qrcode/issue`, {
    method: 'POST',
    credentials: 'include', // 세션 쿠키 전송
    headers: {
    //   'Content-Type': 'application/json',
      Accept: 'application/json, application/yaml, application/*+json',
    },
    // body: JSON.stringify({})
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as QRIssueRes;
  return data.base64;
}
