# HealthMan - Fitness Exercise Planner

A modern, responsive web application that generates personalized fitness and exercise plans based on individual metrics, goals, and current fitness levels. Features a sleek dark/light theme and provides BMI calculations with customized workout recommendations.It also uses **local storage** to store user preferences and history for a seamless experience.

## 🌟 Features

- **Personalized Exercise Plans**: Custom workout schedules based on:
  - BMI calculations
  - Fitness goals
  - Current fitness level
  - Age and gender considerations
  
- **Smart UI Features**:
  - 🌓 Dark/Light theme toggle
  - 💾 Automatic form data persistence
  - 📱 Fully responsive design
  - ⚡ Real-time BMI calculation
  - 🎨 Modern gradient UI elements

## 🖥️ Demo

Live Demo: https://healthman.netlify.app/

## ⚙️ Tech Stack

- Frontend:
  - HTML5
  - CSS3 (Custom Properties, Flexbox, Grid)
  - Vanilla JavaScript
- Backend:
  - Node.js
  - Express
- Deployment:
  - Frontend: Vercel
  - Backend: Railway
- APIs:
  - Gemini API
  - Fitness API
  - Local Storage API 

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/NamanKajla/HealthMan.git
```

2. Navigate to project directory:
```bash
cd HealthMan
```

## 📱 Application Structure

```
HealthMan/
├── index.html          # Main application entry
├── style.css          # Styling and themes
├── script.js         # Core application logic
└── assets/          # Images and resources
```

## 💡 Key Features Explained

### BMI Calculator
- Automatic calculation based on height and weight
- Visual category indication
- Color-coded results

### Exercise Plan Generation
- Weekly schedule creation
- Customized based on:
  - BMI category
  - Fitness goals
  - Current fitness level
  - Age and gender factors

### Data Persistence
- Form data automatically saved
- Preferences remembered
- Theme choice persistence

## 🎯 API Endpoints

```javascript
POST /fetch-exercise-plan
Host: healthman-backend-production.up.railway.app

Request Body: {
    "bmi": number,
    "age": number,
    "gender": string,
    "fitnessGoal": string,
    "fitnessLevel": string,
    "name": string
}
```
   ### 1. Gemini API (AI-based recommendations)
   - Requires an API key.
   - Used to generate personalized fitness insights.
     
   ### 2. Fitness API (Exercise & Diet Data)
   - Fetches exercise videos and diet plans.

## 🎨 UI Features

- Gradient-enhanced interface
- Smooth transitions
- Responsive design
- Accessibility-focused
- Clear visual hierarchy

## 🌌 Local Storage Usage

- Stores user preferences like weight, height, and fitness goals.





