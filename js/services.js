// Public services handling functions

// Display services list
async function displayServices() {
  const data = await fetchData('/data/services.json');
  if (!data) {
    showError('Gagal memuat layanan', 'servicesContainer');
    return;
  }

  const container = document.getElementById('servicesContainer');
  if (!container) return;

  const servicesHtml = data.services.map(service => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-4">${service.name}</h3>
        <p class="text-gray-700 mb-4">${service.description}</p>
        
        <div class="mb-4">
          <h4 class="font-semibold mb-2">Persyaratan:</h4>
          <ul class="list-disc list-inside text-gray-700">
            ${service.requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-2">Alur Layanan:</h4>
          <ol class="list-decimal list-inside text-gray-700">
            ${service.flow.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = servicesHtml;
}

// Initialize service search functionality
function initServiceSearch() {
  const searchInput = document.getElementById('serviceSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const data = await fetchData('/data/services.json');
    
    if (!data) {
      showError('Gagal memuat layanan', 'servicesContainer');
      return;
    }

    const filteredServices = data.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm)
    );

    const container = document.getElementById('servicesContainer');
    if (!container) return;

    if (filteredServices.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-600">
          Tidak ada layanan yang sesuai dengan pencarian "${searchTerm}"
        </div>
      `;
      return;
    }

    const servicesHtml = filteredServices.map(service => `
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-4">${service.name}</h3>
          <p class="text-gray-700 mb-4">${service.description}</p>
          
          <div class="mb-4">
            <h4 class="font-semibold mb-2">Persyaratan:</h4>
            <ul class="list-disc list-inside text-gray-700">
              ${service.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-2">Alur Layanan:</h4>
            <ol class="list-decimal list-inside text-gray-700">
              ${service.flow.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = servicesHtml;
  });
}
