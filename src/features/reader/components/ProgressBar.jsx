import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: ${props => props.theme === 'dark' ? '#373330' : '#fefbf2'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 393px;
  height: 12px;
`;

const ProgressBarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: ${props => props.theme === 'dark' ? '#454545' : '#e6e6e6'};
  border-radius: 0;
`;

const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => Math.max(0, Math.min(100, props.progress))}%;
  height: 12px;
  border-radius: 0 5px 5px 0;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, rgba(255, 202, 88, 1) 0%, rgba(255, 220, 74, 1) 2.88%, rgba(255, 198, 114, 1) 37.98%, rgba(255, 176, 153, 1) 73.08%)'
    : 'linear-gradient(135deg, rgba(255, 208, 108, 1) 0%, rgba(255, 226, 105, 1) 2.88%, rgba(255, 211, 142, 1) 37.98%, rgba(255, 197, 179, 1) 73.08%)'
  };
  transition: width 0.2s ease;
`;

/**
 * ProgressBar 컴포넌트
 * 스크롤 진행률을 표시하는 진행 바
 * 
 * @param {number} progress - 진행률 (0-100)
 * @param {string} theme - 테마 ('light' | 'dark')
 */
function ProgressBar({ progress = 0, theme = 'light' }) {
  return (
    <ProgressBarWrapper theme={theme}>
      <ProgressBarContainer>
        <ProgressBarBackground theme={theme} />
        <ProgressBarFill progress={progress} theme={theme} />
      </ProgressBarContainer>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;

