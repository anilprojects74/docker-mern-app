import { useState, useEffect } from 'react';

const GreenLoader = ({
  isLoading = true,
  duration = 3000,
  onComplete = () => {},
  size = 'medium',
  showProgress = true,
  message = 'Loading...'
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(isLoading);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  useEffect(() => {
    setIsVisible(isLoading);
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 15 + 5;
          const newProgress = Math.min(prev + increment, 100);

          if (newProgress >= 100) {
            clearInterval(interval);
            setIsVisible(false);      // ❗ no delay
            onComplete();             // ❗ call onComplete immediately
          }

          return newProgress;
        });
      }, duration / 20);

      return () => clearInterval(interval);
    }
  }, [isLoading, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center relative">
        <div className="relative flex justify-center mb-6">
          {/* Outer spinner */}
          <div className={`${sizeClasses[size]} border-4 border-green-200 border-t-green-500 rounded-full animate-spin`}>
            <div className="absolute inset-2 border-2 border-green-300 border-b-green-600 rounded-full animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '5s' }}>
            </div>
          </div>

          {/* Center pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        <h3 className={`${textSizeClasses[size]} font-medium text-gray-800 mb-2`}>
          {message}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Please wait while we load your content</p>

        {showProgress && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium text-green-600">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Decorative bounce dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};

export default GreenLoader;
