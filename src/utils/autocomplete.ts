// Autocomplete utility for VS Code-style suggestions
export interface AutocompleteSuggestion {
  text: string;
  type: 'tag' | 'attribute' | 'property' | 'keyword' | 'function' | 'variable' | 'value';
  description?: string;
  insertText?: string;
  category: string;
}

// HTML tag suggestions
export const HTML_TAGS: AutocompleteSuggestion[] = [
  { text: 'div', type: 'tag', description: 'Generic container element', insertText: '<div></div>', category: 'HTML Tags' },
  { text: 'span', type: 'tag', description: 'Inline container element', insertText: '<span></span>', category: 'HTML Tags' },
  { text: 'p', type: 'tag', description: 'Paragraph element', insertText: '<p></p>', category: 'HTML Tags' },
  { text: 'h1', type: 'tag', description: 'Main heading', insertText: '<h1></h1>', category: 'HTML Tags' },
  { text: 'h2', type: 'tag', description: 'Secondary heading', insertText: '<h2></h2>', category: 'HTML Tags' },
  { text: 'h3', type: 'tag', description: 'Tertiary heading', insertText: '<h3></h3>', category: 'HTML Tags' },
  { text: 'header', type: 'tag', description: 'Header section', insertText: '<header></header>', category: 'HTML Tags' },
  { text: 'main', type: 'tag', description: 'Main content area', insertText: '<main></main>', category: 'HTML Tags' },
  { text: 'footer', type: 'tag', description: 'Footer section', insertText: '<footer></footer>', category: 'HTML Tags' },
  { text: 'nav', type: 'tag', description: 'Navigation section', insertText: '<nav></nav>', category: 'HTML Tags' },
  { text: 'section', type: 'tag', description: 'Document section', insertText: '<section></section>', category: 'HTML Tags' },
  { text: 'article', type: 'tag', description: 'Article content', insertText: '<article></article>', category: 'HTML Tags' },
  { text: 'aside', type: 'tag', description: 'Sidebar content', insertText: '<aside></aside>', category: 'HTML Tags' },
  { text: 'button', type: 'tag', description: 'Clickable button', insertText: '<button></button>', category: 'HTML Tags' },
  { text: 'input', type: 'tag', description: 'Input field', insertText: '<input type="text">', category: 'HTML Tags' },
  { text: 'form', type: 'tag', description: 'Form container', insertText: '<form></form>', category: 'HTML Tags' },
  { text: 'label', type: 'tag', description: 'Form label', insertText: '<label></label>', category: 'HTML Tags' },
  { text: 'img', type: 'tag', description: 'Image element', insertText: '<img src="" alt="">', category: 'HTML Tags' },
  { text: 'a', type: 'tag', description: 'Anchor/link element', insertText: '<a href=""></a>', category: 'HTML Tags' },
  { text: 'ul', type: 'tag', description: 'Unordered list', insertText: '<ul></ul>', category: 'HTML Tags' },
  { text: 'ol', type: 'tag', description: 'Ordered list', insertText: '<ol></ol>', category: 'HTML Tags' },
  { text: 'li', type: 'tag', description: 'List item', insertText: '<li></li>', category: 'HTML Tags' },
  { text: 'table', type: 'tag', description: 'Table element', insertText: '<table></table>', category: 'HTML Tags' },
  { text: 'tr', type: 'tag', description: 'Table row', insertText: '<tr></tr>', category: 'HTML Tags' },
  { text: 'td', type: 'tag', description: 'Table cell', insertText: '<td></td>', category: 'HTML Tags' },
  { text: 'th', type: 'tag', description: 'Table header cell', insertText: '<th></th>', category: 'HTML Tags' },
];

// HTML attributes
export const HTML_ATTRIBUTES: AutocompleteSuggestion[] = [
  { text: 'class', type: 'attribute', description: 'CSS class name', insertText: 'class=""', category: 'HTML Attributes' },
  { text: 'id', type: 'attribute', description: 'Unique identifier', insertText: 'id=""', category: 'HTML Attributes' },
  { text: 'src', type: 'attribute', description: 'Source URL', insertText: 'src=""', category: 'HTML Attributes' },
  { text: 'href', type: 'attribute', description: 'Link destination', insertText: 'href=""', category: 'HTML Attributes' },
  { text: 'alt', type: 'attribute', description: 'Alternative text', insertText: 'alt=""', category: 'HTML Attributes' },
  { text: 'title', type: 'attribute', description: 'Tooltip text', insertText: 'title=""', category: 'HTML Attributes' },
  { text: 'type', type: 'attribute', description: 'Element type', insertText: 'type=""', category: 'HTML Attributes' },
  { text: 'value', type: 'attribute', description: 'Element value', insertText: 'value=""', category: 'HTML Attributes' },
  { text: 'placeholder', type: 'attribute', description: 'Placeholder text', insertText: 'placeholder=""', category: 'HTML Attributes' },
  { text: 'disabled', type: 'attribute', description: 'Disable element', insertText: 'disabled', category: 'HTML Attributes' },
  { text: 'required', type: 'attribute', description: 'Required field', insertText: 'required', category: 'HTML Attributes' },
  { text: 'readonly', type: 'attribute', description: 'Read-only field', insertText: 'readonly', category: 'HTML Attributes' },
];

// CSS properties
export const CSS_PROPERTIES: AutocompleteSuggestion[] = [
  { text: 'display', type: 'property', description: 'Display type', insertText: 'display: ', category: 'CSS Properties' },
  { text: 'position', type: 'property', description: 'Positioning method', insertText: 'position: ', category: 'CSS Properties' },
  { text: 'top', type: 'property', description: 'Top position', insertText: 'top: ', category: 'CSS Properties' },
  { text: 'right', type: 'property', description: 'Right position', insertText: 'right: ', category: 'CSS Properties' },
  { text: 'bottom', type: 'property', description: 'Bottom position', insertText: 'bottom: ', category: 'CSS Properties' },
  { text: 'left', type: 'property', description: 'Left position', insertText: 'left: ', category: 'CSS Properties' },
  { text: 'width', type: 'property', description: 'Element width', insertText: 'width: ', category: 'CSS Properties' },
  { text: 'height', type: 'property', description: 'Element height', insertText: 'height: ', category: 'CSS Properties' },
  { text: 'margin', type: 'property', description: 'Outer spacing', insertText: 'margin: ', category: 'CSS Properties' },
  { text: 'padding', type: 'property', description: 'Inner spacing', insertText: 'padding: ', category: 'CSS Properties' },
  { text: 'border', type: 'property', description: 'Element border', insertText: 'border: ', category: 'CSS Properties' },
  { text: 'background', type: 'property', description: 'Background styling', insertText: 'background: ', category: 'CSS Properties' },
  { text: 'background-color', type: 'property', description: 'Background color', insertText: 'background-color: ', category: 'CSS Properties' },
  { text: 'color', type: 'property', description: 'Text color', insertText: 'color: ', category: 'CSS Properties' },
  { text: 'font-size', type: 'property', description: 'Text size', insertText: 'font-size: ', category: 'CSS Properties' },
  { text: 'font-family', type: 'property', description: 'Font family', insertText: 'font-family: ', category: 'CSS Properties' },
  { text: 'font-weight', type: 'property', description: 'Font weight', insertText: 'font-weight: ', category: 'CSS Properties' },
  { text: 'text-align', type: 'property', description: 'Text alignment', insertText: 'text-align: ', category: 'CSS Properties' },
  { text: 'line-height', type: 'property', description: 'Line height', insertText: 'line-height: ', category: 'CSS Properties' },
  { text: 'flex', type: 'property', description: 'Flexbox shorthand', insertText: 'flex: ', category: 'CSS Properties' },
  { text: 'flex-direction', type: 'property', description: 'Flex direction', insertText: 'flex-direction: ', category: 'CSS Properties' },
  { text: 'justify-content', type: 'property', description: 'Justify content', insertText: 'justify-content: ', category: 'CSS Properties' },
  { text: 'align-items', type: 'property', description: 'Align items', insertText: 'align-items: ', category: 'CSS Properties' },
  { text: 'grid', type: 'property', description: 'CSS Grid shorthand', insertText: 'grid: ', category: 'CSS Properties' },
  { text: 'grid-template-columns', type: 'property', description: 'Grid columns', insertText: 'grid-template-columns: ', category: 'CSS Properties' },
  { text: 'grid-template-rows', type: 'property', description: 'Grid rows', insertText: 'grid-template-rows: ', category: 'CSS Properties' },
  { text: 'border-radius', type: 'property', description: 'Rounded corners', insertText: 'border-radius: ', category: 'CSS Properties' },
  { text: 'box-shadow', type: 'property', description: 'Drop shadow', insertText: 'box-shadow: ', category: 'CSS Properties' },
  { text: 'transition', type: 'property', description: 'CSS transition', insertText: 'transition: ', category: 'CSS Properties' },
  { text: 'transform', type: 'property', description: 'CSS transform', insertText: 'transform: ', category: 'CSS Properties' },
  { text: 'opacity', type: 'property', description: 'Element opacity', insertText: 'opacity: ', category: 'CSS Properties' },
  { text: 'z-index', type: 'property', description: 'Stacking order', insertText: 'z-index: ', category: 'CSS Properties' },
  { text: 'overflow', type: 'property', description: 'Content overflow', insertText: 'overflow: ', category: 'CSS Properties' },
  { text: 'cursor', type: 'property', description: 'Mouse cursor', insertText: 'cursor: ', category: 'CSS Properties' },
];

// CSS values
export const CSS_VALUES: AutocompleteSuggestion[] = [
  { text: 'block', type: 'value', description: 'Block display', insertText: 'block', category: 'CSS Values' },
  { text: 'inline', type: 'value', description: 'Inline display', insertText: 'inline', category: 'CSS Values' },
  { text: 'inline-block', type: 'value', description: 'Inline-block display', insertText: 'inline-block', category: 'CSS Values' },
  { text: 'flex', type: 'value', description: 'Flexbox display', insertText: 'flex', category: 'CSS Values' },
  { text: 'grid', type: 'value', description: 'Grid display', insertText: 'grid', category: 'CSS Values' },
  { text: 'none', type: 'value', description: 'Hide element', insertText: 'none', category: 'CSS Values' },
  { text: 'relative', type: 'value', description: 'Relative positioning', insertText: 'relative', category: 'CSS Values' },
  { text: 'absolute', type: 'value', description: 'Absolute positioning', insertText: 'absolute', category: 'CSS Values' },
  { text: 'fixed', type: 'value', description: 'Fixed positioning', insertText: 'fixed', category: 'CSS Values' },
  { text: 'center', type: 'value', description: 'Center alignment', insertText: 'center', category: 'CSS Values' },
  { text: 'left', type: 'value', description: 'Left alignment', insertText: 'left', category: 'CSS Values' },
  { text: 'right', type: 'value', description: 'Right alignment', insertText: 'right', category: 'CSS Values' },
  { text: 'space-between', type: 'value', description: 'Space between items', insertText: 'space-between', category: 'CSS Values' },
  { text: 'space-around', type: 'value', description: 'Space around items', insertText: 'space-around', category: 'CSS Values' },
  { text: 'space-evenly', type: 'value', description: 'Space evenly', insertText: 'space-evenly', category: 'CSS Values' },
  { text: 'bold', type: 'value', description: 'Bold font weight', insertText: 'bold', category: 'CSS Values' },
  { text: 'normal', type: 'value', description: 'Normal font weight', insertText: 'normal', category: 'CSS Values' },
  { text: 'pointer', type: 'value', description: 'Pointer cursor', insertText: 'pointer', category: 'CSS Values' },
  { text: 'auto', type: 'value', description: 'Auto value', insertText: 'auto', category: 'CSS Values' },
  { text: 'hidden', type: 'value', description: 'Hidden overflow', insertText: 'hidden', category: 'CSS Values' },
  { text: 'scroll', type: 'value', description: 'Scroll overflow', insertText: 'scroll', category: 'CSS Values' },
];

// JavaScript keywords
export const JS_KEYWORDS: AutocompleteSuggestion[] = [
  { text: 'function', type: 'keyword', description: 'Function declaration', insertText: 'function ', category: 'JavaScript Keywords' },
  { text: 'const', type: 'keyword', description: 'Constant declaration', insertText: 'const ', category: 'JavaScript Keywords' },
  { text: 'let', type: 'keyword', description: 'Variable declaration', insertText: 'let ', category: 'JavaScript Keywords' },
  { text: 'var', type: 'keyword', description: 'Variable declaration (legacy)', insertText: 'var ', category: 'JavaScript Keywords' },
  { text: 'if', type: 'keyword', description: 'Conditional statement', insertText: 'if ()', category: 'JavaScript Keywords' },
  { text: 'else', type: 'keyword', description: 'Else clause', insertText: 'else ', category: 'JavaScript Keywords' },
  { text: 'for', type: 'keyword', description: 'For loop', insertText: 'for ()', category: 'JavaScript Keywords' },
  { text: 'while', type: 'keyword', description: 'While loop', insertText: 'while ()', category: 'JavaScript Keywords' },
  { text: 'return', type: 'keyword', description: 'Return statement', insertText: 'return ', category: 'JavaScript Keywords' },
  { text: 'true', type: 'keyword', description: 'Boolean true', insertText: 'true', category: 'JavaScript Keywords' },
  { text: 'false', type: 'keyword', description: 'Boolean false', insertText: 'false', category: 'JavaScript Keywords' },
  { text: 'null', type: 'keyword', description: 'Null value', insertText: 'null', category: 'JavaScript Keywords' },
  { text: 'undefined', type: 'keyword', description: 'Undefined value', insertText: 'undefined', category: 'JavaScript Keywords' },
  { text: 'try', type: 'keyword', description: 'Try block', insertText: 'try ', category: 'JavaScript Keywords' },
  { text: 'catch', type: 'keyword', description: 'Catch block', insertText: 'catch ', category: 'JavaScript Keywords' },
  { text: 'finally', type: 'keyword', description: 'Finally block', insertText: 'finally ', category: 'JavaScript Keywords' },
  { text: 'throw', type: 'keyword', description: 'Throw statement', insertText: 'throw ', category: 'JavaScript Keywords' },
  { text: 'class', type: 'keyword', description: 'Class declaration', insertText: 'class ', category: 'JavaScript Keywords' },
  { text: 'extends', type: 'keyword', description: 'Class inheritance', insertText: 'extends ', category: 'JavaScript Keywords' },
  { text: 'import', type: 'keyword', description: 'Import statement', insertText: 'import ', category: 'JavaScript Keywords' },
  { text: 'export', type: 'keyword', description: 'Export statement', insertText: 'export ', category: 'JavaScript Keywords' },
  { text: 'async', type: 'keyword', description: 'Async function', insertText: 'async ', category: 'JavaScript Keywords' },
  { text: 'await', type: 'keyword', description: 'Await expression', insertText: 'await ', category: 'JavaScript Keywords' },
];

// JavaScript built-in functions and objects
export const JS_BUILTINS: AutocompleteSuggestion[] = [
  { text: 'console.log', type: 'function', description: 'Log to console', insertText: 'console.log()', category: 'JavaScript Built-ins' },
  { text: 'document.getElementById', type: 'function', description: 'Get element by ID', insertText: 'document.getElementById()', category: 'JavaScript Built-ins' },
  { text: 'document.querySelector', type: 'function', description: 'Query selector', insertText: 'document.querySelector()', category: 'JavaScript Built-ins' },
  { text: 'document.querySelectorAll', type: 'function', description: 'Query all selectors', insertText: 'document.querySelectorAll()', category: 'JavaScript Built-ins' },
  { text: 'addEventListener', type: 'function', description: 'Add event listener', insertText: 'addEventListener()', category: 'JavaScript Built-ins' },
  { text: 'removeEventListener', type: 'function', description: 'Remove event listener', insertText: 'removeEventListener()', category: 'JavaScript Built-ins' },
  { text: 'setTimeout', type: 'function', description: 'Set timeout', insertText: 'setTimeout()', category: 'JavaScript Built-ins' },
  { text: 'setInterval', type: 'function', description: 'Set interval', insertText: 'setInterval()', category: 'JavaScript Built-ins' },
  { text: 'clearTimeout', type: 'function', description: 'Clear timeout', insertText: 'clearTimeout()', category: 'JavaScript Built-ins' },
  { text: 'clearInterval', type: 'function', description: 'Clear interval', insertText: 'clearInterval()', category: 'JavaScript Built-ins' },
  { text: 'parseInt', type: 'function', description: 'Parse integer', insertText: 'parseInt()', category: 'JavaScript Built-ins' },
  { text: 'parseFloat', type: 'function', description: 'Parse float', insertText: 'parseFloat()', category: 'JavaScript Built-ins' },
  { text: 'Math.random', type: 'function', description: 'Random number', insertText: 'Math.random()', category: 'JavaScript Built-ins' },
  { text: 'Math.floor', type: 'function', description: 'Floor function', insertText: 'Math.floor()', category: 'JavaScript Built-ins' },
  { text: 'Math.ceil', type: 'function', description: 'Ceiling function', insertText: 'Math.ceil()', category: 'JavaScript Built-ins' },
  { text: 'Math.round', type: 'function', description: 'Round function', insertText: 'Math.round()', category: 'JavaScript Built-ins' },
  { text: 'Array.from', type: 'function', description: 'Create array from', insertText: 'Array.from()', category: 'JavaScript Built-ins' },
  { text: 'Object.keys', type: 'function', description: 'Get object keys', insertText: 'Object.keys()', category: 'JavaScript Built-ins' },
  { text: 'Object.values', type: 'function', description: 'Get object values', insertText: 'Object.values()', category: 'JavaScript Built-ins' },
  { text: 'JSON.parse', type: 'function', description: 'Parse JSON', insertText: 'JSON.parse()', category: 'JavaScript Built-ins' },
  { text: 'JSON.stringify', type: 'function', description: 'Stringify JSON', insertText: 'JSON.stringify()', category: 'JavaScript Built-ins' },
];

// Extract variables and functions from code
export const extractUserDefinedItems = (code: string): AutocompleteSuggestion[] => {
  const suggestions: AutocompleteSuggestion[] = [];
  
  // Extract variable declarations
  const variableRegex = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let match;
  while ((match = variableRegex.exec(code)) !== null) {
    suggestions.push({
      text: match[1],
      type: 'variable',
      description: 'User-defined variable',
      insertText: match[1],
      category: 'Your Variables'
    });
  }
  
  // Extract function declarations
  const functionRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  while ((match = functionRegex.exec(code)) !== null) {
    suggestions.push({
      text: match[1],
      type: 'function',
      description: 'User-defined function',
      insertText: match[1] + '()',
      category: 'Your Functions'
    });
  }
  
  // Extract arrow function assignments
  const arrowFunctionRegex = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\([^)]*\)\s*=>/g;
  while ((match = arrowFunctionRegex.exec(code)) !== null) {
    suggestions.push({
      text: match[1],
      type: 'function',
      description: 'User-defined arrow function',
      insertText: match[1] + '()',
      category: 'Your Functions'
    });
  }
  
  return suggestions;
};

// Get suggestions based on language and context
export const getSuggestions = (
  language: 'html' | 'css' | 'javascript',
  input: string,
  allCode: { html: string; css: string; javascript: string }
): AutocompleteSuggestion[] => {
  const inputLower = input.toLowerCase();
  let suggestions: AutocompleteSuggestion[] = [];
  
  switch (language) {
    case 'html':
      suggestions = [...HTML_TAGS, ...HTML_ATTRIBUTES];
      break;
    case 'css':
      suggestions = [...CSS_PROPERTIES, ...CSS_VALUES];
      break;
    case 'javascript':
      const userItems = extractUserDefinedItems(allCode.javascript);
      suggestions = [...JS_KEYWORDS, ...JS_BUILTINS, ...userItems];
      break;
  }
  
  // Filter suggestions based on input
  if (input.length === 0) {
    return suggestions.slice(0, 10); // Show top 10 when no input
  }
  
  const filtered = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().startsWith(inputLower)
  );
  
  // Sort by relevance (exact matches first, then alphabetical)
  return filtered.sort((a, b) => {
    const aExact = a.text.toLowerCase() === inputLower;
    const bExact = b.text.toLowerCase() === inputLower;
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    return a.text.localeCompare(b.text);
  }).slice(0, 15); // Limit to 15 suggestions
};

// Get cursor position and word at cursor
export const getCursorContext = (text: string, cursorPosition: number): {
  word: string;
  wordStart: number;
  wordEnd: number;
} => {
  let wordStart = cursorPosition;
  let wordEnd = cursorPosition;
  
  // Find word boundaries
  const wordChars = /[a-zA-Z0-9_$-]/;
  
  // Find start of word
  while (wordStart > 0 && wordChars.test(text[wordStart - 1])) {
    wordStart--;
  }
  
  // Find end of word
  while (wordEnd < text.length && wordChars.test(text[wordEnd])) {
    wordEnd++;
  }
  
  const word = text.substring(wordStart, wordEnd);
  
  return { word, wordStart, wordEnd };
};