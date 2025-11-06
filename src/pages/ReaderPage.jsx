import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookViewer from '../features/reader/components/BookViewer';
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
  const [bookContent, setBookContent] = useState(null);

  useEffect(() => {
    // TODO: 실제 API 호출로 교체
    // 현재는 목데이터 사용
    setBookContent(bookContentData);
  }, []);

  if (!bookContent) {
    return <div>Loading...</div>;
  }

  return (
    <ReaderPageContainer>
      <BookViewer 
        text={bookContent.summaryText} 
        chapterTitle="Chapter1"
      />
    </ReaderPageContainer>
  );
}

export default ReaderPage;

