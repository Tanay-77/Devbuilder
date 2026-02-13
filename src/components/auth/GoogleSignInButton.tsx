import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  disabled?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSuccess, disabled }) => {
  const { loginWithGoogle, isLoading, error } = useAuth();
  const [isAttempting, setIsAttempting] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      console.log('🔘 Google sign-in button clicked');
      setIsAttempting(true);

      const success = await loginWithGoogle();
      console.log('📊 Google sign-in result:', success);

      if (success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('🔘 Google sign-in button error:', error);
    } finally {
      setIsAttempting(false);
    }
  };

  const isButtonDisabled = disabled || isLoading || isAttempting;

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isButtonDisabled}
        className="w-full flex items-center justify-center px-4 py-3 bg-white text-black font-bold border-2 border-black shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-hard"
      >
        <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="truncate uppercase tracking-wide">
          {isAttempting ? 'Connecting...' : isLoading ? 'Signing in...' : 'Continue with Google'}
        </span>
      </button>

      {/* Enhanced debug information */}
      {import.meta.env.DEV && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs space-y-1">
          <div className="font-medium text-gray-700">Debug Info:</div>
          <div className="text-gray-600">
            <div>🌐 Domain: {window.location.hostname}</div>
            <div>🔗 Origin: {window.location.origin}</div>
            <div>📱 User Agent: {navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}</div>
            <div>🪟 In iframe: {window.self !== window.top ? 'Yes' : 'No'}</div>
            {error && <div className="text-red-600 mt-1">❌ Error: {error}</div>}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-gray-500 text-xs">
              If Google login fails, check:
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>Pop-ups are allowed</li>
                <li>Domain is in Firebase authorized domains</li>
                <li>Google OAuth is enabled in Firebase</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSignInButton;