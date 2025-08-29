# 🔐 Auth dengan NestJS + JWT + Cookie

Dokumentasi ini menjelaskan konsep, arsitektur, dan implementasi **authentication & authorization** di aplikasi menggunakan **NestJS + JWT + Cookie**.  
Pendekatan ini menghindari penyimpanan token di `localStorage` dan memanfaatkan **HTTP-Only Cookie** agar lebih aman.

---

## ⚡ Konsep Dasar

1. **Access Token (AT)**
   - JWT berumur pendek (misal 15 menit).
   - Dipakai di setiap request untuk mengakses resource yang membutuhkan autentikasi.
   - Disimpan di Cookie (HTTP-Only).

2. **Refresh Token (RT)**
   - JWT berumur panjang (misal 7–30 hari).
   - Hanya dipakai untuk **mendapatkan access token baru** saat AT kadaluarsa.
   - Disimpan di Cookie berbeda (HTTP-Only + Secure).
   - Bisa dikelola stateless (langsung JWT) atau stateful (disimpan di DB/Redis untuk bisa direvoke).

3. **Middleware / Guard AUTH**
   - Membatasi akses hanya untuk user yang sudah login.
   - Mengecek keberadaan dan validitas access token di cookie.

4. **Check-Auth Endpoint**
   - Endpoint ringan (`GET /auth/check`) untuk memastikan session masih valid.
   - Dipanggil oleh FE saat aplikasi load/refresh agar tau status login user.

---

## 🔄 Flow Authentication

### 1. Login

- User submit username + password.
- Server:
  - Verifikasi credential.
  - Generate `accessToken` (15 menit) + `refreshToken` (7 hari).
  - Kirim ke client sebagai **HTTP-Only Cookie**:
    - `access_token`
    - `refresh_token`

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
- **Session terkontrol di server**: Bisa revoke refresh token kapan saja.
- **Scalable**: Refresh token hanya dipakai saat AT expired → tidak menambah load signifikan.

---

## ⚠️ Catatan Penting

- Gunakan `Secure` flag di cookie **(hanya bisa diakses lewat HTTPS)** untuk production.
- Jangan buat access token terlalu panjang.

---

## 📌 Kesimpulan

1. **Middleware/Guard AUTH** → membatasi akses API.
2. **Access token di cookie** → validasi cepat setiap request.
3. **Check-auth endpoint** → memastikan user masih login.
4. **Logout** → cukup clear cookie + revoke RT (jika pakai DB/Redis).

```

```
