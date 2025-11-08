import axios from 'axios';

// 실제 API 연동 시 사용할 BASE URL
// 환경변수로 백엔드 서버 주소 설정 (예: http://localhost:8080/api)
// 개발 환경: VITE_API_BASE_URL=http://localhost:8080/api
// 프로덕션: VITE_API_BASE_URL=https://your-backend.com/api
// API_BASE_URL이 /api로 끝나지 않으면 자동으로 추가
const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
  // 이미 /api로 끝나는 경우 그대로 반환
  if (baseUrl.endsWith('/api')) {
    return baseUrl;
  }
  // /로 끝나는 경우 /api 추가
  if (baseUrl.endsWith('/')) {
    return `${baseUrl}api`;
  }
  // 그 외의 경우 /api 추가
  return `${baseUrl}/api`;
};
const API_BASE_URL = getApiBaseUrl();

/**
 * 사용자 API
 */
export const userApi = {
  /**
   * 현재 사용자 정보 조회
   * @returns {Promise} 사용자 정보 객체
   */
  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  },

  /**
   * 사용자 로그인
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise} 로그인 응답 객체 { user, token }
   */
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },

  /**
   * 사용자 로그아웃
   * @returns {Promise} 로그아웃 응답
   */
  logout: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  },
};

