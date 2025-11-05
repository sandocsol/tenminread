import styled from 'styled-components';

const StyledButton = styled.button`
  width: ${props => props.fullWidth ? '100%' : props.width || 'auto'};
  height: ${props => props.height || '50px'};
  padding: ${props => props.padding || '7px 139px'};
  background-color: ${props => {
    if (props.disabled) return '#e0e0e0';
    if (props.variant === 'primary') return '#fdd470';
    if (props.variant === 'secondary') return '#ffffff';
    return props.bgColor || '#fdd470';
  }};
  border: ${props => {
    if (props.variant === 'secondary') return '1px solid #b7b7b7';
    return props.border || 'none';
  }};
  border-radius: ${props => props.borderRadius || '10px'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      if (props.disabled) return '#e0e0e0';
      if (props.variant === 'primary') return '#f5c85a';
      if (props.variant === 'secondary') return '#f9f9f9';
      return props.bgColor || '#f5c85a';
    }};
  }
  
  &:focus {
    outline: none;
  }
`;

const ButtonText = styled.p`
  font-family: ${props => props.fontFamily || "'Pretendard Variable', sans-serif"};
  font-weight: ${props => props.fontWeight || '700'};
  font-size: ${props => props.fontSize || '20px'};
  line-height: ${props => props.lineHeight || '35px'};
  color: ${props => {
    if (props.disabled) return '#9e9e9e';
    if (props.variant === 'secondary') return '#b7b7b7';
    return props.color || '#ffffff';
  }};
  margin: 0;
  white-space: pre;
`;

function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  width,
  height,
  padding,
  borderRadius,
  bgColor,
  border,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  color,
  ...props
}) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      fullWidth={fullWidth}
      width={width}
      height={height}
      padding={padding}
      borderRadius={borderRadius}
      bgColor={bgColor}
      border={border}
      {...props}
    >
      <ButtonText
        disabled={disabled}
        variant={variant}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        lineHeight={lineHeight}
        color={color}
      >
        {children}
      </ButtonText>
    </StyledButton>
  );
}

export default Button;

