import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Heart, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  PieChart,
  Activity,
  Target
} from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  target, 
  prefix = "$", 
  suffix = "", 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const ImpactGraphicDisplay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const totalRaised = 5302;
  const goalMilestone = 6000;
  const percentage = Math.min(Math.round((totalRaised / goalMilestone) * 100), 100);

  const allocations = [
    { label: "Youth 5K Fun Runs & Race Medals", percentage: 50, color: "bg-brand-orange", textColor: "text-brand-orange" },
    { label: "Mental Health & Peer Support Circles", percentage: 30, color: "bg-amber-400", textColor: "text-amber-400" },
    { label: "Nutrition Education & Healthy Living Kits", percentage: 20, color: "bg-emerald-400", textColor: "text-emerald-400" },
  ];

  const metrics = [
    {
      id: "raised",
      icon: <DollarSign className="w-6 h-6 text-brand-orange" />,
      title: "Total Raised",
      value: "$5,302",
      subtitle: "100% directly supports youth programs"
    },
    {
      id: "youth",
      icon: <Users className="w-6 h-6 text-brand-orange" />,
      title: "Youth Reached",
      value: "500+",
      subtitle: "Active participants in runs & workshops"
    },
    {
      id: "events",
      icon: <Activity className="w-6 h-6 text-brand-orange" />,
      title: "Community Events",
      value: "25+",
      subtitle: "5K fun runs & wellness circles hosted"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="bg-brand-navy p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-white flex flex-col justify-between border border-white/10 relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 text-brand-orange rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange block">
                Impact Dashboard
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                OUR IMPACT
              </h3>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            2026 Milestone Active
          </motion.div>
        </div>

        {/* Main Big Number Banner with Scroll-Triggered Animation */}
        <div className="mb-10 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-orange" />
                TOTAL AMOUNT RAISED FOR YOUTH WELLNESS
              </p>
              <div className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-orange tracking-tighter flex items-baseline gap-2">
                <AnimatedCounter target={totalRaised} prefix="$" duration={2200} />
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-sm font-bold text-slate-300 block mb-1">
                2026 Goal: ${goalMilestone.toLocaleString()}
              </span>
              <span className="inline-block bg-brand-orange text-brand-navy font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                {percentage}% Achieved
              </span>
            </div>
          </div>

          {/* Animated Goal Progress Gauge Bar */}
          <div className="mt-8">
            <div className="flex justify-between items-center text-xs text-slate-300 font-bold mb-2">
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-brand-orange" />
                Progress to $6,000 Target
              </span>
              <span>{percentage}%</span>
            </div>
            
            <div className="w-full bg-slate-800/80 rounded-full h-4 p-1 border border-white/10 relative overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-500 via-brand-orange to-amber-300 rounded-full shadow-[0_0_12px_rgba(255,150,0,0.6)] relative"
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${percentage}%` } : { width: "0%" }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              >
                {/* Shimmer light animation across bar */}
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Visual Graphic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all hover:border-brand-orange/40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <div className="text-3xl font-black text-white tracking-tight mb-1">
                {m.id === "raised" ? <AnimatedCounter target={5302} prefix="$" duration={2000} /> : m.value}
              </div>
              <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1">
                {m.title}
              </p>
              <p className="text-xs text-slate-400 leading-snug">
                {m.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Fund Allocation Graphic Bars */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative z-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-brand-orange" />
              Where Every Dollar Goes
            </h4>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Transparent
            </span>
          </div>

          <div className="space-y-4">
            {allocations.map((alloc, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200">{alloc.label}</span>
                  <span className={alloc.textColor}>{alloc.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className={`h-full ${alloc.color} rounded-full`}
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: `${alloc.percentage}%` } : { width: "0%" }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 + i * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <a
            href="https://givebutter.com/Xw31DB"
            target="_blank"
            rel="noopener noreferrer"
            data-givebutter-widget-id="Xw31DB"
            data-account="runnershigh"
            className="w-full bg-brand-orange text-brand-navy px-8 py-4 rounded-xl font-black text-lg hover:bg-white hover:text-brand-navy transition-all shadow-xl flex items-center justify-center gap-2 group"
          >
            <Heart className="w-5 h-5 text-brand-navy group-hover:scale-125 transition-transform fill-brand-navy" />
            Support Our Next Goal — Donate Now
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
