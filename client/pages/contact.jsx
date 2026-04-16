const helper = require('../utils/helper.js');
const React = require('react');
const { useState } = React;
const { createRoot } = require('react-dom/client');

/* ─────────────────────────────────────────────
   Component: PageHeader
───────────────────────────────────────────── */
const PageHeader = () => (
    <header className="page-header">
        <a className="logo-link" href="/">Meakalia Gilman</a>
        <nav>
            <a href="/about">About</a>
            <a href="/work">Work</a>
            <a href="/contact" className="active">Contact</a>
        </nav>
    </header>
);

/* ─────────────────────────────────────────────
   Component: ContactForm
───────────────────────────────────────────── */
const ContactForm = () => {
    const [fields, setFields] = useState({ name: '', email: '', company: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
    const [charCount, setCharCount] = useState(0);

    const MAX_CHARS = 1000;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
        if (name === 'message') setCharCount(value.length);
    };

    const handleSubmit = async () => {
        if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
            setStatus('error');
            return;
        }
        setStatus('sending');
        const result = await helper.sendPost('/api/contact', fields);
        if (result.error) {
            setStatus('error');
        } else {
            setStatus('sent');
        }
    };

    if (status === 'sent') {
        return (
            <div className="form-success">
                <div className="success-mark">✓</div>
                <h2 className="success-heading">Message received.</h2>
                <p className="success-sub">I will get back to you as soon as I can.</p>
                <button
                    className="success-reset"
                    onClick={() => { setFields({ name: '', email: '', company: '', message: '' }); setStatus('idle'); setCharCount(0); }}
                >
                    ← Send another
                </button>
            </div>
        );
    }

    return (
        <div className="contact-form">
            <div className="form-row form-row--half">
                <div className="field-group">
                    <label className="field-label" htmlFor="name">Name <span className="required">*</span></label>
                    <input
                        id="name"
                        className="field-input"
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        autoComplete="name"
                    />
                </div>
                <div className="field-group">
                    <label className="field-label" htmlFor="email">Email <span className="required">*</span></label>
                    <input
                        id="email"
                        className="field-input"
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        autoComplete="email"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="field-group">
                    <label className="field-label" htmlFor="company">Company / Studio <span className="optional">(optional)</span></label>
                    <input
                        id="company"
                        className="field-input"
                        type="text"
                        name="company"
                        value={fields.company}
                        onChange={handleChange}
                        placeholder="Where are you writing from?"
                        autoComplete="organization"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="field-group field-group--full">
                    <label className="field-label" htmlFor="message">
                        Message <span className="required">*</span>
                        <span className="char-count">{charCount} / {MAX_CHARS}</span>
                    </label>
                    <textarea
                        id="message"
                        className="field-input field-textarea"
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                        placeholder="Tell me about the role, project, or opportunity. What are you working on?"
                        maxLength={MAX_CHARS}
                        rows={8}
                    />
                </div>
            </div>

            {status === 'error' && (
                <p className="form-error">
                    {!fields.name.trim() || !fields.email.trim() || !fields.message.trim()
                        ? 'Please fill in the required fields.'
                        : 'Something went wrong — please try again.'}
                </p>
            )}

            <div className="form-footer">
                <span className="form-note">I read every message personally.</span>
                <button
                    className={`submit-btn ${status === 'sending' ? 'submit-btn--sending' : ''}`}
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? (
                        <span className="sending-dots">
                            <span className="dot"/><span className="dot"/><span className="dot"/>
                        </span>
                    ) : (
                        'Send message ↗'
                    )}
                </button>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Component: Contact (main)
───────────────────────────────────────────── */
const Contact = () => (
    <div className="contact-page">
        <PageHeader />
        <main className="contact-main">
            <div className="contact-intro">
                <div className="contact-label">contact</div>
                <h1 className="contact-heading">
                    Let's work<br /><em>together.</em>
                </h1>
                <p className="contact-sub">
                    Open to full-time roles, internships, and collaborations in
                    UI/UX, front-end development, and interactive media.
                </p>
                <div className="contact-links">
                    <a
                        className="contact-link"
                        href="https://github.com/meakaliaG"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub ↗
                    </a>
                    <a
                        className="contact-link"
                        href="www.linkedin.com/in/meakalia-gilman-28837b2bb"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>

            <div className="contact-form-wrapper">
                <ContactForm />
            </div>
        </main>
    </div>
);

/* ── Init ── */
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Contact />);
};

window.onload = init;
