import { useState, useRef, useEffect } from "react";
import * as C from "./styles";

type AuthMode = 'choice' | 'enroll' | 'login';
type EnrollStep = 'input' | 'camera' | 'success';
type LoginStep = 'input' | 'scan' | 'result';

type Props = {
  onAuthSuccess: (userId: string) => void;
};

export const LockScreen = ({ onAuthSuccess }: Props) => {
  const [mode, setMode] = useState<AuthMode>('choice');
  const [enrollStep, setEnrollStep] = useState<EnrollStep>('input');
  const [loginStep, setLoginStep] = useState<LoginStep>('input');
  const [userId, setUserId] = useState('');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      showError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg');
  };

  const handleEnrollSubmit = async () => {
    if (!userId.trim()) {
      showError("Please enter a User ID");
      return;
    }
    setEnrollStep('camera');
    await startCamera();
  };

  const handleCaptureForEnroll = () => {
    const image = captureImage();
    if (image) {
      setCapturedImages([...capturedImages, image]);
      
      if (capturedImages.length >= 2) {
        completeEnrollment([...capturedImages, image]);
      }
    }
  };

  const completeEnrollment = async (images: string[]) => {
    setIsProcessing(true);
    stopCamera();
    
    try {
      const baseUrl = String(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
      const apiUrl = `${baseUrl}/api/enroll`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, images }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.ok) {
        setEnrollStep('success');
      } else {
        throw new Error(data.detail || 'Enrollment failed');
      }
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Enrollment failed');
      resetToChoice();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoginSubmit = async () => {
    if (!userId.trim()) {
      showError("Please enter your User ID");
      return;
    }
    setLoginStep('scan');
    await startCamera();
    setTimeout(() => performScan(), 2000);
  };

  const performScan = async () => {
    const image = captureImage();
    if (!image) return;
    
    setIsProcessing(true);
    stopCamera();
    
    try {
      const baseUrl = String(import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
      const apiUrl = `${baseUrl}/api/verify`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, image }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.match) {
        setVerificationResult(true);
        // Success - unlock the desktop
        setTimeout(() => {
          onAuthSuccess(userId);
        }, 2000);
      } else {
        setVerificationResult(false);
        showError("Face not recognized. Please try again.");
        setTimeout(() => resetToChoice(), 3000);
      }
      setLoginStep('result');
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Login failed');
      resetToChoice();
    } finally {
      setIsProcessing(false);
    }
  };

  const resetToChoice = () => {
    setMode('choice');
    setEnrollStep('input');
    setLoginStep('input');
    setUserId('');
    setCapturedImages([]);
    setVerificationResult(null);
    stopCamera();
  };

  return (
    <C.Container>
      <C.MacBackground />
      <C.TimeDisplay>
        <C.TimeText>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</C.TimeText>
        <C.DateText>{currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</C.DateText>
      </C.TimeDisplay>
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {errorMessage && (
        <C.MacErrorMessage>
          <C.ErrorIcon>⚠️</C.ErrorIcon>
          <span>{errorMessage}</span>
        </C.MacErrorMessage>
      )}
      
      {mode === 'choice' && (
        <C.MacLoginPanel>
          <C.MacAvatar>
            <C.AvatarRing>
              <C.AvatarIcon>👤</C.AvatarIcon>
            </C.AvatarRing>
          </C.MacAvatar>
          
          <C.WelcomeText>Welcome to Face Recognition</C.WelcomeText>
          <C.MacSubtitle>Choose an authentication method</C.MacSubtitle>
          
          <C.MacButtonGroup>
            <C.MacButton onClick={() => setMode('enroll')} variant="primary">
              <C.ButtonIcon>✨</C.ButtonIcon>
              Create New Profile
            </C.MacButton>
            
            <C.MacButton onClick={() => setMode('login')} variant="secondary">
              <C.ButtonIcon>🔓</C.ButtonIcon>
              Sign In
            </C.MacButton>
          </C.MacButtonGroup>
          
          <C.MacFooter>
            <C.FooterText>Protected by Face ID Technology</C.FooterText>
          </C.MacFooter>
        </C.MacLoginPanel>
      )}

      {mode === 'enroll' && (
        <C.AuthFlow>
          {enrollStep === 'input' && (
            <C.Card>
              <C.MacAvatar>
                <C.AvatarRing>
                  <C.AvatarIcon>✨</C.AvatarIcon>
                </C.AvatarRing>
              </C.MacAvatar>
              <C.CardTitle>Create New Profile</C.CardTitle>
              <C.MacSubtitle>Enter your username to get started</C.MacSubtitle>
              <C.InputField
                type="text"
                placeholder="Enter username"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <C.MacButtonGroup>
                <C.MacButton variant="primary" onClick={handleEnrollSubmit}>
                  <C.ButtonIcon>📷</C.ButtonIcon>
                  Continue to Face Setup
                </C.MacButton>
                <C.MacButton variant="secondary" onClick={resetToChoice}>
                  <C.ButtonIcon>←</C.ButtonIcon>
                  Back
                </C.MacButton>
              </C.MacButtonGroup>
            </C.Card>
          )}

          {enrollStep === 'camera' && (
            <C.Card>
              <C.CardTitle>Face Recognition Setup</C.CardTitle>
              <C.MacSubtitle>Position your face in the center and capture {capturedImages.length + 1} of 3 images</C.MacSubtitle>
              <C.CameraFrame>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }}
                />
                {isProcessing && (
                  <C.LoadingOverlay>
                    <C.Spinner />
                  </C.LoadingOverlay>
                )}
              </C.CameraFrame>
              <C.CameraInfo>
                Image {capturedImages.length + 1} of 3 • Hold steady and look directly at the camera
              </C.CameraInfo>
              <C.MacButtonGroup>
                <C.MacButton 
                  variant="primary"
                  onClick={handleCaptureForEnroll} 
                  disabled={isProcessing}
                >
                  <C.ButtonIcon>📸</C.ButtonIcon>
                  {isProcessing ? 'Processing...' : 'Capture Image'}
                </C.MacButton>
              </C.MacButtonGroup>
            </C.Card>
          )}

          {enrollStep === 'success' && (
            <C.Card>
              <C.SuccessIcon>✅</C.SuccessIcon>
              <C.CardTitle>Profile Created Successfully!</C.CardTitle>
              <C.MacSubtitle>Your face profile has been securely stored</C.MacSubtitle>
              <C.UserId>Profile ID: {userId}</C.UserId>
              <C.MacButtonGroup>
                <C.MacButton variant="primary" onClick={resetToChoice}>
                  <C.ButtonIcon>🚀</C.ButtonIcon>
                  Continue to Login
                </C.MacButton>
              </C.MacButtonGroup>
            </C.Card>
          )}
        </C.AuthFlow>
      )}

      {mode === 'login' && (
        <C.AuthFlow>
          {loginStep === 'input' && (
            <C.Card>
              <C.MacAvatar>
                <C.AvatarRing>
                  <C.AvatarIcon>👨‍💻</C.AvatarIcon>
                </C.AvatarRing>
              </C.MacAvatar>
              <C.CardTitle>Welcome Back</C.CardTitle>
              <C.MacSubtitle>Enter your username to sign in with Face ID</C.MacSubtitle>
              <C.InputField
                type="text"
                placeholder="Username"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <C.MacButtonGroup>
                <C.MacButton variant="primary" onClick={handleLoginSubmit}>
                  <C.ButtonIcon>🔍</C.ButtonIcon>
                  Authenticate with Face ID
                </C.MacButton>
                <C.MacButton variant="secondary" onClick={resetToChoice}>
                  <C.ButtonIcon>←</C.ButtonIcon>
                  Back
                </C.MacButton>
              </C.MacButtonGroup>
            </C.Card>
          )}

          {loginStep === 'scan' && (
            <C.Card>
              <C.CardTitle>Face ID Authentication</C.CardTitle>
              <C.MacSubtitle>Look directly at the camera</C.MacSubtitle>
              <C.CameraFrame>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }}
                />
                <C.ScannerLine />
                {isProcessing && (
                  <C.LoadingOverlay>
                    <C.Spinner />
                  </C.LoadingOverlay>
                )}
              </C.CameraFrame>
              <C.CameraInfo>
                🔒 Analyzing facial features...
              </C.CameraInfo>
            </C.Card>
          )}

          {loginStep === 'result' && (
            <C.Card>
              {verificationResult ? (
                <>
                  <C.SuccessIcon>✅</C.SuccessIcon>
                  <C.CardTitle>Authentication Successful</C.CardTitle>
                  <C.WelcomeMessage>
                    Welcome back, {userId}
                  </C.WelcomeMessage>
                  <C.UnlockMessage>🚀 Unlocking your desktop...</C.UnlockMessage>
                </>
              ) : (
                <>
                  <C.MacErrorIcon>❌</C.MacErrorIcon>
                  <C.CardTitle>Authentication Failed</C.CardTitle>
                  <C.ErrorText>
                    Face ID didn't recognize you. Please position your face clearly in the frame and try again.
                  </C.ErrorText>
                  <C.MacButtonGroup>
                    <C.MacButton variant="primary" onClick={resetToChoice}>
                      <C.ButtonIcon>🔄</C.ButtonIcon>
                      Try Again
                    </C.MacButton>
                  </C.MacButtonGroup>
                </>
              )}
            </C.Card>
          )}
        </C.AuthFlow>
      )}
    </C.Container>
  );
};