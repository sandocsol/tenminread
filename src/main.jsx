import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// 1. App.jsx (공통 레이아웃 + Outlet) 임포트
import App from './App.jsx';

// 2. 페이지 컴포넌트들 임포트
import HomePage from './pages/HomePage.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import ReaderPage from './pages/ReaderPage.jsx'; // 👈 개발 대상
import QuizPage from './pages/QuizPage.jsx';     // 👈 개발 대상
import MyLibraryPage from './pages/MyLibraryPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';

// 3. 라우터 객체 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App.jsx가 모든 페이지의 부모(레이아웃)가 됨
    // 4. App.jsx의 <Outlet>에 렌더링될 자식 페이지들
    children: [
      { index: true, element: <HomePage /> }, // path: '/'의 기본 페이지
      { path: 'login', element: <LoginPage /> },
      { path: 'onboarding', element: <OnboardingPage /> },
      
      // ⭐️ 책 읽기 및 퀴즈 기능
      { path: 'book/:bookId', element: <BookDetailPage /> },
      { path: 'reader/:bookId', element: <ReaderPage /> }, // 👈
      { path: 'quiz/:bookId', element: <QuizPage /> },     // 👈

      // 기타 페이지
      { path: 'my-library', element: <MyLibraryPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

// 5. RouterProvider로 앱 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);