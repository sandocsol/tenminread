// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import quizMockData from '../mock/quiz.json';
import quizSubmitResponseMockData from '../mock/quizSubmitResponse.json';

// 실제 API 연동 시 사용할 BASE URL
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 퀴즈 API
 */
export const quizApi = {
  /**
   * 퀴즈 문제와 보기 조회
   * @param {string|number} bookId - 책 ID
   * @param {string|number} summaryId - 요약 ID
   * @returns {Promise} 퀴즈 문제 배열 (API 응답 형식)
   */
  getQuizzes: async (bookId, summaryId) => { // eslint-disable-line no-unused-vars
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    return new Promise((resolve) => {
      // API 호출 시뮬레이션을 위한 약간의 지연
      setTimeout(() => {
        // 목데이터를 그대로 반환 (이미 API 응답 형식)
        resolve(quizMockData);
      }, 300);
    });

    // 실제 API 호출 코드 (주석 처리)
    // try {
    //   const response = await axios.get(
    //     `${API_BASE_URL}/books/${bookId}/summary/${summaryId}/quizzes`
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to fetch quizzes:', error);
    //   throw error;
    // }
  },

  /**
   * 퀴즈 문제와 보기 조회 (현재 사용하는 형식으로 변환하여 반환)
   * @param {string|number} bookId - 책 ID
   * @param {string|number} summaryId - 요약 ID
   * @returns {Promise} 현재 사용하는 퀴즈 형식 객체
   */
  getQuizzesFormatted: async (bookId, summaryId) => {
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    const apiResponse = await quizApi.getQuizzes(bookId, summaryId);
    return transformApiResponseToQuizFormat(apiResponse);

    // 실제 API 호출 코드 (주석 처리)
    // try {
    //   const response = await axios.get(
    //     `${API_BASE_URL}/books/${bookId}/summary/${summaryId}/quizzes`
    //   );
    //   // API 응답을 현재 사용하는 형식으로 변환하여 반환
    //   return transformApiResponseToQuizFormat(response.data);
    // } catch (error) {
    //   console.error('Failed to fetch quizzes:', error);
    //   throw error;
    // }
  },

  /**
   * 퀴즈 정답 제출
   * @param {string|number} bookId - 책 ID
   * @param {string|number} summaryId - 요약 ID
   * @param {Array<object>} answers - 제출할 정답 배열 [{ quizId: number, submittedAnswer: number }, ...]
   * @returns {Promise<object>} 제출 결과 { bookId, seq, totalQuizzes, correctCount, results }
   */
  submitQuizAnswers: async (bookId, summaryId, answers) => { // eslint-disable-line no-unused-vars
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    return new Promise((resolve) => {
      // API 호출 시뮬레이션을 위한 약간의 지연
      setTimeout(() => {
        // 목데이터를 그대로 반환 (이미 API 응답 형식)
        resolve(quizSubmitResponseMockData);
      }, 500);
    });

    // 실제 API 호출 코드 (주석 처리)
    // try {
    //   const response = await axios.post(
    //     `${API_BASE_URL}/books/${bookId}/summary/${summaryId}/submit`,
    //     { answers }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error('Failed to submit quiz answers:', error);
    //   throw error;
    // }
  },
};

/**
 * API 응답을 현재 사용하는 퀴즈 형식으로 변환
 * @param {Array} apiResponse - API 응답 배열
 * @returns {object} 현재 사용하는 퀴즈 형식
 */
export function transformApiResponseToQuizFormat(apiResponse) {
  if (!Array.isArray(apiResponse)) return { questions: [], totalQuestions: 0 };

  const questions = apiResponse.map((quiz) => ({
    id: quiz.quizId,
    question: quiz.question,
    options: [quiz.choice1, quiz.choice2, quiz.choice3, quiz.choice4].filter(Boolean),
    correctAnswer: null, // API 응답에 정답 정보가 없으므로 null로 설정
    correctAnswerText: null, // API 응답에 정답 정보가 없으므로 null로 설정
  }));

  return {
    questions,
    totalQuestions: questions.length,
  };
}
