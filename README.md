# EVA Prototype

A sleek UI prototype for EVA (Electric Vehicle Assistant) designed to help FPL customer service agents troubleshoot EV charger issues.

## Live Demo

Deployed on Vercel: [View Prototype](https://eva-test.vercel.app)

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

## Project Structure

```
eva-test/
├── eva-prd.md           # Product Requirements Document
├── eva-design.md        # Design Document
├── eva-tasks.md         # Task List
├── memory-bank.md       # Project Memory Bank
├── prototype/           # Development files
├── public/              # Vercel deployment files
└── package.json         # Project configuration
```

## Local Development

```bash
cd prototype
python -m http.server 8000
# Open http://localhost:8000
```

## Technologies Used
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Inter)
- Responsive design with CSS Grid and Flexbox

---

*Built for FPL Customer Service Training and Prototyping*