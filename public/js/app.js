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


// Custom Toast Notification helper
function showToast(message, icon = '💡') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function showApp() {
    const appShell = document.getElementById('appShell');
    const authShell = document.getElementById('authShell');
    const session = getSession();

    if (session) {
        if (appShell) appShell.style.display = 'block';
        if (authShell) authShell.style.display = 'none';

        const nameEl = document.getElementById('userNameDisplay');
        if (nameEl) nameEl.textContent = session.name;

        const avatarImg = document.querySelector('#userChip .avatar-img');
        if (avatarImg) {
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(session.name)}&background=FF6B00&color=fff`;
        }
    } else {
        if (appShell) appShell.style.display = 'none';
        if (authShell) authShell.style.display = 'flex';
    }
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
                const label = this.querySelector('.drawer-label')?.textContent || 'Service';
                const icon = this.querySelector('.drawer-icon')?.textContent || '💡';
                showToast(`Opening ${label}...`, icon);
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
   AUTH SHELL CONTROLLER (CINESTREAM)
   ============================================================ */
function initAuth() {
    const authShell = document.getElementById('authShell');
    if (!authShell) return;

    let isSignUp = false;

    // 1. Generate Floating Particles
    const particlesContainer = document.getElementById('authParticles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            
            // Random animation
            particle.style.animation = `authParticleFloat ${Math.random() * 20 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }
    }

    // Add particle float keyframe style dynamically if not present
    if (!document.getElementById('authParticleStyle')) {
        const style = document.createElement('style');
        style.id = 'authParticleStyle';
        style.textContent = `
            @keyframes authParticleFloat {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-100px) scale(1.2); }
                100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Load Collage Background from TMDB
    fetchTrending('movie').then(movies => {
        const collage = document.getElementById('authBgCollage');
        if (collage && movies && movies.length) {
            collage.innerHTML = movies.slice(0, 18).map(m => {
                const url = imgUrl(m.poster_path || m.backdrop_path, 'w300');
                return `<img src="${url}" class="auth-collage-item" alt="Poster">`;
            }).join('');
        }
    }).catch(err => console.warn('Could not populate auth background collage', err));

    // 3. Mouse Parallax Background
    authShell.addEventListener('mousemove', (e) => {
        const collage = document.getElementById('authBgCollage');
        if (collage) {
            const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
            collage.style.transform = `scale(1.05) translate(${x * -20}px, ${y * -20}px)`;
        }
    });

    // 4. Password Visibility Toggle
    const passwordInput = document.getElementById('authPassword');
    const toggleBtn = document.getElementById('passwordToggleBtn');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const isPw = passwordInput.type === 'password';
            passwordInput.type = isPw ? 'text' : 'password';
            toggleBtn.innerHTML = isPw 
                ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
                : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        });
    }

    // 5. Switching Auth Mode (Sign In vs Sign Up)
    const switchBtn = document.getElementById('authSwitchBtn');
    const switchText = document.getElementById('authSwitchText');
    const titleEl = document.getElementById('authTitle');
    const subtitleEl = document.getElementById('authSubtitle');
    const nameGroup = document.getElementById('authNameGroup');
    const pwStrength = document.getElementById('pwStrengthWrapper');
    const optionsRow = document.getElementById('authOptionsRow');
    const submitBtn = document.getElementById('authSubmitBtnEl');

    if (switchBtn) {
        switchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUp = !isSignUp;

            // Reset inputs & errors
            document.querySelectorAll('.auth-input').forEach(el => {
                el.value = '';
                el.dispatchEvent(new Event('input'));
            });
            document.querySelectorAll('.auth-error-msg').forEach(el => el.style.display = 'none');

            if (isSignUp) {
                titleEl.textContent = 'Create Account 🎬';
                subtitleEl.textContent = 'Join CINESTREAM and watch thousands of movies.';
                nameGroup.style.display = 'block';
                pwStrength.style.display = 'block';
                optionsRow.style.display = 'none';
                submitBtn.querySelector('.btn-text').textContent = 'CREATE ACCOUNT';
                switchText.textContent = 'Already have an account?';
                switchBtn.textContent = 'Sign In';
            } else {
                titleEl.textContent = 'Welcome Back 👋';
                subtitleEl.textContent = 'Sign in to continue watching your favorites.';
                nameGroup.style.display = 'none';
                pwStrength.style.display = 'none';
                optionsRow.style.display = 'flex';
                submitBtn.querySelector('.btn-text').textContent = 'SIGN IN';
                switchText.textContent = "Don't have an account?";
                switchBtn.textContent = 'Create Account';
            }
        });
    }

    // 6. Password Strength Meter
    if (passwordInput && pwStrength) {
        const fill = document.getElementById('pwStrengthFill');
        const text = document.getElementById('pwStrengthText');
        
        passwordInput.addEventListener('input', () => {
            if (!isSignUp) return;
            const val = passwordInput.value;
            let score = 0;
            if (val.length >= 6) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            if (val.length === 0) {
                fill.style.width = '0';
                text.textContent = '';
            } else if (score <= 1) {
                fill.style.width = '25%';
                fill.style.backgroundColor = '#FF3B30';
                text.textContent = 'Weak password';
            } else if (score === 2 || score === 3) {
                fill.style.width = '60%';
                fill.style.backgroundColor = '#FF9500';
                text.textContent = 'Medium password';
            } else {
                fill.style.width = '100%';
                fill.style.backgroundColor = '#34C759';
                text.textContent = 'Strong password';
            }
        });
    }

    // 7. Stats Counter Animation
    const animateCounters = () => {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(num => {
            const target = parseFloat(num.dataset.target);
            const isDecimal = num.dataset.decimal === 'true';
            let start = 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const current = easeProgress * target;

                if (isDecimal) {
                    num.textContent = current.toFixed(1);
                } else if (target >= 1000000) {
                    num.textContent = `${(current / 1000000).toFixed(1)}M+`;
                } else if (target >= 1000) {
                    num.textContent = `${Math.floor(current / 1000)}K+`;
                } else {
                    num.textContent = Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            };

            requestAnimationFrame(update);
        });
    };

    // Run counters when authShell becomes active
    if (authShell.style.display !== 'none') {
        setTimeout(animateCounters, 500);
    }

    // 8. Google / GitHub / Apple Social Button Click Handlers (Logs in Demo mode)
    ['socialGoogle', 'socialGithub', 'socialApple'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                const label = btn.querySelector('span')?.textContent || 'Social login';
                showToast(`Connecting via ${label.replace('Continue with ', '')}...`, '🔑');
                
                // Automatically log in as Demo User for social click convenience!
                demoLogin().then(res => {
                    if (res.success) {
                        showToast('Successfully logged in!', '✅');
                        // Fade out card and transition
                        document.querySelector('.auth-card').style.transform = 'scale(0.9) translateY(-20px)';
                        document.querySelector('.auth-card').style.opacity = '0';
                        setTimeout(() => {
                            showApp();
                            // Load app content row
                            init();
                        }, 500);
                    } else {
                        showToast(res.message, '❌');
                    }
                });
            });
        }
    });

    // 9. Navbar Links (Demo flow)
    ['authNavHome', 'authNavMovies', 'authNavAbout'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.preventDefault();
            // Automatically logs in demo user to enter index shell!
            showToast('Loading guest experience...', '🎬');
            demoLogin().then(() => {
                showApp();
                init();
            });
        });
    });

    // 10. Form Submission (Login & Register integration)
    const form = document.getElementById('authForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear errors
            document.querySelectorAll('.auth-error-msg').forEach(el => el.style.display = 'none');

            const email = document.getElementById('authEmail').value.trim();
            const password = passwordInput.value;
            const name = document.getElementById('authName').value.trim();

            // Simple validation
            let hasError = false;
            if (!email) {
                const el = document.getElementById('emailError');
                if (el) { el.textContent = 'Please enter your email'; el.style.display = 'block'; }
                hasError = true;
            }
            if (!password) {
                const el = document.getElementById('passwordError');
                if (el) { el.textContent = 'Please enter your password'; el.style.display = 'block'; }
                hasError = true;
            }
            if (isSignUp && !name) {
                const el = document.getElementById('nameError');
                if (el) { el.textContent = 'Please enter your name'; el.style.display = 'block'; }
                hasError = true;
            }

            if (hasError) return;

            // Show loader
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').style.display = 'none';
            submitBtn.querySelector('.btn-loader').style.display = 'inline-block';

            try {
                let res;
                if (isSignUp) {
                    res = await signup(email, password, name);
                } else {
                    res = await login(email, password);
                }

                if (res.success) {
                    showToast(isSignUp ? 'Account created successfully!' : 'Welcome to CINESTREAM!', '🍿');
                    
                    // Animate transition
                    document.querySelector('.auth-card').style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    document.querySelector('.auth-card').style.transform = 'scale(0.9) translateY(-30px)';
                    document.querySelector('.auth-card').style.opacity = '0';

                    setTimeout(() => {
                        showApp();
                        init(); // Reload movies rows
                    }, 500);
                } else {
                    showToast(res.message || 'Authentication failed', '❌');
                    // Highlight the wrong input
                    const errEl = document.getElementById(isSignUp ? 'nameError' : 'passwordError');
                    if (errEl) {
                        errEl.textContent = res.message || 'Invalid details';
                        errEl.style.display = 'block';
                    }
                }
            } catch (err) {
                console.error(err);
                showToast(err.message || 'An error occurred', '❌');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline-block';
                submitBtn.querySelector('.btn-loader').style.display = 'none';
            }
        });
    }
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
    initAuth();
    initLangPicker();
    initUserMenu();
    init();

    // Apply saved language translations on page load
    applyTranslations(getPreferredLang());

});