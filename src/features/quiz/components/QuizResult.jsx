import styled from 'styled-components';
import Button from '../../../components/Button';

const ResultContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh; /* 주소창 변화 대응 */
  background-color: #fff7eb;
  overflow: hidden; /* 컨테이너 자체는 스크롤 안 함 */
`;

const RadialGradientBackground = styled.div`
  position: absolute;
  width: 2095px;
  height: 2066px;
  left: -852px;
  top: -988px;
  pointer-events: none;
  z-index: 0;
`;

const RadialGradientContainer = styled.div`
  position: absolute;
  width: 2457px;
  height: 2373px;
  left: -178px;
  top: -110px;
  opacity: 0.4;
  pointer-events: none;
`;

const RadialGradient = styled.div`
  position: absolute;
  width: 2457px;
  height: 2373px;
  left: 0;
  top: 0;
  background: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    rgba(255, 248, 35, 0.6) 0%,
    rgba(246, 198, 80, 0.4) 11%,
    rgba(251, 150, 142, 0.4) 57%,
    rgba(255, 102, 204, 0.3) 100%
  );
  border-radius: 9999px;
  pointer-events: none;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  bottom: 128px;
  left: 0;
  width: 100%;
  height: 78px;
  background: linear-gradient(
    to bottom,
    rgba(115, 115, 115, 0) 20%,
    rgba(115, 115, 115, 0.15) 100%
  );
  pointer-events: none; /* 스크롤 방해 안 함 */
  z-index: 1;
`;

const BottomGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 128px;
  background: linear-gradient(to bottom, #fedcd1, #fff7eb);
  overflow: hidden;
  z-index: 2;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 206px;
  height: 122px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  z-index: 2;
`;

const MessageBubble = styled.div`
  width: 158px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);
`;

const MessageInner = styled.div`
  background-color: #ffffff;
  border-radius: 36px;
  padding: 12px 16px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
`;

const MessageText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #6e6e6e;
  margin: 0;
  white-space: pre;
`;

const HighlightText = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  color: #ffbd19;
`;

const ResultsList = styled.div`
  position: absolute;
  top: 0px;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto; /* Results만 스크롤 */
  padding-bottom: 78px; /* 마지막 항목 여유공간 */
  padding-top: 140px;

  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ResultCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionHeader = styled.div`
  position: relative;
  width: 100%;
  min-height: 28px;
  /* float 컨텍스트를 위한 clearfix */
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const QuestionBadge = styled.div`
  float: left;
  width: 19.84px;
  height: 19.84px;
  margin-top: 3.28px;
  margin-right: 10.2px; /* Badge와 텍스트 사이 여유공간 */
  background-color: ${props => props.isCorrect ? '#f6c650' : '#ff8c78'};
  border-radius: 9.92px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QuestionNumber = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 19.2px;
  color: #ffffff;
  margin: 0;
`;

const QuestionText = styled.p`
  font-family: 'VITRO_PRIDE_OTF', sans-serif;
  font-size: 16px;
  line-height: 28px;
  color: #2e2a27;
  margin: 0;
  white-space: pre-wrap;
  /* Badge가 float로 배치되므로 텍스트가 자동으로 주변으로 흐름 */
  /* 첫 번째 줄은 Badge 오른쪽에서 시작, 두 번째 줄부터는 왼쪽부터 시작 */
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8px;
  align-items: flex-end;
  width: 100%;
`;

const AnswerLabel = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 11.2px;
  line-height: 12.8px;
  color: ${props => props.highlight ? '#2e2a27' : '#b4afab'};
  margin: 0;
  width: 100%;
  text-align: right;
`;

const AnswerBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5.6px 111.2px;
  border-radius: 8px;
  background-color: ${props => {
    if (props.isCorrect) return '#ffd878';
    return '#ff8c78';
  }};
  opacity: ${props => props.opacity || 1};
`;

const AnswerText = styled.p`
  font-family: 'VITRO_PRIDE_OTF', sans-serif;
  font-size: 14.4px;
  line-height: 28px;
  color: #2e2a27;
  margin: 0;
  white-space: pre;
`;

function QuizResult({ result, questions, onConfirm }) {
  if (!result || !result.userAnswers) {
    return <div>Loading results...</div>;
  }

  const { totalCorrect, totalQuestions, userAnswers } = result;

  // 질문 정보를 userAnswers와 매칭
  const getQuestionInfo = (questionId) => {
    return questions?.find(q => q.id === questionId);
  };

  return (
    <ResultContainer>
      {/* Radial Gradient Background */}
      <RadialGradientBackground>
        <RadialGradientContainer>
          <RadialGradient />
        </RadialGradientContainer>
      </RadialGradientBackground>

      {/* Result Message */}
      <MessageContainer>
        <MessageBubble>
          <MessageInner>
            <MessageText>
              <HighlightText>{totalQuestions}</HighlightText>개 중{' '}
              <HighlightText>{totalCorrect}</HighlightText>개 맞췄어요!
            </MessageText>
          </MessageInner>
        </MessageBubble>
      </MessageContainer>

      {/* Results List */}
      <ResultsList>
        {userAnswers.map((userAnswer, index) => {
          const questionInfo = getQuestionInfo(userAnswer.questionId);
          const isCorrect = userAnswer.isCorrect;

          return (
            <ResultCard key={userAnswer.questionId || index}>
              {/* Question */}
              <QuestionHeader>
                <QuestionBadge isCorrect={isCorrect}>
                  <QuestionNumber>{index + 1}</QuestionNumber>
                </QuestionBadge>
                <QuestionText>
                  {questionInfo?.question || userAnswer.question || ''}
                </QuestionText>
              </QuestionHeader>

              {/* Answers */}
              <AnswersContainer>
                {isCorrect ? (
                  <>
                    {/* 정답인 경우: 내가 한 답 ・정답 하나로 표시 */}
                    <AnswerLabel>
                      <span style={{ color: '#b4afab' }}>내가 한 답 </span>
                      <span style={{ color: '#2e2a27' }}>・정답</span>
                    </AnswerLabel>
                    <AnswerBox isCorrect={true}>
                      <AnswerText>{userAnswer.userAnswerText}</AnswerText>
                    </AnswerBox>
                  </>
                ) : (
                  <>
                    {/* 오답인 경우: 내가 한 답과 정답 모두 표시 */}
                    <AnswerLabel>내가 한 답</AnswerLabel>
                    <AnswerBox isCorrect={false} opacity={0.4}>
                      <AnswerText>{userAnswer.userAnswerText}</AnswerText>
                    </AnswerBox>
                    <AnswerLabel>정답</AnswerLabel>
                    <AnswerBox isCorrect={false}>
                      <AnswerText>
                        {questionInfo?.correctAnswerText || userAnswer.correctAnswerText}
                      </AnswerText>
                    </AnswerBox>
                  </>
                )}
              </AnswersContainer>
            </ResultCard>
          );
        })}
      </ResultsList>

      {/* Background Gradient */}
      <BackgroundGradient />

      {/* Bottom Button */}
      <BottomGradient>
        <ButtonWrapper>
          <Button
            onClick={onConfirm}
            variant="secondary"
            width="330px"
            height="50px"
            padding="7px 139px"
            borderRadius="10px"
            bgColor="#fffcf7"
            border="none"
            color="#6b7280"
            fontWeight="700"
            fontSize="20px"
            lineHeight="35px"
          >
            확인
          </Button>
        </ButtonWrapper>
      </BottomGradient>
    </ResultContainer>
  );
}

export default QuizResult;

