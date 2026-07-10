/**
 * StreamFlix — App Entry Point
 */

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
} from './modules/api.js';

import {
    login,
    signup,
    demoLogin,
    logout,
    getSession
} from './modules/auth.js';

import {
    openPlayer,
    closePlayer
} from './modules/player.js';

import {
    setHero,
    renderRow,
    renderContinueWatching,
    renderSearchResults
} from './modules/render.js';

import {
    SUPPORTED_LANGUAGES,
    getPreferredLang,
    setPreferredLang,
    getLang
} from './modules/language.js';

import { initAI } from './modules/ai.js';
import { applyTranslations } from './modules/translations.js';


function showApp() {
    const appShell = document.getElementById('appShell');
    if (appShell) appShell.style.display = 'block';

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
   LANGUAGE PICKER — Premium Netflix-style
   ============================================================ */
function initLangPicker() {
    const picker = document.getElementById('langPicker');
    if (!picker) return;

    const dropdown = document.getElementById('langDropdown');
    const flagEl = document.getElementById('langFlag');
    const codeEl = document.getElementById('langCode');

    // Apply saved language on load
    const savedCode = getPreferredLang();
    const current = getLang(savedCode);
    flagEl.textContent = current.flag;
    codeEl.textContent = current.code.toUpperCase();
    applyTranslations(savedCode);

    // Build premium dropdown HTML
    function buildDropdown(activeCode) {
        dropdown.innerHTML = `
            <div class="lang-dropdown-header" data-i18n="select_language">Select Language</div>
            <div class="lang-dropdown-list">
                ${SUPPORTED_LANGUAGES.map(lang => `
                    <div class="lang-option ${lang.code === activeCode ? 'active' : ''}" 
                         data-code="${lang.code}" 
                         role="option" 
                         aria-selected="${lang.code === activeCode}"
                         tabindex="0">
                        <span class="lang-option-flag">${lang.flag}</span>
                        <span class="lang-option-name">${lang.name}</span>
                        <span class="lang-option-abbr">${lang.code.toUpperCase()}</span>
                        <span class="lang-option-check" style="opacity:${lang.code === activeCode ? '1' : '0'}">✓</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Scroll active item into view
        setTimeout(() => {
            const activeEl = dropdown.querySelector('.lang-option.active');
            if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
        }, 50);

        // Bind click on each option
        dropdown.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', async (e) => {
                e.stopPropagation();
                await selectLang(opt.dataset.code);
            });
            // Keyboard: Enter/Space selects
            opt.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    await selectLang(opt.dataset.code);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = opt.nextElementSibling;
                    if (next) next.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = opt.previousElementSibling;
                    if (prev) prev.focus();
                } else if (e.key === 'Escape') {
                    closeDropdown();
                    picker.focus();
                }
            });
        });
    }

    function openDropdown() {
        buildDropdown(getPreferredLang());
        dropdown.classList.add('open');
        picker.setAttribute('aria-expanded', 'true');
        // Focus first option
        setTimeout(() => {
            const active = dropdown.querySelector('.lang-option.active') || dropdown.querySelector('.lang-option');
            if (active) active.focus();
        }, 80);
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        picker.setAttribute('aria-expanded', 'false');
    }

    async function selectLang(code) {
        setPreferredLang(code);
        const lang = getLang(code);

        // Update trigger button
        flagEl.textContent = lang.flag;
        codeEl.textContent = lang.code.toUpperCase();

        // Apply UI translations immediately
        applyTranslations(code);

        closeDropdown();

        // Fetch content in selected language
        const [trending, popular, tv] = await Promise.all([
            fetchTrendingByLanguage(code),
            fetchPopularByLanguage(code),
            fetchTVByLanguage(code),
        ]);

        renderRow('trendingList', trending);
        renderRow('moviesList', popular);
        renderRow('seriesList', tv);

        trendingMovies = trending;
        heroIdx = 0;
        if (trendingMovies.length) {
            setHero(trendingMovies[0]);
            startHeroRotation();
        }
    }

    // Toggle dropdown on click
    picker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown.classList.contains('open')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // Keyboard on picker button
    picker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            openDropdown();
        } else if (e.key === 'Escape') {
            closeDropdown();
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!picker.contains(e.target)) closeDropdown();
    });
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
    // Topbar Tabs (filter out more button)
    document.querySelectorAll('.nav-tab:not(.more-trigger-btn)').forEach(btn => {
        btn.addEventListener('click', function() {
            const route = this.getAttribute('data-route') || 'home';
            window.location.hash = route;
        });
    });

    const moreDrawer = document.getElementById('moreDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const openBtn = document.getElementById('openDrawerBtn');
    const closeBtn = document.getElementById('closeDrawerBtn');

    function openDrawer() {
        if (moreDrawer) moreDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');
    }

    function closeDrawer() {
        if (moreDrawer) moreDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
    }

    if (openBtn) openBtn.addEventListener('click', (e) => { e.stopPropagation(); openDrawer(); });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Escape closes drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // Drawer Items Clicks
    document.querySelectorAll('.drawer-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            
            if (action === 'route') {
                const val = this.dataset.value;
                window.location.hash = val;
                closeDrawer();
            } else if (action === 'mood-scanner') {
                closeDrawer();
                window.dispatchEvent(new CustomEvent('open-mood-scanner'));
            } else if (action === 'cinema-mode') {
                closeDrawer();
                window.dispatchEvent(new CustomEvent('toggle-cinema-mode'));
            } else if (action === 'logout') {
                closeDrawer();
                logout().then(() => {
                    window.location.reload();
                });
            } else {
                // Secondary tools (Movie Map, Voice AI, Time Machine, AI memory, Help, Settings)
                alert(`Opening ${this.querySelector('.drawer-label')?.textContent || 'Service'}...`);
                closeDrawer();
            }
        });
    });

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'home';
        
        // Update topbar active state
        document.querySelectorAll('.nav-tab').forEach(b => {
            if (b.getAttribute('data-route') === hash) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });

        // Update drawer item active state
        document.querySelectorAll('.drawer-item').forEach(item => {
            if (item.dataset.action === 'route' && item.dataset.value === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
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
    initSearch();
    initHomeButton();
    initCategories();
    initAI();

    showApp();
    initLangPicker();
    initUserMenu();
    init();

    // Apply saved language translations on page load
    applyTranslations(getPreferredLang());

});