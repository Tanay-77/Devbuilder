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
    <div className="h-full flex flex-col bg-retro-white">
      <div className="p-6 border-b-2 border-black bg-white">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            Step {stepNumber} of {totalSteps}
          </span>
          <div className="text-sm font-black text-black">
            {Math.round(progress)}% Complete
          </div>
        </div>

        <div className="w-full bg-white border-2 border-black h-4 mb-6 shadow-hard-sm">
          <div
            className="bg-retro-blue h-full border-r-2 border-black transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%`, backgroundColor: '#3b82f6' }}
          >
            {/* Striped pattern overlay could go here */}
          </div>
        </div>

        <h2 className="text-2xl font-black text-black mb-2 uppercase tracking-tight leading-tight">
          {step.title}
        </h2>
        <p className="text-gray-800 font-medium">
          {step.description}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div>
          <div className="flex items-center mb-3">
            <BookOpen className="h-5 w-5 text-black mr-2" />
            <h3 className="text-lg font-black text-black uppercase">Instructions</h3>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="bg-blue-50 p-5 rounded-none border-2 border-black shadow-hard-sm relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 border-r-2 border-black"></div>
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-900 font-medium leading-relaxed pl-2">
                {step.instructions}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-3">
            <Target className="h-5 w-5 text-black mr-2" />
            <h3 className="text-lg font-black text-black uppercase">Success Criteria</h3>
          </div>
          <ul className="space-y-3">
            {step.validationRules.map((rule, index) => (
              <li key={index} className="flex items-start bg-white p-3 border-2 border-black shadow-hard-sm">
                <Circle className="h-4 w-4 text-black mr-2 mt-0.5 flex-shrink-0 fill-current" />
                <span className="text-sm font-bold text-gray-800">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div>
            <div className="bg-red-50 border-2 border-black shadow-hard-sm p-4">
              <div className="flex items-center mb-3">
                <X className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-black text-red-700 uppercase">Issues Found</h3>
              </div>
              <ul className="space-y-2">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm font-bold text-red-800 flex items-start">
                    <span className="mr-2">•</span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hints Section */}
        {(showHints || validationErrors.length > 0) && (
          <div>
            <div className="bg-yellow-50 border-2 border-black shadow-hard-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-black mr-2" />
                  <h3 className="text-lg font-black text-black uppercase">Helpful Hints</h3>
                </div>
                {onDismissHints && (
                  <button
                    onClick={onDismissHints}
                    className="text-black hover:text-gray-600 border-2 border-transparent hover:border-black p-1 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {stepHints.slice(0, showAllHints ? stepHints.length : 3).map((hint, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-black rounded-full mr-3 mt-1.5 flex-shrink-0 border border-black"></div>
                    <span className="text-sm font-medium text-gray-900">{hint}</span>
                  </div>
                ))}
              </div>

              {stepHints.length > 3 && (
                <button
                  onClick={() => setShowAllHints(!showAllHints)}
                  className="mt-4 text-xs font-black text-black uppercase underline decoration-2 underline-offset-2 hover:text-gray-600"
                >
                  {showAllHints ? 'Show Less' : `Show ${stepHints.length - 3} More Hints`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t-2 border-black bg-white">
        <button
          onClick={onSubmit}
          disabled={isValidating}
          className="w-full btn-retro-primary justify-center text-base py-3"
        >
          {isValidating ? (
            'Validating...'
          ) : (
            <>
              Submit & Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepInstructions;