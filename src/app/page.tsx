'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─── Fade-up hook ─── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Count-up animation ─── */
function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#introduction', label: 'Introduction' },
    { href: '#related-work', label: 'Related Work' },
    { href: '#benchmark', label: 'Benchmark' },
    { href: '#taxonomy', label: 'Tasks' },
    { href: '#experiments', label: 'Experiments' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-tight text-indigo-600">
          H2HMem
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-500 hover:text-indigo-500 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-indigo-50/80 to-transparent rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-sky-50/60 to-transparent rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            EMNLP 2026 Submission
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent leading-[1.1] mb-6">
            H2HMem
          </h1>
        </FadeUp>

        <FadeUp delay={200}>
          <p className="text-xl sm:text-2xl lg:text-[28px] font-light text-gray-500 leading-relaxed max-w-3xl mx-auto mb-4">
            A Multimodal Memory Benchmark for Agents
            <br />
            in Human&ndash;Human Interactions
          </p>
        </FadeUp>

        <FadeUp delay={300}>
          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-10">
            Evaluating memory recall, reasoning, and application across dyadic and multi-party
            multimodal conversations.
          </p>
        </FadeUp>

        <FadeUp delay={400}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/varib1/H2HMEM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 text-blue-700 font-semibold transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Code
            </a>
            <a
              href="https://github.com/varib1/H2HMEM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 hover:border-orange-300 text-orange-700 font-semibold transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/>
                <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"/>
              </svg>
              Dataset
            </a>
            <a
              href="https://h2hmemleaderboard1.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 text-emerald-700 font-semibold transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 6 9 6 9zm12 0h1.5a2.5 2.5 0 000-5C17 4 18 9 18 9zm-9 0V4l6 5"/>
                <path d="M12 15l-3 9h6l-3-9z"/>
                <path d="M6 9c0 3 2.5 6 6 6s6-3 6-6"/>
              </svg>
              Leaderboard
            </a>
          </div>
        </FadeUp>

        {/* Comparison Figure */}
        <FadeUp delay={500}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="figure-container">
              <Image
                src="/figures/comparison_p0.png"
                alt="Comparison between Human-Assistant Interaction and Human-Human Interaction"
                width={3232}
                height={1701}
                className="w-full h-auto"
                priority
              />
              <p className="text-center text-sm text-gray-400 mt-3">
                Figure 1: Comparison between Human&ndash;Assistant Interaction and Human&ndash;Human Interaction.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Abstract ─── */
function Abstract() {
  return (
    <section id="abstract" className="py-20 px-6 section-alt">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-8">Abstract</h2>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-gray-500 leading-relaxed text-base space-y-4 shadow-sm">
            <p>
              Large language model agents are increasingly deployed in human&ndash;human interaction settings, such
              as meeting assistants and clinical documentation systems, where they must observe conversations
              and retain information for downstream queries. Unlike traditional human&ndash;assistant settings, these
              environments are inherently <span className="text-sky-600 font-semibold">multimodal</span>, involve
              complex discourse phenomena such as{' '}
              <span className="text-indigo-600 font-semibold">anaphora and deixis</span>, and contain{' '}
              <span className="text-amber-600 font-semibold">asynchronous or conflicting information</span> from
              multiple participants.
            </p>
            <p>
              However, existing memory benchmarks largely focus on single-user, text-only interactions, failing
              to capture these challenges. To address this gap, we introduce <strong className="text-gray-700">H2HMem</strong>,
              a Human-to-Human Multimodal Memory Benchmark for evaluating memory capabilities in complex
              human&ndash;human interactions. H2HMem includes both <span className="text-indigo-500">dyadic</span> and{' '}
              <span className="text-indigo-500">multi-party</span> conversations with multimodal information streams,
              and evaluates agents along three dimensions: <span className="text-emerald-600 font-semibold">memory recall</span>,{' '}
              <span className="text-amber-600 font-semibold">reasoning</span>, and <span className="text-rose-500 font-semibold">application</span>.
            </p>
            <p>
              Experiments with advanced agents reveal substantial limitations in constructing, retaining, and
              utilizing memories across modalities, participants, and sessions, highlighting substantial room
              for improvement in next-generation LLM agents.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Introduction ─── */
function Introduction() {
  const challenges = [
    {
      title: 'Multimodal Nature',
      desc: 'Human\u2013human conversations are inherently multimodal, naturally interleaving text with visual content such as shared photographs and screen captures.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-sky-500">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      accent: 'border-sky-200 bg-sky-50',
      iconBg: 'bg-sky-100',
    },
    {
      title: 'Complex Discourse',
      desc: 'Natural language exhibits complex phenomena\u2014such as anaphora and discourse deixis\u2014that require agents to resolve references against an evolving conversational memory.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-indigo-500">
          <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      accent: 'border-indigo-200 bg-indigo-50',
      iconBg: 'bg-indigo-100',
    },
    {
      title: 'Multiple Participants',
      desc: 'Interactions often involve multiple participants who jointly shape the dialogue, contributing information asynchronously and at times presenting conflicting perspectives.',
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-amber-500">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      accent: 'border-amber-200 bg-amber-50',
      iconBg: 'bg-amber-100',
    },
  ];

  return (
    <section id="introduction" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Introduction</h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            LLM agents are increasingly deployed as observers in human&ndash;human interaction settings. These emerging
            deployment environments introduce three fundamental challenges.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {challenges.map((c, i) => (
            <FadeUp key={i} delay={i * 120}>
              <div className={`rounded-2xl border ${c.accent} p-6 shadow-sm h-full`}>
                <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center mb-4`}>
                  {c.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Unlike traditional human&ndash;assistant settings, where a single user directly interacts with an agent,
              human&ndash;human scenarios require agents to <strong className="text-gray-600">passively capture critical
              conversational information</strong> for subsequent querying. This capability underpins growing real-world
              applications, including <span className="text-indigo-600 font-medium">clinical documentation systems</span> that
              generate patient-centered notes from clinician&ndash;patient dialogues,{' '}
              <span className="text-sky-600 font-medium">AI-powered medical board meeting assistants</span> processing
              multimodal inputs, and <span className="text-amber-600 font-medium">general meeting summarization systems</span>.
              Robust multimodal memory is therefore essential.
            </p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-6">
            <p className="text-gray-500 leading-relaxed text-[15px]">
              However, existing memory benchmarks largely focus on <strong className="text-gray-600">single-user,
              text-only human&ndash;assistant interactions</strong>. Although recent efforts have begun exploring
              human&ndash;human conversations, they remain limited in scope: LoCoMo incorporates vision but is restricted
              to dyadic interactions and lacks a comprehensive evaluation framework, whereas others support multi-party
              settings but remain exclusively text-based. <strong className="text-indigo-600">No existing benchmark
              adequately captures the full spectrum of human&ndash;human interactions</strong>&mdash;spanning both dyadic
              and multi-party settings&mdash;while enabling multimodal memory evaluation.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Benchmark Table Icons (module-level) ─── */
function CheckIcon() {
  return <span className="text-emerald-500 font-bold text-sm">&#10003;</span>;
}
function CrossIcon() {
  return <span className="text-gray-300 text-sm">&#10005;</span>;
}
function PartialIcon() {
  return <span className="text-amber-400 text-sm font-bold">~</span>;
}

/* ─── Related Work ─── */
function RelatedWork() {
  const areas = [
    {
      title: 'Agents in Human\u2013Human Interactions',
      desc: 'Recent work studies LLM-based agents as observers over continuous conversational streams. Unlike human\u2013assistant scenarios, these settings require persistent interpretation of evolving interactions and maintaining coherence over long temporal horizons. Commercial systems such as Zoom AI Companion already reflect this trend, integrating multimodal meeting content for downstream querying.',
      accent: 'border-l-sky-400',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-500',
    },
    {
      title: 'Memory Mechanisms for LLM Agents',
      desc: 'Existing memory methods fall into three paradigms: (1) extending context windows by incorporating long histories, which incurs high cost and suffers from long-context degradation; (2) retrieval-augmented generation with external memory stores, which mainly supports factual recall; and (3) specialized memory modules with explicit operations such as writing, indexing, and summarization. All are primarily evaluated in human\u2013assistant settings.',
      accent: 'border-l-indigo-400',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-500',
    },
    {
      title: 'Memory Benchmarks',
      desc: 'Existing benchmarks focus on human\u2013assistant settings (PersonaMem, LongMemEval, Mem-Gallery, MemoryAgentBench) or have limited scope in human\u2013human settings: LoCoMo is restricted to dyadic interactions, MSC lacks multimodality, and EverMemBench leaves multimodal aspects underexplored. No benchmark jointly captures multimodality, dyadic & multi-party interaction, and long-horizon memory.',
      accent: 'border-l-amber-400',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
    },
  ];

  const benchmarkComparison = [
    { name: 'LongMemEval', type: 'Human\u2013Assistant', rounds: '5.19', imgs: '\u2013', mm: false, upr: true, crr: false, kr: true, mcr: true, ret: false, tr: true, ttl: true, cd: false, ar: true },
    { name: 'PersonaMem', type: 'Human\u2013Assistant', rounds: '15\u201330', imgs: '\u2013', mm: false, upr: true, crr: false, kr: true, mcr: false, ret: false, tr: true, ttl: false, cd: false, ar: false },
    { name: 'Mem-Gallery', type: 'Human\u2013Assistant', rounds: '16.51', imgs: '4.18', mm: true, upr: true, crr: true, kr: true, mcr: false, ret: false, tr: true, ttl: true, cd: true, ar: true },
    { name: 'MemoryAgentBench', type: 'Human\u2013Assistant', rounds: '9.55', imgs: '\u2013', mm: false, upr: true, crr: false, kr: false, mcr: false, ret: false, tr: true, ttl: true, cd: true, ar: false },
    { name: 'LoCoMo', type: 'Dyadic', rounds: '10.81', imgs: '3.35', mm: true, upr: true, crr: false, kr: false, mcr: false, ret: false, tr: true, ttl: false, cd: false, ar: true },
    { name: 'MSC', type: 'Dyadic', rounds: '8.16', imgs: '\u2013', mm: false, upr: true, crr: false, kr: false, mcr: false, ret: false, tr: false, ttl: false, cd: false, ar: false },
    { name: 'EverMemBench', type: 'Multi-party', rounds: '28.0', imgs: '\u2013', mm: false, upr: true, crr: false, kr: false, mcr: true, ret: false, tr: true, ttl: false, cd: false, ar: false },
  ];

  return (
    <section id="related-work" className="py-20 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Related Work</h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            Three research areas that contextualize H2HMem and highlight the gaps in existing work.
          </p>
        </FadeUp>

        <div className="space-y-5 mb-14">
          {areas.map((a, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm border-l-4 ${a.accent}`}>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{a.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Benchmark Comparison Table */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Benchmark Comparison</h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 font-medium pb-3 pr-3 whitespace-nowrap">Benchmark</th>
                  <th className="text-left text-gray-400 font-medium pb-3 pr-3 whitespace-nowrap">Interaction</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">Avg. Rounds</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">Avg. Imgs</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">MM</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">UPR</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">CRR</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">KR</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">MCR</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">RET</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">TR</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">TTL</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">CD</th>
                  <th className="text-center text-gray-400 font-medium pb-3 px-1 whitespace-nowrap">AR</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkComparison.map((b, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2.5 pr-3 text-gray-500 font-medium whitespace-nowrap">{b.name}</td>
                    <td className="py-2.5 pr-3 text-gray-400 whitespace-nowrap">{b.type}</td>
                    <td className="py-2.5 px-1 text-center text-gray-400">{b.rounds}</td>
                    <td className="py-2.5 px-1 text-center text-gray-400">{b.imgs}</td>
                    <td className="py-2.5 px-1 text-center">{b.mm ? <CheckIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.upr ? <CheckIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.crr ? <CheckIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.kr ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.mcr ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.ret ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.tr ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.ttl ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.cd ? <PartialIcon /> : <CrossIcon />}</td>
                    <td className="py-2.5 px-1 text-center">{b.ar ? <PartialIcon /> : <CrossIcon />}</td>
                  </tr>
                ))}
                {/* H2HMem row - highlighted */}
                <tr className="bg-indigo-50/60">
                  <td className="py-2.5 pr-3 text-indigo-600 font-bold whitespace-nowrap">H2HMem</td>
                  <td className="py-2.5 pr-3 text-indigo-500 font-medium whitespace-nowrap">Dyadic & Multi-party</td>
                  <td className="py-2.5 px-1 text-center text-indigo-500 font-medium">22.91</td>
                  <td className="py-2.5 px-1 text-center text-indigo-500 font-medium">4.21</td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                  <td className="py-2.5 px-1 text-center"><CheckIcon /></td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">
              <span className="text-emerald-500 font-bold">&#10003;</span> Fully covered &nbsp;
              <span className="text-amber-400 font-bold">~</span> Partially covered &nbsp;
              <span className="text-gray-300">&#10005;</span> Not covered &nbsp;|&nbsp;
              MM = Multimodal Information
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Key Contributions ─── */
function Contributions() {
  const items = [
    {
      number: '1',
      title: 'Novel Benchmark',
      description:
        'Introduce H2HMem, a benchmark for evaluating multimodal memory in realistic human\u2013human observer scenarios, covering both dyadic and multi-party interactions.',
      gradient: 'from-indigo-500 to-blue-500',
      border: 'border-indigo-100',
    },
    {
      number: '2',
      title: 'Privacy-Preserving Pipeline',
      description:
        'Construct a large-scale multimodal, multi-session dataset through a privacy-preserving human-in-the-loop pipeline that captures the evolving nature of real-world communication.',
      gradient: 'from-sky-500 to-cyan-500',
      border: 'border-sky-100',
    },
    {
      number: '3',
      title: 'Comprehensive Evaluation',
      description:
        'Propose a comprehensive evaluation taxonomy spanning recall, reasoning, and application, revealing key limitations of current MLLMs in cross-modal memory alignment and structured reasoning.',
      gradient: 'from-amber-500 to-orange-500',
      border: 'border-amber-100',
    },
  ];

  return (
    <section id="contributions" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Key Contributions</h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Three core advances that set H2HMem apart from existing memory benchmarks.
          </p>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 120}>
              <div className={`bg-white rounded-2xl border ${item.border} p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-sm font-bold mb-4 shadow-sm`}>
                  {item.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Benchmark Overview ─── */
function BenchmarkOverview() {
  const stats = [
    { value: 25, label: 'Dialogues', suffix: '', color: 'text-indigo-500' },
    { value: 309, label: 'Sessions', suffix: '', color: 'text-sky-500' },
    { value: 7078, label: 'Dialogue Rounds', suffix: '', color: 'text-cyan-500' },
    { value: 1300, label: 'Images', suffix: '', color: 'text-violet-500' },
    { value: 2236, label: 'QA Pairs', suffix: '', color: 'text-emerald-500' },
    { value: 9, label: 'Task Types', suffix: '', color: 'text-amber-500' },
  ];

  const pipelineStages = [
    {
      stage: 1,
      title: 'Participant Profile Generation',
      desc: 'Define a structured schema for participant profiles including personality, background, and communication style. Conditioned on this schema, employ DeepSeek-V3 to generate structured participant profiles for both dyadic (2 profiles) and multi-party (4\u20136 profiles) dialogues.',
      accent: 'bg-indigo-50 border-indigo-200',
      numBg: 'bg-indigo-500',
    },
    {
      stage: 2,
      title: 'Scenario Construction',
      desc: 'Summarize eleven common conversational topics. Given participant profiles, prompt the LLM to sample topics and generate multiple session-level outlines, each describing a session\u2019s local events. These sessions are temporally ordered, forming a coherent multi-session scenario. The LLM also generates image retrieval keywords for visual content collection.',
      accent: 'bg-sky-50 border-sky-200',
      numBg: 'bg-sky-500',
    },
    {
      stage: 3,
      title: 'Image Collection & Human Refinement',
      desc: 'Retrieve images through online search, supplementing with text-to-image generation and manual creation/editing based on keywords. Six annotators then filter and refine pictures to align images with outlines\u2014checking visual content match, image quality (at least 224\u00d7224px), and topical appropriateness. Approximately 80 person-hours for image refinement.',
      accent: 'bg-cyan-50 border-cyan-200',
      numBg: 'bg-cyan-500',
    },
    {
      stage: 4,
      title: 'Image Captioning & Dialogue Generation',
      desc: 'Dialogues are generated using DeepSeek-V3, conditioned on participant profiles, session outlines, and images. Since DeepSeek-V3 cannot process images directly, detailed captions are generated via GPT-4o. The agent generates dialogues and refers to images using numeric identifiers, which are then replaced with actual images.',
      accent: 'bg-violet-50 border-violet-200',
      numBg: 'bg-violet-500',
    },
    {
      stage: 5,
      title: 'Question-Answer Pair Construction',
      desc: 'Use DeepSeek-V3 to generate a diverse set of questions targeting different memory capabilities (recall, reasoning, application). Visual information is replaced with captions during generation. Generated QA pairs are refined by human annotators to ensure clarity, correctness, and appropriate difficulty. Approximately 40 person-hours for QA validation.',
      accent: 'bg-emerald-50 border-emerald-200',
      numBg: 'bg-emerald-500',
    },
  ];

  return (
    <section id="benchmark" className="py-20 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">H2HMem Benchmark</h2>
          <p className="text-gray-400 mb-12 max-w-3xl">
            A human-in-the-loop generation pipeline for constructing multimodal, multi-session, and
            multi-participant interactions under an online conversational setting.
          </p>
        </FadeUp>

        {/* Stats */}
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                <div className={`text-2xl lg:text-3xl font-bold ${s.color} mb-1`}>
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Pipeline Figure */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Dataset Construction Pipeline</h3>
          <div className="figure-container">
            <Image
              src="/figures/pipeline_p0.png"
              alt="Dataset construction pipeline of H2HMem"
              width={4252}
              height={2126}
              className="w-full h-auto"
            />
            <p className="text-center text-sm text-gray-400 mt-3">
              Figure 2: Dataset construction pipeline of H2HMem.
            </p>
          </div>
        </FadeUp>

        {/* Pipeline Stages Detail */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mt-14 mb-6">Pipeline Stages in Detail</h3>
        </FadeUp>
        <div className="space-y-4">
          {pipelineStages.map((s, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className={`rounded-2xl border p-5 ${s.accent} flex gap-5`}>
                <div className={`w-9 h-9 rounded-lg ${s.numBg} flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5`}>
                  {s.stage}
                </div>
                <div>
                  <h4 className="text-gray-700 font-semibold mb-1.5">{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Online Conversational Setting note */}
        <FadeUp>
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h4 className="text-gray-600 font-semibold text-sm mb-2">Online Conversational Setting</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              H2HMem focuses on online conversational environments, where interactions occur via temporally
              ordered messages, allowing asynchronous participation (as in social media or messaging platforms).
              This setting offers three key advantages: <strong className="text-gray-500">strong ecological validity</strong>,
              <strong className="text-gray-500"> structured information flow</strong>, and
              <strong className="text-gray-500"> support for diverse topics and participants</strong> yielding richer
              conversational dynamics.
            </p>
          </div>
        </FadeUp>

        {/* Dyadic vs Multi-party */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mt-14 mb-8">Interaction Types</h3>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeUp delay={0}>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm border-l-4 border-l-indigo-400">
              <h4 className="text-indigo-600 font-semibold text-lg mb-3">Dyadic Interactions</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>20 dialogues with 2 participants each</p>
                <p>Average 14.2 sessions per dialogue</p>
                <p>Average 18.7 rounds per session</p>
                <p>Longer time horizons, evolving relationships</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={120}>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm border-l-4 border-l-sky-400">
              <h4 className="text-sky-600 font-semibold text-lg mb-3">Multi-Party Interactions</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>5 dialogues with 4&ndash;6 participants each</p>
                <p>Average 5.0 sessions per dialogue</p>
                <p>Average 70.5 rounds per session</p>
                <p>Denser interactions, conflicting perspectives</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── Task Taxonomy ─── */
function TaskTaxonomy() {
  const categories = [
    {
      name: 'Memory Recall',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      dotColor: 'bg-emerald-500',
      tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      description: 'Evaluates whether models can retrieve explicitly presented multimodal information.',
      tasks: [
        { abbr: 'UPR', name: 'Unimodal Precise Recall', desc: 'Retrieve information from a single modality (text or image).' },
        { abbr: 'CRR', name: 'Cross-modal Related Retrieval', desc: 'Retrieve aligned content across modalities (text\u2194image).' },
        { abbr: 'KR', name: 'Knowledge Resolution', desc: 'Retrieve currently correct information after updates across sessions.' },
      ],
    },
    {
      name: 'Memory Reasoning',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      dotColor: 'bg-amber-500',
      tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
      description: 'Evaluates higher-level inference over multimodal information across time and participants.',
      tasks: [
        { abbr: 'TR', name: 'Temporal Reasoning', desc: 'Order events across sessions using timestamps and utterance positions.' },
        { abbr: 'MCR', name: 'Multimodal Causal Reasoning', desc: 'Infer causal relations between textual and visual content across sessions.' },
        { abbr: 'RET', name: 'Reference & Evolution Tracking', desc: 'Resolve references and track entity evolution across sessions and speakers.' },
      ],
    },
    {
      name: 'Memory Application',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      dotColor: 'bg-rose-500',
      tagColor: 'bg-rose-100 text-rose-600 border-rose-200',
      description: 'Evaluates how models apply and update memory during inference.',
      tasks: [
        { abbr: 'TTL', name: 'Test-Time Learning', desc: 'Adapt to new scenarios at inference time using accumulated memory.' },
        { abbr: 'CD', name: 'Conflict Detection', desc: 'Detect whether a new statement contradicts existing memory.' },
        { abbr: 'AR', name: 'Answer Refusal', desc: 'Refuse to answer when information is absent or cannot be inferred.' },
      ],
    },
  ];

  return (
    <section id="taxonomy" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Task Taxonomy</h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            A hierarchical taxonomy of nine task types organized into three categories, providing a
            comprehensive framework for memory evaluation.
          </p>
        </FadeUp>

        {/* Task Taxonomy Figure */}
        <FadeUp>
          <div className="figure-container mb-12">
            <Image
              src="/figures/q_p0.png"
              alt="Task taxonomy with question distribution and examples"
              width={3572}
              height={1361}
              className="w-full h-auto"
            />
            <p className="text-center text-sm text-gray-400 mt-3">
              Figure 3: Question type distribution (a) and definition with examples (b) for each task type.
            </p>
          </div>
        </FadeUp>

        <div className="space-y-8">
          {categories.map((cat, ci) => (
            <FadeUp key={ci} delay={ci * 100}>
              <div className={`bg-white rounded-2xl border ${cat.borderColor} p-6 shadow-sm`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-3 h-3 rounded-full ${cat.dotColor}`} />
                  <h3 className={`text-xl font-bold ${cat.color}`}>{cat.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-5 ml-6">{cat.description}</p>
                <div className="grid md:grid-cols-3 gap-4 ml-6">
                  {cat.tasks.map((task, ti) => (
                    <div key={ti} className={`${cat.bgColor} rounded-xl p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${cat.tagColor}`}>
                          {task.abbr}
                        </span>
                        <span className="text-gray-600 text-sm font-medium">{task.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{task.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experiments ─── */
function Experiments() {
  const findings = [
    {
      title: 'Cross-modal Alignment Remains Challenging',
      desc: 'A consistent gap exists between UPR and CRR. MuRAG drops from 0.6346 to 0.5326 in LLM-as-Judge scores when crossing modalities.',
      number: '01',
      accent: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
    },
    {
      title: 'Weak Distractor Filtering Despite Successful Retrieval',
      desc: 'A large recall\u2013precision gap is observed. A-Mem achieves 0.4215 recall but only 0.2206 precision, indicating difficulty filtering noisy multi-participant information.',
      number: '02',
      accent: 'text-sky-500',
      bg: 'bg-sky-50',
      border: 'border-sky-100',
    },
    {
      title: 'Limited Causal Reasoning & Referential Conventions',
      desc: 'Reasoning tasks (MCR, RET) show the lowest scores. Near-zero BLEU-1 indicates models rarely reproduce precise factual phrasing needed to connect distributed evidence.',
      number: '03',
      accent: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      title: 'Poor Robustness to Conflicting Information',
      desc: 'Conflict Detection remains particularly difficult with near-zero lexical precision and recall, highlighting the inability to resolve contradictions in human\u2013human interactions.',
      number: '04',
      accent: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
  ];

  const errorArchetypes = [
    { type: 'Modal Misalignment', values: [48, 44, 46] },
    { type: 'Speaker-related Errors', values: [37, 35, 32] },
    { type: 'Temporal Confusion', values: [15, 16, 9] },
    { type: 'Other / Hallucination', values: [5, 5, 6] },
  ];

  const methods = ['Full (MM)', 'MuRAG', 'NGM'];

  const setupItems = [
    { label: 'Text-based Methods', items: 'Full Memory (Text), NaiveRAG, A-Mem' },
    { label: 'Multimodal Methods', items: 'Full Memory (MM), MuRAG, NGM' },
    { label: 'Backbone Models', items: 'Qwen2.5-VL (3B & 7B Instruct), GPT-4.1-Nano' },
    { label: 'Evaluation Metric', items: 'LLM-as-Judge (GPT-4o-mini, \u03ba=0.84), plus Precision/Recall/F1/BLEU-1' },
    { label: 'Retrieval', items: 'Dense retriever with default top-K=5' },
  ];

  const efficiencyData = [
    { method: 'Full (Text)', storage: '0.0015', retrieval: '0.16', answer: '17.99' },
    { method: 'NaiveRAG', storage: '0.69', retrieval: '1.37', answer: '10.06' },
    { method: 'A-Mem', storage: '351.08', retrieval: '0.02', answer: '4.57' },
    { method: 'Full (MM)', storage: '0.0009', retrieval: '0.36', answer: '26.09' },
    { method: 'MuRAG', storage: '9.86', retrieval: '1.47', answer: '12.64' },
    { method: 'NGM', storage: '6.53', retrieval: '0.77', answer: '4.33' },
  ];

  return (
    <section id="experiments" className="py-20 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Experiments</h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            Comprehensive evaluation of text-based and multimodal memory methods on H2HMem, revealing
            key bottlenecks and interaction-structure effects.
          </p>
        </FadeUp>

        {/* Experimental Setup */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-5">Experimental Setup</h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-14">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {setupItems.map((s, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-gray-600 font-medium shrink-0 min-w-[140px]">{s.label}:</span>
                  <span className="text-gray-400">{s.items}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Key Findings */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Key Findings</h3>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {findings.map((f, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className={`bg-white rounded-2xl border ${f.border} p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <div className={`text-3xl font-extrabold ${f.accent} mb-3 opacity-30`}>{f.number}</div>
                <h4 className="text-gray-600 font-semibold mb-2">{f.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Dyadic vs Multi-party */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-4">Dyadic vs. Multi-party Impact</h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-14">
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Dyadic dialogues span longer time horizons with more sessions (avg. 14.2 sessions), whereas
              multi-party dialogues contain denser interactions within fewer sessions (avg. 70.5 rounds/session
              and 5.0 sessions). This leads to complementary performance patterns:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-indigo-50/50 rounded-xl p-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong className="text-indigo-600">Consistency-oriented tasks</strong> (KR, CD) are substantially
                  harder in multi-party settings due to contradictory signals from multiple speakers. NaiveRAG&apos;s KR
                  drops from 0.4896 (dyadic) to 0.2500 (multi-party).
                </p>
              </div>
              <div className="bg-sky-50/50 rounded-xl p-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong className="text-sky-600">Context-concentrated tasks</strong> (CRR, TTL) achieve comparable
                  or higher performance in multi-party settings. Parameter scaling alone does not eliminate this gap,
                  indicating current memory mechanisms remain insufficiently robust.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Performance comparison */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">
            LLM-as-Judge Performance (Weighted Average)
          </h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-14 overflow-x-auto">
            <PerformanceChart />
          </div>
        </FadeUp>

        {/* Error Distribution */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Error Archetype Distribution</h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-14 overflow-x-auto">
            <p className="text-gray-400 text-sm mb-4">
              Manual analysis of 100 failed cross-modal and reasoning instances from three multimodal methods,
              categorized into four archetypes.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 font-medium pb-3 pr-4">Error Type</th>
                  {methods.map((m) => (
                    <th key={m} className="text-right text-gray-400 font-medium pb-3 px-4">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {errorArchetypes.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-3 pr-4 text-gray-500">{row.type}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div
                            className="h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                            style={{ width: `${v * 1.4}px` }}
                          />
                          <span className="text-gray-500 w-8 text-right">{v}%</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Efficiency */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Efficiency Trade-offs</h3>
        </FadeUp>
        <FadeUp>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-14 overflow-x-auto">
            <p className="text-gray-400 text-sm mb-4">
              Tracking multimodal human\u2013human interactions imposes substantial computational burdens.
              A clear trade-off exists between storage and inference latency.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-400 font-medium pb-3">Method</th>
                  <th className="text-right text-gray-400 font-medium pb-3 px-4">Storage (s/sess)</th>
                  <th className="text-right text-gray-400 font-medium pb-3 px-4">Retrieval (s/q)</th>
                  <th className="text-right text-gray-400 font-medium pb-3 px-4">Answer (s/q)</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2.5 text-gray-500 font-medium">{row.method}</td>
                    <td className="py-2.5 px-4 text-right text-gray-400">{row.storage}</td>
                    <td className="py-2.5 px-4 text-right text-gray-400">{row.retrieval}</td>
                    <td className="py-2.5 px-4 text-right text-gray-400">{row.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Case Study Figure */}
        <FadeUp>
          <h3 className="text-xl font-semibold text-gray-600 mb-6">Case Studies</h3>
        </FadeUp>
        <FadeUp>
          <div className="figure-container">
            <Image
              src="/figures/case_study_p0.png"
              alt="Case studies of multimodal conversational reasoning"
              width={3572}
              height={1335}
              className="w-full h-auto"
            />
            <p className="text-center text-sm text-gray-400 mt-3">
              Figure 4: Case studies of multimodal conversational reasoning. (a) Identifying ingredients in Lu Zhixing&apos;s recipe. (b) Inferring Lin Chang&apos;an&apos;s conclusion based on a shared menu.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Performance Chart ─── */
function PerformanceChart() {
  const data = [
    { method: 'Full (Text)', recall: 0.35, reasoning: 0.30, application: 0.49 },
    { method: 'NaiveRAG', recall: 0.47, reasoning: 0.38, application: 0.58 },
    { method: 'A-Mem', recall: 0.60, reasoning: 0.43, application: 0.64 },
    { method: 'Full (MM)', recall: 0.39, reasoning: 0.33, application: 0.52 },
    { method: 'MuRAG', recall: 0.56, reasoning: 0.41, application: 0.63 },
    { method: 'NGM', recall: 0.48, reasoning: 0.40, application: 0.64 },
  ];

  const dims = [
    { key: 'recall' as const, label: 'Recall', color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' },
    { key: 'reasoning' as const, label: 'Reasoning', color: 'bg-gradient-to-r from-amber-400 to-amber-500' },
    { key: 'application' as const, label: 'Application', color: 'bg-gradient-to-r from-rose-400 to-rose-500' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-6 mb-4">
        {dims.map((d) => (
          <div key={d.key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm ${d.color}`} />
            <span className="text-gray-400 text-xs font-medium">{d.label}</span>
          </div>
        ))}
      </div>

      {data.map((row) => (
        <div key={row.method} className="space-y-1.5">
          <div className="text-gray-500 text-xs font-medium">{row.method}</div>
          <div className="space-y-1">
            {dims.map((d) => (
              <div key={d.key} className="flex items-center gap-3">
                <div className="w-24 shrink-0" />
                <div className="flex-1 h-4 bg-gray-50 rounded-sm overflow-hidden">
                  <div
                    className={`h-full ${d.color} rounded-sm transition-all duration-700`}
                    style={{ width: `${(row[d.key] / 1.0) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-xs w-10 text-right">{row[d.key].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Conclusion ─── */
function Conclusion() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 rounded-2xl border border-indigo-100 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Conclusion</h2>
            <div className="text-gray-500 leading-relaxed space-y-4">
              <p>
                H2HMem provides a unified framework for evaluating multimodal memory in LLM agents within
                human&ndash;human interactions, assessing memory <span className="text-emerald-600 font-semibold">recall</span>,{' '}
                <span className="text-amber-600 font-semibold">reasoning</span>, and{' '}
                <span className="text-rose-500 font-semibold">application</span>.
              </p>
              <p>
                Experiments show that current methods can retrieve relevant information but remain weak at
                integrating it. They can recall fragments&mdash;images, facts, statements&mdash;but fail to{' '}
                <span className="text-indigo-600 font-semibold">align visual evidence with text</span>,{' '}
                <span className="text-sky-600 font-semibold">attribute information to the correct speaker</span>{' '}
                across sessions, or{' '}
                <span className="text-amber-600 font-semibold">resolve contradictions</span> from multiple
                sources.
              </p>
              <p className="text-gray-600 font-semibold text-lg bg-white/60 border-l-4 border-indigo-400 pl-4 py-3 rounded-r-xl">
                In multimodal human&ndash;human interactions, remembering fragments is not enough&mdash;agents
                must reconstruct multimodal coherent memory from distributed human communications.
              </p>
              <p className="text-sm text-gray-400">
                Limitations: The dataset is synthetically generated with human-in-the-loop, of modest scale
                (25 dialogues, 2,236 QA pairs), and limited to English. Only a subset of memory methods and
                MLLM backbones is evaluated. Despite these limitations, H2HMem provides a useful foundation
                for future research.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-300 text-sm">H2HMem &mdash; EMNLP 2026 Submission</div>
        <div className="flex gap-6">
          <a href="#introduction" className="text-gray-300 hover:text-indigo-500 text-sm transition-colors">
            Introduction
          </a>
          <a href="#benchmark" className="text-gray-300 hover:text-indigo-500 text-sm transition-colors">
            Benchmark
          </a>
          <a href="#experiments" className="text-gray-300 hover:text-indigo-500 text-sm transition-colors">
            Experiments
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Nav />
      <Hero />
      <Abstract />
      <Introduction />
      <RelatedWork />
      <Contributions />
      <BenchmarkOverview />
      <TaskTaxonomy />
      <Experiments />
      <Conclusion />
      <Footer />
    </div>
  );
}
