let travelRecommendations = null;

getTravelRecommendations();

async function getTravelRecommendations() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        const data = await response.json();
        travelRecommendations = data;
        console.log('travelRecomm', travelRecommendations);
    } catch (error) {
        console.error('Error fetching travel recommendations:', error);
    }

    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("resultsContainer");
    const searchBtn = document.getElementById("searchBtn");
    const clearBtn = document.getElementById("clearBtn");

    searchBtn.addEventListener("click", () => {
        const keyword = searchInput.value.trim().toLowerCase();

        if (!keyword) {
            resultsContainer.innerHTML = "<p>Please enter a search keyword.</p>";
            return;
        }

        resultsContainer.innerHTML = "";

        if (!travelRecommendations) {
            resultsContainer.innerHTML = "<p>Data not loaded yet...</p>";
            return;
        }

        if (keyword.includes("beach")) {
            displayResults(travelRecommendations.beaches);
        } else if (keyword.includes("temple")) {
            displayResults(travelRecommendations.temples);
        } else if (keyword.includes("country")) {
            displayResults(travelRecommendations.countries);
        } else {
            resultsContainer.innerHTML = "<p>No results found for that keyword.</p>";
        }
    });

    function displayResults(list) {
        resultsContainer.innerHTML = "";

        list.slice(0, 2).forEach(item => {
            const div = document.createElement("div");
            div.classList.add("result-card");

            div.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-img"/>
                <div class="text">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button class="btn">VISIT</button>
                </div>
            `;

            if (item.timeZone) {
                const options = {
                    timeZone: item.timeZone,
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                };
                const countryTime = new Date().toLocaleTimeString('en-US', options);

                div.innerHTML += `
                    <p><strong>Local Time:</strong> ${countryTime}</p>
                `;
            }

            resultsContainer.appendChild(div);
        });
    }

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        resultsContainer.innerHTML = "";
    })
}
