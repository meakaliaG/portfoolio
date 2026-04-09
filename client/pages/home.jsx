const React = require('react');
const { useRef, useEffect } = React;
const { createRoot } = require('react-dom/client');
const gsap = require('gsap').default || require('gsap');

/* ─────────────────────────────────────────────
   Component: NavLinks
   Left-panel navigation overlay
───────────────────────────────────────────── */
const NavLinks = () => (
    <nav className="nav-links">
        <a href="/about">About</a>
        <a href="/work">Work</a>
        <a href="/contact">Contact</a>
    </nav>
);

/* ─────────────────────────────────────────────
   Component: Panel
   A single clickable SVG panel with hover label
───────────────────────────────────────────── */
const Panel = ({ id, href, pathD, fill, labelText, labelX, labelY, labelAnchor = 'middle' }) => {
    const pathRef  = useRef(null);
    const labelRef = useRef(null);

    const handleEnter = () => {
        gsap.to(pathRef.current,  { fill: '#f5d4d3', duration: 0.3 });
        gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.3 });
    };
    const handleLeave = () => {
        gsap.to(pathRef.current,  { fill, duration: 0.3 });
        gsap.to(labelRef.current, { opacity: 0, y: 6, duration: 0.3 });
    };

    return (
        <a href={href} style={{ cursor: 'pointer' }}>
            <path
                ref={pathRef}
                id={id}
                d={pathD}
                fill={fill}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{ cursor: 'pointer' }}
            />
            <text
                ref={labelRef}
                x={labelX}
                y={labelY}
                textAnchor={labelAnchor}
                dominantBaseline="middle"
                fontFamily="'Slackey', serif"
                fontSize="28"
                fontStyle="italic"
                fontWeight="300"
                fill="#550101"
                opacity="0"
                letterSpacing="6"
                style={{ pointerEvents: 'none' }}
            >
                {labelText}
            </text>
        </a>
    );
};

/* ─────────────────────────────────────────────
   Component: Home
   Full portfolio landing page
───────────────────────────────────────────── */
const Home = () => {
    const panelsRef = useRef([]);

    // Staggered entrance animation on mount
    useEffect(() => {
        gsap.fromTo(
            panelsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
        );
    }, []);

    const panels = [
        {
            id:          'about-panel',
            href:        '/about',
            pathD:       'M495.706 386.301C470.204 367.866 438.872 357 405 357C399.94 357 394.936 357.245 390 357.719V0.0683594H1430L495.706 386.301Z',
            fill:        '#FFE5E4',
            labelText:   'about',
            labelX:      920,
            labelY:      130,
        },
        {
            id:          'work-panel',
            href:        '/work',
            pathD:       'M1440 1014L507.27 628.471C539.595 600.064 560 558.416 560 512C560 464.423 538.563 421.855 504.823 393.422L1440 10V1014Z',
            fill:        '#FFE5E4',
            labelText:   'work',
            labelX:      1100,
            labelY:      512,
        },
        {
            id:          'contact-panel',
            href:        '/contact',
            pathD:       'M1430.48 1024H390.483V666.326C395.263 666.77 400.105 667 405 667C438.923 667 470.3 656.1 495.822 637.614L1430.48 1024Z',
            fill:        '#FFE5E4',
            labelText:   'contact',
            labelX:      920,
            labelY:      900,
        },
    ];

    return (
        <div className="portfolio-root">
            <svg
                className="bg-svg"
                viewBox="0 0 1440 1024"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id="clip-canvas">
                        <rect width="1440" height="1024"/>
                    </clipPath>
                </defs>

                <g clipPath="url(#clip-canvas)">
                    {/* Background */}
                    <rect width="1440" height="1024" fill="#790B0B"/>

                    {/* Clickable panels — wrapped in a g for stagger ref */}
                    <g ref={el => panelsRef.current[0] = el}>
                        {panels.map(p => (
                            <Panel key={p.id} {...p} />
                        ))}
                    </g>

                    {/* Left nav panel (non-clickable background shape) */}
                    <g ref={el => panelsRef.current[1] = el}>
                        <path
                            d="M379.5 359.008C305.783 370.962 249.5 434.907 249.5 512C249.5 589.093 305.783 653.037 379.5 664.991V1024H-0.5V0H379.5V359.008Z"
                            fill="#FFE5E4"
                        />
                    </g>

                    {/* Center circle + monogram */}
                    <g ref={el => panelsRef.current[2] = el}>
                        <circle cx="405" cy="512" r="138" fill="#550101"/>
                        <text
                            x="405" y="500"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontFamily="'Slackey', ans-serif"
                            fontSize="52"
                            fontWeight="300"
                            fill="#FFE5E4"
                            letterSpacing="4"
                        >
                            MG
                        </text>
                        <text
                            x="405" y="545"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontFamily="'DM Mono', monospace"
                            fontSize="9"
                            fontWeight="300"
                            fill="#FFE5E4"
                            letterSpacing="3"
                            opacity="0.7"
                        >
                            PORTFOLIO
                        </text>
                    </g>
                </g>
            </svg>

            {/* HTML nav overlay for left panel */}
            <NavLinks />
        </div>
    );
};

/* ─────────────────────────────────────────────
   Init
───────────────────────────────────────────── */
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Home />);
};

window.onload = init;
