/**
 * StreamFlix — API Module
 * All TMDB requests go through the backend proxy at /api/tmdb
 * Language-aware: passes `language` param to TMDB for localised content.
 */

import { getPreferredLang } from './language.js';

const IMG = 'https://image.tmdb.org/t/p/';

export const genreMap = {};

/** Map language code → TMDB locale string */
const TMDB_LOCALE = {
    en: 'en-US', hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN',
    es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ja: 'ja-JP', ko: 'ko-KR',
    zh: 'zh-CN', pt: 'pt-BR', it: 'it-IT', ru: 'ru-RU', ar: 'ar-SA'
};

export function getTmdbLocale(code) {
    return TMDB_LOCALE[code] || 'en-US';
}

export function imgUrl(path, size = 'w500') {
    return path ? `${IMG}${size}${path}` : '';
}

async function get(endpoint, params = {}) {
    const url = new URL(`/api/tmdb${endpoint}`, window.location.origin);
    // Always request English locale for movie details, titles, genres, and descriptions
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        // If TMDB returns no overview (non-English fallback gap), we accept it gracefully
        return data;
    } catch (e) {
        console.warn(`TMDB fetch failed for ${endpoint}:`, e);
        // Fallback: retry with English
        const fallback = new URL(`/api/tmdb${endpoint}`, window.location.origin);
        fallback.searchParams.set('language', 'en-US');
        Object.entries(params).forEach(([k, v]) => fallback.searchParams.set(k, v));
        const res2 = await fetch(fallback);
        return res2.json();
    }
}

export async function fetchGenres(langCode) {
    const locale = getTmdbLocale(langCode || getPreferredLang());
    const [mg, tg] = await Promise.all([
        get('/genre/movie/list', { language: locale }),
        get('/genre/tv/list', { language: locale }),
    ]);
    [...(mg.genres || []), ...(tg.genres || [])].forEach(g => (genreMap[g.id] = g.name));
}

export async function fetchTrending(type = 'all') {
    const data = await get(`/trending/${type}/week`);
    return data.results || [];
}

export async function fetchPopular(type = 'movie', page = 1) {
    const data = await get(`/${type}/popular`, { page });
    return data.results || [];
}

export async function fetchTopRatedTV() {
    const data = await get('/tv/top_rated');
    return data.results || [];
}

export async function searchMulti(query) {
    const data = await get('/search/multi', { query });
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
    const seasonNumbers = Array.from({ length: numberOfSeasons }, (_, i) => i + 1);
    const seasons = await Promise.all(
        seasonNumbers.map(n => get(`/tv/${tvId}/season/${n}`))
    );
    return seasons.filter(s => s && s.episodes && s.episodes.length);
}

export async function fetchTVDetails(tvId) {
    return get(`/tv/${tvId}`);
}

export async function fetchByLanguage(lang = 'en') {
    const data = await get('/discover/movie', {
        with_original_language: lang,
        sort_by: 'popularity.desc'
    });
    return data.results || [];
}

export async function fetchTrendingByLanguage(lang = 'en') {
    const locale = getTmdbLocale(lang);
    const data = await get('/discover/movie', {
        with_original_language: lang,
        sort_by: 'popularity.desc',
        language: locale
    });
    return data.results || [];
}

export async function fetchPopularByLanguage(lang = 'en') {
    const locale = getTmdbLocale(lang);
    const data = await get('/discover/movie', {
        with_original_language: lang,
        sort_by: 'vote_average.desc',
        vote_count_gte: 100,
        language: locale
    });
    return data.results || [];
}

export async function fetchTVByLanguage(lang = 'en') {
    const locale = getTmdbLocale(lang);
    const data = await get('/discover/tv', {
        with_original_language: lang,
        sort_by: 'popularity.desc',
        language: locale
    });
    return data.results || [];
}

export async function fetchAnimeSuggestions() {
    const data = await get('/discover/tv', {
        with_genres: 16,
        with_original_language: 'ja',
        sort_by: 'popularity.desc'
    });
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