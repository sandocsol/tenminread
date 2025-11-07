import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookApi } from '../../../api/bookApi';

function useBookDetail() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [bookTOC, setBookTOC] = useState(null);
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
    isLoading,
    isTOCLoading,
    error,
    isFavorited,
    toggleFavorite,
    fetchBookTOC,
  };
}

export default useBookDetail;

