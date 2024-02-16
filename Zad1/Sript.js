import { 
    getTopRated,
    getSearchedGames
} from "./Api.js";

let gameContainer1 = document.querySelector("#zad1 .games-container");
let gameContainer2 = document.querySelector("#zad2 .games-container");


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
function appendGames(games, container) {
    for (const game of games) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = createGameDesc(game);
        container.appendChild(card);
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
})();

