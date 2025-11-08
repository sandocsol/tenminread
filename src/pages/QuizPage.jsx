import useQuiz from '../features/quiz/hooks/useQuiz';
import QuizView from '../features/quiz/components/QuizView';
import QuizResult from '../features/quiz/components/QuizResult';
import QuizStreak from '../features/quiz/components/QuizStreak';

function QuizPage() {
  const {
    quizStatus,
    currentQuestion,
    currentStep,
    totalSteps,
    questions,
    userAnswers,
    result,
    streakInfo,
    onSubmitAnswer,
    onConfirmResult,
    onConfirmStreak
  } = useQuiz();

  // 로딩 상태
  if (!quizStatus) {
    return <div>Loading quiz...</div>;
  }

  // 퀴즈 진행 중
  if (quizStatus === 'quiz') {
    return (
      <QuizView
        question={currentQuestion}
        currentStep={currentStep}
        totalSteps={totalSteps}
        userAnswers={userAnswers}
        onSubmitAnswer={onSubmitAnswer}
      />
    );
  }

  // 결과 화면
  if (quizStatus === 'result') {
    return (
      <QuizResult
        result={result}
        questions={questions}
        onConfirm={onConfirmResult}
      />
    );
  }

  // 스트릭 화면
  if (quizStatus === 'streak') {
    return (
      <QuizStreak
        streakCount={streakInfo?.currentStreak}
        quote={streakInfo?.quote}
        author={streakInfo?.author}
        calendarDates={streakInfo?.calendarDates}
        onConfirm={onConfirmStreak}
      />
    );
  }

  return <div>Unknown quiz status</div>;
}

export default QuizPage;

