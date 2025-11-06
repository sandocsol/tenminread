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
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 13px;
  align-items: flex-start;
  text-align: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
  color: #2e2a27;
  letter-spacing: -0.32px;
`;

const CalendarDate = styled.div`
  width: 30px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CalendarDayOfWeek = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: rgba(180, 180, 180, 0.8);
  margin: 0;
  padding: 0 10px;
`;

const CalendarDateContent = styled.div`
  width: 30px;
  height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: ${props => props.isToday ? '600' : '400'};
  font-size: 12px;
  line-height: 21px;
  color: #2e2a27;
  position: relative;
`;

const CalendarDateWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const TodayBackground = styled.div`
  position: absolute;
  width: 39px;
  height: 38px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff79e;
  border-radius: 9999px;
`;

const TodayGradient = styled.div`
  width: 32px;
  height: 32px;
  opacity: 0.8;
  background: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    rgba(255, 248, 35, 0.2) 0%,
    rgba(246, 198, 80, 0.2) 11%,
    rgba(251, 150, 142, 0.2) 57%,
    rgba(255, 102, 204, 0.8) 100%
  );
  border-radius: 9999px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const StreakGradient = styled.div`
  width: 32px;
  height: 32px;
  opacity: 0.8;
  background: radial-gradient(
    ellipse 50% 50% at 50% 50%,
    rgba(255, 248, 35, 0.6) 0%,
    rgba(246, 198, 80, 0.4) 11%,
    rgba(251, 150, 142, 0.4) 57%,
    rgba(255, 102, 204, 0.3) 100%
  );
  border-radius: 9999px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const CalendarDateText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StreakCheckIcon = styled.img`
  position: absolute;
  left: 55%;
  top: 8%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

function QuizStreak({ streakCount, quote, author, calendarDates, onConfirm }) {
  // 기본값 설정
  const displayStreak = streakCount || 3;
  const displayQuote = quote || '삶이 있는 한 희망은 있다';
  const displayAuthor = author || '키케로';
  
  // 요일 이름 배열
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 캘린더 날짜가 없으면 오늘 기준으로 일주일 생성 (월요일~일요일)
  const getCalendarDates = () => {
    if (calendarDates && calendarDates.length > 0) {
      return calendarDates.map(date => {
        const dateObj = date.date ? new Date(date.date) : new Date();
        return {
          ...date,
          dayOfWeek: dayNames[dateObj.getDay()]
        };
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 0으로 설정하여 날짜 비교 정확도 향상
    
    // 오늘이 포함된 주의 월요일 찾기
    const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 월요일을 기준으로 한 날짜 차이
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysFromMonday);
    
    const dates = [];
    const todayStr = today.toDateString(); // 오늘 날짜를 문자열로 변환하여 비교
    
    // 월요일부터 일요일까지 7일 생성
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      
      const dateStr = date.toDateString();
      const isToday = dateStr === todayStr;
      
      // 연속 학습 날짜: 오늘부터 과거로 streakCount일까지
      // 오늘을 포함하여 과거로 streakCount일이 연속 학습 날짜
      const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24)); // 날짜 차이 계산
      const isStreak = daysDiff >= 0 && daysDiff < displayStreak;
      
      dates.push({
        day: date.getDate(),
        dayOfWeek: dayNames[date.getDay()],
        isToday: isToday,
        isStreak: isStreak
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
            <CalendarDates>
              {dates.map((date, index) => (
                <CalendarDate key={index}>
                  <CalendarDayOfWeek>{date.dayOfWeek}</CalendarDayOfWeek>
                  <CalendarDateContent isToday={date.isToday}>
                    <CalendarDateWrapper>
                      {date.isToday ? (
                        <>
                          <TodayBackground />
                          <TodayGradient />
                          <StreakCheckIcon src="/assets/streak_check.svg" alt="streak check" />
                          <CalendarDateText>{date.day || date}</CalendarDateText>
                        </>
                      ) : date.isStreak ? (
                        <>
                          <StreakGradient />
                          <CalendarDateText>{date.day || date}</CalendarDateText>
                        </>
                      ) : (
                        <CalendarDateText>{date.day || date}</CalendarDateText>
                      )}
                    </CalendarDateWrapper>
                  </CalendarDateContent>
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

