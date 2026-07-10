/**
 * CineStream — Complete Multilingual Translation System
 * 15 languages with full UI coverage.
 * Handles font switching, RTL, and instant DOM updates.
 */

/* ============================================================
   FONT CONFIGURATION
   ============================================================ */
const LANG_FONTS = {
    en: { family: "'Inter', sans-serif", google: null },
    hi: { family: "'Noto Sans Devanagari', 'Inter', sans-serif", google: 'Noto+Sans+Devanagari:wght@400;600;700' },
    mr: { family: "'Noto Sans Devanagari', 'Inter', sans-serif", google: 'Noto+Sans+Devanagari:wght@400;600;700' },
    ta: { family: "'Noto Sans Tamil', 'Inter', sans-serif", google: 'Noto+Sans+Tamil:wght@400;600;700' },
    te: { family: "'Noto Sans Telugu', 'Inter', sans-serif", google: 'Noto+Sans+Telugu:wght@400;600;700' },
    es: { family: "'Inter', sans-serif", google: null },
    fr: { family: "'Inter', sans-serif", google: null },
    de: { family: "'Inter', sans-serif", google: null },
    ja: { family: "'Noto Sans JP', 'Inter', sans-serif", google: 'Noto+Sans+JP:wght@400;600;700' },
    ko: { family: "'Noto Sans KR', 'Inter', sans-serif", google: 'Noto+Sans+KR:wght@400;600;700' },
    zh: { family: "'Noto Sans SC', 'Inter', sans-serif", google: 'Noto+Sans+SC:wght@400;600;700' },
    pt: { family: "'Inter', sans-serif", google: null },
    it: { family: "'Inter', sans-serif", google: null },
    ru: { family: "'Inter', sans-serif", google: null },
    ar: { family: "'Noto Sans Arabic', 'Inter', sans-serif", google: 'Noto+Sans+Arabic:wght@400;600;700' },
};

/** Track loaded fonts to avoid duplicate requests */
const _loadedFonts = new Set(['en']);

/** Dynamically load a Google Font if not already loaded */
function loadFont(langCode) {
    if (_loadedFonts.has(langCode)) return;
    const cfg = LANG_FONTS[langCode];
    if (!cfg || !cfg.google) { _loadedFonts.add(langCode); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${cfg.google}&display=swap`;
    document.head.appendChild(link);
    _loadedFonts.add(langCode);
}

/* ============================================================
   COMPLETE TRANSLATION DICTIONARY
   ============================================================ */
export const UI_TRANSLATIONS = {

    /* ---- English ---- */
    en: {
        dir: 'ltr', lang: 'en',
        // Navbar
        more: 'MORE', moreServices: 'MORE SERVICES', explore: 'EXPLORE', aiSmartTools: 'AI & SMART TOOLS', account: 'ACCOUNT', home: 'HOME', movies: 'MOVIES', tvShows: 'TV SHOWS', trending: 'TRENDING',
        topRated: 'TOP RATED', genres: 'GENRES', favorites: 'FAVORITES', watchLater: 'WATCH LATER',
        // Search
        search: 'Search movies, shows…', searchTitle: 'SEARCH RESULTS',
        // Hero
        watchNow: 'Watch Now', trailer: 'Trailer', myList: 'My List', scanMood: '😊 Scan My Mood',
        trendingBadge: '🔥 Trending Now', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Added', removeFromList: 'Remove',
        // Rows
        trendingNow: 'TRENDING NOW', popularMovies: 'POPULAR MOVIES',
        popularSeries: 'POPULAR SERIES', continueWatching: 'CONTINUE WATCHING',
        topRatedMovies: 'TOP RATED', recommendations: 'YOU MAY ALSO LIKE',
        // Categories
        popularCategories: 'POPULAR CATEGORIES',
        action: 'ACTION', sciFi: 'SCI-FI', drama: 'DRAMA',
        thriller: 'THRILLER', comedy: 'COMEDY', horror: 'HORROR',
        // Profile / User menu
        myProfile: 'My Profile', settings: 'Settings', signOut: 'Sign Out',
        notifications: 'Notifications', noNotifications: 'No new notifications',
        // Player / Modal
        movieDetails: 'Movie Details', close: 'Close',
        cinemaMode: 'Cinema Mode', exitCinema: 'Exit Cinema',
        seasonShort: 'S', season: '', episode: 'Episode', episodeN: 'Episode',
        play: 'Play', pause: 'Pause', stop: 'Stop',
        qualityLabel: 'Quality', audioLabel: 'Audio', subtitleLabel: 'Subtitles',
        serverLabel: 'Server', releaseDate: 'Release', runtime: 'Runtime',
        language: 'Language', genre: 'Genre', rating: 'Rating',
        overview: 'Overview', noEpisodes: 'No episodes available.',
        loading: 'Loading…', errorLoading: 'Failed to load. Please try again.',
        tvSeries: 'TV Series', movie: 'Movie',
        // Download
        download: 'Download',
        // Watchlist
        emptyList: 'Your list is empty. Add movies and shows to watch later!',
        emptyFavorites: 'No favorites yet. Heart a title to save it here.',
        // Cinema
        cinemaTitle: 'Cinema Mode', cinemaExit: 'Exit Cinema',
        // Language selector
        selectLanguage: '🌐 Select Language',
        // Time
        min: 'min', hrs: 'hrs',
        // Misc
        imdbRating: 'IMDb', addToList: '+ My List',
    },

    /* ---- Hindi ---- */
    hi: {
        dir: 'ltr', lang: 'hi',
        more: 'और', moreServices: 'अधिक सेवाएँ', explore: 'अन्वेषण करें', aiSmartTools: 'एआई और स्मार्ट टूल्स', account: 'खाता', home: 'होम', movies: 'फ़िल्में', tvShows: 'टीवी शोज़', trending: 'ट्रेंडिंग',
        topRated: 'टॉप रेटेड', genres: 'शैलियाँ', favorites: 'पसंदीदा', watchLater: 'बाद में देखें',
        search: 'फ़िल्में, शो खोजें…', searchTitle: 'खोज परिणाम',
        watchNow: 'अभी देखें', trailer: 'ट्रेलर', myList: 'मेरी सूची', scanMood: '😊 मूड स्कैन',
        trendingBadge: '🔥 अभी ट्रेंडिंग', qualityBadge: '4K अल्ट्रा एचडी',
        addedToList: '✓ जोड़ा गया', removeFromList: 'हटाएं',
        trendingNow: 'अभी ट्रेंडिंग', popularMovies: 'लोकप्रिय फ़िल्में',
        popularSeries: 'लोकप्रिय सीरीज़', continueWatching: 'देखना जारी रखें',
        topRatedMovies: 'टॉप रेटेड', recommendations: 'आपको पसंद आ सकता है',
        popularCategories: 'लोकप्रिय श्रेणियाँ',
        action: 'एक्शन', sciFi: 'साइ-फाई', drama: 'ड्रामा',
        thriller: 'थ्रिलर', comedy: 'कॉमेडी', horror: 'हॉरर',
        myProfile: 'मेरी प्रोफ़ाइल', settings: 'सेटिंग्स', signOut: 'साइन आउट',
        notifications: 'सूचनाएं', noNotifications: 'कोई नई सूचना नहीं',
        movieDetails: 'फ़िल्म विवरण', close: 'बंद करें',
        cinemaMode: 'सिनेमा मोड', exitCinema: 'सिनेमा छोड़ें',
        seasonShort: 'S', season: '', episode: 'एपिसोड', episodeN: 'एपिसोड',
        play: 'चलाएं', pause: 'रोकें', stop: 'बंद',
        qualityLabel: 'गुणवत्ता', audioLabel: 'ऑडियो', subtitleLabel: 'उपशीर्षक',
        serverLabel: 'सर्वर', releaseDate: 'रिलीज़', runtime: 'अवधि',
        language: 'भाषा', genre: 'शैली', rating: 'रेटिंग',
        overview: 'सारांश', noEpisodes: 'कोई एपिसोड उपलब्ध नहीं।',
        loading: 'लोड हो रहा है…', errorLoading: 'लोड विफल। कृपया पुनः प्रयास करें।',
        tvSeries: 'टीवी सीरीज़', movie: 'फ़िल्म',
        download: 'डाउनलोड',
        emptyList: 'सूची खाली है। फ़िल्में और शो जोड़ें।',
        emptyFavorites: 'अभी तक कोई पसंदीदा नहीं।',
        cinemaTitle: 'सिनेमा मोड', cinemaExit: 'सिनेमा छोड़ें',
        selectLanguage: '🌐 भाषा चुनें',
        min: 'मिनट', hrs: 'घंटे',
        imdbRating: 'IMDb', addToList: '+ मेरी सूची',
    },

    /* ---- Marathi ---- */
    mr: {
        dir: 'ltr', lang: 'mr',
        more: 'अधिक', moreServices: 'अधिक सेवा', explore: 'शोधा', aiSmartTools: 'एआय आणि स्मार्ट साधने', account: 'खाते', home: 'मुखपृष्ठ', movies: 'चित्रपट', tvShows: 'टीव्ही शो', trending: 'ट्रेंडिंग',
        topRated: 'सर्वोत्तम', genres: 'शैली', favorites: 'आवडते', watchLater: 'नंतर पाहा',
        search: 'चित्रपट, शो शोधा…', searchTitle: 'शोध निकाल',
        watchNow: 'आता पाहा', trailer: 'ट्रेलर', myList: 'माझी यादी', scanMood: '😊 मूड स्कॅन',
        trendingBadge: '🔥 आत्ता ट्रेंडिंग', qualityBadge: '4K अल्ट्रा HD',
        addedToList: '✓ जोडले', removeFromList: 'काढा',
        trendingNow: 'आत्ता ट्रेंडिंग', popularMovies: 'लोकप्रिय चित्रपट',
        popularSeries: 'लोकप्रिय मालिका', continueWatching: 'पाहणे सुरू ठेवा',
        topRatedMovies: 'सर्वोत्तम', recommendations: 'तुम्हाला आवडू शकते',
        popularCategories: 'लोकप्रिय श्रेण्या',
        action: 'अॅक्शन', sciFi: 'सायन्स फिक्शन', drama: 'नाटक',
        thriller: 'थ्रिलर', comedy: 'विनोदी', horror: 'भयपट',
        myProfile: 'माझे प्रोफाइल', settings: 'सेटिंग्ज', signOut: 'साइन आउट',
        notifications: 'सूचना', noNotifications: 'कोणत्याही नवीन सूचना नाहीत',
        movieDetails: 'चित्रपट माहिती', close: 'बंद करा',
        cinemaMode: 'सिनेमा मोड', exitCinema: 'सिनेमा सोडा',
        seasonShort: 'S', season: '', episode: 'भाग', episodeN: 'भाग',
        play: 'चालवा', pause: 'थांबवा', stop: 'बंद करा',
        qualityLabel: 'गुणवत्ता', audioLabel: 'ऑडिओ', subtitleLabel: 'उपशीर्षके',
        serverLabel: 'सर्व्हर', releaseDate: 'प्रकाशन', runtime: 'कालावधी',
        language: 'भाषा', genre: 'शैली', rating: 'रेटिंग',
        overview: 'सारांश', noEpisodes: 'कोणते भाग उपलब्ध नाहीत.',
        loading: 'लोड होत आहे…', errorLoading: 'लोड अयशस्वी. पुन्हा प्रयत्न करा.',
        tvSeries: 'टीव्ही मालिका', movie: 'चित्रपट',
        download: 'डाउनलोड',
        emptyList: 'यादी रिकामी आहे. चित्रपट आणि शो जोडा.',
        emptyFavorites: 'अद्याप कोणतेही आवडते नाहीत.',
        cinemaTitle: 'सिनेमा मोड', cinemaExit: 'सिनेमा सोडा',
        selectLanguage: '🌐 भाषा निवडा',
        min: 'मिनिट', hrs: 'तास',
        imdbRating: 'IMDb', addToList: '+ माझी यादी',
    },

    /* ---- Tamil ---- */
    ta: {
        dir: 'ltr', lang: 'ta',
        more: 'மேலும்', moreServices: 'கூடுதல் சேவைகள்', explore: 'ஆராயுங்கள்', aiSmartTools: 'AI & ஸ்மார்ட் கருவிகள்', account: 'கணக்கு', home: 'முகப்பு', movies: 'திரைப்படங்கள்', tvShows: 'தொலைக்காட்சி', trending: 'டிரெண்டிங்',
        topRated: 'சிறந்தவை', genres: 'வகைகள்', favorites: 'பிடித்தவை', watchLater: 'பிறகு பார்',
        search: 'தேடு…', searchTitle: 'தேடல் முடிவுகள்',
        watchNow: 'இப்போது பார்', trailer: 'டிரெய்லர்', myList: 'என் பட்டியல்', scanMood: '😊 மனநிலை ஸ்கேன்',
        trendingBadge: '🔥 இப்போது டிரெண்டிங்', qualityBadge: '4K Ultra HD',
        addedToList: '✓ சேர்க்கப்பட்டது', removeFromList: 'அகற்று',
        trendingNow: 'இப்போது டிரெண்டிங்', popularMovies: 'பிரபலமான திரைப்படங்கள்',
        popularSeries: 'பிரபலமான தொடர்கள்', continueWatching: 'பார்ப்பதை தொடர்',
        topRatedMovies: 'சிறந்தவை', recommendations: 'உங்களுக்கு பிடிக்கலாம்',
        popularCategories: 'பிரபலமான வகைகள்',
        action: 'சாகசம்', sciFi: 'அறிவியல் புனைவு', drama: 'நாடகம்',
        thriller: 'த்ரில்லர்', comedy: 'நகைச்சுவை', horror: 'திகில்',
        myProfile: 'என் சுயவிவரம்', settings: 'அமைப்புகள்', signOut: 'வெளியேறு',
        notifications: 'அறிவிப்புகள்', noNotifications: 'புதிய அறிவிப்புகள் இல்லை',
        movieDetails: 'படம் விவரங்கள்', close: 'மூடு',
        cinemaMode: 'சினிமா முறை', exitCinema: 'சினிமாவிலிருந்து வெளியேறு',
        seasonShort: 'S', season: '', episode: 'எபிசோட்', episodeN: 'எபிசோட்',
        play: 'இயக்கு', pause: 'நிறுத்து', stop: 'நிறுத்து',
        qualityLabel: 'தரம்', audioLabel: 'ஒலி', subtitleLabel: 'வசன வரிகள்',
        serverLabel: 'சர்வர்', releaseDate: 'வெளியீடு', runtime: 'நேரம்',
        language: 'மொழி', genre: 'வகை', rating: 'மதிப்பீடு',
        overview: 'சுருக்கம்', noEpisodes: 'எபிசோட்கள் இல்லை.',
        loading: 'ஏற்றுகிறது…', errorLoading: 'ஏற்றுவதில் தோல்வி.',
        tvSeries: 'தொலைக்காட்சி தொடர்', movie: 'திரைப்படம்',
        download: 'பதிவிறக்கு',
        emptyList: 'பட்டியல் காலியாக உள்ளது.',
        emptyFavorites: 'இதுவரை பிடித்தவை எதுவும் இல்லை.',
        cinemaTitle: 'சினிமா முறை', cinemaExit: 'வெளியேறு',
        selectLanguage: '🌐 மொழியைத் தேர்ந்தெடு',
        min: 'நிமிடம்', hrs: 'மணி',
        imdbRating: 'IMDb', addToList: '+ என் பட்டியல்',
    },

    /* ---- Telugu ---- */
    te: {
        dir: 'ltr', lang: 'te',
        more: 'మరింత', moreServices: 'మరిన్ని సేవలు', explore: 'అన్వేషించండి', aiSmartTools: 'AI & స్మార్ట్ టూల్స్', account: 'ఖాతా', home: 'హోమ్', movies: 'సినిమాలు', tvShows: 'టీవీ షోలు', trending: 'ట్రెండింగ్',
        topRated: 'అత్యుత్తమ', genres: 'శైలులు', favorites: 'ఇష్టమైనవి', watchLater: 'తర్వాత చూడు',
        search: 'సినిమాలు, షోలు వెతకండి…', searchTitle: 'శోధన ఫలితాలు',
        watchNow: 'ఇప్పుడు చూడు', trailer: 'ట్రైలర్', myList: 'నా జాబితా', scanMood: '😊 మూడ్ స్కాన్',
        trendingBadge: '🔥 ఇప్పుడు ట్రెండింగ్', qualityBadge: '4K Ultra HD',
        addedToList: '✓ జోడించబడింది', removeFromList: 'తొలగించు',
        trendingNow: 'ఇప్పుడు ట్రెండింగ్', popularMovies: 'ప్రముఖ సినిమాలు',
        popularSeries: 'ప్రముఖ సీరీలు', continueWatching: 'చూడడం కొనసాగించు',
        topRatedMovies: 'అత్యుత్తమ', recommendations: 'మీకు నచ్చవచ్చు',
        popularCategories: 'ప్రముఖ వర్గాలు',
        action: 'యాక్షన్', sciFi: 'సైన్స్ ఫిక్షన్', drama: 'డ్రామా',
        thriller: 'థ్రిల్లర్', comedy: 'కామెడీ', horror: 'హారర్',
        myProfile: 'నా ప్రొఫైల్', settings: 'సెట్టింగ్‌లు', signOut: 'సైన్ అవుట్',
        notifications: 'నోటిఫికేషన్లు', noNotifications: 'కొత్త నోటిఫికేషన్లు లేవు',
        movieDetails: 'సినిమా వివరాలు', close: 'మూసివేయి',
        cinemaMode: 'సినిమా మోడ్', exitCinema: 'సినిమా వదిలి వెళ్ళు',
        seasonShort: 'S', season: '', episode: 'ఎపిసోడ్', episodeN: 'ఎపిసోడ్',
        play: 'ప్లే', pause: 'పాజ్', stop: 'స్టాప్',
        qualityLabel: 'నాణ్యత', audioLabel: 'ఆడియో', subtitleLabel: 'సబ్‌టైటిల్స్',
        serverLabel: 'సర్వర్', releaseDate: 'విడుదల', runtime: 'నిడివి',
        language: 'భాష', genre: 'శైలి', rating: 'రేటింగ్',
        overview: 'సారాంశం', noEpisodes: 'ఎపిసోడ్లు అందుబాటులో లేవు.',
        loading: 'లోడ్ అవుతోంది…', errorLoading: 'లోడ్ విఫలమైంది.',
        tvSeries: 'టీవీ సీరీస్', movie: 'సినిమా',
        download: 'డౌన్‌లోడ్',
        emptyList: 'జాబితా ఖాళీగా ఉంది.',
        emptyFavorites: 'ఇంకా ఇష్టమైనవి ఏమీ లేవు.',
        cinemaTitle: 'సినిమా మోడ్', cinemaExit: 'వదిలి వెళ్ళు',
        selectLanguage: '🌐 భాష ఎంచుకోండి',
        min: 'నిమి', hrs: 'గంటలు',
        imdbRating: 'IMDb', addToList: '+ నా జాబితా',
    },

    /* ---- Spanish ---- */
    es: {
        dir: 'ltr', lang: 'es',
        more: 'MÁS', moreServices: 'MÁS SERVICIOS', explore: 'EXPLORAR', aiSmartTools: 'HERRAMIENTAS IA', account: 'CUENTA', home: 'INICIO', movies: 'PELÍCULAS', tvShows: 'SERIES', trending: 'TENDENCIAS',
        topRated: 'LO MEJOR', genres: 'GÉNEROS', favorites: 'FAVORITOS', watchLater: 'VER DESPUÉS',
        search: 'Buscar películas, series…', searchTitle: 'RESULTADOS',
        watchNow: 'Ver ahora', trailer: 'Tráiler', myList: 'Mi lista', scanMood: '😊 Escanear estado',
        trendingBadge: '🔥 En tendencia', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Añadido', removeFromList: 'Quitar',
        trendingNow: 'EN TENDENCIA', popularMovies: 'PELÍCULAS POPULARES',
        popularSeries: 'SERIES POPULARES', continueWatching: 'CONTINUAR VIENDO',
        topRatedMovies: 'LO MEJOR', recommendations: 'TAMBIÉN TE PUEDE GUSTAR',
        popularCategories: 'CATEGORÍAS POPULARES',
        action: 'ACCIÓN', sciFi: 'CIENCIA FICCIÓN', drama: 'DRAMA',
        thriller: 'THRILLER', comedy: 'COMEDIA', horror: 'TERROR',
        myProfile: 'Mi perfil', settings: 'Ajustes', signOut: 'Cerrar sesión',
        notifications: 'Notificaciones', noNotifications: 'Sin nuevas notificaciones',
        movieDetails: 'Detalles', close: 'Cerrar',
        cinemaMode: 'Modo Cine', exitCinema: 'Salir del cine',
        seasonShort: 'S', season: '', episode: 'Episodio', episodeN: 'Ep.',
        play: 'Reproducir', pause: 'Pausar', stop: 'Detener',
        qualityLabel: 'Calidad', audioLabel: 'Audio', subtitleLabel: 'Subtítulos',
        serverLabel: 'Servidor', releaseDate: 'Estreno', runtime: 'Duración',
        language: 'Idioma', genre: 'Género', rating: 'Valoración',
        overview: 'Sinopsis', noEpisodes: 'No hay episodios disponibles.',
        loading: 'Cargando…', errorLoading: 'Error al cargar. Inténtalo de nuevo.',
        tvSeries: 'Serie de TV', movie: 'Película',
        download: 'Descargar',
        emptyList: 'Tu lista está vacía.',
        emptyFavorites: 'Aún no tienes favoritos.',
        cinemaTitle: 'Modo Cine', cinemaExit: 'Salir del Cine',
        selectLanguage: '🌐 Seleccionar idioma',
        min: 'min', hrs: 'hrs',
        imdbRating: 'IMDb', addToList: '+ Mi lista',
    },

    /* ---- French ---- */
    fr: {
        dir: 'ltr', lang: 'fr',
        more: 'PLUS', moreServices: 'PLUS DE SERVICES', explore: 'EXPLORER', aiSmartTools: 'OUTILS IA', account: 'COMPTE', home: 'ACCUEIL', movies: 'FILMS', tvShows: 'SÉRIES', trending: 'TENDANCES',
        topRated: 'LES MIEUX NOTÉS', genres: 'GENRES', favorites: 'FAVORIS', watchLater: 'À REGARDER',
        search: 'Rechercher films, séries…', searchTitle: 'RÉSULTATS',
        watchNow: 'Regarder', trailer: 'Bande-annonce', myList: 'Ma liste', scanMood: '😊 Scanner humeur',
        trendingBadge: '🔥 Tendance', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Ajouté', removeFromList: 'Retirer',
        trendingNow: 'TENDANCES', popularMovies: 'FILMS POPULAIRES',
        popularSeries: 'SÉRIES POPULAIRES', continueWatching: 'CONTINUER À REGARDER',
        topRatedMovies: 'LES MIEUX NOTÉS', recommendations: 'VOUS AIMEREZ PEUT-ÊTRE',
        popularCategories: 'CATÉGORIES POPULAIRES',
        action: 'ACTION', sciFi: 'SCI-FI', drama: 'DRAME',
        thriller: 'THRILLER', comedy: 'COMÉDIE', horror: 'HORREUR',
        myProfile: 'Mon profil', settings: 'Paramètres', signOut: 'Se déconnecter',
        notifications: 'Notifications', noNotifications: 'Aucune nouvelle notification',
        movieDetails: 'Détails', close: 'Fermer',
        cinemaMode: 'Mode Cinéma', exitCinema: 'Quitter le cinéma',
        seasonShort: 'S', season: '', episode: 'Épisode', episodeN: 'Ép.',
        play: 'Lire', pause: 'Pause', stop: 'Arrêter',
        qualityLabel: 'Qualité', audioLabel: 'Audio', subtitleLabel: 'Sous-titres',
        serverLabel: 'Serveur', releaseDate: 'Sortie', runtime: 'Durée',
        language: 'Langue', genre: 'Genre', rating: 'Note',
        overview: 'Synopsis', noEpisodes: 'Aucun épisode disponible.',
        loading: 'Chargement…', errorLoading: 'Échec du chargement.',
        tvSeries: 'Série TV', movie: 'Film',
        download: 'Télécharger',
        emptyList: 'Votre liste est vide.',
        emptyFavorites: 'Pas encore de favoris.',
        cinemaTitle: 'Mode Cinéma', cinemaExit: 'Quitter le Cinéma',
        selectLanguage: '🌐 Choisir la langue',
        min: 'min', hrs: 'h',
        imdbRating: 'IMDb', addToList: '+ Ma liste',
    },

    /* ---- German ---- */
    de: {
        dir: 'ltr', lang: 'de',
        more: 'MEHR', moreServices: 'WEITERE DIENSTE', explore: 'ENTDECKEN', aiSmartTools: 'KI-TOOLS', account: 'KONTO', home: 'START', movies: 'FILME', tvShows: 'SERIEN', trending: 'TRENDS',
        topRated: 'BESTBEWERTET', genres: 'GENRES', favorites: 'FAVORITEN', watchLater: 'SPÄTER ANSEHEN',
        search: 'Filme, Serien suchen…', searchTitle: 'SUCHERGEBNISSE',
        watchNow: 'Jetzt ansehen', trailer: 'Trailer', myList: 'Meine Liste', scanMood: '😊 Stimmung scannen',
        trendingBadge: '🔥 Im Trend', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Hinzugefügt', removeFromList: 'Entfernen',
        trendingNow: 'IM TREND', popularMovies: 'BELIEBTE FILME',
        popularSeries: 'BELIEBTE SERIEN', continueWatching: 'WEITERSCHAUEN',
        topRatedMovies: 'BESTBEWERTET', recommendations: 'DAS KÖNNTE DIR GEFALLEN',
        popularCategories: 'BELIEBTE KATEGORIEN',
        action: 'ACTION', sciFi: 'SCI-FI', drama: 'DRAMA',
        thriller: 'THRILLER', comedy: 'KOMÖDIE', horror: 'HORROR',
        myProfile: 'Mein Profil', settings: 'Einstellungen', signOut: 'Abmelden',
        notifications: 'Benachrichtigungen', noNotifications: 'Keine neuen Benachrichtigungen',
        movieDetails: 'Details', close: 'Schließen',
        cinemaMode: 'Kino-Modus', exitCinema: 'Kino verlassen',
        seasonShort: 'S', season: '', episode: 'Episode', episodeN: 'Ep.',
        play: 'Abspielen', pause: 'Pause', stop: 'Stopp',
        qualityLabel: 'Qualität', audioLabel: 'Audio', subtitleLabel: 'Untertitel',
        serverLabel: 'Server', releaseDate: 'Erscheinungsdatum', runtime: 'Laufzeit',
        language: 'Sprache', genre: 'Genre', rating: 'Bewertung',
        overview: 'Handlung', noEpisodes: 'Keine Episoden verfügbar.',
        loading: 'Lädt…', errorLoading: 'Laden fehlgeschlagen.',
        tvSeries: 'TV-Serie', movie: 'Film',
        download: 'Herunterladen',
        emptyList: 'Deine Liste ist leer.',
        emptyFavorites: 'Noch keine Favoriten.',
        cinemaTitle: 'Kino-Modus', cinemaExit: 'Kino verlassen',
        selectLanguage: '🌐 Sprache wählen',
        min: 'Min', hrs: 'Std',
        imdbRating: 'IMDb', addToList: '+ Meine Liste',
    },

    /* ---- Japanese ---- */
    ja: {
        dir: 'ltr', lang: 'ja',
        more: 'もっと見る', moreServices: 'その他のサービス', explore: '探索する', aiSmartTools: 'AIツール', account: 'アカウント', home: 'ホーム', movies: '映画', tvShows: 'テレビ番組', trending: 'トレンド',
        topRated: '高評価', genres: 'ジャンル', favorites: 'お気に入り', watchLater: '後で見る',
        search: '映画・番組を検索…', searchTitle: '検索結果',
        watchNow: '今すぐ見る', trailer: 'トレーラー', myList: 'マイリスト', scanMood: '😊 気分スキャン',
        trendingBadge: '🔥 トレンド中', qualityBadge: '4K ウルトラHD',
        addedToList: '✓ 追加済み', removeFromList: '削除',
        trendingNow: '今のトレンド', popularMovies: '人気映画',
        popularSeries: '人気シリーズ', continueWatching: '視聴を続ける',
        topRatedMovies: '高評価', recommendations: 'おすすめ',
        popularCategories: '人気カテゴリ',
        action: 'アクション', sciFi: 'SF', drama: 'ドラマ',
        thriller: 'スリラー', comedy: 'コメディ', horror: 'ホラー',
        myProfile: 'プロフィール', settings: '設定', signOut: 'サインアウト',
        notifications: '通知', noNotifications: '新しい通知はありません',
        movieDetails: '映画の詳細', close: '閉じる',
        cinemaMode: 'シネマモード', exitCinema: 'シネマを終了',
        seasonShort: 'S', season: '', episode: 'エピソード', episodeN: 'Ep.',
        play: '再生', pause: '一時停止', stop: '停止',
        qualityLabel: '画質', audioLabel: '音声', subtitleLabel: '字幕',
        serverLabel: 'サーバー', releaseDate: '公開日', runtime: '上映時間',
        language: '言語', genre: 'ジャンル', rating: '評価',
        overview: 'あらすじ', noEpisodes: 'エピソードがありません。',
        loading: '読み込み中…', errorLoading: '読み込みに失敗しました。',
        tvSeries: 'テレビシリーズ', movie: '映画',
        download: 'ダウンロード',
        emptyList: 'リストは空です。',
        emptyFavorites: 'まだお気に入りがありません。',
        cinemaTitle: 'シネマモード', cinemaExit: '終了',
        selectLanguage: '🌐 言語を選択',
        min: '分', hrs: '時間',
        imdbRating: 'IMDb', addToList: '+ マイリスト',
    },

    /* ---- Korean ---- */
    ko: {
        dir: 'ltr', lang: 'ko',
        more: '더 보기', moreServices: '기타 서비스', explore: '탐색', aiSmartTools: 'AI 스마트 도구', account: '계정', home: '홈', movies: '영화', tvShows: 'TV 프로그램', trending: '트렌딩',
        topRated: '최고 평점', genres: '장르', favorites: '즐겨찾기', watchLater: '나중에 보기',
        search: '영화, 프로그램 검색…', searchTitle: '검색 결과',
        watchNow: '지금 보기', trailer: '예고편', myList: '내 목록', scanMood: '😊 기분 스캔',
        trendingBadge: '🔥 지금 트렌딩', qualityBadge: '4K 울트라HD',
        addedToList: '✓ 추가됨', removeFromList: '제거',
        trendingNow: '지금 트렌딩', popularMovies: '인기 영화',
        popularSeries: '인기 시리즈', continueWatching: '계속 시청',
        topRatedMovies: '최고 평점', recommendations: '추천 콘텐츠',
        popularCategories: '인기 카테고리',
        action: '액션', sciFi: 'SF', drama: '드라마',
        thriller: '스릴러', comedy: '코미디', horror: '공포',
        myProfile: '내 프로필', settings: '설정', signOut: '로그아웃',
        notifications: '알림', noNotifications: '새로운 알림이 없습니다',
        movieDetails: '영화 세부정보', close: '닫기',
        cinemaMode: '시네마 모드', exitCinema: '시네마 종료',
        seasonShort: 'S', season: '', episode: '에피소드', episodeN: 'Ep.',
        play: '재생', pause: '일시정지', stop: '정지',
        qualityLabel: '화질', audioLabel: '오디오', subtitleLabel: '자막',
        serverLabel: '서버', releaseDate: '출시일', runtime: '상영 시간',
        language: '언어', genre: '장르', rating: '평점',
        overview: '줄거리', noEpisodes: '에피소드가 없습니다.',
        loading: '로딩 중…', errorLoading: '로드 실패.',
        tvSeries: 'TV 시리즈', movie: '영화',
        download: '다운로드',
        emptyList: '목록이 비어 있습니다.',
        emptyFavorites: '아직 즐겨찾기가 없습니다.',
        cinemaTitle: '시네마 모드', cinemaExit: '종료',
        selectLanguage: '🌐 언어 선택',
        min: '분', hrs: '시간',
        imdbRating: 'IMDb', addToList: '+ 내 목록',
    },

    /* ---- Chinese (Simplified) ---- */
    zh: {
        dir: 'ltr', lang: 'zh',
        more: '更多', moreServices: '更多服务', explore: '探索', aiSmartTools: 'AI与智能工具', account: '账户', home: '主页', movies: '电影', tvShows: '电视剧', trending: '热门',
        topRated: '高分', genres: '类型', favorites: '收藏', watchLater: '稍后观看',
        search: '搜索电影、剧集…', searchTitle: '搜索结果',
        watchNow: '立即播放', trailer: '预告片', myList: '我的列表', scanMood: '😊 情绪扫描',
        trendingBadge: '🔥 热门内容', qualityBadge: '4K 超高清',
        addedToList: '✓ 已添加', removeFromList: '移除',
        trendingNow: '热门内容', popularMovies: '热门电影',
        popularSeries: '热门剧集', continueWatching: '继续观看',
        topRatedMovies: '高分内容', recommendations: '猜你喜欢',
        popularCategories: '热门分类',
        action: '动作', sciFi: '科幻', drama: '剧情',
        thriller: '悬疑', comedy: '喜剧', horror: '恐怖',
        myProfile: '我的个人资料', settings: '设置', signOut: '退出',
        notifications: '通知', noNotifications: '没有新通知',
        movieDetails: '影片详情', close: '关闭',
        cinemaMode: '影院模式', exitCinema: '退出影院',
        seasonShort: 'S', season: '', episode: '集', episodeN: '第',
        play: '播放', pause: '暂停', stop: '停止',
        qualityLabel: '画质', audioLabel: '音频', subtitleLabel: '字幕',
        serverLabel: '服务器', releaseDate: '上映日期', runtime: '片长',
        language: '语言', genre: '类型', rating: '评分',
        overview: '简介', noEpisodes: '没有可用的剧集。',
        loading: '加载中…', errorLoading: '加载失败，请重试。',
        tvSeries: '电视剧', movie: '电影',
        download: '下载',
        emptyList: '列表为空。',
        emptyFavorites: '暂无收藏。',
        cinemaTitle: '影院模式', cinemaExit: '退出',
        selectLanguage: '🌐 选择语言',
        min: '分钟', hrs: '小时',
        imdbRating: 'IMDb', addToList: '+ 我的列表',
    },

    /* ---- Portuguese ---- */
    pt: {
        dir: 'ltr', lang: 'pt',
        more: 'MAIS', moreServices: 'MAIS SERVIÇOS', explore: 'EXPLORAR', aiSmartTools: 'FERRAMENTAS IA', account: 'CONTA', home: 'INÍCIO', movies: 'FILMES', tvShows: 'SÉRIES', trending: 'TENDÊNCIAS',
        topRated: 'MAIS VOTADOS', genres: 'GÊNEROS', favorites: 'FAVORITOS', watchLater: 'VER DEPOIS',
        search: 'Pesquisar filmes, séries…', searchTitle: 'RESULTADOS',
        watchNow: 'Assistir agora', trailer: 'Trailer', myList: 'Minha lista', scanMood: '😊 Escanear humor',
        trendingBadge: '🔥 Em alta', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Adicionado', removeFromList: 'Remover',
        trendingNow: 'EM ALTA', popularMovies: 'FILMES POPULARES',
        popularSeries: 'SÉRIES POPULARES', continueWatching: 'CONTINUAR ASSISTINDO',
        topRatedMovies: 'MAIS VOTADOS', recommendations: 'VOCÊ TAMBÉM PODE GOSTAR',
        popularCategories: 'CATEGORIAS POPULARES',
        action: 'AÇÃO', sciFi: 'FICÇÃO CIENTÍFICA', drama: 'DRAMA',
        thriller: 'THRILLER', comedy: 'COMÉDIA', horror: 'TERROR',
        myProfile: 'Meu perfil', settings: 'Configurações', signOut: 'Sair',
        notifications: 'Notificações', noNotifications: 'Sem novas notificações',
        movieDetails: 'Detalhes', close: 'Fechar',
        cinemaMode: 'Modo Cinema', exitCinema: 'Sair do Cinema',
        seasonShort: 'S', season: '', episode: 'Episódio', episodeN: 'Ep.',
        play: 'Assistir', pause: 'Pausar', stop: 'Parar',
        qualityLabel: 'Qualidade', audioLabel: 'Áudio', subtitleLabel: 'Legendas',
        serverLabel: 'Servidor', releaseDate: 'Lançamento', runtime: 'Duração',
        language: 'Idioma', genre: 'Gênero', rating: 'Avaliação',
        overview: 'Sinopse', noEpisodes: 'Nenhum episódio disponível.',
        loading: 'Carregando…', errorLoading: 'Falha ao carregar.',
        tvSeries: 'Série de TV', movie: 'Filme',
        download: 'Baixar',
        emptyList: 'Sua lista está vazia.',
        emptyFavorites: 'Nenhum favorito ainda.',
        cinemaTitle: 'Modo Cinema', cinemaExit: 'Sair do Cinema',
        selectLanguage: '🌐 Selecionar idioma',
        min: 'min', hrs: 'h',
        imdbRating: 'IMDb', addToList: '+ Minha lista',
    },

    /* ---- Italian ---- */
    it: {
        dir: 'ltr', lang: 'it',
        more: 'ALTRO', moreServices: 'ALTRI SERVIZI', explore: 'ESPLORA', aiSmartTools: 'STRUMENTI IA', account: 'ACCOUNT', home: 'HOME', movies: 'FILM', tvShows: 'SERIE TV', trending: 'TENDENZE',
        topRated: 'TOP VALUTATI', genres: 'GENERI', favorites: 'PREFERITI', watchLater: 'DA VEDERE',
        search: 'Cerca film, serie…', searchTitle: 'RISULTATI',
        watchNow: 'Guarda ora', trailer: 'Trailer', myList: 'La mia lista', scanMood: '😊 Scansiona umore',
        trendingBadge: '🔥 Di tendenza', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Aggiunto', removeFromList: 'Rimuovi',
        trendingNow: 'DI TENDENZA', popularMovies: 'FILM POPOLARI',
        popularSeries: 'SERIE POPOLARI', continueWatching: 'CONTINUA A GUARDARE',
        topRatedMovies: 'TOP VALUTATI', recommendations: 'POTREBBE PIACERTI',
        popularCategories: 'CATEGORIE POPOLARI',
        action: 'AZIONE', sciFi: 'FANTASCIENZA', drama: 'DRAMMA',
        thriller: 'THRILLER', comedy: 'COMMEDIA', horror: 'HORROR',
        myProfile: 'Il mio profilo', settings: 'Impostazioni', signOut: 'Esci',
        notifications: 'Notifiche', noNotifications: 'Nessuna nuova notifica',
        movieDetails: 'Dettagli', close: 'Chiudi',
        cinemaMode: 'Modalità Cinema', exitCinema: 'Esci dal Cinema',
        seasonShort: 'S', season: '', episode: 'Episodio', episodeN: 'Ep.',
        play: 'Riproduci', pause: 'Pausa', stop: 'Stop',
        qualityLabel: 'Qualità', audioLabel: 'Audio', subtitleLabel: 'Sottotitoli',
        serverLabel: 'Server', releaseDate: 'Uscita', runtime: 'Durata',
        language: 'Lingua', genre: 'Genere', rating: 'Valutazione',
        overview: 'Trama', noEpisodes: 'Nessun episodio disponibile.',
        loading: 'Caricamento…', errorLoading: 'Caricamento fallito.',
        tvSeries: 'Serie TV', movie: 'Film',
        download: 'Scarica',
        emptyList: 'La tua lista è vuota.',
        emptyFavorites: 'Nessun preferito ancora.',
        cinemaTitle: 'Modalità Cinema', cinemaExit: 'Esci dal Cinema',
        selectLanguage: '🌐 Seleziona lingua',
        min: 'min', hrs: 'ore',
        imdbRating: 'IMDb', addToList: '+ La mia lista',
    },

    /* ---- Russian ---- */
    ru: {
        dir: 'ltr', lang: 'ru',
        more: 'ЕЩЕ', moreServices: 'ДРУГИЕ СЛУЖБЫ', explore: 'ОБЗОР', aiSmartTools: 'КИ-ИНСТРУМЕНТЫ', account: 'АККАУНТ', home: 'ГЛАВНАЯ', movies: 'ФИЛЬМЫ', tvShows: 'СЕРИАЛЫ', trending: 'ТРЕНДЫ',
        topRated: 'ЛУЧШИЕ', genres: 'ЖАНРЫ', favorites: 'ИЗБРАННОЕ', watchLater: 'СМОТРЕТЬ ПОЗЖЕ',
        search: 'Поиск фильмов, сериалов…', searchTitle: 'РЕЗУЛЬТАТЫ',
        watchNow: 'Смотреть', trailer: 'Трейлер', myList: 'Мой список', scanMood: '😊 Сканировать настроение',
        trendingBadge: '🔥 В тренде', qualityBadge: '4K Ultra HD',
        addedToList: '✓ Добавлено', removeFromList: 'Убрать',
        trendingNow: 'В ТРЕНДЕ', popularMovies: 'ПОПУЛЯРНЫЕ ФИЛЬМЫ',
        popularSeries: 'ПОПУЛЯРНЫЕ СЕРИАЛЫ', continueWatching: 'ПРОДОЛЖИТЬ ПРОСМОТР',
        topRatedMovies: 'ЛУЧШИЕ', recommendations: 'ВАМ МОЖЕТ ПОНРАВИТЬСЯ',
        popularCategories: 'ПОПУЛЯРНЫЕ КАТЕГОРИИ',
        action: 'ЭКШН', sciFi: 'ФАНТАСТИКА', drama: 'ДРАМА',
        thriller: 'ТРИЛЛЕР', comedy: 'КОМЕДИЯ', horror: 'УЖАСЫ',
        myProfile: 'Мой профиль', settings: 'Настройки', signOut: 'Выйти',
        notifications: 'Уведомления', noNotifications: 'Нет новых уведомлений',
        movieDetails: 'Детали', close: 'Закрыть',
        cinemaMode: 'Режим кинотеатра', exitCinema: 'Выйти из кинотеатра',
        seasonShort: 'S', season: '', episode: 'Эпизод', episodeN: 'Эп.',
        play: 'Воспроизвести', pause: 'Пауза', stop: 'Стоп',
        qualityLabel: 'Качество', audioLabel: 'Аудио', subtitleLabel: 'Субтитры',
        serverLabel: 'Сервер', releaseDate: 'Дата выхода', runtime: 'Продолжительность',
        language: 'Язык', genre: 'Жанр', rating: 'Оценка',
        overview: 'Описание', noEpisodes: 'Эпизоды недоступны.',
        loading: 'Загрузка…', errorLoading: 'Ошибка загрузки.',
        tvSeries: 'ТВ-сериал', movie: 'Фильм',
        download: 'Скачать',
        emptyList: 'Ваш список пуст.',
        emptyFavorites: 'Нет избранного.',
        cinemaTitle: 'Режим кинотеатра', cinemaExit: 'Выйти',
        selectLanguage: '🌐 Выбрать язык',
        min: 'мин', hrs: 'ч',
        imdbRating: 'IMDb', addToList: '+ Мой список',
    },

    /* ---- Arabic ---- */
    ar: {
        dir: 'rtl', lang: 'ar',
        more: 'المزيد', moreServices: 'المزيد من الخدمات', explore: 'استكشاف', aiSmartTools: 'أدوات الذكاء الاصطناعي', account: 'الحساب', home: 'الرئيسية', movies: 'أفلام', tvShows: 'مسلسلات', trending: 'الرائج',
        topRated: 'الأعلى تقييماً', genres: 'الأنواع', favorites: 'المفضلة', watchLater: 'شاهد لاحقاً',
        search: 'ابحث عن أفلام، مسلسلات…', searchTitle: 'نتائج البحث',
        watchNow: 'شاهد الآن', trailer: 'مقطع دعائي', myList: 'قائمتي', scanMood: '😊 مسح المزاج',
        trendingBadge: '🔥 الأكثر رواجاً', qualityBadge: '4K فائق الجودة',
        addedToList: '✓ تمت الإضافة', removeFromList: 'إزالة',
        trendingNow: 'الأكثر رواجاً', popularMovies: 'أفلام شائعة',
        popularSeries: 'مسلسلات شائعة', continueWatching: 'متابعة المشاهدة',
        topRatedMovies: 'الأعلى تقييماً', recommendations: 'قد يعجبك أيضاً',
        popularCategories: 'الفئات الشائعة',
        action: 'أكشن', sciFi: 'خيال علمي', drama: 'دراما',
        thriller: 'إثارة', comedy: 'كوميديا', horror: 'رعب',
        myProfile: 'ملفي الشخصي', settings: 'الإعدادات', signOut: 'تسجيل الخروج',
        notifications: 'الإشعارات', noNotifications: 'لا توجد إشعارات جديدة',
        movieDetails: 'تفاصيل الفيلم', close: 'إغلاق',
        cinemaMode: 'وضع السينما', exitCinema: 'الخروج من السينما',
        seasonShort: 'S', season: '', episode: 'حلقة', episodeN: 'حلقة',
        play: 'تشغيل', pause: 'إيقاف مؤقت', stop: 'إيقاف',
        qualityLabel: 'الجودة', audioLabel: 'الصوت', subtitleLabel: 'الترجمة',
        serverLabel: 'الخادم', releaseDate: 'تاريخ الإصدار', runtime: 'المدة',
        language: 'اللغة', genre: 'النوع', rating: 'التقييم',
        overview: 'القصة', noEpisodes: 'لا توجد حلقات متاحة.',
        loading: 'جارٍ التحميل…', errorLoading: 'فشل التحميل، يرجى المحاولة مرة أخرى.',
        tvSeries: 'مسلسل تلفزيوني', movie: 'فيلم',
        download: 'تحميل',
        emptyList: 'قائمتك فارغة.',
        emptyFavorites: 'لا توجد مفضلات بعد.',
        cinemaTitle: 'وضع السينما', cinemaExit: 'الخروج',
        selectLanguage: '🌐 اختر اللغة',
        min: 'د', hrs: 'س',
        imdbRating: 'IMDb', addToList: '+ قائمتي',
    },
};

/* ============================================================
   HELPERS
   ============================================================ */
export function getT(langCode) {
    return UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS['en'];
}

/** Expose globally so non-module code can call getTranslation() */
window.__cineT = getT;

/* ============================================================
   FONT APPLICATION
   ============================================================ */
function applyFont(langCode) {
    loadFont(langCode);
    const cfg = LANG_FONTS[langCode] || LANG_FONTS['en'];
    document.documentElement.style.setProperty('--ui-font', cfg.family);
    // Apply to body so it cascades to everything
    document.body.style.fontFamily = cfg.family;
}

/* ============================================================
   MASTER applyTranslations() — updates entire DOM
   ============================================================ */
export function applyTranslations(langCode) {
    // Force English dictionary for UI layout elements
    const t = getT('en');

    /* 1. Direction & lang attribute */
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    document.body.setAttribute('dir', 'ltr');

    /* 2. Font */
    applyFont('en');

    /* 3. Nav tabs */
    const tabMap = {
        home: t.home, movies: t.movies, tv: t.tvShows, trending: t.trending,
        'top-rated': t.topRated, genres: t.genres, favorites: t.favorites, 'watch-later': t.watchLater
    };
    document.querySelectorAll('.nav-tab[data-route]').forEach(btn => {
        const route = btn.getAttribute('data-route');
        if (tabMap[route]) btn.textContent = tabMap[route];
    });

    // Translate dynamic i18n attributes (covers slide-drawer, More button)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    /* 4. Search */
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.search;

    /* 5. Hero buttons */
    _setText('heroWatch', `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${t.watchNow}`);
    _setText('heroMore', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9z"/></svg> ${t.trailer}`);
    _setText('heroList', `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ${t.myList}`);

    /* 6. Hero badges */
    const trendBadge = document.querySelector('.trending-badge');
    if (trendBadge) trendBadge.textContent = t.trendingBadge;
    const qualBadge = document.querySelector('.quality-badge-hero');
    if (qualBadge) qualBadge.textContent = t.qualityBadge;

    /* 7. Row titles */
    _setRowTitle('trendingRow', t.trendingNow);
    _setRowTitle('moviesRow', t.popularMovies);
    _setRowTitle('seriesRow', t.popularSeries);
    _setRowTitle('continueRow', t.continueWatching);

    /* 8. Categories */
    const catTitle = document.querySelector('.cat-title');
    if (catTitle) catTitle.textContent = t.popularCategories;
    const pillLabels = {
        '28': t.action, '878': t.sciFi, '18': t.drama,
        '53': t.thriller, '35': t.comedy, '27': t.horror
    };
    document.querySelectorAll('.cat-pill[data-genre]').forEach(pill => {
        const label = pill.querySelector('.pill-label');
        const txt = pillLabels[pill.getAttribute('data-genre')];
        if (label && txt) label.textContent = txt;
    });

    /* 9. User menu */
    const profileItem = document.querySelector('.user-dropdown-item:not(.danger)');
    if (profileItem) {
        const svg = profileItem.querySelector('svg')?.outerHTML || '';
        profileItem.innerHTML = `${svg} ${t.myProfile}`;
    }

    /* 10. Modal / Player labels (if modal is open) */
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        const closeLabel = modalClose.querySelector('.close-label');
        if (closeLabel) closeLabel.textContent = t.close;
    }

    /* 11. Cinema mode button */
    const cinemaBtns = document.querySelectorAll('[data-action="cinema-mode"], .cinema-mode-btn, #cinemaModeBtn');
    cinemaBtns.forEach(btn => { if (btn) btn.textContent = t.cinemaMode; });
    const exitCinemaBtns = document.querySelectorAll('[data-action="exit-cinema"], .exit-cinema-btn, #exitCinemaBtn');
    exitCinemaBtns.forEach(btn => { if (btn) btn.textContent = t.exitCinema; });

    /* 12. Language selector header inside dropdown */
    const langHeader = document.querySelector('.lang-dropdown-header');
    if (langHeader) langHeader.textContent = t.selectLanguage;

    /* 13. Page title update */
    document.title = 'CineStream';

    /* 14. Persist selected code in data attribute for player and recommendation contexts */
    document.documentElement.dataset.lang = langCode;

    /* 15. Dispatch event so player/APIs can read selected audio/sub language */
    window.dispatchEvent(new CustomEvent('langchange', { detail: { code: langCode, t: getT(langCode) } }));
}

/* ============================================================
   DOM HELPERS
   ============================================================ */
function _setText(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function _setRowTitle(rowId, text) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const titleEl = row.querySelector('.row-title');
    if (titleEl && text) titleEl.textContent = text;
}

/* ============================================================
   LIVE TEXT HELPER — always returns English text for runtime strings
   ============================================================ */
export function t(key) {
    return UI_TRANSLATIONS['en'][key] || key;
}
