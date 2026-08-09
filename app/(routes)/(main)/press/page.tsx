'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Download, Mail, Newspaper, Award,
  Image as ImageIcon, FileText, Palette, Quote, Calendar,
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

const COVERAGE = [
  { outlet: 'Vogue Business', date: 'June 2026', title: 'How Ophelia is redefining the digital home for fashion creatives.', tag: 'Feature' },
  { outlet: 'TechCrunch', date: 'April 2026', title: 'The portfolio platform betting on the next generation of designers.', tag: 'Profile' },
  { outlet: 'Design Week', date: 'March 2026', title: 'Ophelia bridges the gap between fashion talent and opportunity.', tag: 'Interview' },
  { outlet: 'The Business of Fashion', date: 'February 2026', title: 'A new marketplace where creativity meets career growth.', tag: 'Analysis' },
];

const PRESS_KIT = [
  { icon: <ImageIcon className='h-5 w-5' />, title: 'Logo Pack', desc: 'Primary, monochrome, and icon marks in SVG & PNG.' },
  { icon: <Palette className='h-5 w-5' />, title: 'Brand Guidelines', desc: 'Colors, typography, and usage rules in one PDF.' },
  { icon: <ImageIcon className='h-5 w-5' />, title: 'Product Screenshots', desc: 'High-resolution imagery of the platform in action.' },
  { icon: <FileText className='h-5 w-5' />, title: 'Company Fact Sheet', desc: 'Key facts, figures, and leadership bios.' },
];

const MILESTONES = [
  { year: '2023', text: 'Ophelia is founded with a mission to unify the fashion creative ecosystem.' },
  { year: '2024', text: 'Platform development begins — portfolios, learning, jobs, and blog tools built from scratch.' },
  { year: '2025', text: 'Public launch with a complete suite of tools for designers, agencies, and educators.' },
  { year: '2026', text: 'Global expansion, reaching creatives across every continent.' },
];

export default function PressPage() {
  return (
    <div className='min-h-screen'>

      {/* ─── HERO ─── */}
      <section className='relative bg-[#09090d] flex items-center overflow-hidden pt-[72px]'>
        <div className='absolute inset-0 pointer-events-none' style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,169,110,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none' style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)' }} />

        <div className='relative max-w-[1152px] mx-auto px-6 py-28 text-center'>
          <Reveal>
            <div className='inline-flex items-center gap-2 border border-gold/20 text-gold text-[11px] tracking-[0.2em] uppercase px-4 py-2 mb-8'>
              <Newspaper className='h-3 w-3' />
              Press & Media
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className='font-display text-[48px] md:text-[72px] lg:text-[80px] font-bold text-white leading-[1.05] tracking-tight mb-6'>
              The Ophelia<br />
              <span className='text-gold'>newsroom.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className='text-[17px] md:text-[19px] text-white/55 max-w-2xl mx-auto leading-relaxed mb-10'>
              Everything you need to tell the Ophelia story — brand assets, company facts,
              recent coverage, and a direct line to our media team.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <a href='#press-kit' className='group inline-flex items-center gap-2 bg-gold text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold-deep transition-colors duration-300'>
                Download Press Kit
                <Download className='h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5' />
              </a>
              <a href='mailto:press@ophelia.com' className='inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:border-gold hover:text-gold transition-all duration-300'>
                <Mail className='h-4 w-4' />
                Contact Media Team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── AT A GLANCE ─── */}
      <section className='bg-[#f7f5f0] py-20'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <p className='text-center text-[13px] font-semibold tracking-[0.2em] text-gold/70 uppercase mb-12'>Ophelia at a glance</p>
          </Reveal>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              { value: '2023', label: 'Founded' },
              { value: 'Global', label: 'Reach' },
              { value: 'Remote', label: 'Team' },
              { value: 'Fashion', label: 'Focus' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className='text-center'>
                  <p className='font-display text-[36px] md:text-[44px] font-bold text-lux-black leading-none'>{s.value}</p>
                  <p className='text-[12px] text-lux-mid mt-2 tracking-wide uppercase'>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <section className='bg-white py-28'>
        <div className='max-w-[900px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Company Overview</GoldLabel>
            <h2 className='font-display text-[36px] md:text-[44px] font-bold text-lux-black text-center leading-tight mb-8'>
              About Ophelia.
            </h2>
            <div className='space-y-5 text-[16px] text-lux-mid leading-relaxed text-center'>
              <p>
                Ophelia is a global platform where fashion designers, photographers, stylists,
                agencies, brands, and creative professionals showcase their work, learn new skills,
                build careers, and connect with opportunities.
              </p>
              <p>
                Built to solve a real problem — too much talent with too little visibility — Ophelia
                combines a portfolio gallery, an integrated learning platform, a job board, a blog,
                talent discovery, and advertising into one elegant ecosystem.
              </p>
              <p className='text-lux-black font-medium'>
                Our mission is to create the world's most accessible platform for fashion creativity,
                education, collaboration, and professional growth.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRESS KIT ─── */}
      <section id='press-kit' className='bg-[#09090d] py-28 scroll-mt-[72px]'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <div className='flex items-center gap-3 justify-center mb-4'>
              <div className='h-px w-10 bg-gold/40' />
              <span className='text-[11px] font-semibold tracking-[0.2em] text-gold uppercase'>Brand Assets</span>
              <div className='h-px w-10 bg-gold/40' />
            </div>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-white text-center leading-tight mb-4'>
              Download the press kit.
            </h2>
            <p className='text-[16px] text-white/50 text-center max-w-xl mx-auto mb-14'>
              Please use our official assets when featuring Ophelia. For anything you can't find here,
              our media team is happy to help.
            </p>
          </Reveal>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {PRESS_KIT.map((k, i) => (
              <Reveal key={k.title} delay={i * 70}>
                <div className='group border border-white/[0.07] p-6 hover:border-gold/30 hover:bg-white/[0.02] transition-all duration-300 h-full flex flex-col'>
                  <div className='w-11 h-11 rounded bg-gold/10 flex items-center justify-center text-gold mb-4'>
                    {k.icon}
                  </div>
                  <h4 className='font-display font-semibold text-white mb-2'>{k.title}</h4>
                  <p className='text-[13px] text-white/50 leading-relaxed flex-1 mb-5'>{k.desc}</p>
                  <a href='#' className='inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide text-gold group-hover:gap-3 transition-all duration-300'>
                    <Download className='h-3.5 w-3.5' /> Download
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IN THE PRESS ─── */}
      <section className='bg-[#f7f5f0] py-28'>
        <div className='max-w-[1152px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>In the Press</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-14'>
              Recent coverage.
            </h2>
          </Reveal>
          <div className='flex flex-col gap-3'>
            {COVERAGE.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <a href='#' className='group flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-lux-border p-6 hover:border-gold/40 hover:shadow-card transition-all duration-300'>
                  <div className='sm:w-48 flex-shrink-0'>
                    <p className='font-display font-semibold text-lux-black'>{c.outlet}</p>
                    <p className='flex items-center gap-1.5 text-[12px] text-lux-muted mt-1'><Calendar className='h-3 w-3' />{c.date}</p>
                  </div>
                  <p className='flex-1 text-[15px] text-lux-mid group-hover:text-lux-black transition-colors duration-300'>{c.title}</p>
                  <div className='flex items-center gap-3 flex-shrink-0'>
                    <span className='text-[11px] font-semibold tracking-wide text-gold uppercase border border-gold/30 px-3 py-1'>{c.tag}</span>
                    <ArrowRight className='h-4 w-4 text-lux-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-300' />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MILESTONES ─── */}
      <section className='bg-white py-28'>
        <div className='max-w-[900px] mx-auto px-6'>
          <Reveal>
            <GoldLabel>Our Journey</GoldLabel>
            <h2 className='font-display text-[42px] md:text-[52px] font-bold text-lux-black text-center leading-tight mb-14'>
              Key milestones.
            </h2>
          </Reveal>
          <div className='relative'>
            <div className='absolute left-5 top-0 bottom-0 w-px bg-gold/20' />
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <div className='flex items-start gap-6 mb-8 last:mb-0'>
                  <div className='relative flex-shrink-0'>
                    <div className='w-10 h-10 rounded-full bg-lux-black border-2 border-gold flex items-center justify-center'>
                      <span className='text-gold text-[10px] font-bold'>{m.year}</span>
                    </div>
                  </div>
                  <p className='text-[15px] text-lux-mid leading-relaxed pt-2.5'>{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AWARD / QUOTE ─── */}
      <section className='bg-[#09090d] py-28'>
        <div className='max-w-[900px] mx-auto px-6 text-center'>
          <Reveal>
            <Quote className='h-10 w-10 text-gold/30 mx-auto mb-6' />
            <p className='font-display text-[26px] md:text-[34px] font-bold text-white leading-snug mb-8'>
              "Ophelia represents a rare thing in tech — a platform built with genuine
              respect for the creative community it serves."
            </p>
            <div className='flex items-center justify-center gap-2 text-gold'>
              <Award className='h-4 w-4' />
              <span className='text-[13px] tracking-wide uppercase'>Design Week, 2026</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── MEDIA CONTACT CTA ─── */}
      <section className='bg-[#f7f5f0] py-24 border-t border-lux-border'>
        <div className='max-w-[1152px] mx-auto px-6 text-center'>
          <Reveal>
            <GoldLabel>Media Inquiries</GoldLabel>
            <h2 className='font-display text-[36px] md:text-[44px] font-bold text-lux-black mb-4'>
              Working on a story?
            </h2>
            <p className='text-[15px] text-lux-mid mb-10 max-w-lg mx-auto leading-relaxed'>
              Our media team responds to press inquiries within two business days.
              Reach out for interviews, quotes, data, or additional assets.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <a href='mailto:press@ophelia.com' className='group inline-flex items-center gap-2 bg-lux-black text-white px-8 py-4 text-[13px] font-semibold tracking-wide hover:bg-gold transition-colors duration-300'>
                <Mail className='h-4 w-4' />
                press@ophelia.com
              </a>
              <Link href='/contact' className='inline-flex items-center gap-2 border border-lux-border text-lux-black px-8 py-4 text-[13px] font-semibold tracking-wide hover:border-gold hover:text-gold transition-all duration-300'>
                General Contact
                <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
