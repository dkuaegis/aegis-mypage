import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE_URL = env.VITE_API_BASE_URL

  return {
    plugins: [react()],
    server: {
      // 모든 브라우저에서 OAuth 리다이렉트 지원
      cors: {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      },
      headers: {
        // 브라우저 호환성을 위한 보안 헤더 설정
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        // Content Security Policy - OAuth 리다이렉트를 위해 느슨하게 설정
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:; img-src 'self' data: https:;",
      },
      // OAuth 콜백을 위한 프록시 설정
      proxy: {
        '/oauth2/authorization/google': {
          target: API_BASE_URL,
          changeOrigin: true,
          secure: true,
        },
        '/login/oauth2/code/google': {
          target: API_BASE_URL,
          changeOrigin: true,
          secure: true,
        }
      }
    },
    preview: {
      cors: {
        origin: true,
        credentials: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
      }
    }
  }
})
