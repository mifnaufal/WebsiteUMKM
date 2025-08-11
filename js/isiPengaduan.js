document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('pengaduanForm');
    const errorDiv = document.getElementById('formError');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const nama = form.nama.value.trim();
        const email = form.email.value.trim();
        const judul = form.judul.value.trim();
        const deskripsi = form.deskripsi.value.trim();

        if (!nama || !deskripsi) {
            errorDiv.textContent = 'Nama dan Deskripsi wajib diisi.';
            errorDiv.classList.remove('hidden');
            return;
        }

        /*
        ===== TEMPLATE PESAN WHATSAPP =====
        *Pengaduan Baru*
        
        *Nama:* [Nama]
        *Email:* [Email]
        *Judul:* [Judul]
        *Deskripsi:*
        [Isi Deskripsi]
        ===================================
        */

        // Kirim ke WhatsApp
        const waNumber = '6285641783101'; // Indonesian country code + phone number
        const waMessage = `*Pengaduan Baru*\n\n*Nama:* ${nama}\n*Email:* ${email}\n*Judul:* ${judul}\n*Deskripsi:*\n${deskripsi}`;
        const encodedMessage = encodeURIComponent(waMessage);
        const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waURL, '_blank');
        setTimeout(() => {
            window.location.href = '/terima-kasih.html';
        }, 1000);
    });
});
