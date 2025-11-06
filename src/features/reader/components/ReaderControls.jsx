import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ControlsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  background-color: ${props => props.theme === 'dark' ? '#373330' : '#fefbf2'};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px 13px 20px;
  box-sizing: border-box;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '35px'};
  height: ${props => props.size || '35px'};
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:active {
    opacity: 0.5;
  }
  
  &:focus {
    outline: none;
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BackButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-bottom: 8px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:active {
    opacity: 0.5;
  }
  
  &:focus {
    outline: none;
  }
`;

const BackButtonImage = styled.img`
  width: 11px;
  height: 16px;
  object-fit: contain;
`;

const FontSizeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 7px;
  background: ${props => props.theme === 'dark' ? '#4D4742' : 'white'};
  border-radius: 17.5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const FontSizeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  
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

const FontSizeButtonMinus = styled(FontSizeButton)`
  width: 12px;
  height: 2.5px;
`;

const FontSizeIcon = styled.img`
  width: 15.37px;
  height: 11.41px;
  opacity: 0.6;
`;

const FontSizeButtonPlus = styled(FontSizeButton)`
  width: 12px;
  height: 12px;
`;

const ThemeButton = styled(IconButton)`
  width: 35px;
  height: 35px;
  padding: 7px;
  border-radius: 17.5px;
  background: ${props => props.theme === 'dark' ? '#6F665F' : 'white'};
`;

/**
 * ReaderControls 컴포넌트
 * 읽기 페이지 상단에 고정되는 컨트롤 바
 * 
 * @param {string} theme - 테마 ('light' | 'dark')
 * @param {function} onBack - 뒤로 가기 핸들러
 * @param {function} onChangeFontSize - 폰트 크기 변경 핸들러
 * @param {function} onToggleTheme - 테마 전환 핸들러
 */
function ReaderControls({ 
  theme = 'light',
  onBack,
  onChangeFontSize,
  onToggleTheme
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleFontSizeChange = (delta) => {
    if (onChangeFontSize) {
      onChangeFontSize(delta);
    }
  };

  return (
    <ControlsWrapper theme={theme}>
      <LeftSection>
        <BackButtonContainer onClick={handleBack} aria-label="뒤로 가기">
          <BackButtonImage src="/assets/back_btn.svg" alt="뒤로 가기" />
        </BackButtonContainer>
      </LeftSection>

      <RightSection>
        <div style={{ width: '95px', height: '35px' }}>
          <FontSizeContainer theme={theme}>
            <FontSizeButtonMinus 
              onClick={(e) => {
                e.stopPropagation();
                handleFontSizeChange(-10);
              }}
              aria-label="폰트 크기 감소"
            >
              <IconImage 
                src={theme === 'dark' ? '/assets/font_reduce_dark.svg' : '/assets/font_reduce_light.svg'} 
                alt="폰트 크기 감소"
              />
            </FontSizeButtonMinus>
            <FontSizeIcon src="/assets/font_size_icon.svg" alt="폰트 크기" />
            <FontSizeButtonPlus 
              onClick={(e) => {
                e.stopPropagation();
                handleFontSizeChange(10);
              }}
              aria-label="폰트 크기 증가"
            >
              <IconImage 
                src={theme === 'dark' ? '/assets/font_increase_dark.svg' : '/assets/font_increase_light.svg'} 
                alt="폰트 크기 증가"
              />
            </FontSizeButtonPlus>
          </FontSizeContainer>
        </div>
        
        <ThemeButton theme={theme} onClick={onToggleTheme} aria-label="테마 전환">
          <IconImage 
            src={theme === 'dark' ? '/assets/mode_change_dark.svg' : '/assets/mode_change_light.svg'} 
            alt="테마 전환"
          />
        </ThemeButton>
      </RightSection>

    </ControlsWrapper>
  );
}

export default ReaderControls;

