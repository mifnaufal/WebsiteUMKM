// Utility functions for handling data and DOM manipulation

// Get URL parameters
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Format date to Indonesian format
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
}

// Load JSON data
async function fetchData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

// Create HTML element with attributes
function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  if (content) {
    element.innerHTML = content;
  }
  return element;
}

// Display error message
function showError(message, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>${message}</p>
      </div>
    `;
  }
}

// Handle form submission with FormSubmit service
function setupForm(formId, redirectUrl) {
  const form = document.getElementById(formId);
  if (form) {
    form.action = 'https://formsubmit.co/your-email@domain.com'; // Replace with your email
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      })
      .catch(error => {
        showError('Terjadi kesalahan saat mengirim form. Silakan coba lagi.', 'formError');
      });
    });
  }
}
