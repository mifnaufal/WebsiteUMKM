document.addEventListener("DOMContentLoaded", () => {
  // Halaman Berita
  if (document.getElementById('news-grid-container')) {
    initBeritaPage();
  } 
  // Halaman Detail Berita
  else if (document.getElementById('news-detail-container')) {
    initBeritaDetailPage();
  }
  // Halaman Index - Berita Terbaru
  else if (document.getElementById('latest-news-container')) {
    initHomepageLatestNews();
  }
});

/**
 * Render 4 berita terbaru ke homepage (index.html)
 */
async function initHomepageLatestNews() {
  const latestNewsContainer = document.getElementById('latest-news-container');
  if (!latestNewsContainer) return;
  try {
    const response = await fetch('data/news.json');
    if (!response.ok) throw new Error('Gagal memuat berita.');
    const data = await response.json();
    const newsList = (data.news || []).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    if (newsList.length === 0) {
      latestNewsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">Belum ada berita terbaru.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    newsList.forEach(news => {
      const card = document.createElement('div');
      card.className = "card flex flex-col h-full min-h-[350px]";
      card.innerHTML = `
        <a href="berita-detail.html?id=${news.id}" class="block h-full">
          <img src="${news.image}" alt="${news.title}" class="w-full h-40 object-cover rounded-t-lg">
          <div class="p-4 flex flex-col h-full">
            <div class="flex-1">
              <p class="text-xs text-gray-500 mb-1">${new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              <h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2">${news.title}</h3>
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">${news.summary}</p>
            </div>
            
          </div>
        </a>
      `;
      fragment.appendChild(card);
    });
    latestNewsContainer.innerHTML = '';
    latestNewsContainer.appendChild(fragment);
  } catch (error) {
    latestNewsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">Gagal memuat berita terbaru.</p>';
    console.error(error);
  }
}


let allNews = [];
let filteredNews = [];
let currentNewsCount = 0;
const newsPerPage = 6; // Number of news items to load at a time

/**
 * Fetches news data from the JSON file.
 * Caches the data in the `allNews` array to avoid redundant fetches.
 */
async function fetchNews() {
  if (allNews.length > 0) {
    return allNews;
  }
  try {
    // Corrected path for fetching data from the root
    const response = await fetch('data/news.json');
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    allNews = data.news.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent
    return allNews;
  } catch (error) {
    console.error("Gagal memuat berita:", error);
    const newsContainer = document.getElementById('news-grid-container');
    if (newsContainer) {
      newsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">Gagal memuat berita. Silakan coba lagi nanti.</p>';
    }
    return [];
  }
}

/**
 * Initializes the main news page with filters and the initial news load.
 */
async function initBeritaPage() {
  await fetchNews();
  setupCategoryFilters();
  filterAndDisplayNews('ALL'); // Initial load with all news

  const loadMoreButton = document.getElementById('load-more-button');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', loadMoreNews);
  }
}

/**
 * Sets up event listeners for the category filter buttons.
 */
function setupCategoryFilters() {
  const filtersContainer = document.getElementById('category-filters');
  if (!filtersContainer) return;

  filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const category = e.target.dataset.category;
      const buttons = filtersContainer.querySelectorAll('button');
      
      buttons.forEach(button => {
        button.classList.remove('bg-primary', 'text-white');
        button.classList.add('bg-gray-200', 'text-gray-700');
      });

      e.target.classList.add('bg-primary', 'text-white');
      e.target.classList.remove('bg-gray-200', 'text-gray-700');

      filterAndDisplayNews(category);
    }
  });
}

/**
 * Filters news by category, resets the view, and displays the first page of results.
 * @param {string} category - The category to filter by ('ALL' for all news).
 */
function filterAndDisplayNews(category) {
  filteredNews = (category === 'ALL') 
    ? [...allNews] 
    : allNews.filter(news => news.category === category);
  
  currentNewsCount = 0;
  const newsContainer = document.getElementById('news-grid-container');
  if (newsContainer) newsContainer.innerHTML = ''; // Clear container for new filter
  
  loadMoreNews(); // Load the first set of news for the new filter
}

/**
 * Loads and displays the next batch of news items.
 */
function loadMoreNews() {
  const loadMoreButton = document.getElementById('load-more-button');
  if (loadMoreButton) {
    loadMoreButton.disabled = true;
    loadMoreButton.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Memuat berita lainnya...`;
  }

  const newsToLoad = filteredNews.slice(currentNewsCount, currentNewsCount + newsPerPage);
  currentNewsCount += newsToLoad.length;

  displayNewsCards(newsToLoad);
  // Use a timeout to prevent the loading state from being too jarring
  setTimeout(updateLoadMoreButton, 250);
}

/**
 * Renders the news cards into the container.
 * @param {Array} newsList - The list of news items to display.
 */
function displayNewsCards(newsList) {
  const newsContainer = document.getElementById('news-grid-container');
  if (!newsContainer) return;

  // If the container is still empty after trying to load, it means no news was found.
  if (newsContainer.innerHTML === '' && newsList.length === 0) {
    newsContainer.innerHTML = `<p class="text-center text-gray-500 col-span-full">Tidak ada berita yang ditemukan dalam kategori ini.</p>`;
  }

  const fragment = document.createDocumentFragment();
  newsList.forEach((news) => {
    const newsCard = document.createElement("div");
    newsCard.className = "bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300";
    newsCard.innerHTML = `
      <a href="berita-detail.html?id=${news.id}" class="block">
        <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover">
        <div class="p-6">
          <p class="text-sm text-gray-500 mb-2">${new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
          <h3 class="text-xl font-bold text-gray-800 mb-3 leading-tight">${news.title}</h3>
          <p class="text-gray-600 mb-4">${news.summary}</p>
          <span class="text-primary font-semibold hover:underline">Baca Selengkapnya &rarr;</span>
        </div>
      </a>
    `;
    fragment.appendChild(newsCard);
  });
  newsContainer.appendChild(fragment);
}

/**
 * Updates the visibility and state of the 'Load More' button.
 */
function updateLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more-button');
  if (!loadMoreButton) return;

  if (currentNewsCount >= filteredNews.length) {
    loadMoreButton.style.display = "none"; // Hide if all news loaded
  } else {
    loadMoreButton.style.display = "block"; // Show if more news available
    loadMoreButton.disabled = false;
    loadMoreButton.innerHTML = `Muat lebih banyak`;
  }
}

/**
 * Initializes the news detail page by fetching and displaying the selected news item.
 */
async function initBeritaDetailPage() {
  const newsDetailContainer = document.getElementById('news-detail-container');
  if (!newsDetailContainer) return;

  await fetchNews();

  const urlParams = new URLSearchParams(window.location.search);
  const newsId = parseInt(urlParams.get('id'));
  const news = allNews.find(n => n.id === newsId);

  if (news) {
    document.title = `${news.title} - Izin.In`;
    newsDetailContainer.innerHTML = `
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">${news.title}</h1>
      <div class="flex items-center text-gray-500 mb-6">
        <span class="bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mr-4">${news.category}</span>
        <span>${new Date(news.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
      <img src="${news.image}" alt="${news.title}" class="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8">
      <div class="prose prose-lg max-w-none text-gray-700">
        ${news.content.split('\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    `;
  } else {
    newsDetailContainer.innerHTML = '<p class="text-center text-gray-500">Berita tidak ditemukan.</p>';
  }
}
