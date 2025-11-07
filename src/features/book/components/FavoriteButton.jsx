import styled from 'styled-components';

const FavoriteButtonContainer = styled.button`
  width: 40px;
  height: 39px;
  padding: 8px 11px;
  background-color: ${props => props.$isFavorited ? '#FFFFFF' : '#E6DDCE'};
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
  }
`;

const BookmarkIconWrapper = styled.div`
  width: 20px;
  height: 25px;
  position: relative;
  opacity: ${props => props.$isFavorited ? 1 : 0.2};
  transition: opacity 0.2s ease;
`;

const BookmarkIcon = styled.div`
  width: 20px;
  height: 25px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${props => props.$isFavorited ? 0.6 : 0.8};
  
  svg {
    width: 100%;
    height: 100%;
    
    path {
      fill: ${props => props.$isFavorited ? '#F6C650' : 'none'};
      stroke: ${props => props.$isFavorited ? 'none' : '#2E2A27'};
      stroke-width: ${props => props.$isFavorited ? '0' : '1.6px'};
      transition: all 0.2s ease;
    }
  }
`;

/**
 * FavoriteButton 컴포넌트
 * 북마크(즐겨찾기) 아이콘 UI
 * 
 * @param {boolean} isFavorited - 현재 즐겨찾기 상태
 * @param {function} onToggle - 클릭 시 실행할 함수
 */
function FavoriteButton({ isFavorited = false, onToggle }) {
  return (
    <FavoriteButtonContainer onClick={onToggle} aria-label="즐겨찾기" $isFavorited={isFavorited}>
      <BookmarkIconWrapper $isFavorited={isFavorited}>
        <BookmarkIcon $isFavorited={isFavorited}>
          <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M1 8.25526C1 4.83562 1 3.12458 1.879 2.0629C2.757 1 4.172 1 7 1H11C13.828 1 15.243 1 16.121 2.0629C17 3.12458 17 4.83562 17 8.25526V16.5118C17 19.7561 17 21.3776 16.156 21.8746C15.311 22.3704 14.256 21.3679 12.146 19.3643L11.471 18.7222C10.285 17.5952 9.691 17.0317 9 17.0317C8.309 17.0317 7.715 17.5952 6.529 18.7222L5.853 19.3631C3.743 21.3679 2.689 22.3704 1.844 21.8746C1 21.3788 1 19.7549 1 16.5118V8.25526Z" 
            />
          </svg>
        </BookmarkIcon>
      </BookmarkIconWrapper>
    </FavoriteButtonContainer>
  );
}

export default FavoriteButton;

