import axios from 'axios';
// import quizMockData from '../mock/quiz.json'; // 실제 API 연동으로 인해 주석 처리
// import quizSubmitResponseMockData from '../mock/quizSubmitResponse.json'; // 실제 API 연동으로 인해 주석 처리

// 실제 API 연동 시 사용할 BASE URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 퀴즈 API
 */
export const quizApi = {
  /**
   * 퀴즈 문제와 보기 조회
   * @param {string|number} bookId - 책 ID
   * @param {string|number} summaryId - 요약 ID
   * @returns {Promise} 현재 사용하는 퀴즈 형식 객체 { questions, totalQuestions }
   */
  getQuizzes: async (bookId, summaryId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/books/${bookId}/summary/${summaryId}/quizzes`
      );
      // API 응답을 현재 사용하는 형식으로 변환하여 반환
      return transformApiResponseToQuizFormat(response.data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      throw error;
    }
  },

  /**
   * 퀴즈 정답 제출
   * @param {string|number} bookId - 책 ID
   * @param {string|number} summaryId - 요약 ID
   * @param {Array<object>} answers - 제출할 정답 배열 [{ quizId: number, submittedAnswer: number }, ...]
   * @returns {Promise<object>} 제출 결과 { bookId, seq, totalQuizzes, correctCount, results }
   */
  submitQuizAnswers: async (bookId, summaryId, answers) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/books/${bookId}/summary/${summaryId}/submit`,
        { answers }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to submit quiz answers:', error);
      throw error;
    }
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
