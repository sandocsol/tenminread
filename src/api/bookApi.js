// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import bookInfoData from '../mock/bookInfo.json';
import bookContentData from '../mock/bookContent.json';

// 실제 API 연동 시 사용할 BASE URL
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 책 정보 API
 */
export const bookApi = {
  /**
   * 책 정보 조회
   * @param {string|number} bookId - 책 ID
   * @returns {Promise} 책 정보 객체
   */
  getBook: async (bookId) => { // eslint-disable-line no-unused-vars
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    return new Promise((resolve) => {
      // API 호출 시뮬레이션을 위한 약간의 지연
      setTimeout(() => {
        // bookId에 맞는 데이터 반환 (현재는 하나의 목데이터만 있음)
        resolve(bookInfoData);
      }, 300);
    });

    // 실제 API 호출 코드 (주석 처리)
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/book/${bookId}`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to fetch book:', error);
    //   throw error;
    // }
  },

  /**
   * 책 요약(본문) 읽기
   * @param {string|number} bookId - 책 ID
   * @param {string|number} seq - 요약 순서
   * @returns {Promise} 책 요약 객체 { summaryText, bookId, seq, version }
   */
  getBookSummary: async (bookId, seq) => { // eslint-disable-line no-unused-vars
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    return new Promise((resolve) => {
      // API 호출 시뮬레이션을 위한 약간의 지연

      // 목데이터를 그대로 반환 (이미 API 응답 형식)
      resolve(bookContentData);
  
    });

    // 실제 API 호출 코드 (주석 처리)
    // try {
    //   const response = await axios.get(
    //     `${API_BASE_URL}/book/${bookId}/summary/${seq}`
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to fetch book summary:', error);
    //   throw error;
    // }
  },
};

