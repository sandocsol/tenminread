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
  left: calc(50% - 168.5px); /* background의 왼쪽 끝 위치 (337/2 = 168.5) */
  width: ${props => {
    // 완료된 문제 수 = currentStep - 1 (현재 진행 중인 문제는 아직 완료되지 않음)
    // 첫 번째 문제: 0개 완료 → 6px (최소값)
    // 마지막 문제: 4개 완료 → 269.6px (한 칸 남음)
    const completedSteps = Math.max(0, props.currentStep - 1);
    const progress = (completedSteps / props.totalSteps) * 337;
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
  transition: width 0.3s ease;
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

