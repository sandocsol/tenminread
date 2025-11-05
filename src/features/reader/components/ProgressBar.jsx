import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  position: relative;
  width: 337px;
  height: 14px;
`;

const ProgressBarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 337px;
  height: 14px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 165.5px);
  transform: translateX(-50%);
  width: ${props => {
    const progress = (props.currentStep / props.totalSteps) * 337;
    return Math.max(6, Math.min(progress, 337)); // 최소 6px, 최대 337px
  }}px;
  height: 14px;
  border-radius: 5px;
  background: linear-gradient(
    135deg,
    rgba(255, 208, 108, 1) 0%,
    rgba(255, 226, 105, 1) 2.88%,
    rgba(255, 211, 142, 1) 51.44%,
    rgba(255, 197, 179, 1) 100%
  );
`;

function ProgressBar({ currentStep, totalSteps }) {
  return (
    <ProgressBarContainer>
      <ProgressBarBackground />
      <ProgressBarFill currentStep={currentStep} totalSteps={totalSteps} />
    </ProgressBarContainer>
  );
}

export default ProgressBar;

