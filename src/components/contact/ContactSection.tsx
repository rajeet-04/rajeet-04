import { FormEvent, useState } from 'react';
import { identity } from '../../content/identity';
import { mailtoFor, submitContact, validateContact, type ContactInput } from '../../lib/contact';

const initial: ContactInput = { name: '', email: '', subject: '', message: '', website: '' };

export function ContactSection() {
  const [input, setInput] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  const update = (field: keyof ContactInput, value: string) => setInput((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const next = validateContact(input);
    if (input.website || Object.keys(next).length) { setErrors(next); return; }
    setErrors({}); setStatus('Sending…');
    try { const result = await submitContact(input); if (result === 'fallback') { setFallback(mailtoFor(input)); setStatus('Email delivery is not configured here.'); } else setStatus('Message sent. Thank you.'); } catch { setFallback(mailtoFor(input)); setStatus('Delivery failed. You can send the message directly by email.'); }
  };
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <div className="section-heading"><div><p className="eyebrow">Contact</p><h2 id="contact-title">Have a thoughtful problem?</h2></div><div><a href={`mailto:${identity.email}`}>{identity.email}</a><br /><a href={identity.linkedin}>LinkedIn ↗</a></div></div>
    <form onSubmit={submit} noValidate><div className="form-grid"><label>Name<input value={input.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span id="name-error" className="form-error">{errors.name}</span>}</label><label>Email<input type="email" value={input.email} onChange={(event) => update('email', event.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <span className="form-error">{errors.email}</span>}</label><label>Subject<input value={input.subject} onChange={(event) => update('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} />{errors.subject && <span className="form-error">{errors.subject}</span>}</label><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} value={input.website} onChange={(event) => update('website', event.target.value)} /></label></div><label>Message<textarea rows={6} value={input.message} onChange={(event) => update('message', event.target.value)} aria-invalid={Boolean(errors.message)} />{errors.message && <span className="form-error">{errors.message}</span>}</label><div className="form-submit"><button className="button button--solid" type="submit">Send message</button><span role="status">{status}</span>{fallback && <a href={fallback}>Open email fallback ↗</a>}</div></form>
  </section>;
}
