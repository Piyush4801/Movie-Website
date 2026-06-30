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
        'loginPage'
    ).style.display = 'none';

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

function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('appShell').style.display = 'none';
}

function initLogin() {
    const form = document.getElementById('loginForm');
    const errorEl = document.getElementById('loginError');
    const demoBtn = document.getElementById('demoBtn');
    const signupBtn = document.querySelector('.login-link');
    const togglePassword = document.getElementById('togglePassword');
    const loginPassword = document.getElementById('loginPassword');

    if (togglePassword && loginPassword) {
        togglePassword.addEventListener('click', () => {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? '👁' : '🚫';
        });
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const result = await login(email, password);
        if (result && result.success) {
            errorEl.style.display = 'none';
            showApp();
            initLangPicker();
            initUserMenu();
            init();
        } else {
            errorEl.textContent = (result && (result.message || result.error)) || 'Failed to login';
            errorEl.style.display = 'block';
        }
    });
    signupBtn.addEventListener('click', async () => {

        const email =
            document.getElementById(
                'loginEmail'
            ).value.trim();

        const password =
            document.getElementById(
                'loginPassword'
            ).value;

        const result =
            await signup(email, password);

        if (result && result.success) {

            errorEl.style.display = 'block';

            errorEl.style.color = '#22c55e';

            errorEl.textContent =
                'Account created successfully! Now sign in.';
        } else {

            errorEl.style.display = 'block';

            errorEl.style.color = '#ef4444';

            errorEl.textContent =
                (result && (result.message || result.error)) || 'Failed to sign up';
        }

    });

    demoBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await demoLogin();
        errorEl.style.display = 'none';
        showApp();
        initLangPicker();
        initUserMenu();
        init();
    });
}

/* ============================================================
   LANGUAGE PICKER
   ============================================================ */
function initLangPicker() {

    const picker = document.getElementById('langPicker');
    if (!picker) return;
    
    const dropdown = document.getElementById('langDropdown');
    const flagEl = document.getElementById('langFlag');
    const codeEl = document.getElementById('langCode');

    const current = getLang(
        getPreferredLang()
    );

    flagEl.textContent =
        current.flag;

    codeEl.textContent =
        current.code.toUpperCase();

    dropdown.innerHTML =
        SUPPORTED_LANGUAGES.map(lang => `

    <div
      class="lang-option"
      data-code="${lang.code}"
    >

      <span>${lang.flag}</span>

      <span>
      ${lang.name}
      </span>

    </div>

  `).join('');

    // open/close dropdown
    picker.onclick = (e) => {

        e.stopPropagation();

        dropdown.classList.toggle(
            'open'
        );

    };

    // select language
    dropdown
        .querySelectorAll(
            '.lang-option'
        )
        .forEach(opt => {

            opt.onclick =
                async () => {

                    const code =
                        opt.dataset.code;

                    setPreferredLang(
                        code
                    );

                    const lang =
                        getLang(code);

                    flagEl.textContent =
                        lang.flag;

                    codeEl.textContent =
                        lang.code.toUpperCase();

                    const trending =
                        await fetchTrendingByLanguage(
                            code
                        );

                    const popular =
                        await fetchPopularByLanguage(
                            code
                        );

                    const tv =
                        await fetchTVByLanguage(
                            code
                        );

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

                    trendingMovies = trending;
                    heroIdx = 0;
                    if (trendingMovies.length) {
                        setHero(trendingMovies[0]);
                        startHeroRotation();
                    }

                    dropdown.classList.remove(
                        'open'
                    );

                };

        });

    document.onclick =
        () => {

            dropdown.classList.remove(
                'open'
            );

        };

}

/* ============================================================
   USER DROPDOWN
   ============================================================ */
function initUserMenu() {
    const chip = document.getElementById('userChip');
    const dropdown = document.getElementById('userDropdown');

    const newChip = chip.cloneNode(true);
    chip.parentNode.replaceChild(newChip, chip);

    document.getElementById('userChip').addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('userDropdown').classList.toggle('open');
    });
    document.addEventListener('click', () => {
        const dd = document.getElementById('userDropdown');
        if (dd) dd.classList.remove('open');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        logout();
        showLogin();
    });
}

/* ============================================================
   HOME BUTTON
============================================================ */

/* ============================================================
   HOME BUTTON
============================================================ */

function initHomeButton() {

    const homeBtn =
        document.getElementById(
            'homeBtn'
        );

    if (!homeBtn) {
        return;
    }

    homeBtn.addEventListener(
        'click',
        async () => {

            await init();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }
    );

}
/* ============================================================
   MODAL
   ============================================================ */
function initModal() {
    document.getElementById('modalClose').addEventListener('click', closePlayer);
    document.getElementById('modalBackdrop').addEventListener('click', e => {
        if (e.target === document.getElementById('modalBackdrop')) closePlayer();
    });
}

/* ============================================================
   HERO ROTATION
   ============================================================ */
let trendingMovies = [],
    heroIdx = 0,
    heroInterval;

function startHeroRotation() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        heroIdx = (heroIdx + 1) % Math.min(trendingMovies.length, 8);
        setHero(trendingMovies[heroIdx]);
    }, 6000);
}

function initHeroNav() {
    const heroPrev = document.getElementById('heroPrev');
    if (heroPrev) {
        heroPrev.addEventListener('click', () => {
            heroIdx = (heroIdx - 1 + trendingMovies.length) % Math.min(trendingMovies.length, 8);
            setHero(trendingMovies[heroIdx]);
            startHeroRotation();
        });
    }
    const heroNext = document.getElementById('heroNext');
    if (heroNext) {
        heroNext.addEventListener('click', () => {
            heroIdx = (heroIdx + 1) % Math.min(trendingMovies.length, 8);
            setHero(trendingMovies[heroIdx]);
            startHeroRotation();
        });
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

    document.querySelectorAll('.nav-tab')
        .forEach(btn => {

            btn.addEventListener(
                'click',
                async function() {

                    document
                        .querySelectorAll('.nav-tab')
                        .forEach(
                            b => b.classList.remove('active')
                        );

                    this.classList.add('active');

                    const type =
                        this.dataset.type;
                        
                    const homeContent = document.querySelector('.home-content');
                    const libraryPage = document.getElementById('libraryPage');

                    if (type === 'mylist') {
                        if (homeContent) homeContent.style.display = 'none';
                        if (libraryPage) {
                            libraryPage.style.display = 'block';
                            renderMyList();
                        }
                        return;
                    } else {
                        if (homeContent) homeContent.style.display = 'block';
                        if (libraryPage) libraryPage.style.display = 'none';
                    }

                    // TV Series
                    if (type === "tv") {

                        const trending =
                            await fetchTopRatedTV();

                        const popular =
                            await fetchPopular("tv");

                        renderRow(
                            "trendingList",
                            trending
                        );

                        renderRow(
                            "seriesList",
                            popular
                        );

                    }

                    // Animation
                    else if (type === "animation") {

                        const animation =
                            await fetchByGenre(
                                16,
                                "movie"
                            );

                        renderRow(
                            "trendingList",
                            animation
                        );

                        renderRow(
                            "moviesList",
                            animation
                        );

                    }

                    // Anime
                    else if (type === "anime") {

                        const anime =
                            await fetchAnimeSuggestions();

                        renderRow(
                            "trendingList",
                            anime
                        );

                        renderRow(
                            "moviesList",
                            anime
                        );

                    }

                    // Movies
                    else {

                        const trending =
                            await fetchTrending(
                                "movie"
                            );

                        const popular =
                            await fetchPopular(
                                "movie"
                            );

                        renderRow(
                            "trendingList",
                            trending
                        );

                        renderRow(
                            "moviesList",
                            popular
                        );

                    }

                }
            );

        });

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

    initLogin();
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

    if (getSession()) {
        showApp();
        initLangPicker();
        initUserMenu();
        init();
    } else {
        showLogin();
    }

});