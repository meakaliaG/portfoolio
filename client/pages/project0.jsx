const helper = require('../utils/helper.js');
const React = require('react');
const { useState, useEffect, useRef } = React;
const { createRoot } = require('react-dom/client');

/* ─────────────────────────────────────────────
   Component: PageHeader
───────────────────────────────────────────── */
const PageHeader = ({ title }) => (
    <header className="page-header">
        <a className="logo-link" href="/">Meakalia Gilman</a>
        <nav>
            <a href="/about">About</a>
            <a href="/work">Work</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
);

/* ─────────────────────────────────────────────
   Component: Breadcrumb
───────────────────────────────────────────── */
const Breadcrumb = ({ title }) => (
    <div className="breadcrumb">
        <a href="/work">Work</a>
        <span>/</span>
        <span className="crumb-current">{title}</span>
    </div>
);

/* ─────────────────────────────────────────────
   Component: IframeViewer
   Renders a web app inside an iframe
───────────────────────────────────────────── */
const IframeViewer = ({ iframeUrl, liveUrl }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="viewer-section">
            <div className="viewer-frame">
                {!loaded && (
                    <div className="viewer-loading">
                        <div className="loader">
                            <div className="dot"/><div className="dot"/><div className="dot"/>
                        </div>
                    </div>
                )}
                <iframe
                    src={iframeUrl}
                    title="Project preview"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    onLoad={() => setLoaded(true)}
                    style={{ opacity: loaded ? 1 : 0 }}
                />
            </div>
            <div className="viewer-controls">
                <button
                    className="ctrl-btn"
                    onClick={() => setLoaded(false)}
                >
                    ↺ Reload
                </button>
                {liveUrl && (
                    <a className="ctrl-btn" href={liveUrl} target="_blank" rel="noreferrer">
                        ↗ Open Full
                    </a>
                )}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Component: ThreeViewer
   Three.js canvas viewer for 3D models
───────────────────────────────────────────── */
const ThreeViewer = ({ modelUrl }) => {
    const frameRef    = useRef(null);
    const canvasRef   = useRef(null);
    const stateRef    = useRef({ rotX: 0, rotY: 0, zoom: 4, isDragging: false });
    const sceneRef    = useRef({});
    const [wireframe, setWireframe] = useState(false);
    const [darkBg,    setDarkBg]    = useState(true);

    useEffect(() => {
        // Load Three.js from CDN then initialise
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => initThree();
        document.head.appendChild(script);
        return () => { script.remove(); };
    }, []);

    const initThree = () => {
        const THREE  = window.THREE;
        const canvas = canvasRef.current;
        const frame  = frameRef.current;
        if (!canvas || !frame) return;

        // Scene & camera
        const scene  = new THREE.Scene();
        scene.background = new THREE.Color(0x1a0505);
        const camera = new THREE.PerspectiveCamera(45, frame.clientWidth / frame.clientHeight, 0.1, 100);
        camera.position.set(0, 1.5, 4);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(frame.clientWidth, frame.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        // Lighting
        scene.add(new THREE.AmbientLight(0xffe5e4, 0.6));
        const dir = new THREE.DirectionalLight(0xffffff, 1.2);
        dir.position.set(3, 5, 3);
        scene.add(dir);
        scene.add(Object.assign(new THREE.DirectionalLight(0x550101, 0.4), {
            position: new THREE.Vector3(-3, 1, -3)
        }));

        // Placeholder / actual model
        const geo  = new THREE.TorusKnotGeometry(1, 0.32, 128, 16);
        const mat  = new THREE.MeshStandardMaterial({ color: 0x550101, roughness: 0.3, metalness: 0.7 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const grid = new THREE.GridHelper(8, 20, 0x550101, 0x550101);
        grid.material.opacity = 0.12;
        grid.material.transparent = true;
        grid.position.y = -1.6;
        scene.add(grid);

        // Store refs for controls
        sceneRef.current = { scene, camera, renderer, mesh, mat };

        /* ── Pointer drag ── */
        const s = stateRef.current;
        canvas.addEventListener('mousedown',  e => { s.isDragging = true;  s.px = e.clientX; s.py = e.clientY; });
        window.addEventListener('mouseup',    () => { s.isDragging = false; });
        canvas.addEventListener('mousemove',  e => {
            if (!s.isDragging) return;
            s.rotY += (e.clientX - s.px) * 0.005;
            s.rotX  = Math.max(-1.2, Math.min(1.2, s.rotX + (e.clientY - s.py) * 0.005));
            s.px = e.clientX; s.py = e.clientY;
        });
        canvas.addEventListener('wheel', e => {
            s.zoom = Math.max(1.5, Math.min(10, s.zoom + e.deltaY * 0.005));
            e.preventDefault();
        }, { passive: false });

        /* ── Resize ── */
        const onResize = () => {
            camera.aspect = frame.clientWidth / frame.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(frame.clientWidth, frame.clientHeight);
        };
        window.addEventListener('resize', onResize);

        /* ── Render loop ── */
        (function animate() {
            requestAnimationFrame(animate);
            if (!s.isDragging) s.rotY += 0.003;
            mesh.rotation.x = s.rotX;
            mesh.rotation.y = s.rotY;
            camera.position.z = s.zoom;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        })();

        /* ── TODO: load your actual GLB ──────────────────────────
           Once you've placed file in /hosted/models/:
           
           const { GLTFLoader } = await import('/assets/js/GLTFLoader.js');
           const loader = new GLTFLoader();
           loader.load(modelUrl || '/assets/models/your-model.glb', (gltf) => {
               scene.remove(mesh);   // remove placeholder torus
               scene.add(gltf.scene);
           });
        ──────────────────────────────────────────────────────── */
    };

    // Wireframe toggle
    useEffect(() => {
        if (sceneRef.current.mat) sceneRef.current.mat.wireframe = wireframe;
    }, [wireframe]);

    // Background toggle
    useEffect(() => {
        if (sceneRef.current.scene) {
            sceneRef.current.scene.background = new window.THREE.Color(darkBg ? 0x1a0505 : 0xffe5e4);
        }
    }, [darkBg]);

    const resetView = () => {
        stateRef.current.rotX = 0;
        stateRef.current.rotY = 0;
        stateRef.current.zoom = 4;
    };

    return (
        <div className="viewer-section">
            <div className="viewer-frame" ref={frameRef}>
                <canvas ref={canvasRef} id="three-canvas" />
            </div>
            <div className="viewer-controls">
                <button className="ctrl-btn" onClick={resetView}>↺ Reset View</button>
                <button className="ctrl-btn" onClick={() => setWireframe(w => !w)}>⬡ Wireframe</button>
                <button className="ctrl-btn" onClick={() => setDarkBg(d => !d)}>◐ Toggle BG</button>
                <span className="ctrl-hint">Drag to rotate · Scroll to zoom</span>
            </div>
        </div>
    );
};

const generateProjLinks = ({ project }) => {
    const { title, year, type, description, role, tech, githubUrl, liveUrl } = project;


    if (project.githubUrl && !project.liveUrl) {
        return (
            <div className="proj-links">
                {githubUrl && (
                    <a className="proj-link" href={githubUrl} target="_blank" rel="noreferrer">
                        <span>GitHub</span><span>↗</span>
                    </a>
                )}
            </div>
        )
    } else if (!project.githubUrl && project.liveUrl) {
        return (
            <div className="proj-links">
                {liveUrl && (
                    <a className="proj-link" href={liveUrl} target="_blank" rel="noreferrer">
                        <span>Live Site</span><span>↗</span>
                    </a>
                )}
            </div>
        )
    } else if (project.githubUrl && project.liveUrl) {
        return (
            <div className="proj-links">
                {githubUrl && (
                    <a className="proj-link" href={githubUrl} target="_blank" rel="noreferrer">
                        <span>GitHub</span><span>↗</span>
                    </a>
                )}
                {liveUrl && (
                    <a className="proj-link" href={liveUrl} target="_blank" rel="noreferrer">
                        <span>Live Site</span><span>↗</span>
                    </a>
                )}
            </div>
        )
    } else {
        return null;
    }
}

/* ─────────────────────────────────────────────
   Component: Sidebar
───────────────────────────────────────────── */
const Sidebar = ({ project }) => {
    const { title, year, type, description, role, tech, githubUrl, liveUrl } = project;

    // if (project.githubUrl && project.liveUrl) {
    //    return (
    //     <aside className="sidebar">
    //         <span className={`proj-type-badge ${type}`}>
    //             {type === 'model3d' ? '3D Model' : 'Web App'}
    //         </span>
    //         <h1 className="proj-title">{title}</h1>
    //         <div className="proj-year">{year}</div>

    //         <div className="sidebar-section">
    //             <h3>About</h3>
    //             <p>{description}</p>
    //         </div>

    //         {role && (
    //             <div className="sidebar-section">
    //                 <h3>Role</h3>
    //                 <p>{role}</p>
    //             </div>
    //         )}

    //         {tech && tech.length > 0 && (
    //             <div className="sidebar-section">
    //                 <h3>Built with</h3>
    //                 <div className="tech-list">
    //                     {tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
    //                 </div>
    //             </div>
    //         )}

    //         <div className="proj-links">
    //             {githubUrl && (
    //                 <a className="proj-link" href={githubUrl} target="_blank" rel="noreferrer">
    //                     <span>GitHub</span><span>↗</span>
    //                 </a>
    //             )}
    //             {liveUrl && (
    //                 <a className="proj-link" href={liveUrl} target="_blank" rel="noreferrer">
    //                     <span>Live Site</span><span>↗</span>
    //                 </a>
    //             )}
    //         </div>
    //     </aside>
    // ); 
    // } else {
    return (
        <aside className="sidebar">
            <span className={`proj-type-badge ${type}`}>
                {type}
            </span>
            <h1 className="proj-title">{title}</h1>
            <div className="proj-year">{year}</div>

            <div className="sidebar-section">
                <h3>About</h3>
                <p>{description}</p>
            </div>

            {role && (
                <div className="sidebar-section">
                    <h3>Role</h3>
                    <p>{role}</p>
                </div>
            )}

            {tech && tech.length > 0 && (
                <div className="sidebar-section">
                    <h3>Built with</h3>
                    <div className="">
                        {tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                    </div>
                </div>
            )}

            {generateProjLinks(project)}

        </aside>
    );
};

/* ─────────────────────────────────────────────
   Component: Project (main)
   Reads the slug from the URL, fetches project
   data from /api/project/:slug, then renders
   the correct viewer.
───────────────────────────────────────────── */
const Project = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Extract slug from URL: /project/my-slug → 'my-slug'
    const slug = window.location.pathname.split('/').filter(Boolean).pop();

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
        setLoading(true);
        const result = await helper.sendGet(`/api/project/${slug}`);

        if (result.project) {
            setProject(result.project);
            document.title = `${result.project.title} — Meakalia Gilman`;
        } else {
            setNotFound(true);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader">
                    <div className="dot"/><div className="dot"/><div className="dot"/>
                </div>
            </div>
        );
    }

    if (notFound || !project) {
        return (
            <div className="not-found-container">
                <h2>Project not found</h2>
                <p>This project doesn't exist or has been removed.</p>
                <a href="/work" className="ctrl-btn">← Back to Work</a>
            </div>
        );
    }

    return (
        <div className="project-page-inner">
            <PageHeader />
            <Breadcrumb title={project.title} />

            <div className="project-layout">
                {/* Viewer — left/main column */}
                {project.type === 'webapp' && (project.iframeUrl || project.iframeEmbed) ? (
                    project.iframeEmbed ? (
                        <ItchEmbed project={project} />
                    ) : (
                        <IframeViewer iframeUrl={project.iframeUrl} liveUrl={project.liveUrl} />
                    )
                ) : (
                    <ThreeViewer modelUrl={project.modelUrl} />
                )}

                {/* Info — right column */}
                <Sidebar project={project} />
            </div>
        </div>
    );
};

const ItchEmbed = ({ project }) => {
    const { id, width, height } = project.iframeEmbed;

    return (
        <div className="viewer-section">
            <div className="viewer-frame">
                <iframe
                    src={`https://itch.io/embed/${id}`}
                    width={width}
                    height={height}
                    frameBorder="0"
                />
            </div>

            <div className="viewer-controls">
                <a
                    className="ctrl-btn"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    ↗ Open on itch.io
                </a>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Init
───────────────────────────────────────────── */
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Project />);
};

window.onload = init;
