import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookViewer from '../features/reader/components/BookViewer';
import ProgressBar from '../features/reader/components/ProgressBar';
import useReadingProgress from '../features/reader/hooks/useReadingProgress';
import bookContentData from '../mock/bookContent.json';

const ReaderPageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 폴백 */
  height: 100dvh; /* 주소창 변화 대응 */
  background-color: #ffffff;
  overflow-x: hidden; /* 가로 스크롤 방지 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  
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
  const containerRef = useRef(null);
  const [contentKey, setContentKey] = useState(0); // 컨텐츠 로드 시 리스너 재등록을 위한 키

  // useReadingProgress 훅 사용
  const { progress, theme } = useReadingProgress(bookId || 1, containerRef, contentKey);

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
    chapterTitle: 'Chapter1'
  }), [bookContent?.summaryText]);

  if (!bookContent) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ReaderPageContainer ref={containerRef}>
        <BookViewer {...bookViewerProps} />
      </ReaderPageContainer>
      <ProgressBar progress={progress} theme={theme} />
    </>
  );
}

export default ReaderPage;

