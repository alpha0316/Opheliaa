'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Heart, Globe2, TrendingUp, Zap, Users,
  Palette, Code2, Megaphone, Headphones, PenTool, BarChart3,
  MapPin, Clock, Coffee, GraduationCap, Plane, HeartPulse, CheckCircle,
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

const OPENINGS = [
  { title: 'Senior Product Designer', dept: 'Design', type: 'Full-time', location: 'Remote', icon: <PenTool className='h-5 w-5' /> },
  { title: 'Full-Stack Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote', icon: <Code2 className='h-5 w-5' /> },
  { title: 'Fashion Content Curator', dept: 'Content', type: 'Full-time', location: 'Accra / Remote', icon: <Palette className='h-5 w-5' /> },
  { title: 'Growth Marketing Manager', dept: 'Marketing', type: 'Full-time', location: 'Remote', icon: <Megaphone className='h-5 w-5' /> },
  { title: 'Community Support Specialist', dept: 'Community', type: 'Full-time', location: 'Remote', icon: <Headphones className='h-5 w-5' /> },
  { title: 'Data Analyst', dept: 'Product', type: 'Contract', location: 'Remote', icon: <BarChart3 className='h-5 w-5' /> },
];

const BENEFITS = [
  { icon: <Globe2 className='h-5 w-5' />, title: 'Remote-First', desc: 'Work from anywhere in the world. We hire for talent, not location.' },
  { icon: <Plane className='h-5 w-5' />, title: 'Flexible Time Off', desc: 'Take the time you need to rest, recharge, and stay inspired.' },
  { icon: <HeartPulse className='h-5 w-5' />, title: 'Health & Wellness', desc: 'Comprehensive health coverage and wellness stipends for your wellbeing.' },
  { icon: <GraduationCap className='h-5 w-5' />, title: 'Learning Budget', desc: 'Annual budget for courses, conferences, and books to grow your craft.' },
  { icon: <Coffee className='h-5 w-5' />, title: 'Home Office Setup', desc: 'A stipend to build a workspace where your best work happens.' },
  { icon: <TrendingUp className='h-5 w-5' />, title: 'Equity & Growth', desc: 'Share in the success you help build, with real paths to advance.' },
];

const VALUES = [
  { icon: <Palette className='h-5 w-5' />, title: 'Creativity First', desc: 'We believe great ideas can come from anyone, anywhere.' },
  { icon: <Heart className='h-5 w-5' />, title: 'People Matter', desc: 'We build for our community and treat each other with care.' },
  { icon: <Zap className='h-5 w-5' />, title: 'Move With Purpose', desc: 'We ship thoughtfully, iterate quickly, and learn constantly.' },
  { icon: <Users className='h-5 w-5' />, title: 'Own It Together', desc: 'We take ownership, share credit, and win as one team.' },
];

export default function CareersPage() {
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
              Careers at Ophelia
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className='font-display text-[48px] md:text-[72px] lg:text-[80px] font-bold text-white leading-[1.05] tracking-tight mb-6'>
              Build the future of<br />
              <span className='text-gold'>fashion creativity.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='text-[17px] md:text-[19px] text-white/55 max-w-2xl mx-auto leading-relaxed mb-10'>
              We're a small, passionate team on a mission to empower millions of creatives.
              Join us in shaping a platform that designers, photographers, educators, and
              brands rely on every day.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <a href='#openings' className='group inline-flex items-center gap-2 bg-gold text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold-deep transition-colors duration-300'>
                View Open Roles
                <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
              </a>
              <Link href='/about' className='inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:border-gold hover:text-gold transition-all duration-300'>
                Learn About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className='bg-[#f7f5f0] py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Life at Ophelia</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-4'>
              How we work together.
            </h2>
            <p className='text-[16px] text-lux-mid text-center max-w-xl mx-auto mb-14'>
              Our values aren't words on a wall — they guide how we hire, build, and treat each other every day.
            </p>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className='group bg-white border border-lux-border p-6 hover:border-gold/40 hover:shadow-card transition-all duration-300 h-full'>
                  <div className='w-11 h-11 bg-gold/8 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-white transition-all duration-300'>
                    {v.icon}
                  </div>
                  <h4 className='font-display font-semibold text-lux-black mb-2'>{v.title}</h4>
                  <p className='text-[13px] text-lux-mid leading-relaxed'>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className='bg-white py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Perks & Benefits</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-14'>
              We take care of our people.
            </h2>
          </Reveal>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className='flex items-start gap-5 p-6 bg-[#f7f5f0] border border-lux-border hover:border-gold/40 hover:shadow-card transition-all duration-300 h-full'>
                  <div className='w-10 h-10 flex items-center justify-center bg-gold/8 text-gold flex-shrink-0'>
                    {b.icon}
                  </div>
                  <div>
                    <p className='font-display font-semibold text-lux-black mb-1'>{b.title}</p>
                    <p className='text-[13px] text-lux-mid leading-relaxed'>{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPEN ROLES ─── */}
      <section id='openings' className='bg-[#f7f5f0] py-28 scroll-mt-[72px]'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Open Positions</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-4'>
              Find your role.
            </h2>
            <p className='text-[16px] text-lux-mid text-center max-w-xl mx-auto mb-14'>
              Don't see the perfect fit? We're always looking for exceptional people —
              reach out and tell us how you'd make Ophelia better.
            </p>
          </Reveal>
          <div className='flex flex-col gap-3'>
            {OPENINGS.map((role, i) => (
              <Reveal key={role.title} delay={i * 50}>
                <div className='group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-lux-border p-6 hover:border-gold/40 hover:shadow-card transition-all duration-300'>
                  <div className='w-11 h-11 bg-gold/8 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-all duration-300'>
                    {role.icon}
                  </div>
                  <div className='flex-1'>
                    <p className='font-display font-semibold text-lux-black text-[17px]'>{role.title}</p>
                    <div className='flex flex-wrap items-center gap-4 mt-1.5 text-[12px] text-lux-mid'>
                      <span className='flex items-center gap-1.5'><Sparkles className='h-3 w-3 text-gold' />{role.dept}</span>
                      <span className='flex items-center gap-1.5'><Clock className='h-3 w-3 text-gold' />{role.type}</span>
                      <span className='flex items-center gap-1.5'><MapPin className='h-3 w-3 text-gold' />{role.location}</span>
                    </div>
                  </div>
                  <Link
                    href='/contact'
                    className='inline-flex items-center gap-2 border border-lux-border text-lux-black px-6 py-3 text-[12px] font-semibold tracking-wide group-hover:border-gold group-hover:text-gold transition-all duration-300 whitespace-nowrap'
                  >
                    Apply Now
                    <ArrowRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5' />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIRING PROCESS ─── */}
      <section className='bg-[#09090d] py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <div className='flex items-center gap-3 justify-center mb-4'>
              <div className='h-px w-10 bg-gold/40' />
              <span className='text-[11px] font-semibold tracking-[0.2em] text-gold uppercase'>Our Process</span>
              <div className='h-px w-10 bg-gold/40' />
            </div>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-white text-center leading-tight mb-14'>
              What to expect.
            </h2>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {[
              { step: '01', title: 'Application', desc: 'Send us your resume and portfolio. We read every single one.' },
              { step: '02', title: 'Intro Call', desc: 'A relaxed conversation to get to know you and your ambitions.' },
              { step: '03', title: 'Deep Dive', desc: 'A practical session focused on real problems you\'d help solve.' },
              { step: '04', title: 'Welcome', desc: 'An offer, a warm onboarding, and your first day making an impact.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className='border border-white/[0.07] p-7 hover:border-gold/30 transition-all duration-300 h-full'>
                  <p className='font-display text-[40px] font-bold text-gold/30 leading-none mb-4'>{s.step}</p>
                  <p className='font-display font-semibold text-white mb-2'>{s.title}</p>
                  <p className='text-[13px] text-white/50 leading-relaxed'>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EQUAL OPPORTUNITY / CTA ─── */}
      <section className='relative bg-[#f7f5f0] py-24 overflow-hidden border-t border-lux-border'>
        <div className='relative max-w-[1152px] mx-auto px-6 text-center'>
          <Reveal>
            <GoldLabel>Everyone Belongs</GoldLabel>
            <h2 className='font-display text-[36px] md:text-[44px] font-bold text-lux-black mb-5 max-w-2xl mx-auto leading-tight'>
              We're building a team as diverse as the community we serve.
            </h2>
            <p className='text-[15px] text-lux-mid mb-8 max-w-lg mx-auto leading-relaxed'>
              Ophelia is an equal opportunity employer. We celebrate different backgrounds,
              perspectives, and experiences — because great design comes from great diversity.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10'>
              {['Inclusive by design', 'Merit-based hiring', 'Accessible workplace'].map((t) => (
                <span key={t} className='flex items-center gap-2 text-[13px] text-lux-black font-medium'>
                  <CheckCircle className='h-4 w-4 text-gold' /> {t}
                </span>
              ))}
            </div>
            <Link href='/contact' className='group inline-flex items-center gap-2 bg-lux-black text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold transition-colors duration-300'>
              Get in Touch
              <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
