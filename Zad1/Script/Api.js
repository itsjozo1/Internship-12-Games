const siteUrl = "https://api.rawg.io/api";
const apiKey = "?key=464bc085dbbf4f33bcb2ccb39d36a6ec";

function isSafeGame(game) {
    const esrbRatingId = game.esrb_rating ? game.esrb_rating.id : null;
    return ![0, 5].includes(esrbRatingId);
}

async function fetchGameData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results.filter(game => isSafeGame(game));
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch data from ${url}`);
    }
}

async function getTopRated() {
    const params = new URL(`${siteUrl}/games${apiKey}`)
    params.searchParams.append("ordering", "-metacritic");

    return fetchGameData(params);
}
async function getSearchedGames(searchTerm) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("search", searchTerm);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "released");

    return fetchGameData(params);
}

async function getPopularPlatforms(){
    const params = new URL(`${siteUrl}/platforms${apiKey}`);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-games_count");

    return fetchGameData(params);
}

async function getGamesByPlatforms(platforms){
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("platforms", platforms)
    params.searchParams.append("page_size", "20");
    params.searchParams.append("ordering", "-name");

    return fetchGameData(params);
}

async function getGameById(id){
    const params = new URL(`${siteUrl}/games/${id}${apiKey}`);

    try {
        const response = await fetch(params);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch game by id');
    }
}

async function getStoreDetails(id){
    const params = new URL(`${siteUrl}/stores/${id}${apiKey}`);
    try {
        const response = await fetch(params);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch store details');
    }
}

async function getTopDevelopers(){
    const params = new URL(`${siteUrl}/developers${apiKey}`);
    params.searchParams.append("page_size", "10")

    return fetchGameData(params);
}

async function getGamesByDeveloper(developers) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("developers", developers);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-metacritic");

    return fetchGameData(params);

  }

  async function getGamesByDate(startDate, endDate) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("dates", `${startDate},${endDate}`);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-metacritic");
  
    return fetchGameData(params);
  }


  async function getGamesByMetacritic(start, end) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("metacritic", `${start},${end}`);
    params.searchParams.append("page_size", "20");
    params.searchParams.append("ordering", "-metacritic, name");
  
    return fetchGameData(params);
  }

export { 
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
};
