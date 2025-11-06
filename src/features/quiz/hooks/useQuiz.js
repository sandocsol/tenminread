import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// TODO: React Query 설치 후 주석 해제
// import { useQuery, useMutation } from '@tanstack/react-query';
import { quizApi } from '../../../api/quizApi';

function useQuiz() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // 1. 고유한 스토리지 키 정의 (bookId 변경 시에만 재생성)
  const STORAGE_KEYS = useMemo(() => {
    const getStorageKey = (key) => `quiz_${bookId}_${key}`;
    return {
      quizStatus: getStorageKey('status'),
      currentStep: getStorageKey('step'),
      userAnswers: getStorageKey('answers'),
      submitResult: getStorageKey('submitResult')
    };
  }, [bookId]);

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

  // 2. useState의 초기값 설정 (Lazy Initializer 사용)
  const [quizStatus, setQuizStatus] = useState(() => 
    getStoredValue(STORAGE_KEYS.quizStatus, 'quiz')
  ); // 'quiz' | 'result' | 'streak'
  const [currentStep, setCurrentStep] = useState(() => 
    getStoredValue(STORAGE_KEYS.currentStep, 0)
  );
  const [userAnswers, setUserAnswers] = useState(() => 
    getStoredValue(STORAGE_KEYS.userAnswers, [])
  );

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
  const [submitResult, setSubmitResult] = useState(() => 
    getStoredValue(STORAGE_KEYS.submitResult, null)
  );

  // submitResult 변경 시 sessionStorage에 저장
  useEffect(() => {
    if (submitResult) {
      setStoredValue(STORAGE_KEYS.submitResult, submitResult);
    }
  }, [submitResult, STORAGE_KEYS.submitResult]);
  // eslint-disable-next-line no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState(false); // TODO: 제출 중 로딩 상태 표시에 사용

  // 퀴즈 데이터 로드
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!bookId) return;

      try {
        setIsLoading(true);
        setIsError(false);
        // TODO: summaryId는 실제로는 다른 곳에서 받아와야 함 (현재는 임시로 1 사용)
        const summaryId = 1; // 임시 값
        const data = await quizApi.getQuizzesFormatted(bookId, summaryId);
        setQuizData(data);
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
  }, [bookId]);

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
    if (!quizData?.questions || !submitResult) return null;

    // 제출 API 응답의 results를 사용해서 정답 정보 매핑
    const resultsMap = new Map();
    submitResult.results?.forEach((result) => {
      resultsMap.set(result.quizId, {
        isCorrect: result.isCorrect,
        correctChoice: result.correctChoice
      });
    });

    const processedAnswers = userAnswers.map((userAnswer) => {
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
    }).filter(Boolean);

    const totalCorrect = processedAnswers.filter(a => a.isCorrect).length;

    return {
      totalCorrect,
      totalQuestions: totalSteps,
      userAnswers: processedAnswers
    };
  }, [quizData, userAnswers, totalSteps, submitResult]);

  // 답변 제출 핸들러
  const handleSubmitAnswer = useCallback(async (answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, answer];
      
      // 마지막 문항인지 확인
      if (currentStep < totalSteps - 1) {
        // 다음 문항으로 이동
        setCurrentStep(currentStep + 1);
      } else {
        // 마지막 문항: 정답 제출 API 호출
        const submitAnswers = async () => {
          try {
            setIsSubmitting(true);
            // TODO: summaryId는 실제로는 다른 곳에서 받아와야 함 (현재는 임시로 1 사용)
            const summaryId = 1; // 임시 값
            
            // API 요청 형식으로 변환
            const answersForApi = newAnswers.map((a) => ({
              quizId: a.questionId,
              submittedAnswer: a.answerIndex
            }));
            
            // 정답 제출 API 호출
            const result = await quizApi.submitQuizAnswers(bookId, summaryId, answersForApi);
            setSubmitResult(result);
            
            // 결과 화면으로 이동
            setQuizStatus('result');
          } catch (error) {
            console.error('Failed to submit quiz answers:', error);
            // 에러 발생 시에도 결과 화면으로 이동 (에러 처리 필요 시 추가)
            setQuizStatus('result');
          } finally {
            setIsSubmitting(false);
          }
        };
        
        submitAnswers();
      }
      
      return newAnswers;
    });
  }, [currentStep, totalSteps, bookId]);

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
    
    // 뷰어 페이지로 이동
    navigate(`/reader/${bookId}`);
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
    result,
    streakInfo,
    onSubmitAnswer: handleSubmitAnswer,
    onConfirmResult: handleShowStreak,
    onConfirmStreak: handleEndQuiz
  };
}

export default useQuiz;

