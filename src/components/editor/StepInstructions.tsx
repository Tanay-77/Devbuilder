import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, BookOpen, Target, Lightbulb, X } from 'lucide-react';
import { ProjectStep } from '../../types';

interface StepInstructionsProps {
  step: ProjectStep;
  stepNumber: number;
  totalSteps: number;
  onSubmit: () => void;
  isValidating: boolean;
  validationErrors?: string[];
  showHints?: boolean;
  onDismissHints?: () => void;
}

const StepInstructions: React.FC<StepInstructionsProps> = ({
  step,
  stepNumber,
  totalSteps,
  onSubmit,
  isValidating,
  validationErrors = [],
  showHints = false,
  onDismissHints
}) => {
  const progress = (stepNumber / totalSteps) * 100;
  const [showAllHints, setShowAllHints] = useState(false);

  const getHintsForStep = (stepId: string): string[] => {
    const hints: Record<string, string[]> = {
      'step-1': [
        'Start with <!DOCTYPE html> at the very beginning',
        'Make sure to include <meta charset="UTF-8"> in the head',
        'Add viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        'Link your CSS file with: <link rel="stylesheet" href="style.css">',
        'Use semantic HTML5 elements: <header>, <main>, <footer>'
      ],
      'step-2': [
        'Put your header content inside the <header> tags',
        'Use <h1> for your name/logo - it should be the main heading',
        'Wrap navigation links in a <nav> element',
        'Use anchor tags <a> for navigation links',
        'Make sure href attributes start with # for internal links'
      ],
      'step-3': [
        'Create a <section> element with class="hero" and id="home"',
        'Use <h1> for your main headline (or <h2> if you used <h1> in header)',
        'Add a paragraph <p> with your description',
        'Include a call-to-action button or link',
        'Make sure the section is inside the <main> element'
      ]
    };
    
    return hints[stepId] || [
      'Check the validation rules above for specific requirements',
      'Make sure your HTML is properly structured',
      'Verify all required elements are present',
      'Check that class names and IDs match exactly'
    ];
  };

  const stepHints = getHintsForStep(step.id);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            Step {stepNumber} of {totalSteps}
          </span>
          <div className="text-sm text-gray-500">
            {Math.round(progress)}% Complete
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {step.title}
        </h2>
        <p className="text-gray-600">
          {step.description}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Instructions</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                {step.instructions}
              </pre>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Target className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Success Criteria</h3>
          </div>
          <ul className="space-y-2">
            {step.validationRules.map((rule, index) => (
              <li key={index} className="flex items-start">
                <Circle className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <X className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-medium text-red-900">Issues Found</h3>
              </div>
              <ul className="space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hints Section */}
        {(showHints || validationErrors.length > 0) && (
          <div className="mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-medium text-yellow-900">Helpful Hints</h3>
                </div>
                {onDismissHints && (
                  <button
                    onClick={onDismissHints}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {stepHints.slice(0, showAllHints ? stepHints.length : 3).map((hint, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-yellow-800">{hint}</span>
                  </div>
                ))}
              </div>
              
              {stepHints.length > 3 && (
                <button
                  onClick={() => setShowAllHints(!showAllHints)}
                  className="mt-3 text-sm text-yellow-700 hover:text-yellow-900 font-medium"
                >
                  {showAllHints ? 'Show Less' : `Show ${stepHints.length - 3} More Hints`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onSubmit}
          disabled={isValidating}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isValidating ? (
            'Validating...'
          ) : (
            <>
              Submit & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepInstructions;