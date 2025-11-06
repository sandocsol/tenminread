import { useState, useEffect, useCallback, useRef } from 'react';
import { getStorage, setStorage } from '../../../utils/storage';

/**
 * 책 읽기 진행 상황 및 설정을 관리하는 훅
 * @param {string|number} bookId - 책 ID
 * @param {React.RefObject} scrollContainerRef - 스크롤 컨테이너 ref (선택사항)
 * @param {number} contentKey - 컨텐츠 로드 시 리스너 재등록을 위한 키 (선택사항)
 * @returns {object} 설정 및 함수들
 */
function useReadingProgress(bookId, scrollContainerRef = null, contentKey = 0) {
  const STORAGE_KEY_SCROLL = `scroll_progress_${bookId}`;
  const STORAGE_KEY_SETTINGS = `reader_settings`;

  // 1. 설정 (폰트 사이즈, 테마) 상태
  const [settings, setSettings] = useState(() => {
    return getStorage(STORAGE_KEY_SETTINGS) || {
      fontSize: 100, // 기본 100%
      theme: 'light', // 'light' | 'dark'
    };
  });

  // 2. 스크롤 위치 상태
  const [scrollPos, setScrollPos] = useState(() => {
    return getStorage(STORAGE_KEY_SCROLL) || 0;
  });

  // 진행률 상태 (0-100)
  const [progress, setProgress] = useState(0);

  // 스크롤 저장을 위한 ref (디바운스 적용)
  const scrollTimeoutRef = useRef(null);
  const isRestoringRef = useRef(false);
  const rafRef = useRef(null);
  const lastProgressRef = useRef(0);

  // 3. 설정 변경 함수
  const changeFontSize = useCallback((delta) => {
    setSettings((prev) => {
      const newSize = Math.max(80, Math.min(200, prev.fontSize + delta));
      const newSettings = { ...prev, fontSize: newSize };
      setStorage(STORAGE_KEY_SETTINGS, newSettings);
      return newSettings;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings((prev) => {
      const newTheme = prev.theme === 'light' ? 'dark' : 'light';
      const newSettings = { ...prev, theme: newTheme };
      setStorage(STORAGE_KEY_SETTINGS, newSettings);
      return newSettings;
    });
  }, []);

  // 4. 스크롤 위치 저장 함수 (디바운스 적용)
  const saveScrollPosition = useCallback((position) => {
    if (isRestoringRef.current) return; // 복원 중일 때는 저장하지 않음

    // 기존 타이머 취소
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 300ms 후에 저장
    scrollTimeoutRef.current = setTimeout(() => {
      setStorage(STORAGE_KEY_SCROLL, position);
      setScrollPos(position);
    }, 300);
  }, []);

  // 5. 스크롤 복원 (페이지 로드 시 1회 실행)
  useEffect(() => {
    if (scrollPos > 0) {
      isRestoringRef.current = true;
      
      const restoreScroll = () => {
        if (scrollContainerRef?.current) {
          // 컨테이너 스크롤인 경우
          scrollContainerRef.current.scrollTop = scrollPos;
        } else {
          // window 스크롤인 경우
          window.scrollTo({ top: scrollPos, behavior: 'auto' });
        }

        // 복원 완료 후 약간의 지연을 두고 저장 가능하도록 설정
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 500);
      };

      // DOM이 렌더링된 후 실행
      const timer = setTimeout(restoreScroll, 100);
      return () => clearTimeout(timer);
    } else {
      isRestoringRef.current = false;
    }
  }, []); // 마운트 시 한 번만 실행

  // 6. 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      // requestAnimationFrame으로 스크롤 이벤트 최적화
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const currentContainer = scrollContainerRef?.current;
        if (!currentContainer) return;
        
        const currentPos = currentContainer.scrollTop;
        
        // 진행률 계산
        const scrollHeight = currentContainer.scrollHeight - currentContainer.clientHeight;
        
        if (scrollHeight <= 0) {
          setProgress(0);
          return;
        }
        
        const currentProgress = Math.min(100, Math.max(0, (currentPos / scrollHeight) * 100));
        
        // 진행률 업데이트
        setProgress(currentProgress);
        lastProgressRef.current = currentProgress;
        
        saveScrollPosition(currentPos);
      });
    };

    // 스크롤 이벤트 리스너 등록
    container.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 진행률 계산
    const initTimer = setTimeout(() => {
      handleScroll();
    }, 500);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [saveScrollPosition, contentKey]); // contentKey를 의존성에 추가하여 컨텐츠 로드 시 재등록

  // 초기 진행률 계산 (컨텐츠 로드 후)
  useEffect(() => {
    if (!scrollContainerRef?.current) return;

    const calculateInitialProgress = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollHeight = container.scrollHeight - container.clientHeight;
      const currentPos = container.scrollTop || 0;
      
      const currentProgress = scrollHeight > 0 
        ? Math.min(100, Math.max(0, (currentPos / scrollHeight) * 100))
        : 0;
      
      lastProgressRef.current = currentProgress;
      setProgress(currentProgress);
    };

    // DOM이 렌더링되고 컨텐츠가 로드된 후 실행
    const timer = setTimeout(calculateInitialProgress, 300);
    
    // 컨텐츠 크기 변경 감지 (이미지 로드 등)
    const resizeObserver = new ResizeObserver(() => {
      calculateInitialProgress();
    });
    
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef]);

  return {
    // 설정 값
    fontSize: settings.fontSize,
    theme: settings.theme,
    scrollPos,
    progress, // 진행률 (0-100)

    // 설정 변경 함수
    changeFontSize,
    toggleTheme,

    // 스크롤 위치 수동 저장 (필요시)
    saveScrollPosition,
  };
}

export default useReadingProgress;

