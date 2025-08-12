// Data layanan yang disalin dari layanan.html
document.addEventListener("DOMContentLoaded", () => {
  // Service data
  const services = [
    {
      name: "Perizinan Usaha Baru",
      category: "Perizinan",
      categoryColor: "bg-blue-100",
      categoryTextColor: "text-blue-800",
      icon: "fas fa-store",
      iconColor: "bg-blue-500",
      description: "Pendaftaran usaha baru untuk UMKM dengan proses cepat dan mudah.",
      time: "3-5 hari kerja",
      cost: "Rp 250.000",
      requirements: [
        "Fotokopi KTP pemilik usaha",
        "Surat keterangan domisili usaha",
        "Pas foto 3x4 (2 lembar)"
      ],
      process: [
        "Pengisian formulir pendaftaran online",
        "Verifikasi dokumen oleh petugas",
        "Pembayaran biaya perizinan",
        "Penerbitan izin usaha"
      ]
    },
    {
      name: "Perpanjangan Izin Usaha",
      category: "Perizinan",
      categoryColor: "bg-green-100",
      categoryTextColor: "text-green-800",
      icon: "fas fa-sync-alt",
      iconColor: "bg-green-500",
      description: "Layanan perpanjangan izin usaha yang akan segera habis masa berlakunya.",
      time: "2-4 hari kerja",
      cost: "Rp 150.000",
      requirements: [
        "Fotokopi izin usaha sebelumnya",
        "Laporan kegiatan usaha terakhir",
        "Fotokopi KTP pemilik usaha"
      ],
      process: [
        "Pengajuan permohonan perpanjangan",
        "Verifikasi kelengkapan dokumen",
        "Pembayaran biaya perpanjangan",
        "Penerbitan izin usaha baru"
      ]
    },
    {
      name: "Perizinan Usaha Kuliner",
      category: "Legal",
      categoryColor: "bg-purple-100",
      categoryTextColor: "text-purple-800",
      icon: "fas fa-trademark",
      iconColor: "bg-purple-500",
      description: "Layanan perizinan usaha kuliner untuk UMKM.",
      time: "14-30 hari kerja",
      cost: "Rp 1.750.000",
      requirements: [
        "Surat permohonan perizinan",
        "Surat pernyataan kepemilikan merek",
        "Fotokopi KTP pemilik merek",
        "Surat kuasa jika diwakilkan"
      ],
      process: [
        "Pemeriksaan kelayakan merek",
        "Pengajuan permohonan pendaftaran",
        "Pembayaran biaya pendaftaran",
        "Penerbitan sertifikat merek dagang"
      ]
    },
    {
      name: "Perizinan Manufaktur",
      category: "Legal",
      categoryColor: "bg-purple-100",
      categoryTextColor: "text-purple-800",
      icon: "fas fa-trademark",
      iconColor: "bg-purple-500",
      description: "Layanan perizinan manufaktur untuk UMKM.",
      time: "14-30 hari kerja",
      cost: "Rp 1.750.000",
      requirements: [
        "Surat permohonan perizinan",
        "Surat pernyataan kepemilikan merek",
        "Fotokopi KTP pemilik merek",
        "Surat kuasa jika diwakilkan"
      ],
      process: [
        "Pemeriksaan kelayakan merek",
        "Pengajuan permohonan pendaftaran",
        "Pembayaran biaya pendaftaran",
        "Penerbitan sertifikat merek dagang"
      ]
    }
  ];

  // Function to get URL parameters
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get selected service from URL parameter
  const selectedServiceName = getUrlParameter('layanan');
  
  // Find the selected service in our data
  const selectedService = services.find(service => service.name === selectedServiceName);
  
  // If a service is selected, show the form and hide the service list
  if (selectedService) {
    // Hide the services container
    const servicesContainer = document.getElementById('servicesContainer');
    if (servicesContainer) {
      servicesContainer.style.display = 'none';
    }
    
    // Show the application form section and populate service info
    document.getElementById('selectedServiceName').textContent = selectedService.name;
    
    // Populate service details
    document.getElementById('serviceTime').textContent = selectedService.time;
    document.getElementById('serviceCost').textContent = selectedService.cost;
    
    // Populate requirements
    const requirementsList = document.getElementById('serviceRequirements');
    requirementsList.innerHTML = '';
    selectedService.requirements.forEach(req => {
      const li = document.createElement('li');
      li.textContent = req;
      requirementsList.appendChild(li);
    });
    
    // Populate process steps
    const processList = document.getElementById('serviceProcess');
    processList.innerHTML = '';
    selectedService.process.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      processList.appendChild(li);
    });
    
    // Show service details
    document.getElementById('serviceDetails').style.display = 'block';
    
    // Store selected service in form
    const form = document.getElementById('umkmApplicationForm');
    if (form) {
      form.setAttribute('data-selected-service', selectedService.name);
    }
  } else {
    // If no service is selected, render service cards as before
    const servicesContainer = document.getElementById('servicesContainer');
    
    services.forEach((service, index) => {
      const card = document.createElement('article');
      card.className = 'service-card';
      card.style.setProperty('--delay', `${0.1 * (index + 1)}s`);
      
      card.innerHTML = `
        <div class="p-6 flex-1">
          <div class="flex items-center">
            <div class="service-icon ${service.iconColor} text-white rounded-lg p-3">
              <i class="${service.icon} text-2xl"></i>
            </div>
            <span class="ml-auto px-3 py-1 ${service.categoryColor} ${service.categoryTextColor} text-sm font-medium rounded-full">${service.category}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3 mt-4">${service.name}</h3>
          <p class="text-gray-600 mb-4">${service.description}</p>

          <div class="flex items-center text-sm text-gray-500 mb-4">
            <i class="fas fa-clock mr-2"></i>
            <span>Estimasi waktu: ${service.time}</span>
          </div>

          <button class="toggle-details text-primary font-medium hover:text-blue-700 transition flex items-center w-full justify-between py-3" aria-expanded="false">
            <span>Lihat Detail</span>
            <i class="fas fa-chevron-down ml-2 text-sm"></i>
          </button>

          <div class="service-details">
            <div class="p-6">
              <h4 class="font-semibold text-gray-700 mb-2">Persyaratan:</h4>
              <ul class="mb-4 space-y-2">
                ${service.requirements.map(req => `
                  <li class="requirement-item flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span>${req}</span>
                  </li>
                `).join('')}
              </ul>

              <h4 class="font-semibold text-gray-700 mb-2">Proses:</h4>
              <ol class="space-y-4">
                ${service.process.map((step, i) => `
                  <li class="process-step">
                    <div class="w-6 h-6 rounded-full ${service.iconColor} text-white flex items-center justify-center absolute left-0 top-0">${i + 1}</div>
                    <p class="ml-2">${step}</p>
                  </li>
                `).join('')}
              </ol>
            </div>
          </div>
        </div>

        <div class="mt-auto">
          <div class="bg-gray-50 border-t border-gray-100 p-4 flex justify-between items-center">
            <span class="text-sm text-gray-500">Biaya: ${service.cost}</span>
            <button class="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition" data-service="${service.name}">Ajukan Sekarang</button>
          </div>
        </div>
      `;
      
      servicesContainer.appendChild(card);
    });

    // Add event listeners for toggle buttons
    const toggleButtons = document.querySelectorAll(".toggle-details");
    toggleButtons.forEach(button => {
      button.addEventListener("click", function () {
        const isExpanded = this.getAttribute("aria-expanded") === "true";
        this.setAttribute("aria-expanded", !isExpanded);
        this.closest(".service-card").classList.toggle("active");
      });
    });

    // Add event listeners for "Ajukan Sekarang" buttons
    const applyButtons = document.querySelectorAll("[data-service]");
    applyButtons.forEach(button => {
      button.addEventListener("click", function () {
        const serviceName = this.getAttribute("data-service");
        // Show the application form section and populate service info
        document.getElementById('selectedServiceName').textContent = serviceName;
        
        // Populate service details
        const service = services.find(s => s.name === serviceName);
        if (service) {
          document.getElementById('serviceTime').textContent = service.time;
          document.getElementById('serviceCost').textContent = service.cost;
          
          // Populate requirements
          const requirementsList = document.getElementById('serviceRequirements');
          requirementsList.innerHTML = '';
          service.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            requirementsList.appendChild(li);
          });
          
          // Populate process steps
          const processList = document.getElementById('serviceProcess');
          processList.innerHTML = '';
          service.process.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            processList.appendChild(li);
          });
          
          try {
            // Generate file upload fields based on requirements
            const fileUploadFields = document.getElementById('fileUploadFields');
            if (fileUploadFields) {
              fileUploadFields.innerHTML = '';
              
              // Ensure the file upload section is visible
              const fileUploadSection = document.getElementById('fileUploadSection');
              if (fileUploadSection) {
                fileUploadSection.style.display = 'block';
              }
              
              if (service.requirements && service.requirements.length > 0) {
                service.requirements.forEach((requirement, index) => {
                  const fileUploadDiv = document.createElement('div');
                  fileUploadDiv.className = 'border border-gray-200 rounded-lg p-4 mb-4';
                  
                  const requirementName = requirement.replace(/\*/g, '').trim();
                  
                  // Determine file type based on requirement text
                  let acceptType = '';
                  let placeholderText = 'Unggah dokumen yang sesuai dengan persyaratan ini';
                  
                  if (requirementName.toLowerCase().includes('foto') || requirementName.toLowerCase().includes('photo') || requirementName.toLowerCase().includes('gambar')) {
                    acceptType = 'image/*';
                    placeholderText = 'Unggah foto (JPG, PNG, dll)';
                  } else if (requirementName.toLowerCase().includes('surat') || requirementName.toLowerCase().includes('document') || requirementName.toLowerCase().includes('pdf')) {
                    acceptType = '.pdf,application/pdf';
                    placeholderText = 'Unggah dokumen PDF';
                  } else if (requirementName.toLowerCase().includes('ktp') || requirementName.toLowerCase().includes('kartu') || requirementName.toLowerCase().includes('identitas')) {
                    acceptType = 'image/*,.pdf,application/pdf';
                    placeholderText = 'Unggah foto kartu identitas atau scan dalam format PDF';
                  } else {
                    // Default to accepting all file types if no specific type is detected
                    acceptType = '*/*';
                  }
                  
                  fileUploadDiv.innerHTML = `
                    <label class="block text-gray-700 font-medium mb-2">${requirementName}</label>
                    <input type="file" name="requirementFile${index}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary file-input" data-requirement="${requirementName}" accept="${acceptType}">
                    <p class="text-gray-500 text-xs mt-1">${placeholderText}</p>
                  `;
                  
                  fileUploadFields.appendChild(fileUploadDiv);
                });
              } else {
                // If no requirements, show a message
                fileUploadFields.innerHTML = '<p class="text-gray-500">Tidak ada dokumen khusus yang diperlukan untuk layanan ini.</p>';
              }
            }
          } catch (error) {
            console.error('Error generating file upload fields:', error);
            // Fallback: show a simple message
            const fileUploadFields = document.getElementById('fileUploadFields');
            if (fileUploadFields) {
              fileUploadFields.innerHTML = '<p class="text-red-500">Terjadi kesalahan saat memuat field upload dokumen. Silakan coba lagi.</p>';
            }
          }
          
          // Show service details
          document.getElementById('serviceDetails').style.display = 'block';
        }
        
        document.getElementById('selectedServiceInfo').classList.remove('hidden');
        document.getElementById('applicationFormSection').classList.remove('hidden');
        
        // Scroll to the form
        document.getElementById('applicationFormSection').scrollIntoView({ behavior: 'smooth' });
        
        // Store selected service in form
        const form = document.getElementById('umkmApplicationForm');
        form.setAttribute('data-selected-service', serviceName);
      });
    });
  }
  // Handle form submission
  const applicationForm = document.getElementById('umkmApplicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formError = document.getElementById('formError');
      formError.classList.add('hidden');
      formError.textContent = '';
      
      // Get form values
      const applicantName = document.getElementById('applicantName').value.trim();
      const applicantEmail = document.getElementById('applicantEmail').value.trim();
      const businessName = document.getElementById('businessName').value.trim();
      const businessAddress = document.getElementById('businessAddress').value.trim();
      const businessPhone = document.getElementById('businessPhone').value.trim();
      const businessType = document.getElementById('businessType').value;
      const additionalInfo = document.getElementById('additionalInfo').value.trim();
      const agreement = document.getElementById('agreement').checked;
      const selectedService = this.getAttribute('data-selected-service');
      
      // Get file upload information
      const fileInputs = document.querySelectorAll('.file-input');
      let uploadedFilesInfo = '';
      let hasFile = false;
      fileInputs.forEach((input, index) => {
        const requirement = input.getAttribute('data-requirement');
        if (input.files.length > 0) {
          const fileName = input.files[0].name;
          // Get file size in KB or MB
          const fileSize = input.files[0].size;
          const fileSizeKB = Math.round(fileSize / 1024);
          const fileSizeDisplay = fileSizeKB > 1024 ? (fileSizeKB / 1024).toFixed(1) + ' MB' : fileSizeKB + ' KB';
          
          uploadedFilesInfo += `*${requirement}:* ${fileName} (${fileSizeDisplay})\n`;
          hasFile = true;
        }
      });
      
      // Validation
      if (!applicantName || !businessName || !businessAddress || !businessPhone || !businessType || !agreement) {
        formError.textContent = 'Harap lengkapi semua field yang wajib diisi dan setujui syarat & ketentuan.';
        formError.classList.remove('hidden');
        return;
      }
      
      // Check if at least one file is uploaded
      // Note: File validation is optional as not all requirements may need documents
      // If you want to make file upload mandatory, uncomment the lines below:
      // if (!hasFile) {
      //   formError.textContent = 'Harap unggah minimal satu dokumen persyaratan.';
      //   formError.classList.remove('hidden');
      //   return;
      // }
      
      // Note: File validation is optional as not all requirements may need documents
      // If you want to make file upload mandatory, uncomment the lines below:
      // if (!hasFile) {
      //   formError.textContent = 'Harap unggah minimal satu dokumen persyaratan.';
      //   formError.classList.remove('hidden');
      //   return;
      // }
      
      /*
      ===== TEMPLATE PESAN WHATSAPP =====
      *Pengajuan Izin Usaha*
      
      *Layanan:* [Nama Layanan]
      *Nama Pemohon:* [Nama]
      *Email:* [Email]
      *Nama Usaha:* [Nama Usaha]
      *Alamat Usaha:* [Alamat]
      *Telepon:* [Telepon]
      *Jenis Usaha:* [Jenis]
      *Informasi Tambahan:*
      [Informasi]
      ===================================
      */
      
      // Kirim ke WhatsApp
      const waNumber = '6285641783101'; // Indonesian country code + phone number
      let waMessage = `*Pengajuan Izin Usaha*

*Layanan:* ${selectedService}
*Nama Pemohon:* ${applicantName}
*Email:* ${applicantEmail}
*Nama Usaha:* ${businessName}
*Alamat Usaha:* ${businessAddress}
*Telepon:* ${businessPhone}
*Jenis Usaha:* ${businessType}`;
      
      if (uploadedFilesInfo) {
        waMessage += `\n\n*Dokumen Persyaratan:*
${uploadedFilesInfo}`;
      }
      
      waMessage += `\n*Informasi Tambahan:*
${additionalInfo}`;
      const encodedMessage = encodeURIComponent(waMessage);
      const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;
      window.open(waURL, '_blank');
      
      // Show success message
      const responseMessage = document.getElementById('responseMessage');
      responseMessage.innerHTML = '<div class="text-green-600 font-medium p-3 bg-green-50 rounded-lg">Pengajuan Anda telah dikirim! Kami akan menghubungi Anda segera.</div>';
      
      // Reset form after a delay
      setTimeout(() => {
        applicationForm.reset();
        // Jika tidak ada layanan yang dipilih dari URL, sembunyikan form
        if (!selectedServiceName) {
          document.getElementById('selectedServiceInfo').classList.add('hidden');
          document.getElementById('applicationFormSection').classList.add('hidden');
        }
      }, 3000);
    });
  }
});
