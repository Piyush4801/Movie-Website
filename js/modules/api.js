/**
 * StreamFlix — API Module
 * Handles all TMDB API interactions.
 */

const TMDB = '/api/tmdb';
const IMG = 'https://image.tmdb.org/t/p/';

export const genreMap = {};

export function imgUrl(path, size = 'w500') {
    return path ? `${IMG}${size}${path}` : '';
}

async function get(endpoint, params = {}) {
    const url = new URL(`${TMDB}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const res = await fetch(url);
    return res.json();
}

export async function fetchGenres() {
    const [mg, tg] = await Promise.all([
        get('/genre/movie/list'),
        get('/genre/tv/list'),
    ]);
    [...(mg.genres || []), ...(tg.genres || [])].forEach(g => (genreMap[g.id] = g.name));
}

export async function fetchTrending(type = 'all') {
    const data = await get(`/trending/${type}/week`);
    return data.results || [];
}

export async function fetchPopular(type = 'movie', page = 1) {
    const data = await get(`/${type}/popular`, {
        page
    });
    return data.results || [];
}

export async function fetchTopRatedTV() {
    const data = await get('/tv/top_rated');
    return data.results || [];
}

export async function searchMulti(query) {
    const data = await get('/search/multi', {
        query
    });
    return (data.results || []).filter(m => m.poster_path || m.backdrop_path);
}

export async function fetchByGenre(genreId, type = 'movie') {
    const data = await get(`/discover/${type}`, {
        with_genres: genreId,
        sort_by: 'popularity.desc',
    });
    return data.results || [];
}

export async function fetchSeasons(tvId, numberOfSeasons) {
    const seasonNumbers = Array.from({
        length: numberOfSeasons
    }, (_, i) => i + 1);
    const seasons = await Promise.all(
        seasonNumbers.map(n => get(`/tv/${tvId}/season/${n}`))
    );
    return seasons.filter(s => s && s.episodes && s.episodes.length);
}

export async function fetchTVDetails(tvId) {
    return get(`/tv/${tvId}`);
}

export async function fetchByLanguage(lang = 'en') {

    const data = await get(
        '/discover/movie', {
            with_original_language: lang,
            sort_by: 'popularity.desc'
        }
    );

    return data.results || [];
}

export async function fetchTrendingByLanguage(lang = 'en') {

    const data = await get(
        '/discover/movie', {
            with_original_language: lang,
            sort_by: 'popularity.desc'
        }
    );

    return data.results || [];
}

export async function fetchPopularByLanguage(lang = 'en') {

    const data = await get(
        '/discover/movie', {
            with_original_language: lang,
            sort_by: 'vote_average.desc',
            vote_count_gte: 100
        }
    );

    return data.results || [];
}

export async function fetchTVByLanguage(lang = 'en') {

    const data = await get(
        '/discover/tv', {
            with_original_language: lang,
            sort_by: 'popularity.desc'
        }
    );

    return data.results || [];
}

export async function fetchAnimeSuggestions() {
    const data = await get(
        '/discover/tv', {
            with_genres: 16,
            with_original_language: 'ja',
            sort_by: 'popularity.desc'
        }
    );
    return data.results || [];
}

export async function fetchRecommendations(id, type = 'movie') {
    try {
        let data = await get(`/${type}/${id}/recommendations`);
        if (!data.results || data.results.length === 0) {
            data = await get(`/${type}/${id}/similar`);
        }
        return data.results || [];
    } catch (e) {
        console.warn('Failed to fetch recommendations', e);
        return [];
    }
}