const app = require('./config/express')();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Roman Numerals API listening on port ${port}. Environment: ${process.env.NODE_ENV}`);
});