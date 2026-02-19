const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

    app.get('/', controllers.Loader.loadPage);

};

module.exports = router;