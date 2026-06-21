/**
 * Portfolio.js — controller for Work, Project, About, Contact pages
 *                + JSON API routes consumed by the React JSX pages.
 *
 * ─────────────────────────────────────────────────────────────────
 * ADD A PROJECT
 * ─────────────────────────────────────────────────────────────────
 * 1. Add an entry to the PROJECTS array below.
 * 2. Give it a unique `slug` — this becomes the URL: /project/your-slug
 * 3. Add an `images` array with { src, alt } objects:
 *    images: [
 *      { src: '/assets/media/my-project/screenshot1.png', alt: 'Home screen' },
 *      { src: '/assets/media/my-project/screenshot2.png', alt: 'Detail view' },
 *    ]
 *    → Images are served from /hosted/media/... via /assets/...
 *    → Drop your files in hosted/media/<project-folder>/
 * 4. If images is empty ([]) the viewer falls back to:
 *       iframeEmbed → iframeUrl → ThreeViewer placeholder
 * ─────────────────────────────────────────────────────────────────
 */

const PROJECTS = [
    {
        slug:         'InPassing',
        title:        'In Passing',
        year:         '2025',
        type:         '2.5D Game',
        description:  'In Passing is a narrative-driven 2.5D adventure game that follows a washed up, ex-police detective in a brand new city. Meet colorful characters, explore a grungy subway, and take notes using your trusty second-hand journal!',
        role:         '3D Modeler',
        tech:         ['Blender', 'GoDot', 'Material Maker'],
        thumbnailUrl: 'assets/media/inPassing/iP7.png',
        images: [
            { src: '/assets/media/inPassing/iP7.png', alt: 'In Passing — Intro scene' },
            { src: '/assets/media/inPassing/iP1.png'},
            { src: '/assets/media/inPassing/iP2.png'},
            { src: '/assets/media/inPassing/iP3.png'},
            { src: '/assets/media/inPassing/iP4.png'},
            { src: '/assets/media/inPassing/iP5.png'},
            { src: '/assets/media/inPassing/iP6.png'},
            { src: '/assets/media/inPassing/iP8.png'},
        ],
        // iframeEmbed used as fallback if images is empty
        iframeEmbed: {
            type: 'itch',
            id: '3635478',
            width: 552,
            height: 167,
        },
        liveUrl:      'https://cemoon.itch.io/in-passing',
        githubUrl:    null,
        modelUrl:     null,
    },
    {
        slug:         'Atlas-of-Elasmobranchs',
        title:        'Atlas of Elasmobranchs',
        year:         '2026',
        type:         'webapp',
        description:  'Scuba gear not required - Atlas of Elasmobranchs invites visitors to explore the fascinating underwater world of sharks and rays. Blending education with wonder, visitors will navigate a visually rich digital environment where they can learn about elasmobranch anatomy, movement, and ecosystems through playful yet scientifically accurate interactions.',
        role:         'UI/UX Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: '/assets/media/elasmo/atlasShark.png',
        images: [
            { src: '/assets/media/elasmo/atlasShark.png', alt: '3D shark' },
            { src: '/assets/media/elasmo/atlasTemp.png', alt: 'Info panel' },

        ],
        iframeUrl:    null,
        liveUrl:      "https://atlas-of-elasmobranchs-469fb0e8ffd5.herokuapp.com/",
        githubUrl:    'https://github.com/meakaliaG/atlas-of-elasmobranchs.git',
        modelUrl:     null,
    },
    {
        slug:         'DiscoOrgan',
        title:        'Disco Organ',
        year:         '2025',
        type:         'webapp',
        description:  'The 21st Century light organ. Your colorful accompaniment.',
        role:         'Design & Development',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: '/assets/media/disco/disco-organ-thumb.png',
        images: [
            { src: '/assets/media/disco/disco-organ-thumb.png', alt: 'Main interface' },
        ],
        // ─────────────────────────────────────────────────────────
        iframeUrl:    null,
        liveUrl:      'https://disco-organ-vercel-aabtqcc7b-meakaliags-projects.vercel.app/',
        githubUrl:    'https://github.com/meakaliaG/co-canvas.git',
        modelUrl:     null,
    },
    {
        slug:         'design principles',
        title:        'Design Principles',
        year:         '2024',
        type:         'Design Project',
        description:  'A practice in the universal elements of shape and color.',
        role:         'Designer',
        tech:         ['React', 'Node.js', 'Express', 'CSS'],
        thumbnailUrl: null,
        images: [
            // { src: '/assets/media/traqd/dashboard.png', alt: 'Dashboard' },
        ],
        // Falls back to iframeUrl when images array is empty
        iframeUrl:    'https://traqd-6s3q-lvy7mig4t-meakaliags-projects.vercel.app/',
        liveUrl:      'https://traqd-6s3q-lvy7mig4t-meakaliags-projects.vercel.app/',
        githubUrl:    'https://github.com/meakaliaG/traqd.git',
        modelUrl:     null,
    },
    {
        slug:         'traqd',
        title:        'traqd',
        year:         '2025',
        type:         'webapp',
        description:  'A compliment to your everyday narrative.',
        role:         'Design & Development',
        tech:         ['Adobe Suite'],
        thumbnailUrl: null,
        images: [
            { src: '/assets/media/principles/MeaGilmanDesignPrinciples.png'},
        ],
        // Falls back to iframeUrl when images array is empty
        iframeUrl:    null,
        liveUrl:      null,
        githubUrl:    null,
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
        images: [
            // { src: '/assets/media/coCanvas/lobby.png', alt: 'Lobby screen' },
            // { src: '/assets/media/coCanvas/canvas.png', alt: 'Drawing canvas' },
        ],
        iframeUrl:    null,
        liveUrl:      null,
        githubUrl:    'https://github.com/meakaliaG/co-canvas.git',
        modelUrl:     null,
    },
    {
        slug:         'Hedonist',
        title:        'Hedonist',
        year:         '2024',
        type:         're-brand',
        description:  'Hedonist is a local chocolatier in Rochester, known for its artisan approach to confections. In reimagining its brand aesthetic, I sought to capture the indulgence and philosophy behind the name. The redesigned logo incorporates a serpent winding through the letter "H," a nod to both the Garden of Eden and the essence of hedonism. The circular form mirrors the shape of a chocolate bonbon, reinforcing the handcrafted nature of Hedonist\'s offerings.',
        role:         'Graphic Designer',
        tech:         ['Adobe Suite'],
        thumbnailUrl: 'assets/media/hedonist/HedonistBusinessFront.png',
        images: [
            { src: '/assets/media/hedonist/HedonistBusinessFront.png', alt: 'Business card — front' },
            { src: '/assets/media/hedonist/HedonistBusinessBack.png',  alt: 'Business card — back' },
            { src: '/assets/media/hedonist/HedonistLogo.png',          alt: 'Logo' },
            { src: '/assets/media/hedonist/HedonistPackaging.png',     alt: 'Packaging' },
        ],
        iframeEmbed:  null,
        iframeUrl:    null,
        liveUrl:      null,
        githubUrl:    null,
        modelUrl:     null,
    },
    {
        slug:         'StepByStep',
        title:        'StepByStep',
        year:         '2024',
        type:         'infographic',
        description:  'Packing for a Stylized Trip is a step-by-step guide designed to help you curate the perfect travel wardrobe with intention and creativity. This infographic walks you through a structured approach to packing with flare and finesse — incorporating mood boards, personal wardrobe assessments, and outfit experimentation.',
        role:         'Graphic Designer',
        tech:         ['Adobe Suite'],
        thumbnailUrl: 'assets/media/stepByStep/sbs1.png',
        images: [
            { src: '/assets/media/stepByStep/sbs1.png', alt: 'Step by Step — page 1' },
            { src: '/assets/media/stepByStep/sbs2.png', alt: 'Step by Step — page 2' },
            { src: '/assets/media/stepByStep/sbs3.png', alt: 'Step by Step — page 3' },
            { src: '/assets/media/stepByStep/sbs4.png', alt: 'Step by Step — page 4' },
            { src: '/assets/media/stepByStep/sbs5.png', alt: 'Step by Step — page 5' },
            { src: '/assets/media/stepByStep/sbs6.png', alt: 'Step by Step — page 6' },
            { src: '/assets/media/stepByStep/sbs7.png', alt: 'Step by Step — page 7' },
            { src: '/assets/media/stepByStep/sbs8.png', alt: 'Step by Step — page 8' },
            { src: '/assets/media/stepByStep/sbs9.png', alt: 'Step by Step — page 9' },
            { src: '/assets/media/stepByStep/sbs10.png', alt: 'Step by Step — page 10' },
            { src: '/assets/media/stepByStep/sbs211png', alt: 'Step by Step — page 11' },

        ],
        iframeEmbed:  null,
        iframeUrl:    null,
        liveUrl:      null,
        githubUrl:    null,
        modelUrl:     null,
    },
];


/* ── Page handlers ────────────────────────────────────────────── */
const loadHome    = (req, res) => res.render('app');
const loadWork    = (req, res) => res.render('work');
const loadProject = (req, res) => res.render('project');
const loadAbout   = (req, res) => res.render('about');
const loadContact = (req, res) => res.render('contact');

/* ── JSON API ─────────────────────────────────────────────────── */
const getProjects = (req, res) => res.json({ projects: PROJECTS });

const getProject  = (req, res) => {
    const project = PROJECTS.find(p => p.slug === req.params.slug);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    return res.json({ project });
};

const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;
 
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
 
    // Basic email format check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
 
    console.log('── New contact message ──────────────────');
    console.log(`From:    ${name} <${email}>`);
    if (company) console.log(`Company: ${company}`);
    console.log(`Message:\n${message}`);
    console.log('────────────────────────────────────────');
    return res.json({ message: 'Message received — thank you!' });
};

module.exports = {
    loadHome,
    loadWork,
    loadProject,
    loadAbout,
    loadContact,
    getProjects,
    getProject,
    submitContact,
};
