const siteUrl = `https://api.rawg.io/api/games?key=464bc085dbbf4f33bcb2ccb39d36a6ec`;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

function isSafeGame(game) {
    const esrbRatingId = game.esrb_rating ? game.esrb_rating.id : null;
    return ![0, 5].includes(esrbRatingId);
}

async function getTopRated(url) {
    const param = `${url}&ordering=-metacritic`;
    const response = await fetchData(param);
    
    return response.results.filter(isSafeGame);
}
