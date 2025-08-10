import React, { useEffect, useRef } from 'react';
import { Code, Tag, Zap, Variable, FunctionSquare as Function, Hash } from 'lucide-react';
import { AutocompleteSuggestion } from '../../utils/autocomplete';

interface AutocompleteDropdownProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  position: { top: number; left: number };
  onSelect: (suggestion: AutocompleteSuggestion) => void;
  onClose: () => void;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  suggestions,
  selectedIndex,
  position,
  onSelect,
  onClose
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const getIcon = (type: AutocompleteSuggestion['type']) => {
    switch (type) {
      case 'tag':
        return <Tag className="h-4 w-4 text-orange-500" />;
      case 'attribute':
        return <Hash className="h-4 w-4 text-blue-500" />;
      case 'property':
        return <Code className="h-4 w-4 text-purple-500" />;
      case 'keyword':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'function':
        return <Function className="h-4 w-4 text-green-500" />;
      case 'variable':
        return <Variable className="h-4 w-4 text-cyan-500" />;
      case 'value':
        return <Code className="h-4 w-4 text-gray-500" />;
      default:
        return <Code className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: AutocompleteSuggestion['type']) => {
    switch (type) {
      case 'tag':
        return 'text-orange-600 bg-orange-50';
      case 'attribute':
        return 'text-blue-600 bg-blue-50';
      case 'property':
        return 'text-purple-600 bg-purple-50';
      case 'keyword':
        return 'text-yellow-600 bg-yellow-50';
      case 'function':
        return 'text-green-600 bg-green-50';
      case 'variable':
        return 'text-cyan-600 bg-cyan-50';
      case 'value':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50 min-w-80"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Header */}
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
        {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} available
      </div>

      {/* Group suggestions by category */}
      {Object.entries(
        suggestions.reduce((groups, suggestion) => {
          const category = suggestion.category || 'Other';
          if (!groups[category]) groups[category] = [];
          groups[category].push(suggestion);
          return groups;
        }, {} as Record<string, AutocompleteSuggestion[]>)
      ).map(([category, categorySuggestions], categoryIndex) => (
        <div key={category}>
          {/* Category header */}
          {Object.keys(suggestions.reduce((groups, s) => {
            const cat = s.category || 'Other';
            if (!groups[cat]) groups[cat] = [];
            return groups;
          }, {} as Record<string, any>)).length > 1 && (
            <div className="px-3 py-1 bg-gray-100 text-xs font-medium text-gray-500 border-b border-gray-100">
              {category}
            </div>
          )}

          {/* Suggestions in this category */}
          {categorySuggestions.map((suggestion, index) => {
            const globalIndex = suggestions.indexOf(suggestion);
            const isSelected = globalIndex === selectedIndex;

            return (
              <div
                key={`${category}-${index}`}
                className={`px-3 py-2 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-50 border-blue-100'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelect(suggestion)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {getIcon(suggestion.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {suggestion.text}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getTypeColor(suggestion.type)}`}>
                        {suggestion.type}
                      </span>
                    </div>
                    {suggestion.description && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {suggestion.description}
                      </p>
                    )}
                  </div>
                  
                  {isSelected && (
                    <div className="flex-shrink-0 text-xs text-blue-600 font-medium">
                      ↵
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer with keyboard shortcuts */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
};

export default AutocompleteDropdown;