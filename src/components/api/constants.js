export const championsURL = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json';

export const splashURL = (champID) => {
    const URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + champID + '_0.jpg';
    return URL;
}

export const dataURL = (champID) => {
    const URL = 'http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/' + champID + '.json';
    return URL; 
}
