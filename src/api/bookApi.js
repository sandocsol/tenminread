import axios from 'axios';
// import bookInfoData from '../mock/bookInfo.json'; // 실제 API 연동으로 인해 주석 처리
// import bookContentData from '../mock/bookContent.json'; // 실제 API 연동으로 인해 주석 처리
import { getStorage } from '../utils/storage';

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

// 디버깅: API_BASE_URL 확인 (개발 환경에서만)
if (import.meta.env.DEV) {
  console.log('🔧 [bookApi] API_BASE_URL:', API_BASE_URL);
  console.log('🔧 [bookApi] VITE_API_BASE_URL 환경변수:', import.meta.env.VITE_API_BASE_URL);
}

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
    const url = `${API_BASE_URL}/book/${bookId}`;
    
    try {
      console.log('📡 [bookApi.getBook] 요청:', {
        url,
        bookId,
        apiBaseUrl: API_BASE_URL,
      });

      console.log('Fetching book with ID:', bookId);
      
      const response = await axios.get(url);
      
      console.log('✅ [bookApi.getBook] 성공:', {
        status: response.status,
      });
      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('❌ [bookApi.getBook] 서버 에러 응답:', {
          url: error.config?.url,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else if (error.request) {
        console.error('❌ [bookApi.getBook] 응답 없음:', {
          url: error.config?.url,
          message: error.message,
        });
      } else {
        console.error('❌ [bookApi.getBook] 요청 설정 에러:', error.message);
      }
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
    const url = `${API_BASE_URL}/book/${bookId}/summary/${seq}`;
    
    try {
      console.log('📡 [bookApi.getBookSummary] 요청:', {
        url,
        bookId,
        seq,
        apiBaseUrl: API_BASE_URL,
      });
      
      const response = await axios.get(url);
      
      console.log('✅ [bookApi.getBookSummary] 성공:', {
        status: response.status,
        data: response.data,
      });
      
      return response.data;
    } catch (error) {
      // 상세 에러 정보 출력
      if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        console.error('❌ [bookApi.getBookSummary] 서버 에러 응답:', {
          url: error.config?.url,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        console.error('❌ [bookApi.getBookSummary] 응답 없음:', {
          url: error.config?.url,
          message: error.message,
          code: error.code,
        });
      } else {
        // 요청 설정 중 에러
        console.error('❌ [bookApi.getBookSummary] 요청 설정 에러:', {
          message: error.message,
          url,
        });
      }
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
   * 
   * TODO: 실제 API 연동 시 주석 해제
   */
  toggleFavorite: async (bookId, isFavorited) => {
    // 실제 API 연동 코드 (주석 처리)
    // try {
    //   const response = await axios.post(`${API_BASE_URL}/book/${bookId}/favorites`, {
    //     bookId: Number(bookId),
    //     userId: getCurrentUserId(),
    //     isFavorited: !isFavorited,
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to toggle favorite:', error);
    //   throw error;
    // }
    
    // 목 데이터 반환
    console.log('📝 [bookApi.toggleFavorite] 목 데이터 사용:', { bookId, isFavorited });
    const userId = getCurrentUserId();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bookId: Number(bookId),
          userId: userId,
          isFavorited: !isFavorited,
        });
      }, 300); // API 호출 시뮬레이션을 위한 지연
    });
  },

  /**
   * 독서 진행 상황 조회
   * @param {string|number} bookId - 책 ID
   * @returns {Promise} 독서 진행 상황 객체 { bookId, nextSeq, completedSeqs: number[], currentDay, totalDays }
   * 
   * TODO: 실제 API 연동 시 주석 해제
   */
  getReadingProgress: async (bookId) => {
    // 실제 API 연동 코드 (주석 처리)
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/book/${bookId}/progress`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to fetch reading progress:', error);
    //   throw error;
    // }
    
    // 목 데이터 반환
    console.log('📝 [bookApi.getReadingProgress] 목 데이터 사용:', { bookId });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bookId: Number(bookId),
          nextSeq: 2,
          completedSeqs: [1],
          currentDay: 1,
          totalDays: 3,
        });
      }, 200); // API 호출 시뮬레이션을 위한 지연
    });
  },
};