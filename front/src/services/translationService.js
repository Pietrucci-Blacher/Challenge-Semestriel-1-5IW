import httpClient from './httpClient';



const loadTranslationsService = async (language) => {
    return await httpClient.get(`translations/${language}`);
}

export {
    loadTranslationsService
}