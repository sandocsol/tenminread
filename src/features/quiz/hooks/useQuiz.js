import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// TODO: React Query 설치 후 주석 해제
// import { useQuery, useMutation } from '@tanstack/react-query';
import { quizApi } from '../../../api/quizApi';

function useQuiz() {
  const { bookId, summaryId } = useParams();
  const navigate = useNavigate();

  // 1. 고유한 스토리지 키 정의 (bookId와 summaryId 모두 포함)
  const STORAGE_KEYS = useMemo(() => {
    const getStorageKey = (key) => `quiz_${bookId}_${summaryId}_${key}`;
    return {
      quizStatus: getStorageKey('status'),
      currentStep: getStorageKey('step'),
      userAnswers: getStorageKey('answers'),
      submitResult: getStorageKey('submitResult')
    };
  }, [bookId, summaryId]);

  // sessionStorage에서 초기값 읽어오는 헬퍼 함수
  const getStoredValue = (key, defaultValue) => {
    try {
      const item = sessionStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from sessionStorage for key ${key}:`, error);
      return defaultValue;
    }
  };

  // sessionStorage에 값 저장하는 헬퍼 함수
  const setStoredValue = (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to sessionStorage for key ${key}:`, error);
    }
  };

  // sessionStorage에서 값 삭제하는 헬퍼 함수
  const removeStoredValue = (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from sessionStorage for key ${key}:`, error);
    }
  };

  // 2. useState의 초기값 설정 (기본값으로 시작, useEffect에서 복원)
  const [quizStatus, setQuizStatus] = useState('quiz'); // 'quiz' | 'result' | 'streak'
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // 3. useEffect로 상태 변경 시 저장
  useEffect(() => {
    setStoredValue(STORAGE_KEYS.quizStatus, quizStatus);
  }, [quizStatus, STORAGE_KEYS.quizStatus]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.currentStep, currentStep);
  }, [currentStep, STORAGE_KEYS.currentStep]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.userAnswers, userAnswers);
  }, [userAnswers, STORAGE_KEYS.userAnswers]);

  // 퀴즈 데이터 상태
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // 제출 API 응답 상태 (정답 정보 포함)
  const [submitResult, setSubmitResult] = useState(null);

  // submitResult 변경 시 sessionStorage에 저장
  useEffect(() => {
    if (submitResult) {
      setStoredValue(STORAGE_KEYS.submitResult, submitResult);
    }
  }, [submitResult, STORAGE_KEYS.submitResult]);
  
  // submitResult와 userAnswers가 모두 준비되면 결과 화면으로 이동
  useEffect(() => {
    if (
      submitResult && 
      userAnswers.length > 0 && 
      quizStatus === 'quiz' &&
      quizData?.totalQuestions > 0
    ) {
      // 모든 답변이 제출되었고 결과가 있으면 결과 화면으로 이동
      const expectedAnswers = quizData.totalQuestions;
      if (userAnswers.length >= expectedAnswers) {
        setQuizStatus('result');
      }
    }
  }, [submitResult, userAnswers, quizStatus, quizData]);
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false); // TODO: 제출 중 로딩 상태 표시에 사용

  // bookId나 summaryId가 변경될 때 세션 스토리지에서 데이터 로드 및 상태 초기화
  // 이 useEffect는 컴포넌트 마운트 시와 bookId/summaryId 변경 시 실행됨
  useEffect(() => {
    if (!bookId || !summaryId) return;

    // 현재 STORAGE_KEYS에 해당하는 세션 스토리지 데이터 로드
    const storedStatus = getStoredValue(STORAGE_KEYS.quizStatus, null);
    const storedStep = getStoredValue(STORAGE_KEYS.currentStep, null);
    const storedAnswers = getStoredValue(STORAGE_KEYS.userAnswers, null);
    const storedSubmitResult = getStoredValue(STORAGE_KEYS.submitResult, null);
    
    // 저장된 데이터가 있으면 복원 (null이 아닌 경우에만)
    if (storedStatus !== null) {
      setQuizStatus(storedStatus);
    }
    if (storedStep !== null) {
      setCurrentStep(storedStep);
    }
    if (storedAnswers !== null) {
      setUserAnswers(storedAnswers);
    }
    if (storedSubmitResult !== null) {
      setSubmitResult(storedSubmitResult);
    }
    // 저장된 데이터가 없으면 기본값 유지 (이미 useState에서 설정됨)
  }, [bookId, summaryId, STORAGE_KEYS]);

  // 퀴즈 데이터 로드
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!bookId || !summaryId) return;

      try {
        setIsLoading(true);
        setIsError(false);
        const data = await quizApi.getQuizzes(bookId, summaryId);
        setQuizData(data);
        
        // 퀴즈 데이터를 불러온 후, 세션 스토리지의 답변과 검증
        // 만약 저장된 답변의 개수가 현재 퀴즈 문제 수와 다르면 초기화
        const storedAnswers = getStoredValue(STORAGE_KEYS.userAnswers, []);
        const storedStatus = getStoredValue(STORAGE_KEYS.quizStatus, null);
        
        // 퀴즈 진행 중인 상태인데, 저장된 답변 수와 문제 수가 다르면 초기화
        if (storedStatus === 'quiz' && storedAnswers.length > 0 && storedAnswers.length !== data.totalQuestions) {
          // 불일치하는 경우 초기화
          console.warn('퀴즈 문제 수와 저장된 답변 수가 불일치합니다. 초기화합니다.');
          removeStoredValue(STORAGE_KEYS.quizStatus);
          removeStoredValue(STORAGE_KEYS.currentStep);
          removeStoredValue(STORAGE_KEYS.userAnswers);
          removeStoredValue(STORAGE_KEYS.submitResult);
          setQuizStatus('quiz');
          setCurrentStep(0);
          setUserAnswers([]);
          setSubmitResult(null);
        }
        
        // 결과 화면인데 submitResult가 없거나 답변 수가 맞지 않으면 초기화
        if ((storedStatus === 'result' || storedStatus === 'streak') && 
            (!getStoredValue(STORAGE_KEYS.submitResult, null) || 
             storedAnswers.length !== data.totalQuestions)) {
          console.warn('결과 화면 데이터가 불완전합니다. 초기화합니다.');
          removeStoredValue(STORAGE_KEYS.quizStatus);
          removeStoredValue(STORAGE_KEYS.currentStep);
          removeStoredValue(STORAGE_KEYS.userAnswers);
          removeStoredValue(STORAGE_KEYS.submitResult);
          setQuizStatus('quiz');
          setCurrentStep(0);
          setUserAnswers([]);
          setSubmitResult(null);
        }
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
        setIsError(true);
        // 에러 발생 시 빈 데이터로 설정
        setQuizData({ questions: [], totalQuestions: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, [bookId, summaryId, STORAGE_KEYS]);

  // 현재 질문 가져오기
  const currentQuestion = useMemo(() => {
    if (!quizData?.questions || quizData.questions.length === 0) {
      return null;
    }
    return quizData.questions[currentStep];
  }, [quizData, currentStep]);

  // 전체 문제 수
  const totalSteps = quizData?.totalQuestions || 0;

  // 정답 계산 함수 (제출 API 응답 기반)
  const calculateResult = useCallback(() => {
    // 필수 데이터가 모두 있어야만 결과 계산
    if (!quizData?.questions || !submitResult || !userAnswers || userAnswers.length === 0) {
      return null;
    }

    // 제출 API 응답의 results를 사용해서 정답 정보 매핑
    // 서버 응답: { quizId, correctChoice, correct }
    const resultsMap = new Map();
    if (submitResult.results && Array.isArray(submitResult.results)) {
      submitResult.results.forEach((result) => {
        resultsMap.set(result.quizId, {
          isCorrect: result.correct === true, // 서버는 'correct' 필드를 사용
          correctChoice: result.correctChoice
        });
      });
    }

    const processedAnswers = userAnswers
      .map((userAnswer) => {
        const question = quizData.questions.find(q => q.id === userAnswer.questionId);
        if (!question) return null;

        const resultInfo = resultsMap.get(userAnswer.questionId);
        const isCorrect = resultInfo?.isCorrect || false;
        const correctChoice = resultInfo?.correctChoice;
        
        // 정답 텍스트 찾기
        const correctAnswerText = correctChoice !== undefined && question.options[correctChoice]
          ? question.options[correctChoice]
          : null;

        return {
          questionId: question.id,
          question: question.question,
          userAnswer: userAnswer.answerIndex,
          userAnswerText: userAnswer.answerText,
          correctAnswer: correctChoice,
          correctAnswerText: correctAnswerText,
          isCorrect: isCorrect
        };
      })
      .filter(Boolean);

    // 처리된 답변이 없으면 null 반환
    if (processedAnswers.length === 0) {
      return null;
    }

    const totalCorrect = processedAnswers.filter(a => a.isCorrect).length;

    return {
      totalCorrect,
      totalQuestions: totalSteps,
      userAnswers: processedAnswers
    };
  }, [quizData, userAnswers, totalSteps, submitResult]);

  // 답변 제출 핸들러
  const handleSubmitAnswer = useCallback(async (answer) => {
    // 이미 답변한 질문인지 확인하고 업데이트 또는 추가
    const existingAnswerIndex = userAnswers.findIndex(a => a.questionId === answer.questionId);
    const newAnswers = existingAnswerIndex >= 0
      ? userAnswers.map((a, index) => index === existingAnswerIndex ? answer : a)
      : [...userAnswers, answer];
    
    // 마지막 문항인지 확인
    if (currentStep < totalSteps - 1) {
      // 다음 문항으로 이동
      setUserAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 문항: 정답 제출 API 호출
      setUserAnswers(newAnswers);
      
      const submitAnswers = async () => {
        try {
          setIsSubmitting(true);
          
          // API 요청 형식으로 변환
          const answersForApi = newAnswers.map((a) => ({
            quizId: a.questionId,
            submittedAnswer: a.answerIndex
          }));
          
          // 정답 제출 API 호출
          const result = await quizApi.submitQuizAnswers(bookId, summaryId, answersForApi);
          
          // submitResult를 먼저 설정하고, 그 다음 상태 변경
          // useEffect에서 submitResult 변경을 감지하여 quizStatus를 업데이트하도록 변경
          setSubmitResult(result);
        } catch (error) {
          console.error('Failed to submit quiz answers:', error);
          // 에러 발생 시에도 빈 결과로 설정하여 화면 전환
          setSubmitResult({ results: [], correctCount: 0 });
        } finally {
          setIsSubmitting(false);
        }
      };
      
      submitAnswers();
    }
  }, [currentStep, totalSteps, bookId, summaryId, userAnswers]);

  // 결과 확인 핸들러 (결과 화면에서 스트릭 화면으로)
  const handleShowStreak = useCallback(() => {
    setQuizStatus('streak');
  }, []);

  // 퀴즈 종료 핸들러 (스트릭 화면에서)
  const handleEndQuiz = useCallback(() => {
    // 4. 퀴즈 종료 시 정리: sessionStorage에 저장된 값 삭제
    removeStoredValue(STORAGE_KEYS.quizStatus);
    removeStoredValue(STORAGE_KEYS.currentStep);
    removeStoredValue(STORAGE_KEYS.userAnswers);
    removeStoredValue(STORAGE_KEYS.submitResult);
    
    // 책 상세 페이지로 이동 (또는 다음 요약으로 이동할 수도 있음)
    navigate(`/book/${bookId}`);
  }, [navigate, bookId, STORAGE_KEYS]);

  // 결과 객체
  const result = useMemo(() => {
    if (quizStatus !== 'result' && quizStatus !== 'streak') {
      return null;
    }
    return calculateResult();
  }, [quizStatus, calculateResult]);

  // 스트릭 정보 (제출 API 응답에서 받아오기)
  const streakInfo = useMemo(() => {
    if (quizStatus !== 'streak') {
      return null;
    }
    
    // TODO: 제출 API 응답에 streakInfo가 포함되면 사용
    // 현재는 제출 API 응답에 streakInfo가 없으므로 임시 값 사용
    // submitResult?.streakInfo || 
    return {
      currentStreak: 3,
      quote: '삶이 있는 한 희망은 있다',
      author: '키케로',
      calendarDates: null // null이면 QuizStreak에서 자동 생성
    };
  }, [quizStatus]);

  // 로딩 상태
  if (isLoading) {
    return {
      quizStatus: null,
      currentQuestion: null,
      currentStep: 0,
      totalSteps: 0,
      questions: [],
      result: null,
      streakInfo: null,
      onSubmitAnswer: () => {},
      onConfirmResult: () => {},
      onConfirmStreak: () => {}
    };
  }

  // 에러 상태
  if (isError) {
    return {
      quizStatus: null,
      currentQuestion: null,
      currentStep: 0,
      totalSteps: 0,
      questions: [],
      result: null,
      streakInfo: null,
      onSubmitAnswer: () => {},
      onConfirmResult: () => {},
      onConfirmStreak: () => {}
    };
  }

  return {
    quizStatus,
    currentQuestion,
    currentStep: currentStep + 1, // 1-based로 표시하기 위해 +1
    totalSteps,
    questions: quizData?.questions || [],
    userAnswers,
    result,
    streakInfo,
    onSubmitAnswer: handleSubmitAnswer,
    onConfirmResult: handleShowStreak,
    onConfirmStreak: handleEndQuiz
  };
}

export default useQuiz;

