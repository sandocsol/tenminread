import axios from 'axios';
// import bookInfoData from '../mock/bookInfo.json'; // 실제 API 연동으로 인해 주석 처리
// import bookContentData from '../mock/bookContent.json'; // 실제 API 연동으로 인해 주석 처리
import { getStorage } from '../utils/storage';

// 실제 API 연동 시 사용할 BASE URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 현재 사용자 ID를 가져옵니다.
 * @returns {number|null} 사용자 ID 또는 null
 */
const getCurrentUserId = () => {
  const user = getStorage('user', null);
  if (user && user.id) {
    return user.id;
  }
  // user 객체가 없거나 id가 없는 경우, 직접 userId로 저장된 경우
  const userId = getStorage('userId', null);
  return userId;
};

/**
 * 책 정보 API
 */
export const bookApi = {
  /**
   * 책 정보 조회
   * @param {string|number} bookId - 책 ID
   * @returns {Promise} 책 정보 객체
   */
  getBook: async (bookId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch book:', error);
      throw error;
    }
  },

  /**
   * 책 요약(본문) 읽기
   * @param {string|number} bookId - 책 ID
   * @param {string|number} seq - 요약 순서
   * @returns {Promise} 책 요약 객체 { summaryText, bookId, seq, version }
   */
  getBookSummary: async (bookId, seq) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/book/${bookId}/summary/${seq}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch book summary:', error);
      throw error;
    }
  },

  /**
   * 책 목차 조회
   * @param {string|number} bookId - 책 ID
   * @returns {Promise} 책 목차 객체 { bookId, toc: string }
   */
  getBookIndex: async (bookId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${bookId}/index`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch book index:', error);
      throw error;
    }
  },

  /**
   * 즐겨찾기 등록/해제
   * @param {string|number} bookId - 책 ID
   * @param {boolean} isFavorited - 즐겨찾기 상태
   * @returns {Promise} 즐겨찾기 상태 객체 { bookId, userId, isFavorited/favorited }
   */
  toggleFavorite: async (bookId, isFavorited) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/book/${bookId}/favorites`, {
        bookId: Number(bookId),
        userId: getCurrentUserId(),
        isFavorited: !isFavorited,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      throw error;
    }
  },

  /**
   * 독서 진행 상황 조회
   * @param {string|number} bookId - 책 ID
   * @returns {Promise} 독서 진행 상황 객체 { bookId, nextSeq, completedSeqs: number[], currentDay, totalDays }
   */
  getReadingProgress: async (bookId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book/${bookId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reading progress:', error);
      throw error;
    }
  },
};