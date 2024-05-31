const express = require('express');
const routes = require('./routes'); // Asumsikan routes adalah array yang diubah sesuai dengan Express

const app = express();
const port = 3000;

// Middleware untuk parsing JSON (jika diperlukan)
app.use(express.json());

// Register routes
routes.forEach(route => {
    if (route.method.toLowerCase() === 'get') {
        app.get(route.path, route.handler);
    } else if (route.method.toLowerCase() === 'post') {
        app.post(route.path, route.handler);
    }
    // Tambahkan metode HTTP lain sesuai kebutuhan
});

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});