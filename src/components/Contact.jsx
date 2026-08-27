import { useState } from 'react';
import useScrollProgress from '../hooks/useScrollProgress';

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Contact() {
  const [ref, progress, inView] = useScrollProgress();
  const p = inView ? ease(progress) : 0;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ submitting: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });

    try {
      const response = await fetch("https://formsubmit.co/ajax/manojjoshi230611@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success === "true") {
        setStatus({ submitting: false, success: "Message sent! Thank you for contacting me.", error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ submitting: false, success: null, error: data.message || "Failed to send message. Please try again." });
      }
    } catch (err) {
      setStatus({ submitting: false, success: null, error: "Connection error. Please try again later." });
    }
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span
            className="section-tag"
            style={{
              opacity: p === 0 ? 1 : Math.min(p * 5, 1),
              transform: p === 0 ? 'none' : `translateY(${(1 - p) * 30}px)`,
            }}
          >
            04 / Contact
          </span>
          <h2
            className="section-title"
            style={{
              clipPath: p === 0 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`,
            }}
          >
            Let's Work <span className="green">Together</span>
          </h2>
          <p
            className="section-sub"
            style={{
              opacity: p === 0 ? 1 : Math.max(0, (p - 0.1) * 3),
              transform: p === 0 ? 'none' : `translateY(${Math.max(0, (1 - p) * 20)}px)`,
            }}
          >
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to new opportunities and collaborations.
          </p>
          <div
            style={{
              width: p === 0 ? '0px' : `${p * 80}px`,
              height: '2px',
              background: 'var(--green)',
              marginTop: '16px',
            }}
          />
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email',
                value: 'manojjoshi230611@gmail.com',
                isLink: true,
                link: 'mailto:manojjoshi230611@gmail.com',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Location',
                value: 'Champawat,Uttarakhand,India',
                isLink: true,
                link: 'https://maps.app.goo.gl/ApWQiBQMKa3Rwwr2A',
              },
            ].map((card, i) => {
              const cardStart = 0.15 + i * 0.1;
              const cardP = Math.max(0, Math.min(1, (p - cardStart) / 0.25));
              return (
                <div
                  key={i}
                  className="contact-card"
                  style={{
                    transform: p === 0
                      ? 'none'
                      : `translateX(${(1 - cardP) * -100}px) rotate(${(1 - cardP) * -3}deg)`,
                    opacity: p === 0 ? 1 : cardP,
                  }}
                >
                  <div className="contact-card-icon">{card.icon}</div>
                  <span className="contact-card-label">{card.label}</span>
                  {card.isLink ? (
                    <a
                      href={card.link}
                      target={card.label === 'Location' ? '_blank' : undefined}
                      rel={card.label === 'Location' ? 'noopener noreferrer' : undefined}
                      className="contact-card-value"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="contact-card-value">{card.value}</span>
                  )}
                </div>
              );
            })}
            <div
              className="contact-socials"
              style={{
                opacity: p === 0 ? 1 : Math.max(0, (p - 0.35) * 3),
                transform: p === 0 ? 'none' : `translateX(${Math.max(0, (1 - p) * -60)}px)`,
              }}
            >
              {[
                { label: 'GitHub', href: 'https://github.com/MANOJ231121', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manoj-chandra-joshi-22572634b', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { label: 'Twitter', href: 'https://x.com/manoj_2311_', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((social, i) => {
                const sP = Math.max(0, Math.min(1, (p - (0.4 + i * 0.03)) / 0.15));
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    style={{
                      transform: p === 0 ? 'none' : `scale(${sP}) rotate(${(1 - sP) * 90}deg)`,
                      opacity: p === 0 ? 1 : sP,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              {[
                { type: 'text', id: 'name', label: 'Name', placeholder: 'eg:-Manoj joshi', value: formData.name },
                { type: 'email', id: 'email', label: 'Email', placeholder: 'eg:-manojjoshi230611@gmail', value: formData.email },
              ].map((field, i) => {
                const fStart = 0.2 + i * 0.06;
                const fP = Math.max(0, Math.min(1, (p - fStart) / 0.2));
                return (
                  <div
                    key={field.id}
                    className="form-group"
                    style={{
                      clipPath: p === 0 ? 'none' : `inset(${(1 - fP) * 100}% 0 0 0)`,
                      opacity: p === 0 ? 1 : fP,
                    }}
                  >
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={field.value}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="form-group"
              style={{
                clipPath: p === 0 ? 'none' : `inset(0 ${(1 - Math.max(0, Math.min(1, (p - 0.32) / 0.2))) * 100}% 0 0)`,
                opacity: p === 0 ? 1 : Math.max(0, Math.min(1, (p - 0.32) / 0.2)),
              }}
            >
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                required
              />
            </div>
            <div
              className="form-group"
              style={{
                clipPath: p === 0 ? 'none' : `inset(0 ${(1 - Math.max(0, Math.min(1, (p - 0.38) / 0.2))) * 100}% 0 0)`,
                opacity: p === 0 ? 1 : Math.max(0, Math.min(1, (p - 0.38) / 0.2)),
              }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows="6"
                required
              />
            </div>
            {status.success && (
              <div style={{ color: 'var(--green)', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '500' }}>
                {status.success}
              </div>
            )}
            {status.error && (
              <div style={{ color: '#ff4d4d', marginBottom: '16px', fontSize: '0.95rem', fontWeight: '500' }}>
                {status.error}
              </div>
            )}
            <div
              style={{
                opacity: p === 0 ? 1 : Math.max(0, (p - 0.5) * 3),
                transform: p === 0 ? 'none' : `translateY(${Math.max(0, (1 - p) * 40)}px)`,
              }}
            >
              <button type="submit" className="btn btn-primary btn-full" disabled={status.submitting}>
                {status.submitting ? 'Sending...' : 'Send Message'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
            <div
              className="form-glow-line"
              style={{
                width: p === 0 ? '0%' : `${p * 100}%`,
                opacity: p > 0.1 ? 0.6 : 0,
              }}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
