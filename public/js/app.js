/**
 * StreamFlix — App Entry Point

import {
imgUrl,
fetchGenres,
fetchTrending,
fetchPopular,
fetchTopRatedTV,
fetchByGenre,
searchMulti,
fetchTrendingByLanguage,
fetchPopularByLanguage,
fetchTVByLanguage,
fetchAnimeSuggestions
}
from './modules/api.js';
import { login, signup, demoLogin, logout, getSession } from './modules/auth.js';
import { openPlayer, closePlayer } from './modules/player.js';
import { setHero, renderRow, renderContinueWatching, renderSearchResults, renderMyList } from './modules/render.js';
import { SUPPORTED_LANGUAGES, getPreferredLang, setPreferredLang, getLang } from './modules/language.js';
/* ============================================================
   LOGIN
  
   ============================================================ */

import {
    imgUrl,
    fetchGenres,
    fetchTrending,
    fetchPopular,
    fetchTopRatedTV,
    fetchByGenre,
    searchMulti,
    fetchTrendingByLanguage,
    fetchPopularByLanguage,
    fetchTVByLanguage,
    fetchAnimeSuggestions
}
from './modules/api.js';

import {
    login,
    signup,
    demoLogin,
    logout,
    getSession
}
from './modules/auth.js';

import {
    openPlayer,
    closePlayer
}
from './modules/player.js';

import {
    setHero,
    renderRow,
    renderContinueWatching,
    renderSearchResults
}
from './modules/render.js';

import {
    SUPPORTED_LANGUAGES,
    getPreferredLang,
    setPreferredLang,
    getLang
}
from './modules/language.js';

import { initAI } from './modules/ai.js';

function showApp() {

    

    document.getElementById(
        'appShell'
    ).style.display = 'block';

    const session =
        getSession();

    if (session) {

        const nameEl = document.getElementById('userNameDisplay');
        if (nameEl) nameEl.textContent = session.name;

        const avatarEl = document.getElementById('avatarDisplay');
        if (avatarEl) avatarEl.textContent = session.initials;

    }

    // HOME BUTTON
    const homeBtn = document.getElementById('homeBtn');

    if (homeBtn) {

        homeBtn.onclick =
            async () => {

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                const trending =
                    await fetchTrending('all');

                const popular =
                    await fetchPopular('movie');

                const tv =
                    await fetchPopular('tv');

                renderRow(
                    'trendingList',
                    trending
                );

                renderRow(
                    'moviesList',
                    popular
                );

                renderRow(
                    'seriesList',
                    tv
                );

                if (trending.length) {

                    setHero(
                        trending[0]
                    );

                }

            };

    }

}





/* ============================================================
   ROW ARROWS
   ============================================================ */
function initRowArrows() {
    document.querySelectorAll('.row-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            const rowId = btn.dataset.row;
            const row = document.getElementById(rowId);
            if (!row) return;
            const dir = btn.classList.contains('row-arrow-right') ? 1 : -1;
            row.scrollBy({
                left: dir * 700,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================================
   NAV TABS
   ============================================================ */
function initNavTabs() {
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            const route = this.getAttribute('data-route') || 'home';
            window.location.hash = route;
        });
    });

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'home';
        document.querySelectorAll('.nav-tab').forEach(b => {
            if (b.getAttribute('data-route') === hash) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        
        // Hide vanilla sections if not home
        const homeContent = document.getElementById('homeContent');
        if (homeContent) {
            homeContent.style.display = (hash === 'home' || hash === 'movies' || hash === 'tv') ? 'block' : 'none';
        }
        const libraryPage = document.getElementById('libraryPage');
        if (libraryPage) libraryPage.style.display = 'none'; // Replaced by React
        
        // Fetch specific data for vanilla pages
        if (hash === 'tv') {
            fetchTopRatedTV().then(trending => renderRow("trendingList", trending));
            fetchPopular("tv").then(popular => renderRow("seriesList", popular));
        } else if (hash === 'movies' || hash === 'home') {
            fetchTrending("movie").then(trending => renderRow("trendingList", trending));
            fetchPopular("movie").then(popular => renderRow("moviesList", popular));
        }
    });
    
    // Trigger initial
    setTimeout(() => {
        window.dispatchEvent(new Event('hashchange'));
    }, 100);
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
    const input = document.getElementById('searchInput');
    const panel = document.getElementById('searchPanel');
    let timer;

    input.addEventListener('input', function() {
        clearTimeout(timer);
        const q = this.value.trim();
        if (!q) {
            panel.classList.remove('open');
            return;
        }
        timer = setTimeout(async () => {
            const results = await searchMulti(q);
            renderSearchResults(results.slice(0, 6));
        }, 400);
    });

    document.addEventListener('click', e => {
        if (!panel.contains(e.target) && e.target !== input) panel.classList.remove('open');
    });
}

function initCategories() {
    const catPills = document.querySelectorAll('.cat-pill');
    catPills.forEach(pill => {
        pill.addEventListener('click', async () => {
            // Remove active from all pills
            catPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const genreId = pill.dataset.genre;
            const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/ug;
            const titleText = pill.textContent.replace(emojiRegex, '').trim() + ' MOVIES';
            
            // Scroll to trending row slowly
            const row = document.getElementById('trendingRow');
            if (row) {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Fetch and update
            const movies = await fetchByGenre(genreId, 'movie');
            
            // Update Row Title
            const titleEl = document.querySelector('#trendingRow .row-title');
            if(titleEl) titleEl.textContent = titleText;
            
            renderRow('trendingList', movies);
            if(movies.length) {
                heroIdx = 0;
                trendingMovies = movies;
                setHero(trendingMovies[0]);
                startHeroRotation();
            }
        });
    });
}

/* ============================================================
   MAIN INIT
   ============================================================ */
async function init() {
    await fetchGenres();
    const [trending, popular, topTV, popularTV] = await Promise.all([
        fetchTrending('all'),
        fetchPopular('movie'),
        fetchTopRatedTV(),
        fetchPopular('tv'),
    ]);

    trendingMovies = trending;
    heroIdx = 0;
    if (trendingMovies.length) {
        setHero(trendingMovies[0]);
        startHeroRotation();
    }

    renderRow('trendingList', trending);
    renderRow('seriesList', popularTV);
    renderRow('moviesList', popular);
    renderContinueWatching(trending);
}
/* ============================================================
   BOOT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    
    initModal();
    initHeroNav();
    initNavTabs();
    initRowArrows();
    initLangPicker();
    initUserMenu();
    initSearch();
    initHomeButton();
    initCategories();
    initAI();

    showApp();
    initLangPicker();
    initUserMenu();
    init();

});