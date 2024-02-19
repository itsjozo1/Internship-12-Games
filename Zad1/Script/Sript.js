import { 
    getTopRated,
    getSearchedGames,
    getPopularPlatforms,
    getGamesByPlatforms,
    getGameById,
    getStoreDetails,
    getTopDevelopers,
    getGamesByDeveloper,
    getGamesByDate,
    getGamesByMetacritic
} from "./Api.js";

let gameContainer1 = document.querySelector("#zad1 .games-container");
let gameContainer2 = document.querySelector("#zad2 .games-container");
let gameContainer3 = document.querySelector("#zad3 .games-container");
let gameContainer6 = document.querySelector("#zad6 .games-from-developer-container");
let gameContainer7 = document.querySelector("#zad7 .games-container");
let gameContainer8 = document.querySelector("#zad8 .games-container");

function createGameCard(game) {
    if (game.background_image === null) {
        game.background_image = "./Assets/no-imeage.png";
    }
    let genresList = game.genres.map(genre => genre.name);

    let stars = "";
    if (game.metacritic !== null) {
        const rating = parseInt(game.metacritic);
        const numStars = Math.round(rating / 20); 

        for (let i = 0; i < 5; i++) {
            if (i < numStars) {
                stars += "★";
            } else {
                stars += "☆"; 
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            stars += "☆"; 
        }
    }

    return `
    <img class="" src=${game.background_image} alt=${game.name}>
    <div class="game-desc">
      <h3 class="game-title">${game.name} ${stars}</h3>
      <p class="game-text">
           Release Date: 
           <span class="release-date">${game.released}</span>
       </p>
      <p class="game-text">
           Metacritic rating: 
           <span class="rating">${game.metacritic}</span>
       </p>
       <p>
            Genre:
            <span>${genresList.join(", ")}</span>
       </p>
    </div>
    `;
}



function createGameDesc(game){
    if(game.background_image === null){
        game.background_image = "./Assets/no-imeage.png"
    }
    let genresList = game.genres.map(genre => genre.name)

    return `
    <img class="" src=${game.background_image} alt=${game.name}>
    <div class="game-desc">
      <h3 class="game-title">${game.name}</h5>
      <p class="game-text">
           Release Date: 
           <span class="release-date">${game.released}</span>
       </p>
      <p class="game-text">
           Metacritic rating: 
           <span class="rating">${game.metacritic}</span>
       </p>
       <p>
            Genre:
            <span>${genresList.join(", ")}</span>
       </p>
    </div>
    `;
}

function createStoreDesc(store){
    if(store.image_background === null){
        store.image_background = "./Assets/no-imeage.png"
    }

    return `
    <img src="${store.image_background}" alt="">
    <div class="store-desc">
      <h3 class="store-headline">${store.name}</h3>
      <p class="store-number-of-games">Number of games: ${store.games_count}</p>
    </div>
    `;
}

function appendStores(store, container){
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = createStoreDesc(store);
        container.appendChild(card);
}

function appendGames(games, container) {
    for (const game of games) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = createGameDesc(game);
        container.appendChild(card);
    }
}
function appendGamesByDeveloper(games, container, developer) {
    const developerName = document.createElement("h2");
    developerName.classList.add("developer-name");
    developerName.textContent = developer;

    const developerGames = document.createElement("div");
    developerGames.classList.add("developer-games-container");

    container.appendChild(developerGames);
    developerGames.appendChild(developerName); 

    for (const game of games) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = createGameDesc(game);
        developerGames.appendChild(card);
    }
}


function changePlatformsColor(platformElements, enteredPlatformNames) {
    platformElements.forEach(platformElement => {
        platformElement.style.color = 'white';
        const platformName = platformElement.textContent.trim().toLowerCase();
        if (enteredPlatformNames.includes(platformName)) {
            platformElement.style.color = 'yellow';
        }
    });
}

function checkDates(startDate, endDate) {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(startDate) || !dateFormatRegex.test(endDate)) {
        alert("Please enter dates in the format yyyy-mm-dd.");
        return false;
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        alert("Please enter valid dates.");
        return false;
    }

    if (parsedStartDate > parsedEndDate) {
        alert("Start date cannot be newer than end date.");
        return false; 
    }
    return true; 
}

function checkNumbers(startMetacritic, endMetacritic){
    startMetacritic = parseInt(startMetacritic);
    endMetacritic = parseInt(endMetacritic);

    if (isNaN(startMetacritic) || isNaN(endMetacritic) || startMetacritic < 0 || startMetacritic > 100 || endMetacritic < 0 || endMetacritic > 100) {
        alert("Metacritic scores must be between 0 and 100.");
    }

    if (startMetacritic > endMetacritic) {
        alert("Minimum Metacritic score cannot be greater than the maximum score.");
        return; 
    }
}

(async () => {
    //ZAD 1
    let games = await getTopRated();
    console.log(games);
    appendGames(games, gameContainer1);

    //ZAD 2
    let button = document.querySelector(".search-button")
    button.onclick = async () => {
        gameContainer2.innerHTML = "";
        try {
            let searchString = document.querySelector(".search-game").value;
            let searchGames = await getSearchedGames(searchString);
            appendGames(searchGames, gameContainer2);
        } catch (error) {
            console.error("Error fetching or displaying searched games:", error);
        }
    };

    //ZAD 3
    let platforms = await getPopularPlatforms();

    const platformNameToIdMap = {};
    platforms.forEach(platform => {
        platformNameToIdMap[platform.name.toLowerCase()] = platform.id;
    });

    const platformsContainer = document.querySelector(".platforms-container");
    platforms.forEach(platform => {
        let platformCard = document.createElement("li");
        platformCard.textContent = platform.name;
        platformsContainer.appendChild(platformCard);
    });

    const platformsButton = document.querySelector(".search-platform-button");
    platformsButton.onclick = async () => {
        gameContainer3.innerHTML = "";
        let enteredPlatforms = document.querySelector(".search-platform").value;

        const enteredPlatformNames = enteredPlatforms.split(",").map(name => name.trim().toLowerCase());

        const enteredPlatformIds = enteredPlatformNames.map(name => platformNameToIdMap[name]).filter(id => id !== undefined);

        let gamesByPlatform = await getGamesByPlatforms(enteredPlatformIds);
        appendGames(gamesByPlatform, gameContainer3);

        const platformElements = document.querySelectorAll('.platforms-container li');
        changePlatformsColor(platformElements, enteredPlatformNames);
    };

    //ZAD 4
    let searchIdButton = document.querySelector(".search-gameId-button");
    searchIdButton.onclick = async () => {
        let enteredId = document.querySelector(".search-gameId").value;
        console.log(enteredId);
        let searchedGameById = await getGameById(enteredId);
        console.log(searchedGameById);
        let searchedGameCard = document.querySelector(".searched-game-container");
        searchedGameCard.innerHTML = createGameCard(searchedGameById);
    };
    
    //ZAD 5
    let storesContainer = document.querySelector(".stores-container");
    let searchStoresButton = document.querySelector(".search-stores-button");
    
    searchStoresButton.onclick = async () => {
        storesContainer.innerHTML = "";
        let enteredGameStore = document.querySelector(".search-stores").value;
        let gameForStores = await getGameById(enteredGameStore);
        let stores = gameForStores.stores;
    
        for (const store of stores) {
            let storeDetails = await getStoreDetails(store.store.id);
            appendStores(storeDetails, storesContainer);
        }
    };
    
    //ZAD 6
    let developers = await getTopDevelopers();
    let searchDeveloperGamesButton = document.querySelector(".search-games-by-developer-button");
    let developerNameToIdMap = {};
    
    developers.forEach(developer => {
        developerNameToIdMap[developer.name.toLowerCase()] = developer.id;
    });
    
    let developersList = document.querySelector(".developers-container");
    developers.forEach(developer => {
        let developerCard = document.createElement("li");
        developerCard.textContent = developer.name;
        developersList.appendChild(developerCard);
    });
    
    searchDeveloperGamesButton.onclick = async () => {
        gameContainer6.innerHTML = "";
        let enteredDevelopers = document.querySelector(".search-games-by-developer").value;
        let developerNames = enteredDevelopers.split(",").map(name => name.trim().toLowerCase());
        const developersWithIds = developerNames.map(name => {
            const id = developerNameToIdMap[name];
            return { name, id };
        }).filter(developer => developer.id !== undefined);
        
        for (const developer of developersWithIds) {
            let gamesByDeveloper = await getGamesByDeveloper(developer.id);
            appendGamesByDeveloper(gamesByDeveloper, gameContainer6, developer.name);
        }
    };
    
    //ZAD 7
    let searchGamesByDateButton = document.querySelector(".search-games-by-date-button");

    searchGamesByDateButton.onclick = async () => {
        gameContainer7.innerHTML = "";
        let startDate = document.querySelector(".search-game-start-date").value;
        let endDate = document.querySelector(".search-game-end-date").value;
        let gamesByDate = await getGamesByDate(startDate, endDate);
        checkDates(startDate, endDate);
        appendGames(gamesByDate, gameContainer7);
    }

    //ZAD 8
    let searchGameByMetacritic = document.querySelector(".search-games-metacritic-button");

    searchGameByMetacritic.onclick = async () => {
        gameContainer8.innerHTML = "";
        let startMetacritic = document.querySelector(".search-game-start-metacritic").value;
        let endMetacritic = document.querySelector(".search-game-end-metacritic").value;
        let gamesByMetacritic = await getGamesByMetacritic(startMetacritic, endMetacritic);
        checkNumbers(startMetacritic, endMetacritic);
        appendGames(gamesByMetacritic, gameContainer8);
    }
})();

