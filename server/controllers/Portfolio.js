/**
 * Portfolio.js — controller for Work, Project, About, Contact pages
 *                + JSON API routes consumed by the React JSX pages.
 *
 * ─────────────────────────────────────────────────────────────────
 * ADD A PROJECT
 * ─────────────────────────────────────────────────────────────────
 * 1. Add an entry to the PROJECTS array below.
 * 2. Give it a unique `slug` — this becomes the URL: /project/your-slug
 * 3. Set `type` to either 'webapp' or 'model3d':
 *    webapp  → set `iframeUrl` to the URL to embed.
 *    model3d → set `modelUrl`  to '/assets/models/your-model.glb'
 *              (then uncomment the GLTFLoader block in project.jsx).
 * 4. The card automatically appears on the Work page — no extra HTML needed.
 * ─────────────────────────────────────────────────────────────────
 */

const PROJECTS = [
    // {
    //     slug:         'example-webapp',
    //     title:        'Example Web App',
    //     year:         '2024',
    //     type:         'webapp',
    //     description:  'A short description of what this project does. Replace with your real project details.',
    //     role:         'Design & Development',
    //     tech:         ['React', 'Node.js', 'Express', 'CSS'],
    //     thumbnailUrl: null,   // e.g. '/assets/media/thumbs/example-webapp.png'
    //     iframeUrl:    null,   // e.g. 'https://your-app.com'
    //     liveUrl:      null,
    //     githubUrl:    null,
    //     modelUrl:     null,
    // },
    // {
    //     slug:         'example-3d',
    //     title:        'Example 3D Model',
    //     year:         '2024',
    //     type:         'model3d',
    //     description:  'Interactive 3D model rendered in the browser with Three.js. Drag to rotate, scroll to zoom.',
    //     role:         '3D Modelling & WebGL',
    //     tech:         ['Three.js', 'Blender', 'GLSL'],
    //     thumbnailUrl: null,
    //     iframeUrl:    null,
    //     liveUrl:      null,
    //     githubUrl:    null,
    //     modelUrl:     null,   // e.g. '/assets/models/your-model.glb'
    // },
    {
        slug:         'DiscoOrgan',
        title:        'Disco Organ',
        year:         '2025',
        type:         'webapp',
        description:  'The 21st Century light organ. Your colorful accompaniment.',
        role:         'Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: null,   
        iframeUrl:    null, 
        liveUrl:      null,
        githubUrl:    'https://github.com/meakaliaG/co-canvas.git',
        modelUrl:     null,
    },
    {
        slug:         'Atlas-of-Elasmobranchs',
        title:        'Atlas-of-Elasmobranchs',
        year:         '2026',
        type:         'webapp',
        description:  'Scuba gear not required - Atlas of Elasmobranchs invites visitors to explore the fascinating underwater world of sharks and rays. Blending education with wonder, visitors will navigate a visually rich digital environment where they can learn about elasmobranch anatomy, movement, and ecosystems through playful yet scientifically accurate interactions. From examining skeletal structures to observing how these animals glide through the water, the exhibit encourages curiosity, exploration, and hands-on learning.',
        role:         'UI/UX Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: null,   
        iframeUrl:    null,  
        liveUrl:      null,
        githubUrl:    'https://github.com/meakaliaG/atlas-of-elasmobranchs.git',
        modelUrl:     null,
    },
    {
        slug:         'traqd',
        title:        'traqd',
        year:         '2025',
        type:         'webapp',
        description:  'A compliment to your everyday narrative.',
        role:         'Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: null,  
        iframeUrl:    'https://traqd-6s3q-lvy7mig4t-meakaliags-projects.vercel.app/',
        liveUrl:      'https://traqd-6s3q-lvy7mig4t-meakaliags-projects.vercel.app/',
        githubUrl:    'https://github.com/meakaliaG/traqd.git',
        modelUrl:     null,
    },
    {
        slug:         'coCanvas',
        title:        'coCanvas',
        year:         '2025',
        type:         'webapp',
        description:  'CoCanvas is a web application using Express.js server architecture and a front-end developed with React.js for a cooperative drawing experience.',
        role:         'Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: null,  
        iframeUrl:    null,
        liveUrl:      null,
        githubUrl:    'https://github.com/meakaliaG/co-canvas.git',
        modelUrl:     null,
    },
    {
        slug:         'InPassing',
        title:        'In Passing',
        year:         '2025',
        type:         '2.5D Game',
        description:  'In Passing is a narrative-driven 2.5D adventure game that follows a washed up, ex-police detective in a brand new city. Meet colorful characters, explore a grungy subway, and take notes using your trusty second-hand journal!',
        role:         '3D Modeler',
        tech:         ['Blender', 'GoDot', 'Material Maker'],
        thumbnailUrl: 'assets/media/inPassing/iP7.png',  
        iframeEmbed: {
                    type: 'itch',
                    id: '3635478',
                    width: 552,
                    height: 167,
                    }, 
        liveUrl:      'https://cemoon.itch.io/in-passing',
        githubUrl:    'https://github.com/meakaliaG/traqd.git',
        modelUrl:     null,
    },
    {
        slug:         'Hedonist',
        title:        'Hedonist',
        year:         '2024',
        type:         're-brand',
        description:  'Hedonist is a local chocolatier in Rochester, known for its artisan approach to confections. In reimagining its brand aesthetic, I sought to capture the indulgence and philosophy behind the name. The redesigned logo incorporates a serpent winding through the letter "H," a nod to both the Garden of Eden and the essence of hedonism—embracing pleasure without restraint. The circular form mirrors the shape of a chocolate bonbon, reinforcing the handcrafted nature of Hedonist’s offerings while also considering its use in packaging design. Scalability was a key factor, ensuring the logo adapts seamlessly across business cards, letterheads, and other branded materials. Additionally, the takeaway packaging introduces a seasonal personality, keeping long-term customers engaged and highlighting Hedonist’s ever-evolving artistry. The soft, flowing lines of the logo contrast with the bold typography of the Hedonist name, striking a balance between elegance and indulgence.',
        role:         'Graphic Designer',
        tech:         ['Adobe Suite'],
        thumbnailUrl: 'assets/media/hedonist/HedonistBusinessFront.png',  
        iframeEmbed: null, 
        liveUrl:      null,
        githubUrl:    null,
        modelUrl:     null,
    },
    {
        slug:         'StepByStep',
        title:        'StepByStep',
        year:         '2024',
        type:         'infographic',
        description:  'Packing for a Stylized Trip is a step-by-step guide designed to help you curate the perfect travel wardrobe with intention and creativity. This infographic walks you through a structured approach to packing with style. By incorporating mood boards, personal wardrobe assessments, and outfit experimentation, it ensures that every piece in your suitcase serves a purpose—both functionally and aesthetically. Whether you are layering for the cold or accessorizing for a statement look, this guide makes packing an effortless and expressive part of your journey.',
        role:         'Graphic Designer',
        tech:         ['Adobe Suite'],
        thumbnailUrl: 'assets/media/stepByStep/sbs1.png',
        iframeEmbed: null, 
        liveUrl:      null,
        githubUrl:    null,
        modelUrl:     null,
    },
];


/* ── Page handlers (render thin handlebars shells) ────────────── */

const loadHome    = (req, res) => res.render('app');
const loadWork    = (req, res) => res.render('work');
const loadProject = (req, res) => res.render('project');
const loadAbout   = (req, res) => res.render('app');    // swap 'app' → 'about' when ready
const loadContact = (req, res) => res.render('app');    // swap 'app' → 'contact' when ready


/* ── JSON API endpoints (called by React pages via helper.sendGet) */

/** GET /api/projects — full list, used by work.jsx */
const getProjects = (req, res) => {
    return res.json({ projects: PROJECTS });
};

/** GET /api/project/:slug — single project, used by project.jsx */
const getProject = (req, res) => {
    const project = PROJECTS.find(p => p.slug === req.params.slug);
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ project });
};


module.exports = {
    loadHome,
    loadWork,
    loadProject,
    loadAbout,
    loadContact,
    getProjects,
    getProject,
};
