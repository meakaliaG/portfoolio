const React = require('react');
const { useState, useRef, useEffect } = React;
const { createRoot } = require('react-dom/client');

/* ─────────────────────────────────────────────
   Component: PageHeader
───────────────────────────────────────────── */
const PageHeader = () => (
    <header className="page-header">
        <a className="logo-link" href="/">Meakalia Gilman</a>
        <nav>
            <a href="/about" className="active">About</a>
            <a href="/work">Work</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>
);

/* ─────────────────────────────────────────────
   Component: Bio
───────────────────────────────────────────── */
const Bio = () => (
    <section className="bio-section">
        <div className="bio-label">about</div>
        <div className="bio-body">
            <h1 className="bio-name">
                Meakalia<br />
                <em>Gilman</em>
            </h1>
            <div className="bio-divider" />
            <p className="bio-text">
                Designer, developer, and storyteller working at the intersection of
                interaction and identity. My practice spans UI/UX, 3D modelling,
                graphic design, and research — united by a belief that the best
                interfaces feel inevitable.
                <br></br>
                Based in Rochester, NY. Currently studying Interactive Media Development.
                I am drawn to work that priotitizes intention and prolongs curiosity.
            </p>
            <div className="bio-tags">
                <span className="bio-tag">UI / UX</span>
                <span className="bio-tag">Web Development</span>
                <span className="bio-tag">3D Modelling</span>
                <span className="bio-tag">Graphic Design</span>
                <span className="bio-tag">Research</span>
            </div>
        </div>
        <div className="bio-portrait">
            {/* Swap src for your photo: <img src="/assets/media/portrait.jpg" alt="Meakalia Gilman" /> */}
            {/* <div className="portrait-placeholder">MG</div> */}
            <img src="/assets/media/headshot-bw.png" alt="Meakalia Gilman" />
        </div>
    </section>
);

/* ─────────────────────────────────────────────
   Component: ResumeSection
   Timeline-style resume + download link
───────────────────────────────────────────── */
const RESUME_ENTRIES = [
    {
        category: 'Education',
        items: [
            {
                title: 'Interactive Media Design',
                org:   'Rochester Institute of Technology',
                year:  '2026 Graduate',
                note:  'B.S. recipient. Focus areas: UX research, front-end development, 3D modelling.',
            },
        ],
    },
    {
        category: 'Experience',
        items: [
            {
                title: '3D Modeler',
                org:   'In Passing · Magic Spell Studios',
                year:  '2025',
                note:  'Asset creation in Blender and Material Maker for a narrative 2.5D adventure game.',
            },
            {
                title: 'Full Stack Developer',
                org:   'Atlas of Elasmobranchs · Senior Capstone',
                year:  '2026',
                note:  'Full-stack development for marine biology web learning module.',
            },
            {
                title: 'UI/UX Design & Development',
                org:   'Independent / Freelance',
                year:  '2024 – Present',
                note:  'Full-stack design and development for web applications and brand identity projects.',
            },
        ],
    },
    {
        category: 'Skills',
        items: [
            {
                title: 'Web/Mobile',
                org:   '',
                year:  '',
                note:  'JavaScript, React, Node.js, Express, CSS, Handlebars',
            },
            {
                title: 'Analytics',
                org:   '',
                year:  '',
                note:  'Python, C#, C++, Java',
            },
            {
                title: 'Design',
                org:   '',
                year:  '',
                note:  'Adobe Suite, Blender, Figma, Maya 3D, Material Maker',
            },
            {
                title: 'Game',
                org:   '',
                year:  '',
                note:  'GoDot, Unity, Unreal',
            },
            {
                title: 'Communication',
                org:   '',
                year:  '',
                note:  'Skilled at creating welcoming environments and managing client needs with professional eagerness.',
            },
        ],
    },
];

// pre-.mp4 bckgrd
// const ResumeSection = () => {
//     return (
//         <section className="resume-section">
//             <div className="section-header">
//                 <span className="section-label">resume</span>
//                 <a
//                     className="resume-download"
//                     href="/assets/media/MeakaliaGilman_Resume.docx"
//                     target="_blank"
//                     rel="noreferrer"
//                     download
//                 >
//                     ↓ Download PDF
//                 </a>
//             </div>

            // <div className="resume-grid">
            //     {RESUME_ENTRIES.map(group => (
            //         <div key={group.category} className="resume-group">
            //             <h3 className="resume-category">{group.category}</h3>
            //             {group.items.map((item, i) => (
            //                 <div key={i} className="resume-entry">
            //                     <div className="resume-entry-head">
            //                         <span className="resume-title">{item.title}</span>
            //                         {item.year && <span className="resume-year">{item.year}</span>}
            //                     </div>
            //                     {item.org && <div className="resume-org">{item.org}</div>}
            //                     <p className="resume-note">{item.note}</p>
            //                 </div>
            //             ))}
            //         </div>
            //     ))}
            // </div>
//         </section>
//     );
// };

const ResumeSection = ({ onToggleMute, muted }) => {
    return (
        <section className="resume-section">
            <div className="section-header">
                <span className="section-label">resume</span>
                <div className="section-header-actions">
                    <button className="mute-btn" onClick={onToggleMute}>
                        {muted ? '♪ unmute video' : '♪  mute video'}
                    </button>
                     <a
                    className="resume-download"
                    href="/assets/media/MeakaliaGilman_Resume.docx"
                    target="_blank"
                    rel="noreferrer"
                    download
                    >
                        ↓ Download Resume
                    </a>
                </div>
            </div>
            <div className="resume-grid"> {RESUME_ENTRIES.map(group => (
                    <div key={group.category} className="resume-group">
                        <h3 className="resume-category">{group.category}</h3>
                        {group.items.map((item, i) => (
                            <div key={i} className="resume-entry">
                                <div className="resume-entry-head">
                                    <span className="resume-title">{item.title}</span>
                                    {item.year && <span className="resume-year">{item.year}</span>}
                                </div>
                                {item.org && <div className="resume-org">{item.org}</div>}
                                <p className="resume-note">{item.note}</p>
                            </div>
                        ))}
                    </div>
                ))}</div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Component: Interests
   Tag cloud grouped by category
───────────────────────────────────────────── */
const INTERESTS = [
    {
        category: 'Tech & Design',
        tags: [
            'Generative Art',
            'Creative Coding',
            'Typography',
            'Interaction Design',
            'World Building',
            'Game Design',
        ],
    },
    {
        category: 'Culture & Heritage',
        tags: [
            'Hula',
            'Hawaiian History',
            'Indigenous Preservation',
            'Oral Tradition',
            'Polynesian Navigation',
        ],
    },
    {
        category: 'Creative',
        tags: [
            'Drawing',
            'Music',
            '3D Sculpture',
            'Narrative Writing',
            'Zine Making',
        ],
    },
    {
        category: 'Film',
        tags: [
            'Foreign Film',
            'Studio Ghibli',
            'French New Wave',
            'Visual Storytelling',
            'Animation Studies',
        ],
    },
];
 
const Interests = () => (
    <section className="interests-section">
        <div className="section-header">
            <span className="section-label">interests</span>
        </div>
        <div className="interests-grid">
            {INTERESTS.map(group => (
                <div key={group.category} className="interests-group">
                    <h3 className="interests-category">{group.category}</h3>
                    <div className="interests-tags">
                        {group.tags.map(tag => (
                            <span key={tag} className="bio-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ─────────────────────────────────────────────
   Component: PersonalWork
   Featured non-portfolio work (research, writing, etc.)
───────────────────────────────────────────── */
const PERSONAL_WORKS = [
    {
        type:     'Research Paper',
        title:    'The Living Archive: Hula as Cultural Transmission',
        year:     '2024',
        excerpt:  'An investigation into hula as a multi-generational vessel for Hawaiian history, cosmology, and identity — exploring how embodied knowledge survives colonization, tourism, and digital mediation.',
        tags:     ['Indigenous Preservation', 'Cultural Investigation', 'Archive'],
        // Set href to a real link or PDF path when available:
        href:     'assets/media/hula/Hula.pdf',
        featured: true,
    },
];

const PersonalWorkCard = ({ work }) => {
    const inner = (
        <>
            <div className="pw-meta">
                <span className="pw-type">{work.type}</span>
                <span className="pw-year">{work.year}</span>
            </div>
            <h3 className="pw-title">{work.title}</h3>
            <p className="pw-excerpt">{work.excerpt}</p>
            <div className="pw-tags">
                {work.tags.map(t => <span key={t} className="pw-tag">{t}</span>)}
            </div>
            {work.href && <span className="pw-cta">Read ↗</span>}
        </>
    );

    return work.href ? (
        <a className={`pw-card ${work.featured ? 'pw-card--featured' : ''}`} href={work.href} target="_blank" rel="noreferrer">
            {inner}
        </a>
    ) : (
        <div className={`pw-card ${work.featured ? 'pw-card--featured' : ''}`}>
            {inner}
        </div>
    );
};

const PersonalWork = () => (
    <section className="personal-work-section">
        <div className="section-header">
            <span className="section-label">personal work</span>
        </div>
        <div className="pw-grid">
            {PERSONAL_WORKS.map((w, i) => <PersonalWorkCard key={i} work={w} />)}
        </div>
    </section>
);

/* ─────────────────────────────────────────────
   Component: About (main)
───────────────────────────────────────────── */
const About = () => {
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);

    const toggleMute = () => {
        setMuted(prev => {
            if (videoRef.current) videoRef.current.muted = !prev;
            return !prev;
        });
    };

    return (
        <div className="about-page">
        <div className="video-bg-wrapper">
            <video
                ref={videoRef}
                id="bgVideo"
                src="/assets/media/liveMIDI.mp4"
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
            />
        </div>
            <PageHeader />
            <main className="about-main">
                <Bio />
                <ResumeSection onToggleMute={toggleMute} muted={muted} />
                <PersonalWork />
            </main>
            <footer className="page-footer">
                <span>© Meakalia Gilman</span>
                <a href="/contact" className="footer-cta">Get in touch →</a>
            </footer>
        </div>
    );
};

/* ── Init ── */
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<About />);
};

window.onload = init;
