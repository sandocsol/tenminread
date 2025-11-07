import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function HomePage() {
  const navigate = useNavigate();

  const handleGoToReader = () => {
    // bookId 1로 이동 (실제로는 선택한 책의 ID를 사용)
    navigate('/reader/1');
  };

  return (
    <div style={{ padding: '20px', boxSizing: 'border-box', maxWidth: '100%' }}>
      <h1>홈 페이지</h1>
      <p>환영합니다!</p>
      <div style={{ marginTop: '20px', width: '100%' }}>
        <Button 
          onClick={handleGoToReader}
          fullWidth
          padding="7px 20px"
        >
          책 읽으러 가기
        </Button>
      </div>
    </div>
  );
}

export default HomePage;

