import { Project } from '../types';

export const portfolioProject: Project = {
  id: 'portfolio-landing-page',
  title: 'Professional Portfolio Landing Page',
  description: 'Create a complete, responsive portfolio landing page using HTML, CSS, and JavaScript. Learn semantic HTML, modern CSS techniques, responsive design, and interactive JavaScript features.',
  difficulty: 'Beginner',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  estimatedTime: '4-6 hours',
  thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags: ['Portfolio', 'Responsive', 'Semantic HTML', 'CSS Grid', 'Flexbox'],
  steps: [
    {
      id: 'step-1',
      title: 'Create the HTML Foundation',
      description: 'Set up the basic HTML5 structure with proper document setup and semantic elements.',
      instructions: `Create the foundation of your portfolio page with proper HTML5 structure:

1. Start with the HTML5 boilerplate:
   - Add the DOCTYPE declaration
   - Set up the html element with lang attribute
   - Create a complete head section with:
     - Meta charset (UTF-8)
     - Viewport meta tag for responsive design
     - A descriptive title like "Your Name - Portfolio"
     - Link to your CSS file (style.css)

2. Set up the body structure:
   - Add a main container div with class "container"
   - Use semantic HTML5 elements:
     - <header> for the top navigation
     - <main> for the main content
     - <footer> for the bottom section

3. Plan your layout:
   - Think about how the portfolio should be organized
   - Consider accessibility and semantic HTML
   - Keep the structure simple and clean

This step focuses on creating a solid foundation with proper HTML5 structure that follows web standards and best practices.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A proper HTML5 document with semantic elements and container ready for content',
      validationRules: [
        'Must include <!DOCTYPE html>',
        'Must have proper <head> section with title and meta tags',
        'Must use semantic elements: <header>, <main>, <footer>',
        'Must link to external CSS file',
        'Must include viewport meta tag for responsive design'
      ],
      isCompleted: false,
      isUnlocked: true
    },
    {
      id: 'step-2',
      title: 'Build the Navigation Header',
      description: 'Create a professional header with your name/logo and navigation menu.',
      instructions: `Build a header section that will serve as your site navigation:

1. Inside the <header> element, create:
   - A logo/name section (use <h1> or <div> with your name)
   - A <nav> element containing navigation links
   
2. Add navigation links inside <nav>:
   - Home (link to #home)
   - About (link to #about)  
   - Projects (link to #projects)
   - Contact (link to #contact)
   
3. Structure the header for styling:
   - Add appropriate classes for CSS targeting
   - Use a container div if needed for layout
   - Consider mobile-first responsive design
   
4. Add semantic attributes:
   - Use descriptive IDs and classes
   - Consider adding aria-labels for accessibility
   - Ensure proper heading hierarchy

This creates the foundation for a professional-looking navigation bar that users expect to see at the top of a portfolio site.`,
      startingCode: {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Name - Portfolio</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="container">\n        <header>\n            <!-- Add your header content here -->\n        </header>\n        \n        <main>\n            <!-- Main content will go here -->\n        </main>\n        \n        <footer>\n            <!-- Footer content will go here -->\n        </footer>\n    </div>\n</body>\n</html>',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A header with logo/name and navigation links',
      validationRules: [
        'Must include <nav> element inside <header>',
        'Must have four navigation links with proper href attributes',
        'Must include your name or logo in the header',
        'Links should use anchor tags with descriptive text'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-3',
      title: 'Create the Hero Section',
      description: 'Build an eye-catching hero section with headline, description, and call-to-action.',
      instructions: `Create a compelling hero section that introduces you to visitors:

1. Inside <main>, add a <section> with:
   - class="hero" and id="home"
   - This will be your main landing area
   
2. Add hero content:
   - A main headline using <h1> (your name or professional title)
   - A subheading using <h2> (your role/specialization)
   - A description paragraph about yourself
   - A call-to-action button or link (e.g., "View My Work", "Contact Me")
   
3. Structure for visual impact:
   - Use proper heading hierarchy
   - Keep text concise but informative
   - Make the CTA prominent and actionable
   
4. Consider adding:
   - A professional photo placeholder
   - Social media links
   - Key skills or technologies you work with

This section should immediately capture visitors' attention and give them a clear understanding of who you are and what you do.`,
      startingCode: {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Name - Portfolio</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="container">\n        <header>\n            <div class="logo">\n                <h1>Your Name</h1>\n            </div>\n            <nav>\n                <a href="#home">Home</a>\n                <a href="#about">About</a>\n                <a href="#projects">Projects</a>\n                <a href="#contact">Contact</a>\n            </nav>\n        </header>\n        \n        <main>\n            <!-- Add your hero section here -->\n        </main>\n        \n        <footer>\n            <!-- Footer content will go here -->\n        </footer>\n    </div>\n</body>\n</html>',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A hero section with headline, description, and call-to-action',
      validationRules: [
        'Must include <section> with class="hero" and id="home"',
        'Must have main headline using <h1> or <h2>',
        'Must include description paragraph',
        'Must have call-to-action element (button or link)'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-4',
      title: 'Add About and Projects Sections',
      description: 'Create content sections for about information and project showcase.',
      instructions: `Add the main content sections that showcase your background and work:

1. Create an About section:
   - Add <section> with class="about" and id="about"
   - Include a section heading <h2>About Me</h2>
   - Add 2-3 paragraphs about your background, skills, and interests
   - Consider adding a skills list or key technologies
   
2. Create a Projects section:
   - Add <section> with class="projects" and id="projects"
   - Include a section heading <h2>My Projects</h2>
   - Create a container for project cards
   - Add 2-3 project placeholders with:
     - Project title
     - Brief description
     - Technologies used
     - Link placeholder
     
3. Structure for styling:
   - Use consistent heading hierarchy
   - Add appropriate classes for CSS targeting
   - Keep content organized and scannable
   
4. Content tips:
   - Write in first person
   - Be specific about your skills and experience
   - Make project descriptions compelling

These sections provide the core content that visitors want to see in a portfolio.`,
      startingCode: {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Name - Portfolio</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="container">\n        <header>\n            <div class="logo">\n                <h1>Your Name</h1>\n            </div>\n            <nav>\n                <a href="#home">Home</a>\n                <a href="#about">About</a>\n                <a href="#projects">Projects</a>\n                <a href="#contact">Contact</a>\n            </nav>\n        </header>\n        \n        <main>\n            <section class="hero" id="home">\n                <h1>Hi, I\'m Your Name</h1>\n                <h2>Web Developer & Designer</h2>\n                <p>I create beautiful, responsive websites and web applications using modern technologies.</p>\n                <a href="#projects" class="cta-button">View My Work</a>\n            </section>\n            \n            <!-- Add About and Projects sections here -->\n        </main>\n        \n        <footer>\n            <!-- Footer content will go here -->\n        </footer>\n    </div>\n</body>\n</html>',
        css: '',
        javascript: ''
      },
      expectedOutput: 'About and Projects sections with proper structure and content',
      validationRules: [
        'Must include section with class="about" and id="about"',
        'Must include section with class="projects" and id="projects"',
        'Must have <h2> headings for both sections',
        'About section must have multiple paragraphs',
        'Projects section must have project placeholders'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-5',
      title: 'Complete the Contact Section and Footer',
      description: 'Add a contact section and footer to complete the HTML structure.',
      instructions: `Complete your portfolio structure with contact information and footer:

1. Create a Contact section:
   - Add <section> with class="contact" and id="contact"
   - Include a section heading <h2>Get In Touch</h2>
   - Add contact information:
     - Email address (use mailto: link)
     - Phone number (optional)
     - Social media links (LinkedIn, GitHub, etc.)
   - Consider adding a contact form placeholder
   
2. Build the Footer:
   - Add content inside the <footer> element
   - Include copyright notice
   - Add social media links
   - Consider adding a "back to top" link
   - Keep it simple and professional
   
3. Final HTML structure review:
   - Ensure all sections are properly nested
   - Check that all IDs match navigation links
   - Verify semantic HTML usage
   - Confirm accessibility considerations
   
4. Content guidelines:
   - Make contact information easily accessible
   - Use professional email address
   - Include relevant social profiles only

This completes the HTML foundation of your portfolio with all essential sections.`,
      startingCode: {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Name - Portfolio</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="container">\n        <header>\n            <div class="logo">\n                <h1>Your Name</h1>\n            </div>\n            <nav>\n                <a href="#home">Home</a>\n                <a href="#about">About</a>\n                <a href="#projects">Projects</a>\n                <a href="#contact">Contact</a>\n            </nav>\n        </header>\n        \n        <main>\n            <section class="hero" id="home">\n                <h1>Hi, I\'m Your Name</h1>\n                <h2>Web Developer & Designer</h2>\n                <p>I create beautiful, responsive websites and web applications using modern technologies.</p>\n                <a href="#projects" class="cta-button">View My Work</a>\n            </section>\n            \n            <section class="about" id="about">\n                <h2>About Me</h2>\n                <p>I\'m a passionate web developer with experience in creating modern, responsive websites. I love turning complex problems into simple, beautiful designs.</p>\n                <p>My expertise includes HTML, CSS, JavaScript, and various modern frameworks. I\'m always eager to learn new technologies and take on challenging projects.</p>\n            </section>\n            \n            <section class="projects" id="projects">\n                <h2>My Projects</h2>\n                <div class="project-grid">\n                    <div class="project-card">\n                        <h3>Project One</h3>\n                        <p>A responsive e-commerce website built with HTML, CSS, and JavaScript.</p>\n                        <span class="tech-stack">HTML, CSS, JavaScript</span>\n                    </div>\n                    <div class="project-card">\n                        <h3>Project Two</h3>\n                        <p>A portfolio website showcasing modern design principles and animations.</p>\n                        <span class="tech-stack">HTML, CSS, JavaScript</span>\n                    </div>\n                </div>\n            </section>\n            \n            <!-- Add Contact section here -->\n        </main>\n        \n        <footer>\n            <!-- Add footer content here -->\n        </footer>\n    </div>\n</body>\n</html>',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Complete HTML structure with contact section and footer',
      validationRules: [
        'Must include section with class="contact" and id="contact"',
        'Must have contact information (email, social links)',
        'Footer must have content (copyright, links)',
        'All navigation links must have corresponding sections'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-6',
      title: 'CSS Reset and Base Styles',
      description: 'Set up CSS foundation with reset, typography, and base styles.',
      instructions: `Create the CSS foundation for your portfolio with professional base styles:

1. CSS Reset and Box Model:
   - Reset default margins and padding with * selector
   - Set box-sizing to border-box for predictable sizing
   - Remove default list styles and link decorations
   
2. Typography Foundation:
   - Choose a professional font stack (system fonts or web fonts)
   - Set base font size and line height for readability
   - Define font weights and text colors
   - Create a typographic scale for headings
   
3. Color Palette:
   - Define CSS custom properties (variables) for colors
   - Choose a professional color scheme
   - Include primary, secondary, and neutral colors
   - Consider accessibility and contrast ratios
   
4. Base Layout Styles:
   - Set up the container with max-width and centering
   - Add basic spacing and layout foundations
   - Ensure the page fills the viewport height
   
5. Link and Button Base Styles:
   - Style links with hover effects
   - Create base button styles
   - Add smooth transitions for interactions

This creates a solid foundation that ensures consistency across all elements.`,
      startingCode: {
        html: '',
        css: '/* CSS Reset and Base Styles */\n\n/* Add your CSS reset here */\n\n/* Typography */\n\n/* Color Variables */\n\n/* Base Layout */\n\n/* Links and Buttons */',
        javascript: ''
      },
      expectedOutput: 'Professional CSS foundation with reset, typography, and base styles',
      validationRules: [
        'Must include CSS reset with * selector',
        'Must set box-sizing to border-box',
        'Must define font family and base typography',
        'Must include CSS custom properties for colors',
        'Must style the container with max-width and centering'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-7',
      title: 'Style the Header and Navigation',
      description: 'Create a professional header with responsive navigation using Flexbox.',
      instructions: `Design a modern, responsive header with professional navigation:

1. Header Layout with Flexbox:
   - Use display: flex on the header
   - Justify content between logo and navigation
   - Align items vertically in the center
   - Add appropriate padding and background
   
2. Logo/Brand Styling:
   - Style your name/logo prominently
   - Use appropriate font size and weight
   - Consider adding a subtle color or effect
   - Ensure it's clickable and accessible
   
3. Navigation Menu Styling:
   - Style the nav element and links
   - Remove default list styling
   - Add hover effects and transitions
   - Use consistent spacing between links
   - Consider active/current page styling
   
4. Responsive Considerations:
   - Ensure navigation works on mobile devices
   - Consider a mobile menu toggle (for now, just stack items)
   - Test different screen sizes
   - Maintain accessibility on all devices
   
5. Visual Enhancements:
   - Add subtle shadows or borders
   - Use smooth transitions for hover effects
   - Ensure good contrast for readability
   - Consider sticky/fixed positioning

This creates a professional header that users expect from modern websites.`,
      startingCode: {
        html: '',
        css: '/* CSS Reset and Base Styles */\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\n    line-height: 1.6;\n    color: #333;\n    background-color: #fff;\n}\n\n/* Color Variables */\n:root {\n    --primary-color: #2563eb;\n    --secondary-color: #64748b;\n    --accent-color: #f59e0b;\n    --text-color: #1f2937;\n    --text-light: #6b7280;\n    --background: #ffffff;\n    --background-light: #f8fafc;\n    --border-color: #e5e7eb;\n}\n\n/* Container */\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 20px;\n}\n\n/* Links */\na {\n    text-decoration: none;\n    color: inherit;\n    transition: color 0.3s ease;\n}\n\n/* Header Styles - Add your header styling here */\nheader {\n    /* Add your header styles */\n}\n\n/* Navigation Styles */\nnav {\n    /* Add your navigation styles */\n}',
        javascript: ''
      },
      expectedOutput: 'Styled header with professional navigation using Flexbox',
      validationRules: [
        'Must use Flexbox for header layout',
        'Must style navigation links with hover effects',
        'Must include transitions for smooth interactions',
        'Header must have proper spacing and alignment'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-8',
      title: 'Design the Hero Section',
      description: 'Create an impressive hero section with modern styling and visual hierarchy.',
      instructions: `Design a compelling hero section that makes a strong first impression:

1. Hero Layout and Spacing:
   - Set minimum height (100vh or appropriate size)
   - Use Flexbox or Grid for centering content
   - Add generous padding and margins
   - Create visual breathing room
   
2. Typography Hierarchy:
   - Style the main headline prominently (large font size)
   - Style the subheading to complement the main title
   - Ensure good contrast and readability
   - Use appropriate font weights and spacing
   
3. Call-to-Action Button:
   - Design an attractive, prominent button
   - Use your brand colors effectively
   - Add hover effects and transitions
   - Ensure the button is accessible and clickable
   - Consider button sizing for mobile devices
   
4. Visual Enhancements:
   - Add a background color or gradient
   - Consider subtle animations or effects
   - Ensure content is well-centered and balanced
   - Add visual interest without overwhelming
   
5. Responsive Design:
   - Test on different screen sizes
   - Adjust font sizes for mobile
   - Ensure button remains accessible
   - Maintain visual hierarchy on all devices

The hero section should immediately communicate your value proposition and encourage visitors to explore further.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Impressive hero section with modern styling and clear visual hierarchy',
      validationRules: [
        'Must style hero section with appropriate height and centering',
        'Must have prominent headline styling',
        'Must style call-to-action button with hover effects',
        'Must use consistent spacing and typography'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-9',
      title: 'Style Content Sections',
      description: 'Design the About and Projects sections with CSS Grid and modern layouts.',
      instructions: `Create beautiful, well-organized content sections using modern CSS:

1. Section Layout and Spacing:
   - Add consistent padding to all sections
   - Use section-specific background colors or patterns
   - Ensure proper spacing between sections
   - Create visual separation without harsh lines
   
2. About Section Styling:
   - Style the section heading prominently
   - Format paragraphs for optimal readability
   - Consider a two-column layout for larger screens
   - Add visual interest with subtle styling
   
3. Projects Section with CSS Grid:
   - Use CSS Grid for the project layout
   - Create responsive grid columns (1 on mobile, 2-3 on desktop)
   - Style project cards with:
     - Background colors and shadows
     - Proper padding and spacing
     - Hover effects for interactivity
     - Clear typography hierarchy
   
4. Project Card Design:
   - Create attractive project cards
   - Style project titles, descriptions, and tech stacks
   - Add subtle borders or shadows
   - Include hover animations
   - Ensure cards are visually balanced
   
5. Responsive Grid:
   - Use auto-fit or auto-fill for responsive behavior
   - Set appropriate gap between grid items
   - Ensure cards look good on all screen sizes
   - Test the layout on mobile devices

This creates professional-looking content sections that showcase your information effectively.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Well-designed content sections using CSS Grid and modern layouts',
      validationRules: [
        'Must use CSS Grid for projects layout',
        'Must style project cards with hover effects',
        'Must have consistent section spacing and typography',
        'Grid must be responsive with appropriate gaps'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-10',
      title: 'Complete Styling and Responsive Design',
      description: 'Finish the CSS with contact section, footer, and full responsive design.',
      instructions: `Complete your portfolio styling with professional finishing touches:

1. Contact Section Styling:
   - Style the contact section with clear layout
   - Format contact information attractively
   - Style email and social media links
   - Add hover effects for interactive elements
   - Consider using icons for contact methods
   
2. Footer Design:
   - Create a professional footer layout
   - Style copyright and footer links
   - Use appropriate background and text colors
   - Keep the footer simple but polished
   
3. Responsive Design Implementation:
   - Add media queries for tablet and mobile
   - Adjust font sizes for different screen sizes
   - Modify layouts for smaller screens
   - Ensure navigation works on mobile
   - Test all sections on various devices
   
4. Final Polish and Details:
   - Add smooth scrolling for navigation links
   - Ensure consistent spacing throughout
   - Check color contrast for accessibility
   - Add subtle animations or transitions
   - Optimize for performance
   
5. Cross-browser Testing:
   - Test in different browsers
   - Ensure fallbacks for older browsers
   - Validate your CSS
   - Check for any layout issues

This completes your portfolio with professional styling that works beautifully across all devices.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Complete, responsive portfolio with professional styling',
      validationRules: [
        'Must include media queries for responsive design',
        'Must style contact section and footer',
        'Must have smooth scrolling or navigation enhancements',
        'All sections must be properly styled and responsive'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-11',
      title: 'Add Smooth Scrolling Navigation',
      description: 'Implement smooth scrolling and active navigation states with JavaScript.',
      instructions: `Add interactive JavaScript features to enhance the user experience:

1. Smooth Scrolling Implementation:
   - Select all navigation links
   - Add click event listeners
   - Prevent default link behavior
   - Implement smooth scrolling to target sections
   - Calculate proper scroll positions
   
2. Active Navigation States:
   - Track which section is currently in view
   - Add/remove active classes on navigation links
   - Use Intersection Observer API for performance
   - Update navigation as user scrolls
   
3. Scroll Event Handling:
   - Add scroll event listener to window
   - Determine which section is currently visible
   - Update navigation highlighting accordingly
   - Throttle scroll events for performance
   
4. Enhanced User Experience:
   - Add smooth transitions for all interactions
   - Ensure keyboard navigation works
   - Handle edge cases (top/bottom of page)
   - Test on different devices and browsers
   
5. Code Organization:
   - Use modern JavaScript (ES6+)
   - Write clean, readable functions
   - Add comments for complex logic
   - Handle errors gracefully

This adds professional navigation behavior that users expect from modern websites.`,
      startingCode: {
        html: '',
        css: '',
        javascript: '// Smooth Scrolling Navigation\n\n// Select navigation links\n\n// Add smooth scrolling functionality\n\n// Active navigation state management\n\n// Scroll event handling'
      },
      expectedOutput: 'Working smooth scrolling navigation with active states',
      validationRules: [
        'Must implement smooth scrolling for navigation links',
        'Must add active states to navigation based on scroll position',
        'Must use event listeners for click and scroll events',
        'JavaScript must be well-organized and commented'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-12',
      title: 'Add Interactive Animations',
      description: 'Implement scroll-triggered animations and interactive effects.',
      instructions: `Add engaging animations and interactive effects to bring your portfolio to life:

1. Scroll-Triggered Animations:
   - Use Intersection Observer to detect when elements enter viewport
   - Add CSS classes to trigger animations
   - Create fade-in, slide-up, or scale animations
   - Stagger animations for multiple elements
   
2. CSS Animation Classes:
   - Create CSS keyframes for different animation types
   - Add classes like .fade-in, .slide-up, .scale-in
   - Use transform and opacity for smooth animations
   - Set appropriate timing and easing functions
   
3. Interactive Hover Effects:
   - Enhance project cards with advanced hover effects
   - Add subtle animations to buttons and links
   - Create engaging micro-interactions
   - Use CSS transforms for smooth effects
   
4. Loading and Reveal Animations:
   - Add a subtle loading animation for the page
   - Reveal content progressively as user scrolls
   - Create a professional, polished feel
   - Ensure animations don't interfere with usability
   
5. Performance Considerations:
   - Use transform and opacity for animations
   - Avoid animating layout properties
   - Add will-change property where appropriate
   - Test performance on slower devices
   
6. Accessibility:
   - Respect prefers-reduced-motion setting
   - Ensure animations don't cause motion sickness
   - Provide alternatives for users who prefer no animation

This adds the final layer of polish that makes your portfolio stand out with professional animations.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Portfolio with smooth animations and interactive effects',
      validationRules: [
        'Must implement scroll-triggered animations using Intersection Observer',
        'Must add CSS keyframes and animation classes',
        'Must enhance hover effects on interactive elements',
        'Must respect accessibility preferences for motion'
      ],
      isCompleted: false,
      isUnlocked: false
    }
  ]
};

export const numberCounterProject: Project = {
  id: 'number-counter',
  title: 'Interactive Number Counter App',
  description: 'Build a feature-rich number counter application using HTML, CSS, and JavaScript. Learn DOM manipulation, event handling, local storage, animations, and modern JavaScript techniques.',
  difficulty: 'Beginner',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  estimatedTime: '3-4 hours',
  thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
  tags: ['DOM', 'Events', 'Interactive', 'JavaScript', 'Local Storage', 'Animations'],
  steps: [
    {
      id: 'step-1',
      title: 'Create the HTML Foundation',
      description: 'Set up the basic HTML structure with proper document setup and semantic elements.',
      instructions: `Start by creating a proper HTML5 document structure for your counter app:

1. Create the HTML5 boilerplate:
   - Add the DOCTYPE declaration
   - Set up the html element with lang attribute
   - Create a complete head section with:
     - Meta charset (UTF-8)
     - Viewport meta tag for responsive design
     - A descriptive title like "Number Counter App"
     - Link to your CSS file (style.css)

2. Set up the body structure:
   - Add a main container div with class "counter-app"
   - This will hold all your counter elements
   - Consider the overall layout and organization

3. Plan your app structure:
   - Think about how the counter should be organized
   - Consider accessibility and semantic HTML
   - Keep the structure simple and clean
   - Plan for future features like multiple counters

This step focuses on creating a solid foundation with proper HTML5 structure that follows web standards and best practices.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A proper HTML5 document with container ready for counter elements',
      validationRules: [
        'Must include proper DOCTYPE and html structure',
        'Must have complete head section with meta tags',
        'Must include div with class "counter-app"',
        'Must link to external CSS file'
      ],
      isCompleted: false,
      isUnlocked: true
    },
    {
      id: 'step-2',
      title: 'Build the Counter Interface',
      description: 'Create the visual elements users will interact with - display and control buttons.',
      instructions: `Add the interactive elements inside your counter container:

1. Create the counter display:
   - Add a container div with class "counter-container"
   - Add an <h1> element with id "count" to show the current value
   - Set the initial text content to "0"
   - This will be your main display area

2. Add control buttons:
   - Create a button container div with class "button-container"
   - Add a decrease button with id "decrease" and text "−" (minus symbol)
   - Add an increase button with id "increase" and text "+" (plus symbol)
   - Use semantic <button> elements for accessibility

3. Add a title and description:
   - Include an <h1> title for your app like "Number Counter"
   - Add a <p> description explaining how to use the counter
   - This improves user experience and accessibility

4. Structure for styling:
   - Use descriptive classes and IDs for CSS targeting
   - Consider the visual hierarchy and layout
   - Ensure buttons are keyboard accessible
   - Plan for responsive design

This creates the core interactive elements that users will see and interact with to control the counter.`,
      startingCode: {
        html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Number Counter App</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="counter-app">\n        <!-- Add your counter interface here -->\n    </div>\n</body>\n</html>',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A counter interface with display and control buttons',
      validationRules: [
        'Must include h1 element with id "count"',
        'Must have button with id "increase"',
        'Must have button with id "decrease"',
        'Counter display must show initial value of 0'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-3',
      title: 'Style the Counter with Modern CSS',
      description: 'Transform your HTML into an attractive, modern interface using CSS.',
      instructions: `Create a beautiful, modern counter interface with professional styling:

1. CSS Reset and Base Styles:
   - Reset default margins and padding with * selector
   - Set box-sizing to border-box for predictable sizing
   - Choose a modern, readable font family
   - Set a beautiful background (gradient or solid color)

2. Center the counter on the page:
   - Use Flexbox on the body to center content
   - Set minimum height to 100vh (full viewport height)
   - Center both horizontally and vertically
   - Add some padding for mobile devices

3. Style the counter container:
   - Add generous padding for breathing room
   - Set a white or light background color
   - Add border-radius for modern rounded corners
   - Include a subtle box-shadow for depth
   - Center-align all text content

4. Make the counter display prominent:
   - Increase font size significantly (4rem or larger)
   - Use bold font weight
   - Add margin for spacing
   - Use a distinctive color that stands out
   - Consider adding a subtle text shadow

5. Style the buttons attractively:
   - Make them large enough for easy clicking (min 60px)
   - Add padding for comfortable touch targets
   - Use contrasting colors for visibility
   - Add border-radius to match the container
   - Remove default button borders
   - Add margin between buttons

6. Add interactive hover effects:
   - Change background color on hover
   - Add a subtle transform (scale or translate)
   - Include smooth transitions for all effects
   - Ensure the cursor changes to pointer

Focus on creating an interface that's both beautiful and highly functional.`,
      startingCode: {
        html: '',
        css: '/* CSS Reset and Base Styles */\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    min-height: 100vh;\n}\n\n/* Add your counter styles here */',
        javascript: ''
      },
      expectedOutput: 'A beautifully styled, centered counter interface with hover effects',
      validationRules: [
        'Must center counter using Flexbox',
        'Must style buttons with hover effects',
        'Must include box-shadow and border-radius on container',
        'Counter display must be large and prominent'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-4',
      title: 'Select DOM Elements with JavaScript',
      description: 'Learn to access HTML elements from JavaScript for interactivity.',
      instructions: `Connect your JavaScript to the HTML elements you created:

1. Understand DOM selection:
   - The DOM (Document Object Model) represents your HTML as JavaScript objects
   - You can select elements by their ID, class, or tag name
   - Once selected, you can read and modify these elements

2. Select your counter elements:
   - Use document.getElementById('count') to get the counter display
   - Select the increase button using its ID
   - Select the decrease button using its ID
   - Store each selection in a descriptive variable name

3. Add error checking:
   - Verify that elements exist before using them
   - Add console.log() statements to check each element
   - Handle cases where elements might not be found
   - Use descriptive variable names for clarity

4. Best practices:
   - Use const for variables that won't be reassigned
   - Group related selections together
   - Add comments to explain what each selection does
   - Consider using more modern selection methods

5. Testing your selections:
   - Open browser developer tools to see console output
   - Make sure no elements return null or undefined
   - Test that you can access element properties
   - Verify IDs in HTML match exactly (case-sensitive)

This step teaches you the fundamental skill of connecting JavaScript to HTML elements, which is essential for all interactive web development.`,
      startingCode: {
        html: '',
        css: '',
        javascript: '// DOM Element Selection\n// Select the counter display element\n\n// Select the increase button\n\n// Select the decrease button\n\n// Test your selections (remove these console.logs later)\nconsole.log("Counter display:", countDisplay);\nconsole.log("Increase button:", increaseBtn);\nconsole.log("Decrease button:", decreaseBtn);'
      },
      expectedOutput: 'JavaScript variables that successfully reference the HTML elements',
      validationRules: [
        'Must use getElementById to select counter display',
        'Must select both increase and decrease buttons',
        'Must store selections in variables',
        'Console should show selected elements without errors'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-5',
      title: 'Create Counter Logic and State Management',
      description: 'Implement the core functionality to track and update the counter value.',
      instructions: `Build the logic that powers your counter with proper state management:

1. Initialize the counter state:
   - Create a variable to track the current count (start at 0)
   - This variable is your "single source of truth"
   - All display updates will use this variable
   - Consider using let since the value will change

2. Create a function to update the display:
   - Write a function called updateDisplay() or updateCounter()
   - Inside the function, set the counter element's textContent
   - Use the current counter variable value
   - This separates the logic from the display update

3. Add input validation:
   - Consider adding minimum and maximum limits
   - Handle edge cases (very large numbers)
   - Ensure the counter behaves predictably
   - Add error handling for unexpected values

4. Understand the pattern:
   - Keep data (counter variable) separate from display (HTML)
   - Always update data first, then update display
   - This makes your code more predictable and easier to debug
   - Follow the principle of separation of concerns

5. Test your update function:
   - Call updateDisplay() to make sure it works
   - Try manually changing the counter variable and calling the function
   - Verify the display updates correctly
   - Test with different values

This step teaches you essential programming concepts: state management and separation of concerns.`,
      startingCode: {
        html: '',
        css: '',
        javascript: '// DOM Element Selection\nconst countDisplay = document.getElementById(\'count\');\nconst increaseBtn = document.getElementById(\'increase\');\nconst decreaseBtn = document.getElementById(\'decrease\');\n\n// Counter State\n// Initialize counter variable\n\n// Function to update the display\n// This function should update the counter display with current value\n\n// Test the update function\n// Try calling updateDisplay() to see if it works'
      },
      expectedOutput: 'A working function that updates the counter display',
      validationRules: [
        'Must initialize a counter variable',
        'Must create an updateDisplay function',
        'Function must update the textContent of counter display',
        'Display must show the current counter value'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-6',
      title: 'Add Button Event Listeners',
      description: 'Make your buttons respond to clicks by adding event listeners.',
      instructions: `Connect your buttons to JavaScript functions that respond to user clicks:

1. Understand event listeners:
   - Event listeners "listen" for specific events (like clicks)
   - When the event happens, they run a function
   - This is how you make web pages interactive
   - Events can be clicks, key presses, mouse movements, etc.

2. Add click event listeners:
   - Use addEventListener('click', function) on each button
   - For the increase button: increment counter, then update display
   - For the decrease button: decrement counter, then update display
   - Always follow the pattern: modify data, then update display

3. Event listener syntax options:
   - You can use anonymous functions: addEventListener('click', function() {...})
   - Or arrow functions: addEventListener('click', () => {...})
   - Or named functions: addEventListener('click', handleIncrease)
   - Choose the style that's most readable for your code

4. Add user feedback:
   - Consider adding visual feedback when buttons are clicked
   - You could briefly change button colors or add animations
   - Provide immediate response to user actions
   - Ensure the interface feels responsive

5. Test your functionality:
   - Click the + button - number should increase
   - Click the - button - number should decrease
   - Each click should update immediately
   - Try clicking multiple times rapidly
   - Test keyboard navigation (Tab and Enter)

6. Debugging tips:
   - Add console.log() statements to see if events fire
   - Check that counter variable changes correctly
   - Verify updateDisplay() is being called
   - Use browser developer tools to debug

This step brings your counter to life by making it respond to user interaction!`,
      startingCode: {
        html: '',
        css: '',
        javascript: '// DOM Element Selection\nconst countDisplay = document.getElementById(\'count\');\nconst increaseBtn = document.getElementById(\'increase\');\nconst decreaseBtn = document.getElementById(\'decrease\');\n\n// Counter State\nlet counter = 0;\n\n// Function to update the display\nfunction updateDisplay() {\n    countDisplay.textContent = counter;\n}\n\n// Event Listeners\n// Add click event listener for increase button\n\n// Add click event listener for decrease button\n\n// Initialize display\nupdateDisplay();'
      },
      expectedOutput: 'Fully functional counter that responds to button clicks',
      validationRules: [
        'Must add event listeners to both buttons',
        'Increase button must increment counter',
        'Decrease button must decrement counter',
        'Display must update after each click'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-7',
      title: 'Add Reset Functionality',
      description: 'Enhance your counter with a reset feature and input validation.',
      instructions: `Add a reset button and improve your counter with better functionality:

1. Update your HTML structure:
   - Add a third button with id "reset"
   - Use clear text like "Reset" or "Clear"
   - Position it logically with your other buttons
   - Consider the visual layout and button grouping

2. Style the reset button:
   - Make it visually distinct from the +/- buttons
   - Consider using a different color scheme (red, gray, or neutral)
   - Ensure it maintains the same size and spacing as other buttons
   - Add hover effects for consistency
   - Make sure it fits your overall design

3. Add JavaScript functionality:
   - Select the reset button using getElementById
   - Add a click event listener
   - When clicked, set counter variable to 0
   - Call updateDisplay() to show the change

4. Add input validation and limits:
   - Set a maximum value (e.g., 999 or 1000)
   - Set a minimum value (e.g., -999 or 0)
   - Prevent the counter from going beyond these limits
   - Provide user feedback when limits are reached

5. Enhanced user experience:
   - Add a confirmation dialog for reset (optional)
   - Consider keyboard shortcuts (like pressing 'R' for reset)
   - Add visual feedback when limits are reached
   - Ensure all buttons remain accessible

6. Test the complete functionality:
   - Increase the counter several times
   - Decrease it a few times
   - Click reset - should return to 0
   - Test the limits you've set
   - Verify all buttons work correctly together

This step completes your basic counter and teaches you how to extend existing functionality with new features.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'A complete counter app with increase, decrease, and reset functionality',
      validationRules: [
        'Must include a reset button in HTML',
        'Reset button must be styled consistently',
        'Reset button must set counter to 0 when clicked',
        'All three buttons must work correctly together'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-8',
      title: 'Add Local Storage Persistence',
      description: 'Implement local storage to save and restore the counter value.',
      instructions: `Add data persistence so the counter remembers its value between sessions:

1. Understand Local Storage:
   - Local Storage allows you to save data in the browser
   - Data persists even after closing the browser
   - Perfect for saving user preferences and app state
   - Data is stored as strings, so you may need to convert numbers

2. Save counter value to Local Storage:
   - Create a function to save the current counter value
   - Use localStorage.setItem('counterValue', counter)
   - Call this function whenever the counter changes
   - Update your increment, decrement, and reset functions

3. Load counter value on page load:
   - Create a function to load the saved value
   - Use localStorage.getItem('counterValue')
   - Convert the string back to a number
   - Handle the case where no saved value exists (first visit)
   - Set the counter variable and update the display

4. Handle edge cases:
   - What if localStorage is not available?
   - What if the saved value is corrupted?
   - Provide fallback behavior for these scenarios
   - Use try-catch blocks for error handling

5. Improve the user experience:
   - Show a subtle indicator when data is saved
   - Consider adding a "Clear All Data" option
   - Provide feedback about data persistence
   - Test with browser developer tools

6. Test thoroughly:
   - Change the counter value and refresh the page
   - Close the browser and reopen it
   - Clear localStorage and test first-time behavior
   - Test in different browsers

This feature makes your app much more useful by remembering the user's progress.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Counter app that saves and restores values using Local Storage',
      validationRules: [
        'Must save counter value to localStorage when changed',
        'Must load saved value when page loads',
        'Must handle cases where no saved data exists',
        'Must include error handling for localStorage operations'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-9',
      title: 'Add Animations and Visual Feedback',
      description: 'Enhance the user experience with smooth animations and visual feedback.',
      instructions: `Add engaging animations and visual feedback to make your counter more interactive:

1. Counter Change Animations:
   - Add CSS animations when the counter value changes
   - Create a "pulse" or "scale" effect when numbers change
   - Use CSS transitions for smooth effects
   - Consider different animations for increase vs decrease

2. Button Interaction Feedback:
   - Add active states when buttons are pressed
   - Create "pressed" animations using CSS transforms
   - Add ripple effects or color changes on click
   - Ensure feedback is immediate and satisfying

3. CSS Animation Implementation:
   - Create CSS keyframes for your animations
   - Use classes like .pulse, .scale-up, .bounce
   - Add and remove these classes with JavaScript
   - Use requestAnimationFrame for smooth animations

4. JavaScript Animation Control:
   - Add animation classes when counter changes
   - Remove animation classes after animation completes
   - Use setTimeout or animation event listeners
   - Prevent animation conflicts

5. Visual State Indicators:
   - Change colors when reaching limits (max/min values)
   - Add visual feedback for successful operations
   - Consider progress indicators or status messages
   - Use subtle color changes to indicate state

6. Performance Considerations:
   - Use CSS transforms instead of changing layout properties
   - Avoid animating too many elements at once
   - Test on slower devices
   - Provide options to disable animations if needed

7. Accessibility:
   - Respect prefers-reduced-motion setting
   - Ensure animations don't interfere with usability
   - Provide alternative feedback for users who can't see animations

This adds the final layer of polish that makes your counter app feel professional and engaging.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Counter app with smooth animations and visual feedback',
      validationRules: [
        'Must add CSS animations for counter value changes',
        'Must include button interaction feedback',
        'Must use JavaScript to trigger animations',
        'Must respect accessibility preferences for motion'
      ],
      isCompleted: false,
      isUnlocked: false
    },
    {
      id: 'step-10',
      title: 'Add Advanced Features',
      description: 'Implement advanced features like step size control and keyboard shortcuts.',
      instructions: `Add advanced features to make your counter app more powerful and user-friendly:

1. Step Size Control:
   - Add an input field to control increment/decrement step size
   - Allow users to change by 1, 5, 10, or custom amounts
   - Update your increment/decrement functions to use the step size
   - Validate step size input (positive numbers only)

2. Keyboard Shortcuts:
   - Add keyboard event listeners to the document
   - Implement shortcuts like:
     - Arrow Up/Plus: increase counter
     - Arrow Down/Minus: decrease counter
     - R: reset counter
     - Space: toggle between different step sizes
   - Show keyboard shortcuts in the UI

3. Multiple Counter Support:
   - Refactor your code to support multiple counters
   - Create a Counter class or object constructor
   - Allow users to add/remove counters
   - Each counter should have its own state and controls

4. Enhanced UI Features:
   - Add a history of recent values
   - Include undo/redo functionality
   - Add preset buttons for common values (0, 10, 50, 100)
   - Include a "random" button for fun

5. Data Export/Import:
   - Allow users to export their counter data
   - Implement import functionality for saved data
   - Support JSON format for data exchange
   - Add backup and restore features

6. Settings and Preferences:
   - Create a settings panel
   - Allow customization of colors, themes, or sounds
   - Save user preferences to localStorage
   - Provide reset to defaults option

7. Code Organization:
   - Refactor your code into modules or classes
   - Separate concerns (UI, data, storage)
   - Add comprehensive error handling
   - Include JSDoc comments for documentation

This transforms your simple counter into a feature-rich application that demonstrates advanced JavaScript concepts.`,
      startingCode: {
        html: '',
        css: '',
        javascript: ''
      },
      expectedOutput: 'Advanced counter app with multiple features and excellent code organization',
      validationRules: [
        'Must implement step size control',
        'Must add keyboard shortcuts',
        'Must include at least 2 advanced features',
        'Code must be well-organized and documented'
      ],
      isCompleted: false,
      isUnlocked: false
    }
  ]
};

// Export the projects array that contains all available projects
export const projects: Project[] = [
  portfolioProject,
  numberCounterProject
];