const siteUrl = `https://api.rawg.io/api/games?key=464bc085dbbf4f33bcb2ccb39d36a6ec`;

function isSafeGame(game) {
    const esrbRatingId = game.esrb_rating ? game.esrb_rating.id : null;
    return ![0, 5].includes(esrbRatingId);
}

async function getTopRated() {
    const param = `${siteUrl}&ordering=-metacritic`;
    try {
        const response = await fetch(param);
        const data = await response.json();
        const safeGames = data.results.filter(game => isSafeGame(game));
        return safeGames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch top rated games');
    }
}
async function getSearchedGames(searchTerm) {
    const params = new URL(siteUrl);
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
        throw new Error('Failed to fetch top rated games');
    }
}

export { 
    getTopRated,
    getSearchedGames
};
