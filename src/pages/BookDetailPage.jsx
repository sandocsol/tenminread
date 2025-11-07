import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBookDetail from '../features/book/hooks/useBookDetail';
import FavoriteButton from '../features/book/components/FavoriteButton';
import BookInfo from '../features/book/components/BookInfo';
import BookTOC from '../features/book/components/BookTOC';
import BookComments from '../features/book/components/BookComments';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #fff7eb;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const TopSection = styled.div`
  position: relative;
  width: 100%;
  flex-shrink: 0;
  background-color: #fff7eb;
  padding-bottom: 33px; /* TabsContainer 높이만큼 여백 */
`;

const HeaderSection = styled.div`
  position: relative;
  width: 100%;
  height: 340px;
  overflow: hidden;
`;

const CoverImageBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(12.5px);
  overflow: hidden;
  pointer-events: none;
  
  img {
    width: 113.26%;
    height: 123.05%;
    object-fit: cover;
    position: absolute;
    left: -6.63%;
    top: -10.11%;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 49px;
  left: 20px;
  width: 31px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CoverImageContainer = styled.div`
  position: absolute;
  top: 116px;
  left: 50%;
  transform: translateX(-50%);
  width: 159px;
  height: 194px;
  border-radius: 5px;
  box-shadow: 0px 5px 25px 0px rgba(58, 56, 50, 0.3);
  overflow: visible;
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BookInfoSection = styled.div`
  position: relative;
  left: 28px;
  margin-top: 36px;
  width: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;

const BookTitle = styled.h1`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #2e2a27;
  margin: 0;
  flex-shrink: 0;
`;

const BookAuthor = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  color: #2e2a27;
  opacity: 0.3;
  text-decoration: underline;
  text-underline-position: from-font;
  margin: 0;
`;

const BookHook = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #2e2a27;
  margin: 0;
`;

const BookMeta = styled.div`
  position: absolute;
  left: 30px;
  top: 351px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
  pointer-events: none;
`;

const MetaText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  color: #2e2a27;
  opacity: 0.3;
  margin: 0;
`;

const CategoryTag = styled.div`
  background-color: #ffffff;
  border-radius: 30px;
  padding: 5px 10px;
  flex-shrink: 0;
`;

const TitleLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  color: #2e2a27;
  opacity: 0.3;
  margin: 0;
`;


const ReadButton = styled.button`
  position: absolute;
  left: calc(50% + 15px); /* CoverImageContainer 오른쪽 끝 + 여백 */
  top: calc(116px + 194px - 30px); /* CoverImageContainer 아래쪽 - 버튼 높이 조정 */
  width: 116px;
  height: 50px;
  padding: 9px 15px;
  background-color: #fff6b9;
  border: 1.8px solid #ffe39f;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:active {
    opacity: 0.8;
  }
  
  &:focus {
    outline: none;
  }
`;

const ReadButtonText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffc536;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ReadButtonSubtext = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: rgba(121, 95, 34, 0.8);
  opacity: 0.4;
  margin: 0;
`;

const BottomSection = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff7eb;
`;

const TabsContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 9px;
  justify-content: flex-start;
  padding-left: 28px;
  flex-shrink: 0;
  z-index: 3;
`;

const Tab = styled.button`
  width: 80px;
  height: 33px;
  padding: 10px;
  border: none;
  border-radius: 15px 15px 0 0;
  background-color: ${props => props.isActive ? '#f2e9da' : '#ffffff'};
  opacity: ${props => props.isActive ? 1 : 0.5};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: ${props => props.isActive ? 1 : 0.7};
  }
  
  &:focus {
    outline: none;
  }
`;

const TabText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.isActive ? '#6f665f' : '#b4afab'};
  margin: 0;
`;

const ContentArea = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  background-color: #f2e9da;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ReadingRecordCard = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  width: 336px;
  background-color: #ffffff;
  border-radius: 29px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2;
`;

const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 255px;
  margin-bottom: 6px;
`;

const DayLabel = styled.div`
  width: 45.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DayText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: ${props => props.isActive ? 700 : 600};
  font-size: 10px;
  line-height: normal;
  color: ${props => props.isActive ? '#ffc5b3' : '#f6f1e9'};
  margin: 0;
`;

const RecordDays = styled.div`
  display: flex;
  justify-content: space-between;
  width: 255px;
  align-items: center;
`;

const DayIcon = styled.div`
  width: 45.5px;
  height: 45.5px;
  background-color: ${props => props.isActive ? 'rgba(255, 200, 167, 0.4)' : '#FFFDFC'};
  border: ${props => props.isActive ? '1.5px solid #ffc5b3' : '1.5px solid #F6F1E9'};
  border-radius: 22.75px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 22.283px;
    height: 21px;
    object-fit: contain;
  }
`;

const ViewOriginalLink = styled.div`
  position: relative;
  left: 75%;
  margin-top: 20px;
  width: 336px;
  display: flex;
  align-items: center;
  gap: 2px;
  z-index: 2;
`;

const LinkIcon = styled.img`
  width: 10px;
  height: 12px;
`;

const LinkText = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: normal;
  color: #2e2a27;
  opacity: 0.3;
  text-decoration: underline;
  text-underline-position: from-font;
  margin: 0;
`;

const WhiteSpace = styled.div`
  position: absolute;
  top: 299px;
  left: 0;
  width: 100%;
  height: 84px;
  background-color: #fff7eb;
  z-index: 1;
  pointer-events: none;
`;

function BookDetailPage() {
  const navigate = useNavigate();
  const { 
    bookData, 
    bookTOC, 
    isLoading, 
    isTOCLoading, 
    isFavorited, 
    toggleFavorite, 
    fetchBookTOC 
  } = useBookDetail();
  const [activeTab, setActiveTab] = useState('intro');
  const [comments, setComments] = useState([]);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    // 목차 탭을 클릭했을 때 목차 데이터 로드
    if (tab === 'toc' && !bookTOC) {
      try {
        await fetchBookTOC();
      } catch (error) {
        console.error('Failed to load TOC:', error);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRead = () => {
    if (bookData?.bookId) {
      navigate(`/reader/${bookData.bookId}`);
    }
  };

  const handleSubmitComment = (text) => {
    // TODO: 실제 API 호출로 교체
    const newComment = {
      author: '사용자', // 실제로는 현재 사용자 정보 사용
      text: text,
    };
    setComments(prev => [...prev, newComment]);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#6f665f'
        }}>
          로딩 중...
        </div>
      </PageContainer>
    );
  }

  if (!bookData) {
    return (
      <PageContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#6f665f'
        }}>
          책 정보를 불러올 수 없습니다.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 상단 영역: 배경색 #FFF7EB */}
      <TopSection>
        <HeaderSection>
          <CoverImageBlur>
            <img 
              src={bookData.coverImage || '/assets/book_cover.png'} 
              alt={bookData.title}
            />
          </CoverImageBlur>
          
          <BackButton onClick={handleBack} aria-label="뒤로 가기">
            <img src="/assets/back_btn.svg" alt="뒤로 가기" />
          </BackButton>

          <CoverImageContainer>
            <img 
              src={bookData.coverImage || '/assets/book_cover.png'} 
              alt={bookData.title}
            />
          </CoverImageContainer>

          <BookMeta>
            <MetaText>10min ・ 5 chapters</MetaText>
          </BookMeta>

          <ReadButton onClick={handleRead}>
            <ReadButtonText>
              읽기
              <img src="/assets/read_btn_glasses.svg" alt="" style={{ width: '20px', height: '8px' }} />
            </ReadButtonText>
            <ReadButtonSubtext>독서기록 시작!</ReadButtonSubtext>
          </ReadButton>
        </HeaderSection>

        <WhiteSpace />

        <BookInfoSection>
          <TitleRow>
            <TitleLeftGroup>
              <BookTitle>{bookData.title}</BookTitle>
              <CategoryTag>
                <CategoryText>서양문학</CategoryText>
              </CategoryTag>
            </TitleLeftGroup>
            <FavoriteButton 
              isFavorited={isFavorited} 
              onToggle={toggleFavorite}
            />
          </TitleRow>
          <BookAuthor>{bookData.author}</BookAuthor>
          <BookHook>{bookData.hook25Char}</BookHook>
        </BookInfoSection>

        <ReadingRecordCard>
          <RecordHeader>
            <DayLabel>
              <DayText isActive={bookData.day >= 1}>1일차</DayText>
            </DayLabel>
            <DayLabel>
              <DayText isActive={bookData.day >= 2}>2일차</DayText>
            </DayLabel>
            <DayLabel>
              <DayText isActive={bookData.day >= 3}>3일차</DayText>
            </DayLabel>
          </RecordHeader>
          <RecordDays>
            <DayIcon isActive={bookData.day >= 1}>
              <img 
                src={bookData.day >= 1 ? '/assets/book_open.svg' : '/assets/book_lock.svg'} 
                alt={bookData.day >= 1 ? '활성화됨' : '비활성화됨'} 
              />
            </DayIcon>
            <DayIcon isActive={bookData.day >= 2}>
              <img 
                src={bookData.day >= 2 ? '/assets/book_open.svg' : '/assets/book_lock.svg'} 
                alt={bookData.day >= 2 ? '활성화됨' : '비활성화됨'} 
              />
            </DayIcon>
            <DayIcon isActive={bookData.day >= 3}>
              <img 
                src={bookData.day >= 3 ? '/assets/book_open.svg' : '/assets/book_lock.svg'} 
                alt={bookData.day >= 3 ? '활성화됨' : '비활성화됨'} 
              />
            </DayIcon>
          </RecordDays>
        </ReadingRecordCard>

        <ViewOriginalLink>
          <LinkIcon src="/assets/read_full_book.svg" alt="" />
          <LinkText>원문 보기</LinkText>
        </ViewOriginalLink>
      </TopSection>

      {/* 하단 영역: TabsContainer와 ContentArea */}
      <BottomSection>
        <TabsContainer>
          <Tab 
            isActive={activeTab === 'intro'} 
            onClick={() => handleTabChange('intro')}
          >
            <TabText isActive={activeTab === 'intro'}>소개</TabText>
          </Tab>
          <Tab 
            isActive={activeTab === 'toc'} 
            onClick={() => handleTabChange('toc')}
          >
            <TabText isActive={activeTab === 'toc'}>목차</TabText>
          </Tab>
          <Tab 
            isActive={activeTab === 'comments'} 
            onClick={() => handleTabChange('comments')}
          >
            <TabText isActive={activeTab === 'comments'}>댓글</TabText>
          </Tab>
        </TabsContainer>

        <ContentArea>
          {activeTab === 'intro' && (
            <BookInfo 
              description={bookData.bookIntro}
              authorInfo={bookData.authorBio}
              authorName={bookData.author}
              bookData={bookData}
            />
          )}
          {activeTab === 'toc' && (
            <BookTOC 
              bookTOCData={bookTOC}
              isLoading={isTOCLoading}
            />
          )}
          {activeTab === 'comments' && (
            <BookComments 
              comments={comments}
              onSubmitComment={handleSubmitComment}
            />
          )}
        </ContentArea>
      </BottomSection>
    </PageContainer>
  );
}

export default BookDetailPage;
