// News handling functions

// Display news list
async function displayNewsList() {
  const data = await fetchData('/data/news.json');
  if (!data) {
    showError('Gagal memuat berita', 'newsContainer');
    return;
  }

  const container = document.getElementById('newsContainer');
  if (!container) return;

  const newsHtml = data.news.map(news => `
    <article class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">
          <a href="berita-detail.html?id=${news.id}" class="text-primary hover:text-blue-900">
            ${news.title}
          </a>
        </h3>
        <p class="text-gray-600 text-sm mb-3">${formatDate(news.date)}</p>
        <p class="text-gray-700">${news.summary}</p>
        <a href="berita-detail.html?id=${news.id}" class="inline-block mt-4 text-primary hover:text-blue-900">
          Baca selengkapnya →
        </a>
      </div>
    </article>
  `).join('');

  container.innerHTML = newsHtml;
}

// Display single news article
async function displayNewsDetail() {
  const newsId = getUrlParam('id');
  if (!newsId) {
    window.location.href = 'berita.html';
    return;
  }

  const data = await fetchData('/data/news.json');
  if (!data) {
    showError('Gagal memuat berita', 'newsDetailContainer');
    return;
  }

  const news = data.news.find(n => n.id === parseInt(newsId));
  if (!news) {
    window.location.href = 'berita.html';
    return;
  }

  const container = document.getElementById('newsDetailContainer');
  if (!container) return;

  container.innerHTML = `
    <article class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">${news.title}</h1>
        <p class="text-gray-600 mb-6">${formatDate(news.date)}</p>
        <div class="prose max-w-none">
          ${news.content.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
        </div>
        <a href="berita.html" class="inline-block mt-8 text-primary hover:text-blue-900">
          ← Kembali ke daftar berita
        </a>
      </div>
    </article>
  `;
}
