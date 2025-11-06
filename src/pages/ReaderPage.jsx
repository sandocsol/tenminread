import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookViewer from '../features/reader/components/BookViewer';
import BookInfoHeader from '../features/reader/components/BookInfoHeader';
import CompleteButton from '../features/reader/components/CompleteButton';
import ProgressBar from '../features/reader/components/ProgressBar';
import ReaderControls from '../features/reader/components/ReaderControls';
import useReadingProgress from '../features/reader/hooks/useReadingProgress';
import { bookApi } from '../api/bookApi';
import bookContentData from '../mock/bookContent.json';

const ReaderPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 폴백 */
  height: 100dvh; /* 주소창 변화 대응 */
  background-color: ${props => props.theme === 'dark' ? '#2e2a27' : '#ffffff'};
  overflow: hidden; /* 전체 컨테이너는 스크롤 방지 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

function ReaderPage() {
  const { bookId } = useParams();
  const [bookContent, setBookContent] = useState(null);
  const [bookInfo, setBookInfo] = useState(null);
  const [isLoadingBookInfo, setIsLoadingBookInfo] = useState(true);
  const containerRef = useRef(null);
  const [contentKey, setContentKey] = useState(0); // 컨텐츠 로드 시 리스너 재등록을 위한 키

  // useReadingProgress 훅 사용
  const { progress, theme, fontSize, changeFontSize, toggleTheme } = useReadingProgress(bookId || 1, containerRef, contentKey);

  // 책 정보 API 호출
  useEffect(() => {
    const fetchBookInfo = async () => {
      if (!bookId) return;
      
      try {
        setIsLoadingBookInfo(true);
        const data = await bookApi.getBook(bookId);
        setBookInfo(data);
      } catch (error) {
        console.error('Failed to fetch book info:', error);
        // 에러 발생 시에도 계속 진행 (선택적)
      } finally {
        setIsLoadingBookInfo(false);
      }
    };

    fetchBookInfo();
  }, [bookId]);

  useEffect(() => {
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    setBookContent(bookContentData);
    // 컨텐츠가 로드되면 키를 변경하여 스크롤 리스너 재등록
    setContentKey(prev => prev + 1);
  }, []);

  // BookViewer props를 메모이제이션하여 불필요한 리렌더링 방지
  const bookViewerProps = useMemo(() => ({
    text: bookContent?.summaryText || '',
    chapterTitle: 'Chapter1',
    fontSize,
    theme
  }), [bookContent?.summaryText, fontSize, theme]);

  if (!bookContent) {
    return <div>Loading...</div>;
  }

  return (
    <ReaderPageContainer theme={theme}>
      <ReaderControls 
        theme={theme}
        onChangeFontSize={changeFontSize}
        onToggleTheme={toggleTheme}
      />
      <ContentWrapper ref={containerRef}>
        {/* 책 정보 헤더 */}
        {bookInfo && (
          <BookInfoHeader
            author={bookInfo.author}
            title={bookInfo.title}
            day={bookInfo.day || 1} // TODO: 실제 일차 정보는 독서 진행 상황 API에서 받아오기
            coverImage={bookInfo.coverImage || bookInfo.bookCover}
            theme={theme}
          />
        )}
        <BookViewer {...bookViewerProps} />
        {bookContent && (
          <CompleteButton 
            bookId={bookId} 
            theme={theme}
          />
        )}
      </ContentWrapper>
      <ProgressBar progress={progress} theme={theme} />
    </ReaderPageContainer>
  );
}

export default ReaderPage;

