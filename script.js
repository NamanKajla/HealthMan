document.getElementById("fitnessForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const age = parseInt(document.getElementById("age").value);

    // Input validation
    if (!name || !age || !gender || !weight || !height) {
        alert("Please fill in all fields");
        return;
    }
    if (age <= 0 || weight <= 0 || height <= 0) {
        alert("Invalid input values");
        return;
    }

    const bmi = ((weight * 10000) / (height * height)).toFixed(2);
    
    try {
        const recommendations = await fetchRecommendations(bmi, age, gender);
        displayRecommendations(recommendations);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch recommendations. Please try again.");
    }
});

async function fetchRecommendations(bmi, age, gender) {
    try {
        const response = await fetch("http://localhost:3000/fetch-recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bmi, age, gender })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
}

function displayRecommendations(data) {
    const resultsDiv = document.getElementById("results");
    if (data.recommendation) {
        resultsDiv.innerHTML = `<h3>Your Personalized Recommendations:</h3>
            <p>${data.recommendation}</p>`;
    } else {
        resultsDiv.innerHTML = '<p>No recommendations available.</p>';
    }
}