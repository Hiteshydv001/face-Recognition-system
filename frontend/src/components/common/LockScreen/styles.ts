import styled, { keyframes } from "styled-components";

const macFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const macPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const macSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const macScannerAnimation = keyframes`
  0% { top: 10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
`;

const macGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 122, 255, 0.6);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: 
    linear-gradient(135deg, 
      #1a0b2e 0%, 
      #2d1b69 20%, 
      #4a1b7a 40%,
      #6a3093 60%,
      #a044ff 80%,
      #7209b7 100%
    );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow: hidden;
`;

export const MacBackground = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(106, 48, 147, 0.3) 0%, transparent 60%),
    radial-gradient(circle at 80% 20%, rgba(160, 68, 255, 0.2) 0%, transparent 60%),
    radial-gradient(circle at 40% 40%, rgba(114, 9, 183, 0.15) 0%, transparent 60%),
    radial-gradient(circle at 60% 70%, rgba(45, 27, 105, 0.1) 0%, transparent 50%);
  backdrop-filter: blur(100px) saturate(130%);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(26, 11, 46, 0.1);
    backdrop-filter: blur(2px);
  }
`;

export const TimeDisplay = styled.div`
  position: absolute;
  top: 80px;
  text-align: center;
  color: white;
  z-index: 2;
`;

export const TimeText = styled.h1`
  font-size: 6rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -2px;
`;

export const DateText = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

export const MacErrorMessage = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 69, 58, 0.95);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 500;
  z-index: 1000;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(255, 69, 58, 0.3);
  animation: ${macFadeIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    font-size: 14px;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 16px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;

export const MacLoginPanel = styled.div`
  text-align: center;
  z-index: 1;
  animation: ${macFadeIn} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-width: 400px;
  position: relative;
`;

export const MacAvatar = styled.div`
  margin-bottom: 24px;
`;

export const AvatarRing = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(114, 9, 183, 0.9) 0%, 
    rgba(106, 48, 147, 0.9) 50%, 
    rgba(160, 68, 255, 0.9) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  box-shadow: 
    0 0 40px rgba(160, 68, 255, 0.4),
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, 
      rgba(114, 9, 183, 0.4) 0%, 
      rgba(106, 48, 147, 0.4) 50%, 
      rgba(160, 68, 255, 0.4) 100%
    );
    z-index: -1;
    filter: blur(12px);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

export const AvatarIcon = styled.div`
  font-size: 40px;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const WelcomeText = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: white;
  margin-bottom: 6px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.3px;
`;

export const MacSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 32px;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

export const MacButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const MacButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => 
    props.variant === 'primary' 
      ? 'linear-gradient(135deg, rgba(114, 9, 183, 0.9), rgba(160, 68, 255, 0.9))'
      : 'rgba(255, 255, 255, 0.08)'
  };
  color: white;
  border: ${props => 
    props.variant === 'primary' 
      ? '1px solid rgba(160, 68, 255, 0.4)'
      : '1px solid rgba(255, 255, 255, 0.12)'
  };
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: ${props => 
    props.variant === 'primary' 
      ? '0 8px 32px rgba(160, 68, 255, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'
  };
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${props => 
      props.variant === 'primary' 
        ? '0 12px 40px rgba(160, 68, 255, 0.5)'
        : '0 8px 30px rgba(0, 0, 0, 0.15)'
    };
    background: ${props => 
      props.variant === 'primary' 
        ? 'linear-gradient(135deg, rgba(114, 9, 183, 1), rgba(160, 68, 255, 1))'
        : 'rgba(255, 255, 255, 0.12)'
    };
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;

export const MacFooter = styled.div`
  margin-top: 20px;
`;

export const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  font-weight: 300;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  
  &::before {
    content: '🛡️';
    font-size: 12px;
  }
`;

export const AuthChoice = styled.div`
  text-align: center;
  z-index: 1;
  animation: ${macFadeIn} 0.6s ease-out;
  max-width: 500px;
  margin: 0 auto;
`;

export const AuthFlow = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  z-index: 1;
  animation: ${macFadeIn} 0.6s ease-out;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
  font-size: 1.1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, rgba(114, 9, 183, 0.9), rgba(160, 68, 255, 0.9));
  color: white;
  border: 1px solid rgba(160, 68, 255, 0.4);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 8px 32px rgba(160, 68, 255, 0.3);
  min-width: 160px;
  backdrop-filter: blur(20px);
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 40px rgba(160, 68, 255, 0.5);
    background: linear-gradient(135deg, rgba(114, 9, 183, 1), rgba(160, 68, 255, 1));
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(20px);
  min-width: 160px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
`;

export const Card = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

export const CardTitle = styled.h2`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 20px;
  color: white;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
`;

export const InputField = styled.input`
  width: 280px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 16px;
  backdrop-filter: blur(15px);
  transition: all 0.2s ease;
  box-sizing: border-box;
  text-align: center;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(160, 68, 255, 0.7);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(160, 68, 255, 0.2);
  }
`;

export const CameraFrame = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(160, 68, 255, 0.5);
  box-shadow: 
    0 0 30px rgba(160, 68, 255, 0.4),
    0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  background: rgba(26, 11, 46, 0.3);
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid rgba(160, 68, 255, 0.9);
  border-radius: 50%;
  animation: ${macSpin} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
`;

export const ScannerLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(160, 68, 255, 0.9), transparent);
  box-shadow: 
    0 0 20px rgba(160, 68, 255, 0.8),
    0 0 40px rgba(114, 9, 183, 0.5);
  animation: ${macScannerAnimation} 2.5s ease-in-out infinite;
  filter: blur(0.5px);
`;

export const CameraInfo = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
`;

export const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: ${macPulse} 2s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(52, 199, 89, 0.4));
`;

export const MacErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  animation: ${macPulse} 2s ease-in-out infinite;
  filter: drop-shadow(0 4px 12px rgba(255, 69, 58, 0.4));
`;

export const UserId = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  background: rgba(160, 68, 255, 0.2);
  padding: 12px 20px;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid rgba(160, 68, 255, 0.4);
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const WelcomeMessage = styled.p`
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
`;

export const UnlockMessage = styled.p`
  color: rgba(52, 199, 89, 0.9);
  font-size: 16px;
  font-weight: 500;
  font-style: italic;
  animation: ${macPulse} 1.5s ease-in-out infinite;
`;

export const ErrorText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.4;
`;