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

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '48h';


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

process.env.CLIENT_ID = process.env.CLIENT_ID || '273256327537-d58v44v1sdj7vaect238bsvsldk93fsb.apps.googleusercontent.com';