const API_BASE_URL = 'https://dev-api.dkuaegis.org';

export interface QRIssueRes {
  base64: string;
}

export async function issueQRCode(): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/qrcode/issue`, {
    method: 'POST',
    credentials: 'include', // 세션 쿠키 전송
    headers: {
      accept: 'text/plain',
      'Content-Type': 'text/plain',
    },
    body: '',
  });

  const raw = await res.text();
  console.log('QR raw response:', raw);

  if (!res.ok) {
    throw new Error(raw || `HTTP ${res.status} ${res.statusText}`);
  }

  return raw.trim();
}
