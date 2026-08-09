'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Mail, MessageSquare, Briefcase, Newspaper,
  LifeBuoy, Building2, MapPin, Clock, CheckCircle, Send,
  Instagram, Twitter, Linkedin,
} from 'lucide-react';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GoldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center gap-3 justify-center mb-4'>
      <div className='h-px w-10 bg-gold/40' />
      <span className='text-[11px] font-semibold tracking-[0.2em] text-gold uppercase'>{children}</span>
      <div className='h-px w-10 bg-gold/40' />
    </div>
  );
}

const CHANNELS = [
  { icon: <LifeBuoy className='h-5 w-5' />, title: 'Support', desc: 'Account help, technical issues, and how-to questions.', email: 'support@ophelia.com' },
  { icon: <Briefcase className='h-5 w-5' />, title: 'Partnerships', desc: 'Brand collaborations, integrations, and business deals.', email: 'partners@ophelia.com' },
  { icon: <Newspaper className='h-5 w-5' />, title: 'Press', desc: 'Media inquiries, interviews, and brand assets.', email: 'press@ophelia.com' },
  { icon: <Building2 className='h-5 w-5' />, title: 'Careers', desc: 'Questions about open roles and joining the team.', email: 'careers@ophelia.com' },
];

const TOPICS = ['General Inquiry', 'Support', 'Partnerships', 'Press', 'Careers', 'Feedback'];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No backend endpoint yet — acknowledge locally.
    setSent(true);
  };

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const inputBase =
    'w-full bg-white border border-lux-border px-4 py-3 text-[14px] text-lux-black placeholder:text-lux-muted focus:outline-none focus:border-gold transition-colors duration-200';

  return (
    <div className='min-h-screen'>

      {/* ─── HERO ─── */}
      <section className='relative bg-[#09090d] flex items-center overflow-hidden pt-[72px]'>
        <div className='absolute inset-0 pointer-events-none' style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none' style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }} />

        <div className='relative max-w-[1152px] mx-auto px-6 py-28 text-center'>
          <Reveal>
            <div className='inline-flex items-center gap-2 border border-gold/20 text-gold text-[11px] tracking-[0.2em] uppercase px-4 py-2 mb-8'>
              <Sparkles className='h-3 w-3' />
              Get in Touch
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className='font-display text-[48px] md:text-[72px] lg:text-[80px] font-bold text-white leading-[1.05] tracking-tight mb-6'>
              Let's start a<br />
              <span className='text-gold'>conversation.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='text-[17px] md:text-[19px] text-white/55 max-w-2xl mx-auto leading-relaxed'>
              Whether you have a question, a partnership idea, or just want to say hello —
              we'd genuinely love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CHANNELS ─── */}
      <section className='bg-[#f7f5f0] py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>How Can We Help?</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-4'>
              Reach the right team.
            </h2>
            <p className='text-[16px] text-lux-mid text-center max-w-xl mx-auto mb-14'>
              Pick the channel that fits your message — or use the form below and we'll route it for you.
            </p>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {CHANNELS.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <a href={`mailto:${c.email}`} className='group block bg-white border border-lux-border p-6 hover:border-gold/40 hover:shadow-card transition-all duration-300 h-full'>
                  <div className='w-11 h-11 bg-gold/8 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all duration-300'>
                    {c.icon}
                  </div>
                  <h4 className='font-display font-semibold text-lux-black mb-2'>{c.title}</h4>
                  <p className='text-[13px] text-lux-mid leading-relaxed mb-4'>{c.desc}</p>
                  <span className='inline-flex items-center gap-2 text-[12px] font-semibold text-gold'>
                    <Mail className='h-3.5 w-3.5' /> {c.email}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section className='bg-white py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 items-start'>

            {/* Form */}
            <Reveal>
              <div className='bg-[#f7f5f0] border border-lux-border p-8 md:p-10'>
                {sent ? (
                  <div className='text-center py-16'>
                    <div className='w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6'>
                      <CheckCircle className='h-8 w-8 text-gold' />
                    </div>
                    <h3 className='font-display text-[28px] font-bold text-lux-black mb-3'>Message sent!</h3>
                    <p className='text-[15px] text-lux-mid max-w-sm mx-auto leading-relaxed mb-8'>
                      Thanks for reaching out, {form.name || 'friend'}. Our team will get back to you
                      within two business days.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', topic: TOPICS[0], message: '' }); }}
                      className='inline-flex items-center gap-2 border border-lux-border text-lux-black px-6 py-3 text-[13px] font-semibold tracking-wide hover:border-gold hover:text-gold transition-all duration-300'
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <div className='flex items-center gap-3 mb-8'>
                      <div className='w-10 h-10 bg-gold/10 flex items-center justify-center text-gold'>
                        <MessageSquare className='h-5 w-5' />
                      </div>
                      <div>
                        <h3 className='font-display text-[22px] font-bold text-lux-black leading-tight'>Send us a message</h3>
                        <p className='text-[12px] text-lux-mid'>We usually reply within 2 business days.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        <div>
                          <label className='block text-[12px] font-semibold tracking-wide text-lux-black uppercase mb-2'>Name</label>
                          <input required type='text' value={form.name} onChange={update('name')} placeholder='Your name' className={inputBase} />
                        </div>
                        <div>
                          <label className='block text-[12px] font-semibold tracking-wide text-lux-black uppercase mb-2'>Email</label>
                          <input required type='email' value={form.email} onChange={update('email')} placeholder='you@example.com' className={inputBase} />
                        </div>
                      </div>
                      <div>
                        <label className='block text-[12px] font-semibold tracking-wide text-lux-black uppercase mb-2'>Topic</label>
                        <select value={form.topic} onChange={update('topic')} className={inputBase}>
                          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className='block text-[12px] font-semibold tracking-wide text-lux-black uppercase mb-2'>Message</label>
                        <textarea required rows={5} value={form.message} onChange={update('message')} placeholder='Tell us how we can help…' className={`${inputBase} resize-none`} />
                      </div>
                      <button type='submit' className='group inline-flex items-center justify-center gap-2 bg-lux-black text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold transition-colors duration-300'>
                        Send Message
                        <Send className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

            {/* Info sidebar */}
            <Reveal delay={150}>
              <div className='flex flex-col gap-8'>
                <div>
                  <GoldLabel>Contact Details</GoldLabel>
                </div>
                {[
                  { icon: <Mail className='h-5 w-5' />, title: 'Email Us', lines: ['hello@ophelia.com', 'support@ophelia.com'] },
                  { icon: <MapPin className='h-5 w-5' />, title: 'Headquarters', lines: ['A remote-first company', 'Serving creatives worldwide'] },
                  { icon: <Clock className='h-5 w-5' />, title: 'Response Time', lines: ['Within 2 business days', 'Monday – Friday'] },
                ].map((item) => (
                  <div key={item.title} className='flex items-start gap-4'>
                    <div className='w-11 h-11 bg-[#f7f5f0] border border-lux-border flex items-center justify-center text-gold flex-shrink-0'>
                      {item.icon}
                    </div>
                    <div>
                      <p className='font-display font-semibold text-lux-black mb-1'>{item.title}</p>
                      {item.lines.map((l) => <p key={l} className='text-[14px] text-lux-mid leading-relaxed'>{l}</p>)}
                    </div>
                  </div>
                ))}

                <div className='border-t border-lux-border pt-8'>
                  <p className='font-display font-semibold text-lux-black mb-4'>Follow along</p>
                  <div className='flex items-center gap-4'>
                    {[
                      { icon: <Instagram className='h-5 w-5' />, label: 'Instagram' },
                      { icon: <Twitter className='h-5 w-5' />, label: 'Twitter / X' },
                      { icon: <Linkedin className='h-5 w-5' />, label: 'LinkedIn' },
                    ].map((s) => (
                      <a key={s.label} href='#' aria-label={s.label} className='w-11 h-11 border border-lux-border flex items-center justify-center text-lux-muted hover:border-gold hover:text-gold transition-all duration-200'>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className='bg-[#f7f5f0] py-28'>
        <div className='max-w-[900px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Quick Answers</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-14'>
              Frequently asked.
            </h2>
          </Reveal>
          <div className='flex flex-col gap-4'>
            {[
              { q: 'How do I get started on Ophelia?', a: 'Create a free account, set up your profile, and start sharing your work or exploring the community right away.' },
              { q: 'I need help with my account. Where do I go?', a: 'Email support@ophelia.com or use the form above with the "Support" topic — our team responds within two business days.' },
              { q: 'How can my brand partner with Ophelia?', a: 'Reach out to partners@ophelia.com with a bit about your brand and what you have in mind. We love collaborating with the right partners.' },
              { q: 'Do you offer press interviews?', a: 'Yes — contact press@ophelia.com or visit our Press page for brand assets, company facts, and media inquiries.' },
            ].map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className='bg-white border border-lux-border p-6 hover:border-gold/40 transition-all duration-300'>
                  <p className='font-display font-semibold text-lux-black mb-2'>{f.q}</p>
                  <p className='text-[14px] text-lux-mid leading-relaxed'>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className='bg-[#09090d] py-24 border-t border-white/[0.06]'>
        <div className='max-w-[1152px] mx-auto px-6 text-center'>
          <Reveal>
            <h2 className='font-display text-[36px] md:text-[48px] font-bold text-white mb-4'>
              Prefer to explore first?
            </h2>
            <p className='text-[16px] text-white/50 mb-10 max-w-lg mx-auto leading-relaxed'>
              Discover the platform, browse work from world-class designers, and see what Ophelia is all about.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <Link href='/' className='group inline-flex items-center gap-2 bg-gold text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold-deep transition-colors duration-300'>
                Explore the Platform
                <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
              </Link>
              <Link href='/about' className='inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:border-gold hover:text-gold transition-all duration-300'>
                About Ophelia
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
