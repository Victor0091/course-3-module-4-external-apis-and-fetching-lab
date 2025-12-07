const weatherApi = "https://api.weather.gov/alerts/active?area=";

async function fetchWeatherAlerts() {
  const input = document.getElementById("state-input");
  const display = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  const state = input.value.trim();

  // Clear previous display
  display.textContent = "";

  try {
    // API request
    const response = await fetch(weatherApi + state);
    const data = await response.json();

    // Hide error if previously shown
    errorDiv.classList.add("hidden");
    errorDiv.textContent = "";

    // Display alerts
    const alerts = data.features || [];

    display.textContent = `Weather Alerts: ${alerts.length}`;

    alerts.forEach(alertObj => {
      const p = document.createElement("p");
      p.textContent = alertObj.properties.headline;
      display.appendChild(p);
    });

  } catch (err) {
    // Show error message
    errorDiv.classList.remove("hidden");
    errorDiv.textContent = err.message;
  }

  // Always clear input after clicking
  input.value = "";
}

// Attach button click
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("fetch-alerts");
  if (btn) {
    btn.addEventListener("click", fetchWeatherAlerts);
  }
});

module.exports = { fetchWeatherAlerts };
