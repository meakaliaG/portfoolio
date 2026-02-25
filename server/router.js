const controllers = require('./controllers');

const router = (app) => {

    // Home
    app.get('/', controllers.Loader.loadPage);

    // Work gallery
    app.get('/work', controllers.Portfolio.loadWork);

    // Individual project page
    app.get('/project/:slug', controllers.Portfolio.loadProject);

    // About page
    app.get('/about', controllers.Portfolio.loadAbout);

    // Contact page
    app.get('/contact', controllers.Portfolio.loadContact);

};

module.exports = router;
