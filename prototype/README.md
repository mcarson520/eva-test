# EVA Prototype - Customer Service Assistant

A sleek UI prototype for EVA (Electric Vehicle Assistant) designed to help FPL customer service agents troubleshoot EV charger issues.

## Features

✅ **User Story 1: Consolidated Customer & Charger Data View**
- Customer information panel with account details
- Real-time charger status with error codes
- Visual aids (breaker panel and LED indicator references)
- Past interaction history access

✅ **User Story 2: Easy New Chat Session Management**  
- "Start New Chat" button to reset sessions
- Session state management
- Clean interface for handling multiple cases

## Interactive Elements

- **Chat Interface**: Simulated conversation with EVA
- **Common Prompts**: Quick access to frequent troubleshooting scenarios
- **Visual Indicators**: LED status indicators and visual references
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Local Development
```bash
# Navigate to the prototype folder
cd prototype

# Start local server (Python 3)
python -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000

# Open http://localhost:8000 in your browser
```

### Option 2: Deploy to Vercel
1. Push this folder to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with default settings

## File Structure
```
prototype/
├── index.html          # Main UI structure
├── styles.css          # Complete styling
├── script.js           # Interactive functionality
├── package.json        # Project configuration
└── README.md           # This file
```

## Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Interactive functionality
- **Google Fonts**: Inter font family for clean typography

## Demo Scenarios

Try these interactions:
1. Type "error code E-204" to see troubleshooting guidance
2. Click "Charger Not Working" prompt for guided assistance
3. Use "Start New Chat" to reset the session
4. Click "View Past Cases" to see customer history
5. Ask about "billing" or "wifi" for specific help flows

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

*Built for FPL Customer Service Training and Prototyping*