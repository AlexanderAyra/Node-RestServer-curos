// ========================
// PORT
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// ========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Vencimiento detoken
// ========================

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || 60 * 60 * 24 * 30;


// ========================
// SEED
// ========================


process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ========================
// Entorno
// ========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ========================
// Cleinte ID
// ========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '273256327537-u2ef8c5ici4diftul59vg6k91vkgfjj8.apps.googleusercontent.com';