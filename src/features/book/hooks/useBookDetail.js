import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookApi } from '../../../api/bookApi';

function useBookDetail() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [bookTOC, setBookTOC] = useState(null);
  const [readingProgress, setReadingProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTOCLoading, setIsTOCLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setIsLoading(true);
        const data = await bookApi.getBook(bookId);
        setBookData(data);
        // 책 정보에서 즐겨찾기 상태 확인 (API 응답에 포함되어 있다면)
        if (data.isFavorited !== undefined) {
          setIsFavorited(data.isFavorited);
        }
      } catch (err) {
        setError(err);
        console.error('Failed to fetch book data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBookData();
    }
  }, [bookId]);

  // 독서 진행 상황 조회
  useEffect(() => {
    const fetchReadingProgress = async () => {
      try {
        // 방법 1: bookData에 독서 진행 상황이 포함된 경우
        if (bookData?.nextSeq !== undefined) {
          setReadingProgress({
            nextSeq: bookData.nextSeq,
            completedSeqs: bookData.completedSeqs || [],
            currentDay: bookData.day || 1,
            totalDays: bookData.totalDays || 3,
          });
        }
        // 방법 2: 별도 API 호출
        else {
          try {
            const progress = await bookApi.getReadingProgress(bookId);
            setReadingProgress(progress);
          } catch (progressError) {
            // API 호출 실패 시 방법 3 사용 (fallback)
            console.warn('Failed to fetch reading progress from API, using day-based inference:', progressError);
            if (bookData?.day) {
              // day와 seq가 1:1 매핑된다고 가정
              const nextSeq = (bookData.day || 1);
              setReadingProgress({
                nextSeq: nextSeq,
                completedSeqs: Array.from({ length: bookData.day - 1 }, (_, i) => i + 1),
                currentDay: bookData.day || 1,
                totalDays: 3,
              });
            } else {
              // 기본값 사용
              setReadingProgress({
                nextSeq: 1,
                completedSeqs: [],
                currentDay: 1,
                totalDays: 3,
              });
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch reading progress:', err);
        // 에러 발생 시 기본값 사용
        setReadingProgress({
          nextSeq: 1,
          completedSeqs: [],
          currentDay: 1,
          totalDays: 3,
        });
      }
    };

    if (bookId && bookData) {
      fetchReadingProgress();
    }
  }, [bookId, bookData]);

  const fetchBookTOC = async () => {
    if (bookTOC) {
      // 이미 로드된 경우 재요청하지 않음
      return bookTOC;
    }

    try {
      setIsTOCLoading(true);
      const data = await bookApi.getBookIndex(bookId);
      setBookTOC(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch book TOC:', err);
      throw err;
    } finally {
      setIsTOCLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const currentState = isFavorited;
      // 낙관적 업데이트
      setIsFavorited(!currentState);
      
      const response = await bookApi.toggleFavorite(bookId, currentState);
      // API 응답에서 상태 확인 (isFavorited 또는 favorited 필드)
      const newState = response.isFavorited !== undefined 
        ? response.isFavorited 
        : response.favorited !== undefined 
        ? response.favorited 
        : !currentState;
      setIsFavorited(newState);
    } catch (err) {
      // 에러 발생 시 이전 상태로 복구
      setIsFavorited(prev => !prev);
      console.error('Failed to toggle favorite:', err);
    }
  };

  return {
    bookData,
    bookTOC,
    readingProgress,
    isLoading,
    isTOCLoading,
    error,
    isFavorited,
    toggleFavorite,
    fetchBookTOC,
  };
}

export default useBookDetail;

