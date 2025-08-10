import React, { useEffect, useRef } from 'react';
import { Eye, ExternalLink } from 'lucide-react';

interface PreviewPaneProps {
  html: string;
  css: string;
  javascript: string;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ html, css, javascript }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const document = iframeRef.current.contentDocument;
      if (document) {
        // Create a complete HTML document with embedded CSS instead of external link
        const fullHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>
              /* Reset and base styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              
              /* User's CSS */
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${javascript}
              } catch (error) {
                console.error('JavaScript Error:', error);
              }
            </script>
          </body>
          </html>
        `;
        document.open();
        document.write(fullHTML);
        document.close();
      }
    }
  }, [html, css, javascript]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Live Preview</span>
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Code Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default PreviewPane;