import { useState, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type Page = "landing" | "dashboard" | "genome" | "nutrition" | "insights" | "tracker" | "reports" | "community" | "settings";

// ── DNA Helix animated SVG ───────────────────────────────────────────────────
function DnaHelix({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 200" className={className} fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const y = 10 + i * 25;
        const x1 = 30 + Math.sin(i * 0.8) * 20;
        const x2 = 70 - Math.sin(i * 0.8) * 20;
        return (
          <g key={i}>
            <circle cx={x1} cy={y} r="3" fill="#10b981" opacity={0.6 + i * 0.05} />
            <circle cx={x2} cy={y} r="3" fill="#06b6d4" opacity={0.6 + i * 0.05} />
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth="0.5" opacity="0.15" />
          </g>
        );
      })}
    </svg>
  );
}

// ── Glow background blobs ────────────────────────────────────────────────────
function GlowBlobs() {
  return (
    <>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
    </>
  );
}

// ── Glass Card ───────────────────────────────────────────────────────────────
function GlassCard({ children, className = "", hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${hover ? "hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, gradient }: { label: string; value: string; sub: string; icon: string; gradient: string }) {
  return (
    <GlassCard hover className="p-5 group cursor-default">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-lg shadow-lg group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</span>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </GlassCard>
  );
}

// ── Trait Row ────────────────────────────────────────────────────────────────
function TraitRow({ gene, variant, trait, effect, score }: { gene: string; variant: string; trait: string; effect: "positive" | "neutral" | "caution"; score: number }) {
  const colors = {
    positive: { badge: "bg-emerald-500/20 text-emerald-400", bar: "bg-emerald-500" },
    neutral: { badge: "bg-gray-500/20 text-gray-400", bar: "bg-gray-500" },
    caution: { badge: "bg-amber-500/20 text-amber-400", bar: "bg-amber-500" },
  }[effect];
  return (
    <div className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
      <div className="w-20 shrink-0">
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{gene}</span>
      </div>
      <div className="w-20 shrink-0 text-xs text-gray-500 font-mono">{variant}</div>
      <div className="flex-1 text-sm text-gray-300">{trait}</div>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{effect}</span>
      <div className="w-24 shrink-0">
        <div className="w-full bg-white/5 rounded-full h-1.5">
          <div className={`${colors.bar} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
        </div>
      </div>
    </div>
  );
}

// ── Meal Row ─────────────────────────────────────────────────────────────────
function MealRow({ meal, calories, protein, carbs, fat, time, match }: {
  meal: string; calories: number; protein: number; carbs: number; fat: number; time: string; match: number;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{meal}</p>
        <p className="text-xs text-gray-600">{time}</p>
      </div>
      <div className="text-xs text-gray-400 w-14 text-center">{calories}</div>
      <div className="text-xs text-gray-400 w-12 text-center">{protein}g</div>
      <div className="text-xs text-gray-400 w-12 text-center">{carbs}g</div>
      <div className="text-xs text-gray-400 w-10 text-center">{fat}g</div>
      <div className="w-16 text-right">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${match >= 80 ? "bg-emerald-500/20 text-emerald-400" : match >= 60 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
          {match}%
        </span>
      </div>
    </div>
  );
}

// ── Community Card ───────────────────────────────────────────────────────────
function CommunityCard({ name, avatar, post, likes, comments, tag }: {
  name: string; avatar: string; post: string; likes: number; comments: number; tag: string;
}) {
  return (
    <GlassCard hover className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/25">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-full">{tag}</span>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{post}</p>
      <div className="flex gap-4 text-xs text-gray-600">
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </GlassCard>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── LANDING PAGE ─────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white relative overflow-hidden font-sans">
      <GlowBlobs />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/30">
            🧬
          </div>
          <div>
            <span className="text-base font-black tracking-tight">Geno-Plate</span>
            <span className="hidden sm:inline text-xs text-gray-500 ml-2">Genomic Nutrition Sandbox</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-xs font-bold text-amber-400">BETA</span>
          </div>
          <button
            onClick={onEnter}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0d0f14] font-bold text-sm px-5 py-2 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-[0.98]"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className={`relative z-10 text-center px-6 pt-24 pb-20 transition-all duration-700 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="text-xs text-emerald-400 font-semibold">🧪 Beta Testing</span>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-400">100% Free · No Payment Required</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          Your DNA.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Your Nutrition.
          </span>
          <br />
          Precision-Mapped.
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Geno-Plate analyzes your genetic variants to deliver hyper-personalized nutrition plans.
          Every meal recommendation is mapped to your unique genome — powered by science, not guesswork.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onEnter}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0d0f14] font-bold px-8 py-3 rounded-xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 text-sm active:scale-[0.98]"
          >
            Enter Sandbox Dashboard →
          </button>
          <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/25 px-6 py-3 rounded-xl">
            View Documentation
          </button>
        </div>

        {/* DNA Helix decoration */}
        <div className="flex justify-center opacity-30">
          <DnaHelix className="w-16 h-40" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 sm:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Platform Features</p>
            <h2 className="text-3xl font-black tracking-tight">Gene-Driven Nutrition Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🧬", title: "Genome Profiling", desc: "Upload your genetic data and map 50+ nutrition-relevant SNP variants in real-time.", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/25" },
              { icon: "🍽️", title: "Precision Meal Plans", desc: "AI-generated weekly meal plans optimized for your MTHFR, PPARG, APOE, and FTO variants.", gradient: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/25" },
              { icon: "📊", title: "Gene Insights", desc: "Real-time scoring across inflammation, metabolism, cardiovascular, and cognitive pathways.", gradient: "from-blue-500 to-purple-500", shadow: "shadow-blue-500/25" },
              { icon: "🎯", title: "Meal Tracker", desc: "Log meals and see instant genomic match scores — track how well your diet fits your DNA.", gradient: "from-teal-500 to-emerald-500", shadow: "shadow-teal-500/25" },
              { icon: "💊", title: "Supplement Engine", desc: "Gene-specific supplement suggestions with dosage, priority ranking, and safety notes.", gradient: "from-purple-500 to-pink-500", shadow: "shadow-blue-500/25" },
              { icon: "📈", title: "Biomarker Reports", desc: "Monthly and quarterly reports tracking inflammation, cholesterol, vitamin D, and more.", gradient: "from-orange-500 to-amber-500", shadow: "shadow-emerald-500/25" },
            ].map((f, i) => (
              <GlassCard key={i} hover className="p-6 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl shadow-lg ${f.shadow} mb-4 group-hover:scale-105 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 px-6 sm:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "52", label: "Gene Variants" },
                { value: "100%", label: "Free (Beta)" },
                { value: "87%", label: "Avg Match Score" },
                { value: "∞", label: "Meal Plans" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Free Beta CTA */}
      <section className="relative z-10 px-6 sm:px-8 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <GlassCard className="p-8 border-emerald-500/20 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Sandbox Environment</span>
            </div>
            <h3 className="text-2xl font-black mb-3">100% Free During Beta Testing</h3>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed">
              No pricing tiers. No payment gates. No credit card required. All features are fully unlocked
              so we can maximize testing and feedback. Help us turn this prototype into a market-ready product.
            </p>
            <button
              onClick={onEnter}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0d0f14] font-bold px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 text-sm active:scale-[0.98]"
            >
              Start Exploring — It's Free →
            </button>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs">🧬</div>
          <span className="text-sm font-bold">Geno-Plate</span>
        </div>
        <p className="text-xs text-gray-600">
          © 2026 <span className="font-semibold text-gray-500">Dolapo Oroboade</span>. All Rights Reserved.
        </p>
        <p className="text-xs text-gray-700 mt-1">
          Beta Sandbox · All data is simulated · For testing purposes only
        </p>
      </footer>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── DASHBOARD PAGE ───────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 p-6">
        <div className="absolute -right-8 -top-8 opacity-5">
          <DnaHelix className="w-32 h-64" />
        </div>
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-emerald-400 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h2 className="text-xl font-extrabold text-white mb-1">Your Genomic Nutrition Hub</h2>
            <p className="text-sm text-gray-400 max-w-xl">
              All features are <span className="text-emerald-400 font-semibold">100% free</span> during the Beta testing phase.
              Explore your gene-driven nutrition insights and help us refine the platform.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Genome Match</p>
            <p className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">87<span className="text-lg">%</span></p>
            <p className="text-xs text-gray-500">Today's plan fit</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Calories" value="1,840" sub="Target: 2,100 kcal" icon="🔥" gradient="from-orange-500 to-amber-500" />
        <StatCard label="Protein" value="112g" sub="Target: 130g · 86%" icon="💪" gradient="from-emerald-500 to-teal-500" />
        <StatCard label="Variants" value="47/52" sub="Active gene mappings" icon="🧬" gradient="from-cyan-500 to-blue-500" />
        <StatCard label="Streak" value="14 days" sub="Consecutive logging" icon="⚡" gradient="from-purple-500 to-violet-500" />
      </div>

      {/* Two-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Gene-Based Picks */}
        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Today's Gene-Based Picks
          </h3>
          {[
            { food: "Wild Salmon (150g)", reason: "PPARG variant → omega-3 priority", badge: "High Impact", color: "bg-emerald-500/20 text-emerald-400" },
            { food: "Spinach + Lemon", reason: "MTHFR C677T → folate + B12 absorption", badge: "Essential", color: "bg-cyan-500/20 text-cyan-400" },
            { food: "Walnuts (30g)", reason: "APOE ε3/ε4 → heart-healthy fats", badge: "Cardio", color: "bg-blue-500/20 text-blue-400" },
            { food: "Turmeric Latte", reason: "CRP pathway → anti-inflammatory support", badge: "Reduce CRP", color: "bg-amber-500/20 text-amber-400" },
            { food: "Greek Yoghurt", reason: "LCT persistence → lactase positive", badge: "Dairy OK", color: "bg-teal-500/20 text-teal-400" },
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{r.food}</p>
                <p className="text-xs text-gray-500">{r.reason}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${r.color}`}>{r.badge}</span>
            </div>
          ))}
        </GlassCard>

        {/* Macro Ring */}
        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
            Macro Distribution
          </h3>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-40 h-40 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="45 55" strokeDashoffset="-30" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-75" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-black text-white">87%</p>
                <p className="text-xs text-gray-500">match</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Protein", pct: "30%", g: "112g", color: "bg-emerald-500" },
                { label: "Carbohydrates", pct: "45%", g: "207g", color: "bg-cyan-500" },
                { label: "Healthy Fats", pct: "25%", g: "51g", color: "bg-blue-500" },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${m.color}`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-300">{m.label} <span className="text-gray-600 font-normal text-xs">({m.pct})</span></p>
                    <p className="text-xs text-gray-600">{m.g} today</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-600 pt-2 border-t border-white/5">
                Optimised for <span className="text-emerald-400 font-semibold">PPARG + ADRB2</span>
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Activity Feed */}
      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { icon: "🧬", text: "Genome profile updated — 3 new variants processed", time: "2h ago" },
            { icon: "🥗", text: "Lunch logged: Quinoa salad — 93% genomic match", time: "4h ago" },
            { icon: "📊", text: "Weekly report generated — inflammation markers down 12%", time: "1d ago" },
            { icon: "🎯", text: "New goal set: Optimise BDNF expression via diet", time: "2d ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">{a.icon}</div>
              <p className="flex-1 text-sm text-gray-300">{a.text}</p>
              <span className="text-xs text-gray-600 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ── Genome Profile ───────────────────────────────────────────────────────────
function GenomePage() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Genetic Variant Panel</h2>
            <p className="text-sm text-gray-500">47 active variants · Last updated 2 days ago</p>
          </div>
          <button className="text-sm font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition px-4 py-2 rounded-xl border border-emerald-500/20">
            + Upload New Data
          </button>
        </div>
        {[
          { gene: "MTHFR", variant: "C677T", trait: "Folate metabolism — reduced enzyme activity", effect: "caution" as const, score: 40 },
          { gene: "PPARG", variant: "Pro12Ala", trait: "Fat storage & insulin sensitivity — favourable", effect: "positive" as const, score: 82 },
          { gene: "APOE", variant: "ε3/ε4", trait: "Cholesterol transport — moderate CV risk", effect: "caution" as const, score: 55 },
          { gene: "ADRB2", variant: "Arg16Gly", trait: "Beta-adrenergic receptor — moderate carb tolerance", effect: "neutral" as const, score: 60 },
          { gene: "VDR", variant: "BsmI", trait: "Vitamin D receptor — reduced D3 absorption", effect: "caution" as const, score: 35 },
          { gene: "LCT", variant: "C/T-13910", trait: "Lactase persistence — dairy digestion intact", effect: "positive" as const, score: 90 },
          { gene: "FTO", variant: "rs9939609", trait: "Appetite regulation — elevated adiposity risk", effect: "caution" as const, score: 48 },
          { gene: "ACTN3", variant: "R577X", trait: "Muscle composition — mixed power/endurance", effect: "neutral" as const, score: 65 },
          { gene: "CYP1A2", variant: "rs762551", trait: "Caffeine metabolism — fast metaboliser", effect: "positive" as const, score: 88 },
          { gene: "BDNF", variant: "Val66Met", trait: "Brain-derived neurotrophic factor — diet response", effect: "neutral" as const, score: 62 },
        ].map((t, i) => <TraitRow key={i} {...t} />)}
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Ancestry Composition", value: "West African 68%", sub: "European 22% · Other 10%", icon: "🌍", gradient: "from-emerald-500 to-teal-500" },
          { title: "Haplogroup (mtDNA)", value: "L2a1", sub: "Common in West/Central Africa", icon: "🧬", gradient: "from-cyan-500 to-blue-500" },
          { title: "Health Confidence", value: "High (92%)", sub: "Based on variant call quality", icon: "✅", gradient: "from-amber-500 to-orange-500" },
        ].map((c, i) => (
          <div key={i} className={`rounded-2xl p-5 bg-gradient-to-br ${c.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10">
              <p className="text-2xl mb-2">{c.icon}</p>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-widest mb-1">{c.title}</p>
              <p className="text-xl font-black mb-0.5">{c.value}</p>
              <p className="text-xs opacity-70">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Nutrition Plan ───────────────────────────────────────────────────────────
function NutritionPage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h2 className="text-lg font-bold text-white mb-1">7-Day Genomic Meal Plan</h2>
        <p className="text-sm text-gray-500 mb-6">Generated from your MTHFR · PPARG · APOE · FTO variants</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {days.map((day, i) => (
            <div key={day} className={`rounded-xl p-3 border ${i === 2 ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/5 bg-white/[0.02]"}`}>
              <p className={`text-xs font-bold mb-2 ${i === 2 ? "text-emerald-400" : "text-gray-500"}`}>{day} {i === 2 && <span className="text-emerald-600 font-normal">(Today)</span>}</p>
              {["🥣", "🥗", "🍣", "🍎"].map((e, j) => <div key={j} className="text-base py-0.5">{e}</div>)}
              <p className={`text-xs mt-2 font-bold ${i === 2 ? "text-emerald-400" : "text-gray-600"}`}>{1800 + i * 50} kcal</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-white mb-4">Today's Detailed Plan</h3>
          {[
            { meal: "Breakfast", items: "Oats + chia + blueberries + ground flaxseed", kcal: 420, note: "MTHFR: high folate start" },
            { meal: "Mid-Morning", items: "Greek yoghurt (200g) + walnuts", kcal: 280, note: "Protein & healthy fats" },
            { meal: "Lunch", items: "Quinoa · grilled chicken · spinach · lemon", kcal: 540, note: "APOE: low sat-fat, high fibre" },
            { meal: "Snack", items: "Apple + almond butter + turmeric shot", kcal: 210, note: "Anti-inflammatory support" },
            { meal: "Dinner", items: "Wild salmon · sweet potato · broccoli · olive oil", kcal: 610, note: "PPARG: omega-3 rich" },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0">
              <div className="w-24 shrink-0">
                <p className="text-xs font-bold text-emerald-400">{m.meal}</p>
                <p className="text-xs text-gray-600">{m.kcal} kcal</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">{m.items}</p>
                <p className="text-xs text-teal-400 mt-0.5">🧬 {m.note}</p>
              </div>
            </div>
          ))}
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-white mb-4">Gene-Suggested Supplements</h3>
          <p className="text-xs text-gray-600 mb-4 italic">Based on variant profile — consult a professional before use.</p>
          {[
            { name: "Methylfolate (5-MTHF)", dose: "400–800 mcg/day", reason: "MTHFR C677T bypass", priority: "High" },
            { name: "Vitamin D3 + K2", dose: "2,000–4,000 IU/day", reason: "VDR BsmI — poor absorption", priority: "High" },
            { name: "Omega-3 (EPA/DHA)", dose: "2g/day", reason: "PPARG amplify fat metabolism", priority: "Medium" },
            { name: "Magnesium Glycinate", dose: "300 mg/night", reason: "General metabolic support", priority: "Medium" },
            { name: "CoQ10", dose: "100 mg/day", reason: "APOE ε4 — mitochondrial support", priority: "Low" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{s.name}</p>
                <p className="text-xs text-gray-500">{s.dose} · {s.reason}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${s.priority === "High" ? "bg-red-500/20 text-red-400" : s.priority === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-500"}`}>
                {s.priority}
              </span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}

// ── Gene Insights ────────────────────────────────────────────────────────────
function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: "Inflammation Profile", score: 72, status: "Moderate", color: "text-amber-400", bar: "bg-amber-500", detail: "CRP pathway variants detected. Prioritise anti-inflammatory foods: turmeric, fatty fish, leafy greens.", genes: ["IL6", "TNF-α", "CRP"] },
          { title: "Metabolic Efficiency", score: 85, status: "Good", color: "text-emerald-400", bar: "bg-emerald-500", detail: "PPARG Pro12Ala supports efficient fat oxidation. Current macro split is near-optimal.", genes: ["PPARG", "ADRB2", "UCP1"] },
          { title: "Cardiovascular Risk", score: 58, status: "Elevated", color: "text-red-400", bar: "bg-red-500", detail: "APOE ε3/ε4 increases LDL sensitivity. Reduce saturated fats and increase plant sterols.", genes: ["APOE", "CETP", "LDLR"] },
          { title: "Cognitive Nutrition", score: 78, status: "Good", color: "text-cyan-400", bar: "bg-cyan-500", detail: "BDNF Val66Met responds well to DHA, blueberry anthocyanins and intermittent fasting.", genes: ["BDNF", "COMT", "APOE"] },
          { title: "Gut Microbiome Fit", score: 80, status: "Good", color: "text-teal-400", bar: "bg-teal-500", detail: "High prebiotic fibre intake aligns with FUT2 variant — favourable bifidobacteria support.", genes: ["FUT2", "LCT", "CLDN"] },
          { title: "Exercise Response", score: 65, status: "Mixed", color: "text-purple-400", bar: "bg-purple-500", detail: "ACTN3 R577X: mixed power/endurance. Benefits most from moderate resistance + zone-2 cardio.", genes: ["ACTN3", "ADRB2", "ACE"] },
        ].map((ins, i) => (
          <GlassCard key={i} hover className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">{ins.title}</h3>
              <span className={`text-xs font-bold ${ins.color}`}>{ins.status}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-white/5 rounded-full h-2">
                <div className={`${ins.bar} h-2 rounded-full transition-all duration-700`} style={{ width: `${ins.score}%` }} />
              </div>
              <span className="text-sm font-black text-white">{ins.score}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{ins.detail}</p>
            <div className="flex flex-wrap gap-1">
              {ins.genes.map(g => (
                <span key={g} className="text-xs bg-emerald-500/10 text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded">{g}</span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-4">Nutrient Priority Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Nutrient</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Gene Driver</th>
                <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Requirement</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nutrient: "Methylfolate", gene: "MTHFR C677T", req: "⬆ Increased", action: "5-MTHF supplement + dark leafy greens" },
                { nutrient: "Vitamin D3", gene: "VDR BsmI", req: "⬆ Increased", action: "D3/K2 supplement + sun exposure" },
                { nutrient: "Omega-3 (EPA/DHA)", gene: "PPARG Pro12Ala", req: "⬆ Priority", action: "Oily fish 3×/wk + fish oil" },
                { nutrient: "Saturated Fat", gene: "APOE ε3/ε4", req: "⬇ Reduce", action: "Cap at <7% of calories" },
                { nutrient: "Caffeine", gene: "CYP1A2 fast", req: "✓ Tolerated", action: "Up to 400 mg/day is safe" },
                { nutrient: "Dairy / Lactose", gene: "LCT C/T-13910", req: "✓ Tolerated", action: "No restriction needed" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-white">{r.nutrient}</td>
                  <td className="py-3 pr-4"><span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">{r.gene}</span></td>
                  <td className="py-3 pr-4 text-gray-400">{r.req}</td>
                  <td className="py-3 text-gray-500 text-xs">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Meal Tracker ─────────────────────────────────────────────────────────────
function TrackerPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Calories" value="1,260" sub="840 remaining" icon="🔥" gradient="from-orange-500 to-amber-500" />
        <StatCard label="Protein" value="78g" sub="52g remaining" icon="💪" gradient="from-emerald-500 to-teal-500" />
        <StatCard label="Gene Match" value="91%" sub="Excellent alignment" icon="🎯" gradient="from-cyan-500 to-blue-500" />
        <StatCard label="Meals" value="3/5" sub="2 more today" icon="🍽️" gradient="from-purple-500 to-violet-500" />
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-white">Today's Meal Log</h3>
          <button className="text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0d0f14] px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20">
            + Log Meal
          </button>
        </div>
        <div className="flex gap-2 mb-3 text-xs text-gray-600 px-1">
          <div className="flex-1">Meal</div>
          <div className="w-14 text-center">Kcal</div>
          <div className="w-12 text-center">Protein</div>
          <div className="w-12 text-center">Carbs</div>
          <div className="w-10 text-center">Fat</div>
          <div className="w-16 text-right">Fit</div>
        </div>
        {[
          { meal: "🥣 Oats & Chia Bowl", calories: 420, protein: 18, carbs: 58, fat: 12, time: "07:30", match: 94 },
          { meal: "🥜 Walnuts & Yoghurt", calories: 280, protein: 16, carbs: 12, fat: 18, time: "10:15", match: 88 },
          { meal: "🥗 Quinoa Salad", calories: 560, protein: 44, carbs: 62, fat: 14, time: "13:00", match: 91 },
        ].map((m, i) => <MealRow key={i} {...m} />)}
        <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-white/10 text-center text-sm text-gray-600">
          Afternoon snack & dinner not yet logged
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-4">7-Day Calorie & Match Trend</h3>
        <div className="flex items-end gap-2 h-32">
          {[
            { day: "Mon", kcal: 1980, match: 84 },
            { day: "Tue", kcal: 2050, match: 79 },
            { day: "Wed", kcal: 1890, match: 88 },
            { day: "Thu", kcal: 2100, match: 82 },
            { day: "Fri", kcal: 1950, match: 90 },
            { day: "Sat", kcal: 2200, match: 75 },
            { day: "Sun", kcal: 1260, match: 91 },
          ].map((d, i) => {
            const h = Math.round((d.kcal / 2400) * 100);
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg relative group cursor-default ${i === 6 ? "bg-emerald-500" : "bg-emerald-500/30"}`}
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 border border-white/10">
                    {d.kcal} kcal · {d.match}%
                  </div>
                </div>
                <span className="text-xs text-gray-600">{d.day}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}

// ── Reports ──────────────────────────────────────────────────────────────────
function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Monthly Genomic Nutrition Report", date: "June 2026", highlights: ["Avg gene-match score: 84%", "Inflammation markers ↓ 12%", "Omega-3 intake improved", "Folate targets met 80% of days"], status: "Ready" },
          { title: "Quarterly Health Trend Analysis", date: "Q1–Q2 2026", highlights: ["Weight trend: stable (–0.8 kg)", "Metabolic age: –2 yrs vs baseline", "APOE risk mitigation: 68% adherence", "Gut diversity score: +14 pts"], status: "Ready" },
        ].map((r, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">{r.title}</h3>
                <p className="text-sm text-gray-500">{r.date}</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full">{r.status}</span>
            </div>
            <ul className="space-y-2 mb-5">
              {r.highlights.map((h, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <button className="w-full text-sm font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition rounded-xl py-2 border border-emerald-500/20">
              Download PDF Report
            </button>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-5">Biomarker Progress (Beta Sandbox Data)</h3>
        {[
          { label: "hsCRP (Inflammation)", before: 3.2, after: 2.8, unit: "mg/L", better: "lower" },
          { label: "LDL Cholesterol", before: 142, after: 128, unit: "mg/dL", better: "lower" },
          { label: "Vitamin D (25-OH)", before: 22, after: 34, unit: "ng/mL", better: "higher" },
          { label: "Fasting Glucose", before: 98, after: 92, unit: "mg/dL", better: "lower" },
          { label: "Omega-3 Index", before: 4.1, after: 6.8, unit: "%", better: "higher" },
        ].map((b, i) => {
          const improved = b.better === "lower" ? b.after < b.before : b.after > b.before;
          return (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{b.label}</p>
                <p className="text-xs text-gray-600">{b.before} → {b.after} {b.unit}</p>
              </div>
              <span className={`text-sm font-bold ${improved ? "text-emerald-400" : "text-red-400"}`}>
                {improved ? "↑ Improved" : "↓ Needs work"}
              </span>
            </div>
          );
        })}
      </GlassCard>
    </div>
  );
}

// ── Community ────────────────────────────────────────────────────────────────
function CommunityPage() {
  return (
    <div className="space-y-6">
      <GlassCard className="p-5 border-emerald-500/20">
        <p className="text-sm text-gray-300">
          🧬 <strong className="text-emerald-400">Beta Community:</strong>{" "}
          Share your genomic nutrition discoveries, ask questions, and collaborate with fellow testers. All discussions are sandboxed for the Beta phase.
        </p>
      </GlassCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { name: "Adaeze Nwosu", avatar: "AN", post: "MTHFR C677T gang — has anyone noticed a huge energy boost from switching to 5-MTHF vs regular folic acid? Week 3 and the brain fog is almost gone 🙌", likes: 47, comments: 12, tag: "MTHFR" },
          { name: "Kwame Asante", avatar: "KA", post: "APOE ε3/ε4 here. Cut saturated fat to under 10g/day and my LDL dropped 22 points in 6 weeks. The Geno-Plate meal plan made it surprisingly easy.", likes: 63, comments: 18, tag: "APOE" },
          { name: "Sade Okafor", avatar: "SO", post: "VDR variant confirmed — starting D3/K2 protocol at 4,000 IU. Will report back in 8 weeks with blood results. Anyone else on a similar dose?", likes: 29, comments: 9, tag: "VDR" },
          { name: "Emeka Dike", avatar: "ED", post: "ACTN3 R577X — the hybrid workout plan is WORKING. Mix of zone-2 cardio + resistance training. Gene-matched nutrition has me recovering 40% faster.", likes: 81, comments: 24, tag: "ACTN3" },
          { name: "Temi Adeyemi", avatar: "TA", post: "FTO rs9939609 variant but I've managed to keep BMI stable for 6 months using the Geno-Plate hunger signals tracker. Genes are not destiny!", likes: 55, comments: 15, tag: "FTO" },
          { name: "Chidi Obi", avatar: "CO", post: "Beta feedback: would love to see the supplement tracker integrated with the meal log. Currently tracking manually in Notion but the gene insight cards are 🔥", likes: 38, comments: 21, tag: "Feedback" },
        ].map((c, i) => <CommunityCard key={i} {...c} />)}
      </div>
    </div>
  );
}

// ── Settings ─────────────────────────────────────────────────────────────────
function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <GlassCard className="p-6 space-y-5">
        <h3 className="text-base font-bold text-white">Profile</h3>
        {[
          { label: "Full Name", value: "Demo User", type: "text" },
          { label: "Email", value: "demo@geno-plate.io", type: "email" },
          { label: "Date of Birth", value: "1990-01-01", type: "date" },
        ].map((f, i) => (
          <div key={i}>
            <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
            <input type={f.type} defaultValue={f.value}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition" />
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Notifications</h3>
        {[
          { label: "Daily meal reminders", on: true },
          { label: "Weekly report ready", on: true },
          { label: "New gene insights", on: false },
          { label: "Community mentions", on: true },
          { label: "Beta update announcements", on: true },
        ].map((pref, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{pref.label}</span>
            <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${pref.on ? "bg-emerald-500" : "bg-white/10"} relative`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-all ${pref.on ? "left-5" : "left-0.5"}`} />
            </div>
          </div>
        ))}
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-1">Beta Feedback</h3>
        <p className="text-xs text-gray-500 mb-3">Help shape Geno-Plate into a market-ready product.</p>
        <textarea rows={4} placeholder="What's working? What needs improvement?"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 resize-none" />
        <button className="mt-3 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0d0f14] font-bold text-sm py-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          Submit Feedback
        </button>
      </GlassCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── NAV ITEMS ────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
type NavItem = { id: Page; label: string; icon: string };
const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "genome", label: "Genome Profile", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
  { id: "nutrition", label: "Nutrition Plan", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: "insights", label: "Gene Insights", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { id: "tracker", label: "Meal Tracker", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
  { id: "reports", label: "Reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "community", label: "Community", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN APP ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (page === "landing") {
    return <LandingPage onEnter={() => setPage("dashboard")} />;
  }

  const pageMap: Record<string, React.ReactNode> = {
    dashboard: <DashboardPage />,
    genome: <GenomePage />,
    nutrition: <NutritionPage />,
    insights: <InsightsPage />,
    tracker: <TrackerPage />,
    reports: <ReportsPage />,
    community: <CommunityPage />,
    settings: <SettingsPage />,
  };

  const currentLabel = NAV_ITEMS.find(n => n.id === page)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0f14] text-white font-sans">

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-[#0d0f14]/95 backdrop-blur-md border-r border-white/5
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/25">
              🧬
            </div>
            <div>
              <p className="text-sm font-black text-white leading-none">Geno-Plate</p>
              <p className="text-xs text-gray-600">Genomic Nutrition</p>
            </div>
          </div>
          {/* Beta Badge */}
          <div className="mt-3 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <div>
              <p className="text-xs font-bold text-amber-400 leading-none">Beta Testing</p>
              <p className="text-[10px] text-amber-400/60 leading-none mt-0.5">Sandbox · 100% Free</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${page === item.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-[#0d0f14] shadow-lg shadow-emerald-500/20"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}
              `}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back to Landing */}
        <div className="px-3 pb-2">
          <button
            onClick={() => setPage("landing")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-gray-400 hover:bg-white/3 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Landing
          </button>
        </div>

        {/* User + Copyright */}
        <div className="border-t border-white/5 px-4 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[#0d0f14] text-xs font-bold shadow-lg shadow-emerald-500/20">
              DU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Demo User</p>
              <p className="text-[10px] text-gray-600 truncate">demo@geno-plate.io</p>
            </div>
            <span className="text-[9px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded-full shrink-0">BETA</span>
          </div>

          {/* ── Visual Signature ── */}
          <p className="text-[10px] text-gray-700 leading-snug text-center border-t border-white/5 pt-3">
            © 2026 <span className="font-semibold text-gray-500">Dolapo Oroboade</span>.<br />
            All Rights Reserved.
          </p>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-[#0d0f14]/80 backdrop-blur-md border-b border-white/5 px-5 py-3 flex items-center gap-4 shrink-0">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex-1">
            <h1 className="text-base font-bold text-white">{currentLabel}</h1>
            <p className="text-xs text-gray-600 hidden sm:block">Geno-Plate Genomic Nutrition Sandbox</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              100% Free — Beta
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[#0d0f14] text-xs font-bold shadow-lg shadow-emerald-500/20">
              DU
            </div>
          </div>
        </header>

        {/* Beta ribbon */}
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-b border-amber-500/10 text-amber-400 text-xs font-semibold text-center py-1.5 px-4 shrink-0">
          🚧 &nbsp;BETA TESTING — Sandbox environment · All data is simulated · No payments required · Share your feedback!
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {pageMap[page]}
        </main>
      </div>
    </div>
  );
}
