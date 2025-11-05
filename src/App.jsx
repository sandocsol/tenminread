import React from 'react';
import { Outlet } from 'react-router-dom'; // 👈 핵심!
// import GlobalStyle from './styles/GlobalStyle';
// import Header from './components/Header/Header'; // 공통 헤더

// (예시) Zustand나 Recoil 같은 전역 스토어에서 유저 정보 가져오기
// import { useUserStore } from './store/userStore'; 
// (예시) 공통 로딩 스피너
// import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

function App() {
  // 이전 프로젝트의 useEffect 로직처럼, 
  // 앱 진입 시 사용자 정보를 가져오는 로직 (보통 스토어나 커스텀 훅으로 분리)
  const { user, isLoading } = useUserStore(); // (예시)

  // (예시) 사용자 정보 로딩 중일 때
  if (isLoading) {
    return (
      <>
        <GlobalStyle />
        {/* <LoadingSpinner text="로딩 중..." /> */}
      </>
    );
  }

  // 로딩 완료 후, 공통 레이아웃(Header)과 자식 페이지(Outlet) 렌더링
  return (
    <>
      <GlobalStyle />
      {/* user 정보를 Header에 넘겨 로그인/로그아웃 상태 표시 */}
      <Header user={user} />

      <main>
        {/* 이 <Outlet /> 부분에
          HomePage, ReaderPage, QuizPage 등이 렌더링됩니다.
          context를 사용해 user 정보를 모든 하위 페이지에 전달할 수도 있습니다.
        */}
        <Outlet context={{ user: user, isUserLoading: isLoading }} />
      </main>
    </>
  );
}

export default App;