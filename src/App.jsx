import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  // 사용자 정보 상태 관리
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 진입 시 사용자 정보 로드
  useEffect(() => {
    // TODO: 실제 사용자 정보 API 호출로 교체
    // 예:
    // const fetchUser = async () => {
    //   try {
    //     const response = await fetch('/api/user');
    //     const userData = await response.json();
    //     setUser(userData);
    //   } catch (error) {
    //     console.error('Failed to fetch user:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchUser();
    
    // 임시: 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false);
      // 실제로는 API에서 받아온 사용자 정보를 설정
      // setUser(userData);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 사용자 정보 로딩 중일 때
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  // 로딩 완료 후, 공통 레이아웃과 자식 페이지(Outlet) 렌더링
  return (
    <>
      {/* TODO: 공통 헤더 추가 */}
      {/* <Header user={user} /> */}

      <main>
        {/* 이 <Outlet /> 부분에
          HomePage, ReaderPage, QuizPage 등이 렌더링됩니다.
          context를 사용해 user 정보를 모든 하위 페이지에 전달할 수도 있습니다.
        */}
        <Outlet context={{ user, isUserLoading: isLoading }} />
      </main>
    </>
  );
}

export default App;