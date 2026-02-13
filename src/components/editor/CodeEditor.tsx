import React, { useState, useRef, useEffect } from 'react';
import { Play, Save, RotateCcw, Lightbulb } from 'lucide-react';
import { getSuggestions, getCursorContext, AutocompleteSuggestion } from '../../utils/autocomplete';
import AutocompleteDropdown from './AutocompleteDropdown';

interface CodeEditorProps {
  html: string;
  css: string;
  javascript: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJavascriptChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  html,
  css,
  javascript,
  onHtmlChange,
  onCssChange,
  onJavascriptChange,
  onRun,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompletePosition, setAutocompletePosition] = useState({ top: 0, left: 0 });
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [cursorContext, setCursorContext] = useState({ word: '', wordStart: 0, wordEnd: 0 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tabs = [
    { id: 'html' as const, label: 'HTML', color: 'text-orange-600' },
    { id: 'css' as const, label: 'CSS', color: 'text-blue-600' },
    { id: 'javascript' as const, label: 'JavaScript', color: 'text-yellow-600' }
  ];

  const getCurrentValue = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'javascript': return javascript;
    }
  };

  const handleChange = (value: string) => {
    switch (activeTab) {
      case 'html': onHtmlChange(value); break;
      case 'css': onCssChange(value); break;
      case 'javascript': onJavascriptChange(value); break;
    }
  };

  // Calculate cursor position for autocomplete dropdown
  const calculateDropdownPosition = (textarea: HTMLTextAreaElement, cursorPos: number) => {
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines.length - 1;
    const currentColumn = lines[lines.length - 1].length;

    // Approximate character dimensions
    const charWidth = 8; // Approximate width of a character in monospace font
    const lineHeight = 20; // Approximate line height

    const rect = textarea.getBoundingClientRect();
    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;

    const top = rect.top + (currentLine * lineHeight) - scrollTop + lineHeight + 5;
    const left = rect.left + (currentColumn * charWidth) - scrollLeft;

    return { top, left };
  };

  // Handle input changes and trigger autocomplete
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;

    handleChange(value);

    // Get context at cursor
    const context = getCursorContext(value, cursorPosition);
    setCursorContext(context);

    // Show autocomplete if user is typing a word
    if (context.word.length > 0) {
      const allCode = { html, css, javascript };
      // Update the current language's code
      switch (activeTab) {
        case 'html': allCode.html = value; break;
        case 'css': allCode.css = value; break;
        case 'javascript': allCode.javascript = value; break;
      }

      const newSuggestions = getSuggestions(activeTab, context.word, allCode);

      if (newSuggestions.length > 0) {
        setSuggestions(newSuggestions);
        setSelectedSuggestionIndex(0);
        setShowAutocomplete(true);

        // Calculate position for dropdown
        const position = calculateDropdownPosition(e.target, cursorPosition);
        setAutocompletePosition(position);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  // Handle keyboard navigation in autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showAutocomplete) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;

      case 'Enter':
      case 'Tab':
        if (suggestions[selectedSuggestionIndex]) {
          e.preventDefault();
          handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setShowAutocomplete(false);
        break;
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: AutocompleteSuggestion) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const currentValue = getCurrentValue();
    const cursorPosition = textarea.selectionStart;

    // Replace the current word with the suggestion
    const beforeWord = currentValue.substring(0, cursorContext.wordStart);
    const afterWord = currentValue.substring(cursorContext.wordEnd);
    const insertText = suggestion.insertText || suggestion.text;

    const newValue = beforeWord + insertText + afterWord;
    const newCursorPosition = cursorContext.wordStart + insertText.length;

    handleChange(newValue);
    setShowAutocomplete(false);

    // Set cursor position after the inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  // Close autocomplete when clicking outside or changing tabs
  useEffect(() => {
    setShowAutocomplete(false);
  }, [activeTab]);

  // Trigger autocomplete on single character input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Don't trigger on special keys
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // Trigger autocomplete for any letter, number, or certain symbols
    const char = e.key;
    if (/[a-zA-Z0-9_$-]/.test(char) && char.length === 1) {
      // Small delay to let the character be inserted first
      setTimeout(() => {
        if (textareaRef.current) {
          const value = textareaRef.current.value;
          const cursorPosition = textareaRef.current.selectionStart;
          const context = getCursorContext(value, cursorPosition);

          if (context.word.length >= 1) {
            const allCode = { html, css, javascript };
            const newSuggestions = getSuggestions(activeTab, context.word, allCode);

            if (newSuggestions.length > 0) {
              setSuggestions(newSuggestions);
              setSelectedSuggestionIndex(0);
              setCursorContext(context);
              setShowAutocomplete(true);

              const position = calculateDropdownPosition(textareaRef.current!, cursorPosition);
              setAutocompletePosition(position);
            }
          }
        }
      }, 10);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white relative">
      <div className="flex items-center justify-between p-3 bg-gray-900 border-b-2 border-black">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-bold border-2 transition-all duration-200 uppercase tracking-wide ${activeTab === tab.id
                  ? 'bg-retro-yellow text-black border-black shadow-hard-sm translate-x-[1px] translate-y-[1px]'
                  : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center text-xs font-bold text-gray-500 mr-2 uppercase tracking-wide">
            <Lightbulb className="h-3 w-3 mr-1" />
            <span>Type to see suggestions</span>
          </div>
          <button
            onClick={onReset}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 border-2 border-transparent hover:border-gray-600 transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onRun}
            className="flex items-center px-4 py-2 bg-green-500 text-black font-black border-2 border-black shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all duration-200 uppercase tracking-wider text-sm"
          >
            <Play className="h-4 w-4 mr-2 fill-current" />
            Run
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={getCurrentValue()}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
          placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        {/* Autocomplete Dropdown */}
        {showAutocomplete && (
          <AutocompleteDropdown
            suggestions={suggestions}
            selectedIndex={selectedSuggestionIndex}
            position={autocompletePosition}
            onSelect={handleSuggestionSelect}
            onClose={() => setShowAutocomplete(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;