/**
 * Portfolio.js — controller for Work, Project, About, Contact pages.
 *
 * ─────────────────────────────────────────────────────────────────
 * HOW TO ADD A PROJECT
 * ─────────────────────────────────────────────────────────────────
 * 1. Add an entry to the PROJECTS array below.
 * 2. Give it a unique `slug` (used in the URL: /project/your-slug).
 * 3. Set `type` to either 'webapp' or 'model3d'.
 *    - webapp  → provide `iframeUrl` (the URL to embed in the iframe).
 *    - model3d → leave `iframeUrl` null; the Three.js viewer is used.
 *               Drop your .glb file in /hosted/models/ and uncomment
 *               the GLTFLoader lines in views/project.handlebars.
 * 4. Add a matching card in views/work.handlebars (see the comments there).
 * ─────────────────────────────────────────────────────────────────
 */

const PROJECTS = [
    {
        slug:        'example-webapp',
        title:       'Example Web App',
        year:        '2024',
        type:        'webapp',
        description: 'A short description of what this project does. Replace this with your real project details.',
        role:        'Design & Development',
        tech:        ['React', 'Node.js', 'Express', 'CSS'],
        iframeUrl:   null,          // ← set to the URL you want to embed, e.g. 'https://your-app.com'
        liveUrl:     null,
        githubUrl:   null,
    },
    {
        slug:        'example-3d',
        title:       'Example 3D Model',
        year:        '2024',
        type:        'model3d',
        description: 'An interactive 3D model rendered in the browser with Three.js. Drag to rotate, scroll to zoom.',
        role:        '3D Modelling & WebGL',
        tech:        ['Three.js', 'Blender', 'GLSL'],
        iframeUrl:   null,          // leave null for 3D viewer
        liveUrl:     null,
        githubUrl:   null,
    },

    // ── Add more projects here ──
];


/* ── Page handlers ───────────────────────────────────────────── */

const loadWork = (req, res) => {
    return res.render('work');
};

const loadProject = (req, res) => {
    const { slug } = req.params;
    const project = PROJECTS.find(p => p.slug === slug);

    if (!project) {
        return res.status(404).render('app'); // fallback — swap for a 404 view if you have one
    }

    return res.render('project', { project });
};

const loadAbout = (req, res) => {
    // Swap 'app' for an 'about' view when you create one
    return res.render('app');
};

const loadContact = (req, res) => {
    // Swap 'app' for a 'contact' view when you create one
    return res.render('app');
};


module.exports = {
    loadWork,
    loadProject,
    loadAbout,
    loadContact,
};
