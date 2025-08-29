# 🔐 Auth dengan NestJS + JWT + Cookie

Dokumentasi ini menjelaskan konsep, arsitektur, dan implementasi **authentication & authorization** di aplikasi menggunakan **NestJS + JWT + Cookie**.  
Pendekatan ini menghindari penyimpanan token di `localStorage` dan memanfaatkan **HTTP-Only Cookie** agar lebih aman.

---

## ⚡ Konsep Dasar

1. **Access Token (AT)**
   - JWT berumur pendek (misal 15 menit).
   - Dipakai di setiap request untuk mengakses resource yang membutuhkan autentikasi.
   - Disimpan di Cookie (HTTP-Only).

2. **Middleware / Guard AUTH**
   - Membatasi akses hanya untuk user yang sudah login.
   - Mengecek keberadaan dan validitas access token di cookie.

3. **Check-Auth Endpoint**
   - Endpoint ringan (`GET /auth/check-auth`) untuk memastikan session masih valid.
   - Dipanggil oleh FE saat aplikasi load/refresh agar tau status login user.

---

## 🔄 Flow Authentication

### 1. Login

- User submit username + password.
- Server:
  - Verifikasi credential.
  - Generate `accessToken` (15 menit).
  - Kirim ke client sebagai **HTTP-Only Cookie**:
    - `access_token`

### 2. Access Resource

- FE otomatis mengirim cookie di setiap request (`withCredentials: true` kalau pakai Axios/Fetch).
- Guard di BE akan membaca dan memvalidasi `access_token`.

### 3. Token Expired

- Jika tidak valid → user dipaksa login ulang.

### 4. Logout

- Hapus `access_token` dan `refresh_token` dari cookie (set expired = now).
- Jika pakai refresh token stateful (disimpan di DB/Redis), revoke token user dari store.

---

## 📦 Dependency

```bash
npm install @nestjs/jwt passport-jwt cookie-parser
```

---

## ✅ Keuntungan Pendekatan Ini

- **Keamanan lebih baik**: Token tidak bisa diakses lewat JS (`httpOnly`).
- **FE lebih sederhana**: Tidak perlu simpan token di `localStorage`.

---

## ⚠️ Catatan Penting

- Gunakan `Secure` flag di cookie **(hanya bisa diakses lewat HTTPS)** untuk production.
- Jangan buat access token terlalu lama.

---

## 📌 Kesimpulan

1. **Middleware/Guard AUTH** → membatasi akses API.
2. **Access token di cookie** → validasi cepat setiap request.
3. **Check-auth endpoint** → memastikan user masih login.
4. **Logout** → cukup clear cookie.

```

```
