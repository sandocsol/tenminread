import styled from 'styled-components';
import Button from '../../../components/Button';

const StreakContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #fff7eb;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: -731px;
  left: -851px;
  width: 2095px;
  height: 2066px;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 34px;
  left: 4px;
  width: 2093px;
  height: 2035px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.4;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 892px;
  left: 849px;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #ffa5d2
  );
`;

const StreakNumberContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 109px;
  height: 388.102px;
`;

const StreakBar = styled.div`
  position: absolute;
  top: 0;
  left: 49.18px;
  width: 11px;
  height: 254px;
  background-color: #e3a300;
  opacity: 0.5;
`;

const StreakBarSegment1 = styled.div`
  position: absolute;
  top: 254.1px;
  left: 71px;
  width: 9px;
  height: 31px;
  background-color: #e3a300;
  opacity: 0.8;
  transform: rotate(90deg);
  transform-origin: top left;
`;

const StreakBarSegment2 = styled.div`
  position: absolute;
  top: 379.1px;
  left: 70px;
  width: 9px;
  height: 30px;
  background-color: #e3a300;
  opacity: 0.8;
  transform: rotate(90deg);
  transform-origin: top left;
`;

const StreakCircle = styled.div`
  position: absolute;
  top: 262.1px;
  left: 0;
  width: 109px;
  height: 117px;
  background-color: #ffecbd;
  border-radius: 128.409px;
`;

const StreakNumber = styled.p`
  position: absolute;
  left: 39.18px;
  top: 303px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 45px;
  line-height: 35px;
  color: #ffc432;
  margin: 0;
  white-space: pre;
`;

const QuoteContainer = styled.div`
  position: absolute;
  top: 414px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'VITRO_PRIDE_OTF', sans-serif;
  font-size: 18px;
  line-height: 28px;
  color: #6f665f;
  text-align: center;
  white-space: pre;
`;

const QuoteText = styled.p`
  margin: 0;
  margin-bottom: 0;
`;

const AuthorText = styled.p`
  margin: 0;
  margin-top: 0;
`;

const BottomSection = styled.div`
  position: absolute;
  bottom: 57px;
  left: 50%;
  transform: translateX(-50%);
  width: 334px;
  height: 182px;
`;

const BottomContent = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 332px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`;

const StreakTitle = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 35px;
  color: #6f665f;
  margin: 0;
`;

const CalendarContainer = styled.div`
  position: relative;
  width: 330px;
  height: 73px;
`;

const CalendarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 73px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
`;

const CalendarDates = styled.div`
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 13px;
  align-items: center;
  text-align: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
  color: #2e2a27;
  letter-spacing: -0.32px;
`;

const CalendarDate = styled.div`
  width: 30px;
  height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: ${props => props.isToday ? '600' : '400'};
  font-size: 12px;
  line-height: 21px;
  color: #2e2a27;
`;

const CalendarHighlight = styled.div`
  position: absolute;
  top: 15.07%;
  left: 33.64%;
  width: 26.09%;
  height: 25.1%;
  border-radius: 4px;
  background-color: rgba(255, 196, 80, 0.2);
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

function QuizStreak({ streakCount, quote, author, calendarDates, onConfirm }) {
  // 기본값 설정
  const displayStreak = streakCount || 3;
  const displayQuote = quote || '삶이 있는 한 희망은 있다';
  const displayAuthor = author || '키케로';
  
  // 캘린더 날짜가 없으면 오늘 기준으로 일주일 생성
  const getCalendarDates = () => {
    if (calendarDates && calendarDates.length > 0) {
      return calendarDates;
    }
    
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push({
        day: date.getDate(),
        isToday: i === 0
      });
    }
    return dates;
  };

  const dates = getCalendarDates();

  return (
    <StreakContainer>
      {/* Background */}
      <BackgroundWrapper>
        <GradientOverlay />
      </BackgroundWrapper>

      {/* Streak Number */}
      <StreakNumberContainer>
        <StreakBar />
        <StreakBarSegment1 />
        <StreakBarSegment2 />
        <StreakCircle />
        <StreakNumber>{displayStreak}</StreakNumber>
      </StreakNumberContainer>

      {/* Quote */}
      <QuoteContainer>
        <QuoteText>{displayQuote}</QuoteText>
        <AuthorText>-{displayAuthor}-</AuthorText>
      </QuoteContainer>

      {/* Bottom Section */}
      <BottomSection>
        <BottomContent>
          <StreakTitle>연속 독서 {displayStreak}일차</StreakTitle>
          
          <CalendarContainer>
            <CalendarBackground />
            <CalendarHighlight />
            <CalendarDates>
              {dates.map((date, index) => (
                <CalendarDate key={index} isToday={date.isToday}>
                  {date.day || date}
                </CalendarDate>
              ))}
            </CalendarDates>
          </CalendarContainer>

          <ButtonWrapper>
            <Button
              onClick={onConfirm}
              variant="secondary"
              fullWidth
              height="50px"
              padding="7px 139px"
              borderRadius="10px"
              bgColor="rgba(255, 252, 247, 0.8)"
              border="none"
              color="#6b7280"
              fontWeight="700"
              fontSize="20px"
              lineHeight="35px"
            >
              확인
            </Button>
          </ButtonWrapper>
        </BottomContent>
      </BottomSection>
    </StreakContainer>
  );
}

export default QuizStreak;

