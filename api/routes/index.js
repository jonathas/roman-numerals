module.exports = (app) => {

    // Require here the routes files
    // require('./converter')(app);

    app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to the Roman Numerals API. Check the documentation for the list of available endpoints' }));

    // If no route is matched by now, it must be a 404
    app.use((req, res, next) => {
        res.status(404).json({ 'error': 'Endpoint not found' });
        next();
    });

    app.use((error, req, res, next) => {
        if (process.env.NODE_ENV === 'production') {
            return res.status(500).json({ 'error': 'Unexpected error: ' + error });
        }
        next(error);
    });
}