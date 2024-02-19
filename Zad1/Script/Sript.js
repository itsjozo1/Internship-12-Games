import { 
    getTopRated,
    getSearchedGames,
    getPopularPlatforms,
    getGamesByPlatforms,
    getGameById,
    getStoreDetails
} from "./Api.js";

let gameContainer1 = document.querySelector("#zad1 .games-container");
let gameContainer2 = document.querySelector("#zad2 .games-container");
let gameContainer3 = document.querySelector("#zad3 .games-container");

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
function changePlatformsColor(platformElements, enteredPlatformNames) {
    platformElements.forEach(platformElement => {
        platformElement.style.color = 'white';
        const platformName = platformElement.textContent.trim().toLowerCase();
        if (enteredPlatformNames.includes(platformName)) {
            platformElement.style.color = 'yellow';
        }
    });
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
    
})();

