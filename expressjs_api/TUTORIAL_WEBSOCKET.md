ExpressJS adalah framework back-end populer yang digunakan untuk mengembangkan aplikasi web dengan Node.js. Namun, ExpressJS sendiri tidak menyediakan dukungan bawaan untuk WebSocket. Untuk mengimplementasikan WebSocket dalam aplikasi ExpressJS, Anda perlu menggunakan pustaka atau modul WebSocket yang kompatibel dengan Express. Salah satu pilihan yang umum digunakan adalah menggunakan modul `ws`, yang dapat diintegrasikan dengan mudah ke dalam aplikasi ExpressJS.

Berikut adalah langkah-langkah umum untuk mengimplementasikan WebSocket dalam aplikasi ExpressJS menggunakan modul `ws`:

**1. Buat Proyek ExpressJS**

Jika Anda belum memiliki proyek ExpressJS, Anda dapat membuatnya dengan langkah-langkah berikut:

```bash
npm install express --save
```

**2. Instalasi Modul `ws`**

Selanjutnya, instalasi modul `ws` untuk mendukung WebSocket dalam proyek Anda:

```bash
npm install ws --save
```

**3. Integrasi WebSocket dalam Aplikasi ExpressJS**

Selanjutnya, Anda perlu mengintegrasikan WebSocket ke dalam aplikasi ExpressJS Anda. Berikut adalah contoh sederhana:

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware ExpressJS
app.use(express.static('public'));

// Handle koneksi WebSocket
wss.on('connection', (ws) => {
  console.log('Koneksi WebSocket terhubung');

  // Menghandle pesan yang diterima dari klien
  ws.on('message', (message) => {
    console.log(`Pesan diterima: ${message}`);
    
    // Mengirim pesan balasan ke klien
    ws.send(`Pesan yang Anda kirim: ${message}`);
  });

  // Menghandle ketika koneksi terputus
  ws.on('close', () => {
    console.log('Koneksi WebSocket terputus');
  });
});

// Server ExpressJS
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
```

Dalam contoh di atas, kami membuat server HTTP dengan ExpressJS, kemudian mengintegrasikan WebSocket dengan modul `ws` pada objek server tersebut. Kami juga menyediakan middleware ExpressJS untuk mengirim berkas statis dalam folder 'public'.

**4. Menggunakan WebSocket di Aplikasi Klien**

Anda dapat menggunakan WebSocket di aplikasi klien Anda, seperti aplikasi web front-end, dengan menggunakan modul WebSocket JavaScript seperti `WebSocket` atau pustaka klien WebSocket yang lain. Berikut adalah contoh penggunaan WebSocket di aplikasi klien menggunakan JavaScript:

```javascript
const socket = new WebSocket('ws://localhost:3000');

// Mengirim pesan ke server
socket.send('Halo, ini pesan dari klien');

// Mendengarkan pesan dari server
socket.addEventListener('message', (event) => {
  console.log('Pesan diterima dari server:', event.data);
});
```

**5. Uji Coba Aplikasi**

Sekarang, Anda dapat menjalankan aplikasi Anda dan menguji WebSocket dengan mengirim dan menerima pesan antara server dan klien melalui koneksi WebSocket.

Ini adalah langkah-langkah dasar untuk mengimplementasikan WebSocket dalam aplikasi ExpressJS menggunakan modul `ws`. Anda dapat mengembangkan dan menyesuaikan implementasi WebSocket sesuai dengan kebutuhan aplikasi Anda, seperti mengelola obrolan real-time, pemberitahuan, atau fitur real-time lainnya.