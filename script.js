// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Check for saved theme preference, otherwise use system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icons
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
};

// Initial theme setup
setTheme(getPreferredTheme());

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Save form data in localStorage
const saveFormData = () => {
    const formData = {
        name: document.getElementById("name").value,
        weight: document.getElementById("weight").value,
        gender: document.getElementById("gender").value,
        height: document.getElementById("height").value,
        age: document.getElementById("age").value,
        fitnessGoal: document.getElementById("fitnessGoal").value,
        fitnessLevel: document.getElementById("fitnessLevel").value
    };
    localStorage.setItem("fitnessFormData", JSON.stringify(formData));
};

// Load form data from localStorage
const loadFormData = () => {
    const savedData = localStorage.getItem("fitnessFormData");
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById("name").value = formData.name || "";
        document.getElementById("weight").value = formData.weight || "";
        document.getElementById("gender").value = formData.gender || "";
        document.getElementById("height").value = formData.height || "";
        document.getElementById("age").value = formData.age || "";
        document.getElementById("fitnessGoal").value = formData.fitnessGoal || "";
        document.getElementById("fitnessLevel").value = formData.fitnessLevel || "";
    }
};

// Add event listeners to save data when the user types
document.querySelectorAll("#fitnessForm input, #fitnessForm select").forEach(input => {
    input.addEventListener("input", saveFormData);
});

// Load saved data when the page loads
document.addEventListener("DOMContentLoaded", loadFormData);

document.getElementById("fitnessForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);
    const fitnessGoal = document.getElementById("fitnessGoal").value;
    const fitnessLevel = document.getElementById("fitnessLevel").value;

    // Input validation
    if (!name || !age || !gender || !weight || !height || !fitnessGoal || !fitnessLevel) {
        alert("Please fill in all fields");
        return;
    }
    if (age <= 0 || weight <= 0 || height <= 0) {
        alert("Invalid input values");
        return;
    }

    const bmi = ((weight * 10000) / (height * height)).toFixed(2);
    
    try {
        const recommendations = await fetchExercisePlan(bmi, age, gender, fitnessGoal, fitnessLevel, name);
        displayExercisePlan(recommendations, bmi, name);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch exercise plan. Please try again.");
    }
});

async function fetchExercisePlan(bmi, age, gender, fitnessGoal, fitnessLevel, name) {
    const loadingDiv = document.getElementById("loading");
    loadingDiv.style.display = "block"; // Show loading

    try {
        const response = await fetch("https://healthman-backend-production.up.railway.app/fetch-exercise-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bmi, age, gender, fitnessGoal, fitnessLevel, name })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching exercise plan:", error);
        throw error;
    } finally {
        loadingDiv.style.display = "none"; // Hide loading
    }
}


function displayExercisePlan(data, bmi, name) {
    const resultsDiv = document.getElementById("results");
    if (data.exercisePlan) {
        // Split the plan into sections
        const sections = data.exercisePlan.split(/\d+\./g).filter(Boolean);
        
        let html = `
            <h2>Personalized Exercise Plan for ${name}</h2>
            <div class="bmi-info">
                <span>Your BMI: <strong>${bmi}</strong></span>
                <span class="bmi-category"><strong>${getBMICategory(bmi)}</strong></span>
            </div>
        `;

        // Process each section
        const sectionTitles = [];
        sections.forEach((section, index) => {
            if (section.trim()) {
                html += `
                    <div class="recommendation-section">
                        ${formatSectionContent(section)}
                    </div>
                `;
            }
        });

        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = '<p>No exercise plan available.</p>';
    }
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal Weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

function formatSectionContent(content) {
    // Convert bullet points and lists into structured HTML
    const lines = content.split('\n').filter(line => line.trim());
    let html = '<ul class="recommendation-list">';
    
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('-')) {
            html += `<li>${trimmedLine.substring(1).trim()}</li>`;
        } else if (trimmedLine.includes(':')) {
            const [title, ...rest] = trimmedLine.split(':');
            html += `<h4>${title.trim()}:</h4>`;
            if (rest.length) {
                html += `<p>${rest.join(':').trim()}</p>`;
            }
        } else {
            html += `<p>${trimmedLine}</p>`;
        }
    });

    html += '</ul>';
    return html;
}
