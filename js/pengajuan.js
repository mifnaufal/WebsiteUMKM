document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pengajuanForm');
    const errorDiv = document.getElementById('formError');
    const responseDiv = document.getElementById('responseMessage');
    const layananInput = document.getElementById('layanan');
    const serviceDetail = document.getElementById('serviceDetail');
    
    // Ambil data layanan dari URL params
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('layanan') || 'Layanan Tidak Diketahui';
    
    // Set layanan di form
    layananInput.value = serviceName;
    
    // Tampilkan detail layanan (mock data)
    showServiceDetail(serviceName);
    
    // Handle form submit
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            errorDiv.classList.add('hidden');
            errorDiv.textContent = '';
            responseDiv.textContent = '';
            
            // Validasi
            const nama = form.nama.value.trim();
            const email = form.email.value.trim();
            const telepon = form.telepon.value.trim();
            const alamat = form.alamat.value.trim();
            
            if (!nama || !email || !telepon || !alamat) {
                errorDiv.textContent = 'Nama, email, telepon, dan alamat wajib diisi.';
                errorDiv.classList.remove('hidden');
                return;
            }
            
            // Buat pesan WhatsApp
            const waNumber = '6285641783101';
            const message = `*Pengajuan Layanan Baru*
\n*Layanan:* ${serviceName}\n*Nama:* ${nama}\n*Email:* ${email}\n*Telepon:* ${telepon}\n*Alamat:* ${alamat}\n*Catatan:* ${form.catatan.value.trim() || '-'}\n\nMohon dibantu untuk proses selanjutnya.`;
            
            const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            
            // Buka WhatsApp
            window.open(waURL, '_blank');
            
            // Tampilkan pesan sukses
            responseDiv.innerHTML = `
                <div class="text-green-600 p-4 bg-green-50 rounded-lg">
                    <p class="font-medium">✅ Pengajuan berhasil dikirim!</p>
                    <p class="text-sm mt-1">WhatsApp otomatis terbuka untuk melanjutkan proses.</p>
                </div>
            `;
            
            // Reset form (opsional)
            // form.reset();
        });
    }
    
    // Fungsi untuk menampilkan detail layanan
    function showServiceDetail(serviceName) {
        // Mock data detail layanan
        const serviceDetails = {
            'Perizinan Usaha UMKM': {
                biaya: 'Rp 500.000',
                waktu: '7-14 hari kerja',
                syarat: [
                    'Fotokopi KTP pemilik',
                    'Fotokopi NPWP',
                    'Surat permohonan izin',
                    'Foto lokasi usaha',
                    'Dokumen legalitas lainnya'
                ]
            },
            'Perizinan Usaha Kuliner': {
                biaya: 'Rp 1.750.000',
                waktu: '14-30 hari kerja',
                syarat: [
                    'Surat permohonan perizinan',
                    'Surat pernyataan kepemilikan merek',
                    'Fotokopi KTP pemilik merek',
                    'Surat kuasa jika diwakilkan'
                ]
            },
            'Perpanjangan Izin Usaha': {
                biaya: 'Rp 150.000',
                waktu: '5-10 hari kerja',
                syarat: [
                    'Fotokopi izin lama',
                    'Surat permohonan perpanjangan',
                    'Laporan kegiatan usaha',
                    'Fotokopi KTP'
                ]
            },
            'Perizinan Manufaktur': {
                biaya: 'Rp 1.750.000',
                waktu: '14-30 hari kerja',
                syarat: [
                    'Surat permohonan perizinan',
                    'Surat pernyataan kepemilikan merek',
                    'Fotokopi KTP pemilik merek',
                    'Surat kuasa jika diwakilkan'
                ]
            }
        };
        
        const detail = serviceDetails[serviceName];
        
        if (detail && serviceDetail) {
            serviceDetail.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700">Biaya</h4>
                        <p class="text-gray-600">${detail.biaya}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Estimasi Waktu</h4>
                        <p class="text-gray-600">${detail.waktu}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Persyaratan</h4>
                        <ul class="mt-2 space-y-2">
                            ${detail.syarat.map(syarat => `
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                                    <span class="text-gray-600">${syarat}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else if (serviceDetail) {
            serviceDetail.innerHTML = '<p class="text-gray-600">Detail layanan tidak tersedia.</p>';
        }
    }
});
