document.addEventListener('DOMContentLoaded', async () => {
    const articleContainer = document.getElementById('article-container');
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');

    const getArticleId = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const articleId = getArticleId();

    if (!articleId) {
        loadingState.style.display = 'none';
        errorState.classList.remove('hidden');
        errorState.querySelector('p').textContent = 'Artikel tidak ditemukan. ID tidak valid.';
        return;
    }

    try {
        const response = await fetch('../data/news.json'); // Path relative to the HTML file
        if (!response.ok) {
            throw new Error('Gagal memuat data berita.');
        }
        const newsData = await response.json();
        
        const article = (newsData.news || []).find(item => item.id.toString() === articleId);

        if (article) {
            loadingState.style.display = 'none';
            
            const articleHTML = `
                <img src="${article.image}" alt="${article.title}" class="w-full h-64 md:h-96 object-cover rounded-lg mb-6">
                <div class="flex items-center text-gray-500 text-sm mb-4">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span>${article.date}</span>
                    <span class="mx-2">|</span>
                    <i class="fas fa-user mr-2"></i>
                    <span>${article.author}</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">${article.title}</h1>
                <div class="article-content text-gray-700">
                    ${article.content}
                </div>
            `;
            
            articleContainer.innerHTML = articleHTML;

            // Image loading animation - modified for Live Server
            const images = articleContainer.querySelectorAll('img');
            images.forEach(img => {
                const parent = img.parentElement;
                parent.classList.add('image-loading');
                
                img.onload = function() {
                    parent.classList.remove('image-loading');
                };
                
                img.onerror = function() {
                    parent.classList.remove('image-loading');
                    this.alt = 'Gagal memuat gambar';
                };
                
                // Force reload in case image is cached
                img.src = img.src + (img.src.includes('?') ? '&' : '?') + 't=' + Date.now();
            });
        } else {
            throw new Error('Artikel dengan ID ini tidak ditemukan.');
        }
    } catch (error) {
        console.error('Error fetching article:', error);
        loadingState.style.display = 'none';
        errorState.classList.remove('hidden');
        errorState.querySelector('p').textContent = error.message;
    }
});
