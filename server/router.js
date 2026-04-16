const controllers = require('./controllers');
 
const router = (app) => {
 
    /* ── Page routes (render handlebars shells) ─── */
    app.get('/',              controllers.Portfolio.loadHome);
    app.get('/work',          controllers.Portfolio.loadWork);
    app.get('/project/:slug', controllers.Portfolio.loadProject);
    app.get('/about',         controllers.Portfolio.loadAbout);
    app.get('/contact',       controllers.Portfolio.loadContact);
 
    /* ── JSON API (consumed by React JSX pages) ─── */
    app.get('/api/projects',        controllers.Portfolio.getProjects);
    app.get('/api/project/:slug',   controllers.Portfolio.getProject);
    app.post('/api/contact',        controllers.Portfolio.submitContact);
 
};
 
module.exports = router;
 