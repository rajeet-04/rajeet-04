import emailjs from '@emailjs/browser';

export interface ContactInput { name: string; email: string; subject: string; message: string; website: string; }
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = input.email.trim() ? 'Enter a valid email address' : 'Email is required';
  if (!input.subject.trim()) errors.subject = 'Subject is required';
  if (!input.message.trim()) errors.message = 'Message is required';
  return errors;
}

export function mailtoFor(input: ContactInput) {
  const subject = encodeURIComponent(input.subject.trim());
  const body = encodeURIComponent(`From: ${input.name.trim()} (${input.email.trim()})\n\n${input.message.trim()}`);
  return `mailto:rajeetash@hotmail.com?subject=${subject}&body=${body}`;
}

export async function submitContact(input: ContactInput): Promise<'sent' | 'fallback'> {
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!service || !template || !publicKey) return 'fallback';
  await emailjs.send(service, template, input as unknown as Record<string, unknown>, publicKey);
  return 'sent';
}
