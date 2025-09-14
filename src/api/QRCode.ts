const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  // console.log('QR raw response:', raw);

  if (!res.ok) {
    throw new Error(raw || `HTTP ${res.status} ${res.statusText}`);
  }

  return raw.trim();
}
