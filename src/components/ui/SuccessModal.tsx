import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Trophy, Star } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepTitle: string;
  stepNumber: number;
  totalSteps: number;
  isProjectComplete?: boolean;
  onContinue: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  stepTitle,
  stepNumber,
  totalSteps,
  isProjectComplete = false,
  onContinue
}) => {
  // Note: Confetti is now triggered from the parent component (EditorPage)
  // This ensures better timing and control

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-6 py-8 text-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-4 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-6 right-1/3 w-3 h-3 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              {isProjectComplete ? (
                <Trophy className="h-8 w-8 text-yellow-500" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-500" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isProjectComplete ? '🎉 Project Complete!' : '✨ Step Complete!'}
            </h2>
            <p className="text-white opacity-90">
              {isProjectComplete 
                ? 'Congratulations! You\'ve completed the entire project!'
                : `You've successfully completed step ${stepNumber} of ${totalSteps}`
              }
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {stepTitle}
            </h3>
            
            {!isProjectComplete && (
              <div className="flex items-center justify-center space-x-1 mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < stepNumber 
                        ? 'bg-green-500 scale-110' 
                        : i === stepNumber 
                        ? 'bg-blue-500 scale-125 animate-pulse' 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            )}

            {isProjectComplete ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-4 border border-yellow-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-yellow-800">Amazing Work!</span>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-sm text-yellow-700">
                  You've built something incredible! This project is now part of your portfolio.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <p className="text-sm text-blue-700">
                  Great job! You're making excellent progress. Ready for the next challenge?
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onContinue}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isProjectComplete ? 'View Project' : 'Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;