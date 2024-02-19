const siteUrl = "https://api.rawg.io/api";
const apiKey = "?key=464bc085dbbf4f33bcb2ccb39d36a6ec";

function isSafeGame(game) {
    const esrbRatingId = game.esrb_rating ? game.esrb_rating.id : null;
    return ![0, 5].includes(esrbRatingId);
}

async function getTopRated() {
    const param = `${siteUrl}&ordering=-metacritic`;
    const params = new URL(`${siteUrl}/games${apiKey}`)
    params.searchParams.append("ordering", "-metacritic");
    try {
        const response = await fetch(params);
        const data = await response.json();
        const safeGames = data.results.filter(game => isSafeGame(game));
        return safeGames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch top rated games');
    }
}
async function getSearchedGames(searchTerm) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("search", searchTerm);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "released");

    try {
        const response = await fetch(params);
        const data = await response.json();
        const safeGames = data.results.filter(game => isSafeGame(game));
        return safeGames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch searched games');
    }
}

async function getPopularPlatforms(){
    const params = new URL(`${siteUrl}/platforms${apiKey}`);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-games_count");

    try {
        const response = await fetch(params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch top platforms');
    }
}

async function getGamesByPlatforms(platforms){
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("platforms", platforms)
    params.searchParams.append("page_size", "20");
    params.searchParams.append("ordering", "-name");

    try {
        const response = await fetch(params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by platform');
    }
}

async function getGameById(id){
    const params = new URL(`${siteUrl}/games/${id}${apiKey}`);

    try {
        const response = await fetch(params);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by platform');
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
    try {
        const response = await fetch(params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch top developers');
    }
}

async function getGamesByDeveloper(developers) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("developers", developers);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-metacritic");
    try {
        const response = await fetch(params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by developers');
    }
  }

  async function getGamesByDate(startDate, endDate) {
    const params = new URL(`${siteUrl}/games${apiKey}`);
    params.searchParams.append("dates", `${startDate},${endDate}`);
    params.searchParams.append("page_size", "10");
    params.searchParams.append("ordering", "-metacritic");
  
    try {
        const response = await fetch(params);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch games by date');
    }
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
};
