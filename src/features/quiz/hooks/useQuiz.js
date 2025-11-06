import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// TODO: React Query 설치 후 주석 해제
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { quizApi } from '../../api/quizApi';

// 임시: Mock 데이터 import
import quizMockData from '../../../mock/quiz.json';

function useQuiz() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // 1. 고유한 스토리지 키 정의 (bookId 변경 시에만 재생성)
  const STORAGE_KEYS = useMemo(() => {
    const getStorageKey = (key) => `quiz_${bookId}_${key}`;
    return {
      quizStatus: getStorageKey('status'),
      currentStep: getStorageKey('step'),
      userAnswers: getStorageKey('answers')
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

  // TODO: React Query로 교체
  // const { data: quizData, isLoading, isError } = useQuery({
  //   queryKey: ['quiz', bookId],
  //   queryFn: () => quizApi.getQuiz(bookId),
  // });

  // 임시: Mock 데이터 사용
  const quizData = quizMockData;
  const isLoading = false;
  const isError = false;

  // TODO: React Query Mutation으로 교체
  // const saveResultMutation = useMutation({
  //   mutationFn: (resultData) => quizApi.saveResult(bookId, resultData),
  //   onSuccess: () => {
  //     setQuizStatus('result');
  //   },
  // });

  // 현재 질문 가져오기
  const currentQuestion = useMemo(() => {
    if (!quizData?.questions || quizData.questions.length === 0) {
      return null;
    }
    return quizData.questions[currentStep];
  }, [quizData, currentStep]);

  // 전체 문제 수
  const totalSteps = quizData?.totalQuestions || 0;

  // 정답 계산 함수
  const calculateResult = useCallback(() => {
    if (!quizData?.questions) return null;

    const processedAnswers = userAnswers.map((userAnswer) => {
      const question = quizData.questions.find(q => q.id === userAnswer.questionId);
      if (!question) return null;

      const isCorrect = userAnswer.answerIndex === question.correctAnswer;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer.answerIndex,
        userAnswerText: userAnswer.answerText,
        correctAnswer: question.correctAnswer,
        correctAnswerText: question.correctAnswerText,
        isCorrect: isCorrect
      };
    }).filter(Boolean);

    const totalCorrect = processedAnswers.filter(a => a.isCorrect).length;

    return {
      totalCorrect,
      totalQuestions: totalSteps,
      userAnswers: processedAnswers
    };
  }, [quizData, userAnswers, totalSteps]);

  // 답변 제출 핸들러
  const handleSubmitAnswer = useCallback((answer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers, answer];
      
      // 마지막 문항인지 확인
      if (currentStep < totalSteps - 1) {
        // 다음 문항으로 이동
        setCurrentStep(currentStep + 1);
      } else {
        // 마지막 문항: 결과 계산 및 저장
        // eslint-disable-next-line no-unused-vars
        const calculatedResult = {
          totalCorrect: newAnswers.filter((a) => {
            const question = quizData?.questions?.find(q => q.id === a.questionId);
            return question && a.answerIndex === question.correctAnswer;
          }).length,
          totalQuestions: totalSteps,
          userAnswers: newAnswers.map((a) => {
            const question = quizData?.questions?.find(q => q.id === a.questionId);
            return {
              questionId: question?.id,
              question: question?.question,
              userAnswer: a.answerIndex,
              userAnswerText: a.answerText,
              correctAnswer: question?.correctAnswer,
              correctAnswerText: question?.correctAnswerText,
              isCorrect: question && a.answerIndex === question.correctAnswer
            };
          })
        };
        
        // TODO: React Query Mutation 사용
        // saveResultMutation.mutate(calculatedResult);

        // 임시: 결과 상태 설정
        setQuizStatus('result');
      }
      
      return newAnswers;
    });
  }, [currentStep, totalSteps, quizData]);

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

  // 스트릭 정보 (결과 저장 API 응답에서 받아올 수도 있음)
  const streakInfo = useMemo(() => {
    if (quizStatus !== 'streak') {
      return null;
    }
    
    // TODO: API 응답에서 받아오기
    // 임시: Mock 데이터 사용
    return quizMockData.streakInfo || {
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

