const helper = require('../utils/helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

/* ─────────────────────────────────────────────
   Component: PageHeader
───────────────────────────────────────────── */
const PageHeader = () => (
    <header className="page-header">
        <a className="logo-link" href="/">Meakalia Gilman</a>
        <nav>
            <a href="/about">About</a>
            <a href="/work" className="active">Work</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
);

/* ─────────────────────────────────────────────
   Component: FilterBar
───────────────────────────────────────────── */
// const FilterBar = ({ active, onChange }) => {
//     const filters = [
//         { key: 'all',     label: 'All' },
//         { key: 'webapp',  label: 'Web Apps' },
//         { key: 'model3d', label: '3D Models' },
//     ];

//     return (
//         <div className="filters">
//             {filters.map(f => (
//                 <button
//                     key={f.key}
//                     className={`filter-btn ${active === f.key ? 'active' : ''}`}
//                     onClick={() => onChange(f.key)}
//                 >
//                     {f.label}
//                 </button>
//             ))}
//         </div>
//     );
// };

/* ─────────────────────────────────────────────
   Component: ProjectCard
───────────────────────────────────────────── */
const ProjectCard = ({ project }) => {
    const { slug, title, year, type, description, tech, thumbnailUrl } = project;

    console.log('description length: ' + project.description.length)

    let des = description;

    if (project.description.length >= 200) {
        des = des.slice(0, 200) + "...";
    }

    return (
        <a className="card" href={`/project/${slug}`} data-type={type}>
            <div className={`card-thumb ${thumbnailUrl ? '' : 'placeholder'}`}>
                {thumbnailUrl
                    ? <img src={thumbnailUrl} alt={title} loading="lazy" />
                    : <span className="thumb-label">{type}</span>
                }
                <span className={`card-type ${type}`}>
                    {type}
                </span>
                <div className="card-thumb-overlay" />
            </div>

            <div className="card-body">
                <div className="card-meta">{year} · {type}</div>
                <div className="card-title">{title}</div>
                <div className="card-desc">{des}</div>
                {tech && tech.length > 0 && (
                    <div className="card-tags">
                        {tech.map(t => (
                            <span key={t} className="card-tag">{t}</span>
                        ))}
                    </div>
                )}
            </div>
            <span className="card-arrow">→</span>
        </a>
    );
};

/* ─────────────────────────────────────────────
   Component: Work (main)
───────────────────────────────────────────── */
const Work = () => {
    const [projects, setProjects]     = useState([]);
    const [filter, setFilter]         = useState('all');
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        const result = await helper.sendGet('/api/projects');
        if (result.projects) {
            setProjects(result.projects);
        }
        setLoading(false);
    };

    const visible = filter === 'all'
        ? projects
        : projects.filter(p => p.type === filter);

    return (
        <div className="work-page">
            <PageHeader />

            <section className="hero">
                <h1>SELECTED</h1>
                <h2>work</h2>
                {/* <h1>Selected<em>Work.</em></h1> */}
                <p>User experience and interaction studies.</p>
            </section>

            {/* <FilterBar active={filter} onChange={setFilter} /> */}

            {loading ? (
                <div className="loading-container">
                    <div className="loader">
                        <div className="dot"/><div className="dot"/><div className="dot"/>
                    </div>
                </div>
            ) : (
                <div className="grid" id="project-grid">
                    {visible.length === 0 ? (
                        <div className="empty-state">
                            <p>Nothing here yet.</p>
                        </div>
                    ) : (
                        visible.map(p => <ProjectCard key={p.slug} project={p} />)
                    )}
                </div>
            )}

            <footer className="page-footer">
                <span>© Meakalia Gilman</span>
                <button
                    className="back-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    ↑ Top
                </button>
            </footer>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Init
───────────────────────────────────────────── */
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Work />);
};

window.onload = init;
