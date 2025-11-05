import { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../../reader/components/ProgressBar';
import Button from '../../../components/Button';

const QuizContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 폴백 */
  height: 100dvh; /* 주소창 변화 대응 */
  background-color: #ffffff;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  box-sizing: border-box;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  top: 68px;
  left: 28px;
`;

const QuestionContainer = styled.div`
  position: absolute;
  top: 114px;
  left: 32px;
  width: 328px;
  min-height: 70px;
`;

const QuestionBadge = styled.div`
  position: absolute;
  top: 4.1px;
  left: 4.1px;
  width: 24.8px;
  height: 24.8px;
  background-color: #fdd470;
  border-radius: 12.4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionNumber = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  margin: 0;
`;

const QuestionText = styled.p`
  position: absolute;
  top: 0;
  left: calc(50% - 164px);
  transform: translateX(-50%);
  width: 328px;
  font-family: 'VITRO_PRIDE_OTF', sans-serif;
  font-size: 22px;
  line-height: 35px;
  color: #2e2a27;
  margin: 0;
  white-space: pre-wrap;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 263px;
  left: 31px;
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const OptionButton = styled.button`
  width: 330px;
  height: 50px;
  padding: 7px 139px;
  border-radius: 9px;
  border: 1px solid ${props => props.isSelected ? '#f6c650' : '#b7b7b7'};
  background-color: ${props => props.isSelected ? 'rgba(246, 198, 80, 0.2)' : '#ffffff'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.isSelected ? '#f6c650' : '#9e9e9e'};
  }
`;

const OptionText = styled.p`
  font-family: 'VITRO_PRIDE_OTF', sans-serif;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.isSelected ? '#ffbf23' : '#b7b7b7'};
  margin: 0;
  white-space: pre;
`;

const NextButtonWrapper = styled.div`
  position: absolute;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
`;

function QuizView({ question, currentStep, totalSteps, onSubmitAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionClick = (optionIndex) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    onSubmitAnswer({
      questionId: question.id,
      answerIndex: selectedAnswer,
      answerText: question.options[selectedAnswer]
    });
    
    // Reset selection for next question
    setSelectedAnswer(null);
  };

  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <QuizContainer>
      {/* Progress Bar */}
      <ProgressBarWrapper>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </ProgressBarWrapper>

      {/* Question */}
      <QuestionContainer>
        <QuestionBadge>
          <QuestionNumber>{currentStep}</QuestionNumber>
        </QuestionBadge>
        <QuestionText>{question.question}</QuestionText>
      </QuestionContainer>

      {/* Options */}
      <OptionsContainer>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            isSelected={selectedAnswer === index}
            onClick={() => handleOptionClick(index)}
          >
            <OptionText isSelected={selectedAnswer === index}>
              {option}
            </OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>

      {/* Next Button */}
      <NextButtonWrapper>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          variant="primary"
          width="330px"
          height="50px"
          padding="7px 139px"
          borderRadius="10px"
        >
          다음
        </Button>
      </NextButtonWrapper>
    </QuizContainer>
  );
}

export default QuizView;
