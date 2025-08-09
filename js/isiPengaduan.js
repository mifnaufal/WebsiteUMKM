document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('complaintForm');
    const errorDiv = document.getElementById('formError');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !message) {
            errorDiv.textContent = 'Nama dan Pesan wajib diisi.';
            errorDiv.classList.remove('hidden');
            return;
        }

        const waNumber = '6285641783101'; // Indonesian country code + phone number
        const waMessage = `*Pengaduan Baru*\n\n*Nama:* ${name}\n*Email:* ${email}\n*Telepon:* ${phone}\n*Subjek:* ${subject}\n*Pesan:*\n${message}`;

        const encodedMessage = encodeURIComponent(waMessage);
        const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

        window.open(waURL, '_blank');

        // Optionally, redirect to a thank you page after a short delay
        setTimeout(() => {
            window.location.href = '/terima-kasih.html';
        }, 1000);
    });
});
