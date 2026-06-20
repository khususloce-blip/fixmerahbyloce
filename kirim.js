const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Pengaturan agar halaman depan bisa mengakses sistem ini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ pesan: 'Metode tidak diizinkan' });
    }

    const { nama, telepon } = req.body;

    // ========================================================
    // TULIS EMAIL DAN APP PASSWORD KAMU LANGSUNG DI BAWAH INI:
    // ========================================================
    const EMAIL_SAYA = 'khususloce@gmail.com'; // <-- Ganti dengan Gmail kamu
    const PASSWORD_SAYA = 'kgzj yrqi nmhd wase';     // <-- Ganti dengan 16 digit App Password kamu
    // ========================================================

    // Sistem pengirim otomatis menggunakan akun Gmail kamu
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_SAYA, 
            pass: PASSWORD_SAYA  
        }
    });

    // Format teks otomatis sesuai yang kamu minta
    const isiEmail = `Halo, 

Nama Saya ${nama}. 
Saya ingin mengeluhkan kendala verifikasi "login tidak tersedia karena alasan keamanan". 
Saya baru saja membeli nomor ini, tolong bantu saya admin WhatsApp yang terhormat. 

Nomor saya: ${telepon}`;

    const setingEmail = {
        from: EMAIL_SAYA,
        to: 'support@support.whatsapp.com', 
        subject: 'Kendala Verifikasi Login',
        text: isiEmail
    };

    try {
        await transporter.sendMail(setingEmail);
        return res.status(200).json({ sukses: true });
    } catch (error) {
        return res.status(500).json({ sukses: false, pesan: error.message });
    }
}
