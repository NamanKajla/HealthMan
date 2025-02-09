# Fitness AI Web App

## Overview
This Fitness AI Web App is designed to provide personalized workout and diet recommendations based on user inputs such as weight, height, and fitness goals. The application fetches exercise recommendations using two APIs:
1. **Gemini API** (for AI-based insights and recommendations)
2. **Fitness API** (for fetching exercise and diet plans)

It also uses **local storage** to store user preferences and history for a seamless experience.

## Features
- User input for weight, height, and fitness goals
- AI-generated workout and diet plans
- Video references for exercises
- Gym and sports rules on request
- Loading feature during API calls
- Stores user preferences using local storage

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **APIs:**
  - **Gemini API**: AI-powered recommendations
  - **Fitness API**: Exercise and diet details
- **Local Storage**: Saves user preferences

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/NamanKajla/HealthMan.git
   ```
2. Navigate to the project directory:
   ```sh
   cd HealthMan
   ```
3. Open `index.html` in a browser.

## API Integration
### 1. Gemini API (AI-based recommendations)
- Requires an API key.
- Used to generate personalized fitness insights.
- Example usage:
  ```js
  async function getAIRecommendations(userInput) {
      const response = await fetch("https://gemini-api.example.com/recommend", {
          method: "POST",
          headers: { "Authorization": `Bearer ${GEMINI_API_KEY}` },
          body: JSON.stringify(userInput)
      });
      return response.json();
  }
  ```

### 2. Fitness API (Exercise & Diet Data)
- Fetches exercise videos and diet plans.
- Example usage:
  ```js
  async function getFitnessData(query) {
      const response = await fetch(`https://fitness-api.example.com/data?q=${query}&apiKey=${FITNESS_API_KEY}`);
      return response.json();
  }
  ```

## Local Storage Usage
- Stores user preferences like weight, height, and fitness goals.
- Example usage:
  ```js
  function saveUserData(userData) {
      localStorage.setItem("userPreferences", JSON.stringify(userData));
  }
  
  function getUserData() {
      return JSON.parse(localStorage.getItem("userPreferences")) || {};
  }
  ```

## Loading Feature
- Displays a loading animation while fetching data.
- Example implementation:
  ```js
  function showLoading() {
      document.getElementById("loading").style.display = "block";
  }
  
  function hideLoading() {
      document.getElementById("loading").style.display = "none";
  }
  ```


