import axios from 'axios';

// 실제 API 연동 시 사용할 BASE URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

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

