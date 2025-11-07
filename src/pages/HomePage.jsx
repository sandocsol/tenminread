import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function HomePage() {
  const navigate = useNavigate();

  const handleGoToReader = () => {
    // bookId 1로 이동 (실제로는 선택한 책의 ID를 사용)
    // TODO: 실제 독서 진행 상황에 따라 seq 값을 가져와야 함 (현재는 기본값 1 사용)
    const seq = 1; // 첫 번째 요약부터 시작
    navigate(`/reader/1/${seq}`);
  };

  const handleGoToBookDetail = () => {
    // bookId 1로 이동 (실제로는 선택한 책의 ID를 사용)
    navigate('/book/1');
  };

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box', maxWidth: '100%' }}>
      <h1>홈 페이지</h1>
      <p>환영합니다!</p>
      <div style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button 
          onClick={handleGoToReader}
          fullWidth
          padding="7px 20px"
        >
          책 읽으러 가기
        </Button>
        <Button 
          onClick={handleGoToBookDetail}
          fullWidth
          padding="7px 20px"
        >
          책 정보 보러가기
        </Button>
      </div>
    </div>
  );
}

export default HomePage;

