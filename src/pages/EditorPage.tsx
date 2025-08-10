import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../contexts/AuthContext';
import { getStepCode } from '../services/firestoreService';
import { triggerFirecrackerConfetti, triggerProjectCompletionCelebration } from '../utils/confetti';
import CodeEditor from '../components/editor/CodeEditor';
import PreviewPane from '../components/editor/PreviewPane';
import StepInstructions from '../components/editor/StepInstructions';
import SuccessModal from '../components/ui/SuccessModal';

const EditorPage: React.FC = () => {
  const { projectId, stepNumber } = useParams<{ projectId: string; stepNumber: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProgress, completeProject } = useProgress();
  
  const project = projects.find(p => p.id === projectId);
  const currentStepIndex = parseInt(stepNumber || '1') - 1;
  const currentStep = project?.steps[currentStepIndex];
  
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [javascript, setJavascript] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProjectComplete, setIsProjectComplete] = useState(false);

  // Load saved code or starting code
  useEffect(() => {
    const loadCode = async () => {
      if (!currentStep || !user) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to load saved code first
        const savedCode = await getStepCode(user.id, projectId!, currentStep.id);
        
        if (savedCode) {
          setHtml(savedCode.html);
          setCss(savedCode.css);
          setJavascript(savedCode.javascript);
        } else {
          // Use starting code if no saved code
          setHtml(currentStep.startingCode.html);
          setCss(currentStep.startingCode.css);
          setJavascript(currentStep.startingCode.javascript);
        }
      } catch (error) {
        console.error('Error loading code:', error);
        // Fallback to starting code
        setHtml(currentStep.startingCode.html);
        setCss(currentStep.startingCode.css);
        setJavascript(currentStep.startingCode.javascript);
      } finally {
        setIsLoading(false);
      }
    };

    loadCode();
  }, [currentStep, user, projectId]);

  // Validation function for different steps
  const validateStep = (stepId: string, html: string, css: string, javascript: string): string[] => {
    const errors: string[] = [];
    
    switch (stepId) {
      case 'step-1':
        if (!html.includes('<!DOCTYPE html>')) {
          errors.push('Missing DOCTYPE declaration at the beginning');
        }
        if (!html.includes('<html')) {
          errors.push('Missing <html> element');
        }
        if (!html.includes('<head>')) {
          errors.push('Missing <head> section');
        }
        if (!html.includes('<meta charset="UTF-8">')) {
          errors.push('Missing charset meta tag');
        }
        if (!html.includes('viewport')) {
          errors.push('Missing viewport meta tag');
        }
        if (!html.includes('<title>')) {
          errors.push('Missing <title> element');
        }
        if (!html.includes('<header>')) {
          errors.push('Missing <header> element');
        }
        if (!html.includes('<main>')) {
          errors.push('Missing <main> element');
        }
        if (!html.includes('<footer>')) {
          errors.push('Missing <footer> element');
        }
        break;
        
      case 'step-2':
        if (!html.includes('<nav>')) {
          errors.push('Missing <nav> element inside header');
        }
        if (!html.includes('href="#home"')) {
          errors.push('Missing Home navigation link (href="#home")');
        }
        if (!html.includes('href="#about"')) {
          errors.push('Missing About navigation link (href="#about")');
        }
        if (!html.includes('href="#contact"')) {
          errors.push('Missing Contact navigation link (href="#contact")');
        }
        const headerContent = html.match(/<header[^>]*>(.*?)<\/header>/s);
        if (headerContent && !headerContent[1].includes('<h1>')) {
          errors.push('Missing name/logo in header (use <h1> element)');
        }
        break;
        
      case 'step-3':
        if (!html.includes('class="hero"')) {
          errors.push('Missing section with class="hero"');
        }
        if (!html.includes('id="home"')) {
          errors.push('Missing id="home" on hero section');
        }
        const heroSection = html.match(/<section[^>]*class="hero"[^>]*>(.*?)<\/section>/s);
        if (heroSection) {
          if (!heroSection[1].includes('<h1>') && !heroSection[1].includes('<h2>')) {
            errors.push('Missing headline in hero section (use <h1> or <h2>)');
          }
          if (!heroSection[1].includes('<p>')) {
            errors.push('Missing description paragraph in hero section');
          }
          if (!heroSection[1].includes('<a') && !heroSection[1].includes('<button')) {
            errors.push('Missing call-to-action button or link in hero section');
          }
        } else {
          errors.push('Hero section not found or incorrectly structured');
        }
        break;
        
      default:
        // For JavaScript counter project and other steps
        if (stepId.includes('step-1') && projectId === 'number-counter') {
          if (!html.includes('<!DOCTYPE html>')) {
            errors.push('Missing DOCTYPE declaration');
          }
          if (!html.includes('counter-container')) {
            errors.push('Missing div with class "counter-container"');
          }
        } else if (stepId.includes('step-2') && projectId === 'number-counter') {
          if (!html.includes('id="count"')) {
            errors.push('Missing element with id "count"');
          }
          if (!html.includes('id="increase"')) {
            errors.push('Missing button with id "increase"');
          }
          if (!html.includes('id="decrease"')) {
            errors.push('Missing button with id "decrease"');
          }
        } else if (stepId.includes('step-3') && projectId === 'number-counter') {
          if (!css.includes('flexbox') && !css.includes('flex')) {
            errors.push('Use flexbox to center the counter (add display: flex to body)');
          }
          if (!css.includes('min-height') && !css.includes('100vh')) {
            errors.push('Set minimum height to full viewport (min-height: 100vh)');
          }
        } else if (stepId.includes('step-4') && projectId === 'number-counter') {
          if (!javascript.includes('getElementById')) {
            errors.push('Use getElementById to select DOM elements');
          }
          if (!javascript.includes('count') || !javascript.includes('increase') || !javascript.includes('decrease')) {
            errors.push('Select all required elements: count display, increase button, decrease button');
          }
        } else if (stepId.includes('step-5') && projectId === 'number-counter') {
          if (!javascript.includes('let') && !javascript.includes('var')) {
            errors.push('Create a counter variable to track the current value');
          }
          if (!javascript.includes('function') && !javascript.includes('=>')) {
            errors.push('Create a function to update the display');
          }
        } else if (stepId.includes('step-6') && projectId === 'number-counter') {
          if (!javascript.includes('addEventListener')) {
            errors.push('Add event listeners to both buttons using addEventListener');
          }
          if (!javascript.includes('click')) {
            errors.push('Listen for click events on the buttons');
          }
        } else if (stepId.includes('step-7') && projectId === 'number-counter') {
          if (!html.includes('id="reset"')) {
            errors.push('Add a reset button with id="reset"');
          }
          if (!javascript.includes('reset')) {
            errors.push('Add event listener for the reset button');
          }
        } else {
          // Generic validation for other steps
          if (!html.trim() && !css.trim() && !javascript.trim()) {
            errors.push('Please add some code to continue');
          }
        }
    }
    
    return errors;
  };

  if (!project || !currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project or step not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!user) {
      setValidationErrors(['Please log in to save your progress.']);
      return;
    }
    
    setIsValidating(true);
    setValidationErrors([]);
    
    try {
      // Validate the current step
      const errors = validateStep(currentStep.id, html, css, javascript);
      
      if (errors.length > 0) {
        setValidationErrors(errors);
        setShowHints(true);
        setIsValidating(false);
        return;
      }
      
      // If validation passes, update progress
      console.log('Submitting step:', { projectId, stepId: currentStep.id, userId: user.id });
      await updateProgress(projectId!, currentStep.id, { html, css, javascript });
      
      // Check if this is the last step
      const nextStepNumber = currentStepIndex + 2;
      const isLastStep = nextStepNumber > project.steps.length;
      
      if (isLastStep) {
        // Mark project as completed
        await completeProject(projectId!);
        setIsProjectComplete(true);
        
        // Show success modal first, then trigger confetti
        setShowSuccessModal(true);
        
        // Trigger project completion celebration after a short delay
        setTimeout(async () => {
          console.log('🎉 Triggering project completion celebration!');
          try {
            await triggerProjectCompletionCelebration();
          } catch (error) {
            console.warn('Confetti animation failed:', error);
          }
        }, 1500);
      } else {
        // Show success modal first, then trigger confetti
        setShowSuccessModal(true);
        
        // Trigger step completion confetti after a short delay
        setTimeout(async () => {
          console.log('🎊 Triggering step completion confetti!');
          try {
            await triggerFirecrackerConfetti();
          } catch (error) {
            console.warn('Confetti animation failed:', error);
          }
        }, 1500);
      }
      
    } catch (error) {
      console.error('Error submitting step:', error);
      
      // Provide more helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('permission-denied')) {
          setValidationErrors(['Permission denied. Please try logging out and back in.']);
        } else if (error.message.includes('network') || error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
          setValidationErrors(['Network error or connection blocked. Please check your internet connection and disable any ad blockers, then try again.']);
        } else if (error.message.includes('unavailable')) {
          setValidationErrors(['Service temporarily unavailable. Please try again in a moment.']);
        } else {
          setValidationErrors([error.message || 'An error occurred while saving your progress. Please try again.']);
        }
      } else {
        setValidationErrors(['An unexpected error occurred. Please try again.']);
      }
    } finally {
      setIsValidating(false);
    }
  };

  const handleSuccessModalContinue = () => {
    setShowSuccessModal(false);
    
    if (isProjectComplete) {
      // Navigate to project detail page
      navigate(`/projects/${projectId}`);
    } else {
      // Navigate to next step
      const nextStepNumber = currentStepIndex + 2;
      navigate(`/editor/${projectId}/${nextStepNumber}`);
    }
  };

  const handleReset = () => {
    setHtml(currentStep.startingCode.html);
    setCss(currentStep.startingCode.css);
    setJavascript(currentStep.startingCode.javascript);
    setValidationErrors([]);
    setShowHints(false);
  };

  const handleRun = () => {
    // Code is automatically updated in the preview pane
    // Clear any previous validation errors when user runs code
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/projects/${projectId}`)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h1>
              <p className="text-sm text-gray-600">
                Step {currentStepIndex + 1}: {currentStep.title}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="w-1/3 border-r border-gray-200">
          <StepInstructions
            step={currentStep}
            stepNumber={currentStepIndex + 1}
            totalSteps={project.steps.length}
            onSubmit={handleSubmit}
            isValidating={isValidating}
            validationErrors={validationErrors}
            showHints={showHints}
            onDismissHints={() => setShowHints(false)}
          />
        </div>
        
        <div className="w-1/3 border-r border-gray-200">
          <CodeEditor
            html={html}
            css={css}
            javascript={javascript}
            onHtmlChange={setHtml}
            onCssChange={setCss}
            onJavascriptChange={setJavascript}
            onRun={handleRun}
            onReset={handleReset}
          />
        </div>
        
        <div className="w-1/3">
          <PreviewPane
            html={html}
            css={css}
            javascript={javascript}
          />
        </div>
      </div>

      {/* Success Modal with Confetti */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        stepTitle={currentStep.title}
        stepNumber={currentStepIndex + 1}
        totalSteps={project.steps.length}
        isProjectComplete={isProjectComplete}
        onContinue={handleSuccessModalContinue}
      />
    </div>
  );
};

export default EditorPage;