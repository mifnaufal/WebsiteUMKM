let allNews = [];
let currentPage = 1;
const itemsPerPage = 6; // 6 items for the grid, 1 for featured

document.addEventListener('DOMContentLoaded', async () => {
    // This logic runs on berita.html, berita-detail.html, and index.html
    try {
        const response = await fetch('/data/news.json');
        if (!response.ok) throw new Error('Gagal memuat data berita.');
        const data = await response.json();
        allNews = data.news;

        if (document.getElementById('news-grid-container')) {
            // Logic for berita.html
            displayPage(currentPage);
        } else if (document.getElementById('newsDetailContainer')) {
            // Logic for berita-detail.html
            displayNewsDetail();
        } else if (document.getElementById('latest-news-container')) {
            // Logic for index.html
            displayLatestNews();
        }
    } catch (error) {
        handleFetchError(error);
    }
});

function displayPage(page) {
    const featuredNewsContainer = document.getElementById('featured-news-container');
    const newsGridContainer = document.getElementById('news-grid-container');
    const paginationContainer = document.getElementById('pagination-container');

    if (!allNews.length || !featuredNewsContainer || !newsGridContainer || !paginationContainer) return;

    currentPage = page;

    // Featured news is always the first item from the full list
    const featuredNews = allNews[0];
    featuredNewsContainer.innerHTML = featuredNews ? createFeaturedNewsCard(featuredNews) : '<p>Berita unggulan tidak tersedia.</p>';

    // Paginate the rest of the news for the grid
    const newsForGrid = allNews.slice(1);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = newsForGrid.slice(startIndex, endIndex);

    if (paginatedItems.length > 0) {
        newsGridContainer.innerHTML = paginatedItems.map(createNewsCard).join('');
    } else {
        newsGridContainer.innerHTML = '<p class="text-center text-gray-500 md:col-span-3">Tidak ada berita untuk ditampilkan.</p>';
    }

    setupPagination(newsForGrid.length, page, paginationContainer);
}

function setupPagination(totalItems, page, container) {
    container.innerHTML = '';
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    if (pageCount <= 1) return; // No pagination needed

    const nav = document.createElement('nav');
    nav.className = 'flex flex-wrap justify-center items-center gap-2'; // Responsive gap

    // Previous button
    nav.appendChild(createPaginationButton('Sebelumnya', page - 1, page === 1));

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        nav.appendChild(createPaginationButton(i, i, false, i === page));
    }

    // Next button
    nav.appendChild(createPaginationButton('Selanjutnya', page + 1, page === pageCount));

    container.appendChild(nav);
}

function createPaginationButton(text, page, isDisabled = false, isActive = false) {
    const button = document.createElement('a');
    button.href = '#featured-news-container'; // Navigate to top of news section
    button.innerText = text;

    let baseClasses = 'px-4 py-2 border border-gray-200 rounded-lg font-medium transition-colors duration-200';
    let stateClasses = '';

    if (isDisabled) {
        stateClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed';
    } else if (isActive) {
        stateClasses = 'bg-primary text-white border-primary cursor-default';
    } else {
        stateClasses = 'bg-white text-gray-600 hover:bg-primary hover:text-white hover:border-primary';
    }

    button.className = `${baseClasses} ${stateClasses}`;

    if (!isDisabled) {
        button.addEventListener('click', (e) => {
            if (!isActive) {
                displayPage(page);
            }
        });
    }

    return button;
}

function handleFetchError(error) {
    console.error('Error:', error);
    const featured = document.getElementById('featured-news-container');
    const grid = document.getElementById('news-grid-container');
    const detail = document.getElementById('newsDetailContainer');
    const latest = document.getElementById('latest-news-container');

    const errorMessage = `<p class="text-center text-red-500 col-span-full">${error.message}</p>`;
    if (featured) featured.innerHTML = errorMessage;
    if (grid) grid.innerHTML = errorMessage;
    if (detail) detail.innerHTML = errorMessage;
    if (latest) latest.innerHTML = errorMessage;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function createFeaturedNewsCard(news) {
    return `
        <a href="berita-detail.html?id=${news.id}" class="block md:flex items-center group">
            <div class="md:w-1/2">
                <img src="${news.image}&w=800&h=600" alt="${news.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
            </div>
            <div class="md:w-1/2 p-8">
                <span class="text-sm font-semibold text-primary uppercase tracking-wider">${news.category}</span>
                <h3 class="text-3xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">${news.title}</h3>
                <p class="text-gray-600 mb-4">${news.summary}</p>
                <div class="text-sm text-gray-500">
                    <i class="fas fa-calendar-alt mr-2"></i>${formatDate(news.date)}
                </div>
            </div>
        </div>
    `;
}

function createNewsCard(news) {
    return `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg news-card transition-transform duration-300 hover:-translate-y-2 animate-slide-up">
            <a href="berita-detail.html?id=${news.id}" class="block">
                <img src="${news.image}&w=400&h=300" alt="${news.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <span class="text-xs font-semibold text-primary uppercase">${news.category}</span>
                    <h4 class="font-bold text-lg mt-1 mb-2 h-14 overflow-hidden">${news.title}</h4>
                    <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar-alt mr-2"></i>${formatDate(news.date)}
                    </div>
                </div>
            </a>
        </div>
    `;
}

function createNewsDetail(news) {
    return `
        <span class="text-sm font-semibold text-primary uppercase tracking-wider">${news.category}</span>
        <h1 class="text-4xl font-bold my-4">${news.title}</h1>
        <div class="text-gray-500 mb-6">
            <i class="fas fa-calendar-alt mr-2"></i>Dipublikasikan pada ${formatDate(news.date)}
        </div>
        <img src="${news.image}&w=1200&h=600" alt="${news.title}" class="w-full rounded-2xl mb-8">
        <div class="prose max-w-none text-lg text-gray-800">
            ${news.content.replace(/\n/g, '<br>')}
        </div>
        <a href="berita.html" class="inline-block mt-8 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <i class="fas fa-arrow-left mr-2"></i>Kembali ke Berita
        </a>
    `;
}

function displayLatestNews() {
    const container = document.getElementById('latest-news-container');
    if (!container || !allNews.length) return;

    const latestNews = allNews.slice(0, 4);
    container.innerHTML = latestNews.length > 0 ? latestNews.map(createLatestNewsCard).join('') : '<p class="text-center text-gray-500 col-span-full">Tidak ada berita terbaru.</p>';
}

function createLatestNewsCard(news) {
    return `
        <div class="card bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col">
            <a href="berita-detail.html?id=${news.id}" class="block h-full flex flex-col">
                <img src="${news.image}&w=400&h=300" alt="${news.title}" class="w-full h-48 object-cover">
                <div class="p-6 flex flex-col flex-grow">
                    <div class="text-sm text-gray-500 mb-2">${formatDate(news.date)}</div>
                    <h3 class="font-bold text-lg mb-3 flex-grow">${news.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm">${news.summary}</p>
                    <span class="text-primary font-medium hover:underline mt-auto">Baca selengkapnya</span>
                </div>
            </a>
        </div>
    `;
}

function displayNewsDetail() {
    const newsDetailContainer = document.getElementById('newsDetailContainer');
    if (!newsDetailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'), 10);
    const newsItem = allNews.find(item => item.id === newsId);

    if (newsItem) {
        newsDetailContainer.innerHTML = createNewsDetail(newsItem);
    } else {
        newsDetailContainer.innerHTML = '<p class="text-center text-gray-500">Berita tidak ditemukan.</p>';
    }
}
