import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 프록시 제거: API 호출은 직접 백엔드 서버 주소로 연결
  // 환경변수 VITE_API_BASE_URL로 백엔드 서버 주소 설정 가능
  // 예: VITE_API_BASE_URL=http://localhost:8080/api
})
