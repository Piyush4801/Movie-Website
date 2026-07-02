/**
 * StreamFlix — Render Module
 */

import {
    imgUrl,
    genreMap
} from './api.js';
import {
    openPlayer
} from './player.js';
import {
    getWatchHistory,
    removeWatchHistory
} from './watchHistory.js';
import {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
    addNotification
} from './userData.js';
import { t } from './translations.js';


/* ---- Hero ---- */
export function setHero(movie) {

    document.getElementById('heroBg').style.backgroundImage =
        movie.backdrop_path ?
        `url(${imgUrl(movie.backdrop_path,'w1280')})` :
        '';

    document.getElementById('heroTitle').textContent =
        movie.title || movie.name || '';

    const genres =
        (movie.genre_ids || [])
        .slice(0, 3)
        .map(id => genreMap[id])
        .filter(Boolean);

    const heroTags = document.getElementById('heroTags');
    if (heroTags) {
        heroTags.innerHTML =
            genres.map(
                g => `<span class="tag">${g}</span>`
            ).join('');
    }

    const heroDesc = document.getElementById('heroDesc');
    if (heroDesc) {
        heroDesc.textContent = movie.overview || '';
    }
        
    const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
    
    const heroYear = document.getElementById('heroYear');
    if (heroYear) heroYear.textContent = year || 'N/A';
    
    const heroRating = document.getElementById('heroRating');
    if (heroRating) heroRating.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    const heroLang = document.getElementById('heroLang');
    if (heroLang) heroLang.textContent = (movie.original_language || 'EN').toUpperCase();

    document.getElementById('heroWatch').onclick =
        () => openPlayer(movie);

    document.getElementById('heroMore').onclick =
        () => openPlayer(movie);

    const heroListBtn = document.getElementById('heroList');
    if (heroListBtn) {
        const updateListBtn = () => {
            const inList = getWatchlist().find(m => m.id === movie.id);
            if (inList) {
                heroListBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> ${t('addedToList')}`;

                heroListBtn.style.color = 'var(--accent)';
                heroListBtn.style.borderColor = 'var(--accent)';
            } else {
                heroListBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ${t('myList')}`;

                heroListBtn.style.color = '';
                heroListBtn.style.borderColor = '';
            }
        };
        
        updateListBtn();

        heroListBtn.onclick = () => {
            const inList = getWatchlist().find(m => m.id === movie.id);
            if (inList) {
                removeFromWatchlist(movie.id);
            } else {
                addToWatchlist(movie);
            }
            updateListBtn();
        };
    }
}


/* ---- Generic row ---- */
export function renderRow(listId, items) {

    const el =
        document.getElementById(listId);

    if (!el) return;

    if (!items?.length) return;


    const watchlist = getWatchlist();
    const watchlistIds = new Set(watchlist.map(m => m.id));

    el.innerHTML =
        items.slice(0, 15).map((m, i) => {
            const isAdded = watchlistIds.has(m.id);
            const addIcon = isAdded 
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;


            const rating =
                m.vote_average ?
                m.vote_average.toFixed(1) :
                null;
                
            const year = (m.release_date || m.first_air_date || '').slice(0, 4);
            const firstGenre = m.genre_ids?.length && genreMap[m.genre_ids[0]] ? genreMap[m.genre_ids[0]] : (m.media_type === 'tv' ? 'Series' : 'Movie');
            const subText = year ? `${year} • ${firstGenre}` : firstGenre;
            
            // Randomly assign HD or 4K to match screenshot vibe
            const quality = Math.random() > 0.5 ? '4K' : 'HD';

            return `

<div class="hcard" data-idx="${i}">

<div class="hcard-img-wrap">

<img
src="${imgUrl(m.poster_path,'w342')}"
alt="${m.title || m.name || ''}"
>

<div class="hcard-play-overlay">
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
</div>

<div class="hcard-add-btn ${isAdded ? 'added' : ''}" data-idx="${i}" style="display:none;">
    ${addIcon}
</div>

<div class="react-action-buttons" data-variant="card" data-movie-data="${encodeURIComponent(JSON.stringify(m))}"></div>

</div>

<div class="hcard-title">
${m.title || m.name || ''}
</div>
<div class="hcard-sub">
${rating ? `<span class="hstar">★</span> <span style="font-weight:600;color:#fff">${rating}</span><span style="font-size:10px;margin-right:4px">/10</span> | ` : ''} 2h 46min
</div>

</div>

`;

        }).join('');



    el.querySelectorAll('.hcard')
        .forEach((card, i) => {
            const addBtn = card.querySelector('.hcard-add-btn');
            
            card.addEventListener(
                'click',
                (e) => {
                    // Prevent opening player if add button was clicked
                    if (e.target.closest('.hcard-add-btn')) return;
                    openPlayer(items[i]);
                }
            );

            if (addBtn) {
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const movie = items[i];
                    const inList = getWatchlist().find(m => m.id === movie.id);
                    if (inList) {
                        removeFromWatchlist(movie.id);
                        addNotification(`${movie.title || movie.name} removed from your list.`);
                    } else {
                        addToWatchlist(movie);
                        addNotification(`${movie.title || movie.name} added to your list!`);
                    }
                    // Re-render the row to update button state
                    renderRow(listId, items);
                });
            }
        });

}

export function renderMyList() {
    const items = getWatchlist();
    const el = document.getElementById('libraryMovies');
    if (!el) return;

    if (!items.length) {
        el.innerHTML = `<p style="padding:20px; color:var(--text);">${t('emptyList')}</p>`;
        return;
    }

    el.innerHTML = items.map((m, i) => {
        const rating = m.vote_average ? m.vote_average.toFixed(1) : null;
        const year = (m.release_date || m.first_air_date || '').slice(0, 4);
        const firstGenre = m.genre_ids?.length && genreMap[m.genre_ids[0]] ? genreMap[m.genre_ids[0]] : (m.media_type === 'tv' ? 'Series' : 'Movie');
        
        return `
            <div class="hcard" data-idx="${i}">
                <div class="hcard-img-wrap">
                    <img src="${imgUrl(m.poster_path,'w342')}" alt="${m.title || m.name || ''}">
                    <div class="hcard-play-overlay">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <div class="hcard-add-btn added" data-idx="${i}" style="display:none;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div class="react-action-buttons" data-variant="card" data-movie-data="${encodeURIComponent(JSON.stringify(m))}"></div>
                </div>
                <div class="hcard-title">${m.title || m.name || ''}</div>
                <div class="hcard-sub">${rating ? `<span class="hstar">★</span> <span style="font-weight:600;color:#fff">${rating}</span><span style="font-size:10px;margin-right:4px">/10</span> | ` : ''} 2h 46min</div>
            </div>
        `;
    }).join('');

    el.querySelectorAll('.hcard').forEach((card, i) => {
        const addBtn = card.querySelector('.hcard-add-btn');
        card.addEventListener('click', (e) => {
            if (e.target.closest('.hcard-add-btn')) return;
            openPlayer(items[i]);
        });

        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromWatchlist(items[i].id);
                addNotification(`${items[i].title || items[i].name} removed from your list.`);
                renderMyList();
            });
        }
    });
}



/* ---- Continue Watching ---- */
export function renderContinueWatching() {

    const picks =
        getWatchHistory();

    const el =
        document.getElementById(
            'cwList'
        );

    if (!el) return;


    if (!picks.length) {

        el.innerHTML = `
<p style="padding:20px">
No watch history
</p>
`;

        return;

    }


    el.innerHTML =
        picks.map((m, i) => `

<div class="hcard cw-hcard">

<button
class="remove-history"
data-index="${i}">
✕
</button>

<div class="hcard-img-wrap">

<img
src="${imgUrl(
m.poster_path,
'w342'
)}"
alt="${m.title || m.name}"
>

</div>

<div class="hcard-title">
${m.title || m.name}
</div>

</div>

`).join('');



    // open player
    el.querySelectorAll(
            '.cw-hcard'
        )
        .forEach((card, i) => {

            card.addEventListener(
                'click',
                () => openPlayer(
                    picks[i]
                )
            );

        });



    el.querySelectorAll('.remove-history')
        .forEach(btn => {

            btn.onclick = (e) => {

                e.stopPropagation();

                const index =
                    Number(btn.dataset.index);

                removeWatchHistory(index);

                renderContinueWatching();

            };

        });

}



/* ---- Search ---- */
export function renderSearchResults(results) {

    const panel =
        document.getElementById(
            'searchPanel'
        );

    if (!results.length) {

        panel.classList.remove(
            'open'
        );

        return;

    }

    panel.innerHTML =
        results.map((m, i) => `

<div class="sr-item"
data-sri="${i}">

<div class="sr-thumb">

<img
src="${imgUrl(
m.poster_path,
'w92'
)}"
alt=""
>
<div class="react-action-buttons" data-variant="card" data-movie-data="${encodeURIComponent(JSON.stringify(m))}"></div>
</div>

<div>

<div class="sr-title">
${m.title || m.name || ''}
</div>

<div class="sr-year">
${(m.release_date || m.first_air_date || '').slice(0,4)}
·
${m.media_type==='tv' ? t('tvSeries') : t('movie')}
</div>

</div>

</div>

`).join('');


    panel.classList.add(
        'open'
    );


    panel.querySelectorAll(
            '.sr-item'
        )
        .forEach((item, i) => {

            item.addEventListener(
                'click',
                () => {

                    openPlayer(
                        results[i]
                    );

                    panel.classList.remove(
                        'open'
                    );

                }

            );

        });

}



/* ---- Compatibility ---- */
export function renderTop10(items) {
    renderRow(
        'trendingList',
        items
    );
}

export function renderMovieGrid(items) {
    renderRow(
        'moviesList',
        items
    );
}

export function showGridSkeleton() {}