/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  Instagram, 
  ArrowRight,
  Download,
  Calendar,
  DollarSign,
  Menu,
  X,
  Heart,
  Users,
  ShieldCheck,
  Brain,
  Activity,
  Shield,
  ChevronRight,
  Plus,
  Minus,
  Search, 
  MapPin, 
  Globe, 
  Clock, 
  ExternalLink,
  Filter,
  Navigation,
  CreditCard,
  Lock,
  CheckCircle2,
  User
} from "lucide-react";
import { resources, Resource } from "./data/resources";
import { formatDriveImageUrl } from "./lib/drive";
import { ImpactGraphicDisplay } from "./components/ImpactGraphicDisplay";
import { SecurityDashboard } from "./components/SecurityDashboard";

const LOGO_URL = "https://lh3.googleusercontent.com/d/1N5Ixxr4vpAJD7xVuQZXSYHwOGj3Fx_rg";
const BROCHURE_P1 = "https://storage.googleapis.com/birdseye-public/files/input_file_1.png";
const BROCHURE_P2 = "https://storage.googleapis.com/birdseye-public/files/input_file_2.png";
const BANNER_URL = "https://storage.googleapis.com/birdseye-public/files/input_file_3.png";

// Front page showcase & theme images
const DEFAULT_PHOENIX_JOURNEY = "https://drive.google.com/file/d/1e_H0hUfwieL5ViRSLQhPjLrQFFrHXJvA/view?usp=sharing";
const DEFAULT_GROUP_PHOTO = "https://drive.google.com/file/d/1lGSQfHhG6Xvif0LHUO6-YgfTshDQ6SI_/view?usp=sharing";

// Community Work Showcase Gallery Images (Featured on Front Page)
const COMMUNITY_SHOWCASE_IMAGES = [
  {
    id: "run-5k",
    title: "Community Fun Runs & 5Ks",
    category: "Physical Health & Unity",
    desc: "Bringing youth, families, and runners together across town parks for non-competitive 5K runs.",
    url: "https://drive.google.com/file/d/115HI_oKs2lNv8kD4NU6vqt2wFM_RjmQL/view?usp=sharing"
  },
  {
    id: "youth-mental",
    title: "Youth Wellness & Peer Support",
    category: "Mental Health & Empowerment",
    desc: "Empowering young adults with coping strategies, peer support circles, and healthy habits.",
    url: "https://drive.google.com/file/d/1lGSQfHhG6Xvif0LHUO6-YgfTshDQ6SI_/view?usp=drive_link"
  },
  {
    id: "nutrition-habits",
    title: "Providing Nutrition & Healthy Habits",
    category: "Nutrition & Healthy Living",
    desc: "Promoting healthy eating habits, wholesome nutrition education, and wellness resources for youth and families.",
    url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "breaking-isolation",
    title: "Breaking Stigma & Isolation",
    category: "Recovery & Hope",
    desc: "Creating safe, welcoming spaces where everyone is empowered to grow stronger one step at a time.",
    url: "https://drive.google.com/file/d/10HzWbcjdi70Y1BdeSWko5rRms6XkFJEQ/view?usp=drive_link"
  }
];

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Resources", 
      href: "/resources", 
      dropdown: [
        { name: "Substance Abuse", href: "/resources/substance-abuse" },
        { name: "Mental Health", href: "/resources/mental-health" },
        { name: "Physical Health", href: "/resources/physical-health" },
        { name: "Family: Substance Abuse", href: "/resources/family-substance-abuse" },
        { name: "Family: Mental Health", href: "/resources/family-mental-health" },
        { name: "Family: Physical Health", href: "/resources/family-physical-health" }
      ] 
    },
    { name: "Who we are", href: "/who-we-are" },
    { name: "Upcoming events", href: "/events" },
    { name: "AI Security Starter", href: "/ai-security" },
    { name: "Donate Today", href: "/donate", highlight: true },
    { name: "Partners", href: "/partners" },
    { name: "Frequently asked questions", href: "/faq" },
  ];

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src={LOGO_URL} alt="Runner's High Logo" className="w-full h-full object-cover scale-[1.15]" referrerPolicy="no-referrer" />
            </div>
            <span className="text-2xl font-bold text-brand-navy tracking-tight hidden sm:block">Runner's High</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    <Link 
                      to={link.href}
                      className={`flex items-center gap-1 transition-colors ${isActive(link.href) ? 'text-brand-orange' : 'hover:text-brand-orange'}`}
                    >
                      {link.name} <ChevronDown className="w-4 h-4" />
                    </Link>
                    
                    <AnimatePresence>
                      {isResourcesOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-xl rounded-lg py-2 mt-2"
                        >
                          {link.dropdown.map((item) => (
                            <Link 
                              key={item.name} 
                              to={item.href} 
                              className="block px-4 py-3 text-brand-navy hover:bg-brand-orange hover:text-white transition-colors text-xs"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.href === '/donate' ? (
                  <a 
                    href="https://givebutter.com/Xw31DB" 
                    target="_blank"
                    rel="noopener noreferrer"
                    data-givebutter-widget-id="Xw31DB"
                    data-account="runnershigh"
                    className={`${link.highlight ? 'text-brand-navy hover:text-brand-orange' : isActive(link.href) ? 'text-brand-orange' : 'hover:text-brand-orange'} transition-all`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.href} 
                    className={`${link.highlight ? 'text-brand-navy hover:text-brand-orange' : isActive(link.href) ? 'text-brand-orange' : 'hover:text-brand-orange'} transition-all`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <Link 
                        to={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className={`font-bold uppercase tracking-wider ${isActive(link.href) ? 'text-brand-orange' : 'text-brand-navy'}`}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.name} 
                          to={item.href} 
                          onClick={() => setIsMenuOpen(false)}
                          className="block pl-4 py-1 text-slate-600 hover:text-brand-orange"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ) : link.href === '/donate' ? (
                    <a 
                      href="https://givebutter.com/Xw31DB" 
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      data-givebutter-widget-id="Xw31DB"
                      data-account="runnershigh"
                      className={`block font-bold uppercase tracking-wider hover:text-brand-orange ${isActive(link.href) ? 'text-brand-orange' : 'text-brand-navy'}`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`block font-bold uppercase tracking-wider hover:text-brand-orange ${isActive(link.href) ? 'text-brand-orange' : 'text-brand-navy'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-navy text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 text-center md:text-left">
        <div className="max-w-md">
          <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
            <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src={LOGO_URL} alt="Runner's High Logo" className="w-full h-full object-cover scale-[1.15]" referrerPolicy="no-referrer" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Runner's High</span>
          </div>
          <p 
            data-givebutter-widget-id="Xw31DB"
            data-account="runnershigh"
            className="text-brand-orange text-2xl font-bold italic leading-relaxed cursor-pointer hover:underline"
            onClick={() => window.open('https://givebutter.com/Xw31DB', '_blank')}
          >
            "Every dollar is a step towards a healthier tomorrow, DONATE TODAY."
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-widest text-brand-orange mb-8">Contact Info</h4>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-brand-orange">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-lg">+1 (346) 268-8315</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-brand-orange">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-lg">info@runnershighngo.org</span>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
            <div className="w-10 h-10 bg-brand-orange text-brand-navy rounded-full flex items-center justify-center">
              <Instagram className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">@runnershigh_ngo</span>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">
        © 2026 Runner's High NGO. All rights reserved.
      </div>
    </div>
  </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-brand-navy font-sans">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Home = () => {
  const [showBrochure, setShowBrochure] = useState(false);

  const [phoenixJourneyUrl] = useState(() => {
    return DEFAULT_PHOENIX_JOURNEY;
  });

  const [groupPhotoUrl] = useState(() => {
    return DEFAULT_GROUP_PHOTO;
  });

  return (
    <>
      {/* Hero - Featuring Phoenix Journey Header */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden bg-brand-navy py-16">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={formatDriveImageUrl(phoenixJourneyUrl)} 
            alt="Phoenix Journey Background" 
            className="w-full h-full object-cover blur-sm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-navy/80" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl border border-white/10 relative bg-black/30"
          >
            <img 
              src={formatDriveImageUrl(phoenixJourneyUrl)} 
              alt="Phoenix Journey Header" 
              className="w-full h-auto max-h-[520px] object-cover mx-auto rounded-3xl" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          >
            Welcome, Join us in growing stronger one step at a time
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <a 
              href="https://givebutter.com/Xw31DB"
              target="_blank"
              rel="noopener noreferrer"
              data-givebutter-widget-id="Xw31DB"
              data-account="runnershigh"
              className="inline-block bg-brand-orange text-brand-navy px-12 py-5 rounded-full font-bold text-2xl hover:bg-white transition-all shadow-2xl active:scale-95"
            >
              Donate Today
            </a>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-brand-orange/20 text-brand-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Why We Run
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
                Born from Loss, <br />
                <span className="text-brand-orange">Driven by Hope.</span>
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed">
                Runner's High was born from loss and hope. On December 25, 2022, my uncle Andy lost his life to a drug overdose, leaving behind a 10 year old son and a family forever changed.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                His struggle wasn't unique: 27 million Americans battle addiction, while 1 in 5 face mental illness. Furthermore, more prevalent preventable diseases, such as obesity, affect 100-plus million people in the U.S. today.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">Breaking Isolation</h4>
                    <p className="text-sm text-slate-500">Dedicated to connecting those who feel alone.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-navy text-brand-orange rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">Health & Wellness</h4>
                    <p className="text-sm text-slate-500">Creating a path toward sustainable recovery.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src={formatDriveImageUrl(groupPhotoUrl)} 
                  alt="Group Photo - Community Support" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-navy p-8 rounded-3xl shadow-2xl text-white max-w-xs hidden md:block">
                <p className="text-brand-orange font-bold text-3xl mb-2">1 in 5</p>
                <p className="text-sm text-slate-300">Americans face mental illness challenges every single day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8">Our Mission</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic mb-12">
            "Runner's High is committed to providing support, raising awareness, and fostering a community where people empower one another."
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Dedicated to breaking isolation",
              "Shining a light on mental health challenges",
              "Creating a path toward health & wellness"
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <p className="font-bold text-brand-navy text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcasing Our Work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-brand-orange/20 text-brand-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              Our Work In Action
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Showcasing Our Community Impact
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Discover how Runner's High empowers youth, families, and communities through running, physical health initiatives, and mental wellness advocacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMMUNITY_SHOWCASE_IMAGES.map((item) => {
              const displayUrl = formatDriveImageUrl(item.url);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    <img
                      src={displayUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy text-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-brand-navy mb-2 group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Banner */}
      <section className="bg-brand-navy py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              RUNNERS HIGH BROCHURE
            </h3>
            <p className="text-brand-orange font-bold text-lg">
              CHECK OUT OUR NEW RESOURCE BROCHURE FOR THE YEAR 2026!
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1I3KTsX62PkWE6hiawC9ABTP8phQGYow3/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-brand-navy px-10 py-4 rounded-md font-bold hover:bg-white transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            <Download className="w-6 h-6" />
            Download/View Brochure
          </a>
        </div>

        {/* Brochure Modal */}
        <AnimatePresence>
          {showBrochure && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            >
              <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8">
                <button 
                  onClick={() => setShowBrochure(false)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-brand-orange hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-brand-navy mb-2">Runner's High Brochure 2026</h2>
                    <p className="text-slate-500">Empowering youth through mental and physical health.</p>
                  </div>
                  <div className="grid gap-8">
                    <img src={BROCHURE_P1} alt="Brochure Page 1" className="w-full h-auto rounded-xl shadow-lg" referrerPolicy="no-referrer" />
                    <img src={BROCHURE_P2} alt="Brochure Page 2" className="w-full h-auto rounded-xl shadow-lg" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex justify-center pt-8">
                    <a 
                      href="https://drive.google.com/file/d/1I3KTsX62PkWE6hiawC9ABTP8phQGYow3/view?usp=sharing" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-navy text-brand-orange px-8 py-3 rounded-full font-bold flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" /> Download PDF Version
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Impact & Events */}
      <section id="events" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Column 1: Events */}
            <div className="bg-slate-50 p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-orange text-brand-navy rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-brand-navy uppercase tracking-tight">UPCOMING EVENTS</h3>
              </div>
              <div className="space-y-6">
                {[
                  { date: "Nov 30", time: "7 AM", title: "RUN FOR JEEVES 5K", desc: "Fun run/walk. Register at runforjeeve.com" },
                  { date: "Jan 03", time: "9 AM", title: "NEW YEAR OF GROWTH", desc: "Our own fun run at Town Green Park" },
                  { date: "Mar 28", time: "TBA", title: "PHOENIX JOURNEY 5K", desc: "Autoimmune disease awareness walk" }
                ].map((event, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border border-slate-100 hover:border-brand-orange transition-all group">
                    <div className="text-center shrink-0">
                      <p className="text-brand-orange font-bold text-xl leading-none">{event.date}</p>
                      <p className="text-slate-400 text-xs font-bold mt-1 uppercase">{event.time}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{event.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/events" className="mt-10 w-full bg-brand-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange hover:text-brand-navy transition-all flex items-center justify-center gap-2">
                View All Events <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Column 2: Fundraising & Impact Graphic Display */}
            <ImpactGraphicDisplay />
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section id="donate" className="py-24 bg-brand-orange/10 border-y border-brand-orange/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-brand-navy mb-10 leading-snug">
            Donate today! Every dollar donated goes towards a healthier future for teens and young adults.
          </p>
          <a 
            href="https://givebutter.com/Xw31DB"
            target="_blank"
            rel="noopener noreferrer"
            data-givebutter-widget-id="Xw31DB"
            data-account="runnershigh"
            className="bg-brand-navy text-brand-orange px-14 py-6 rounded-full font-black text-3xl hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            DONATE
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

const ResourcesHub = () => {
  const resourceCards = [
    {
      title: "Mental Health",
      description: "Find coping strategies, stress-management techniques, and professional support networks tailored for teens and young adults.",
      icon: <Brain className="w-10 h-10" />,
      link: "/resources/mental-health",
      cta: "Explore Mental Health"
    },
    {
      title: "Physical Health",
      description: "Discover how running and physical activity can transform your life, build resilience, and establish healthy routines.",
      icon: <Activity className="w-10 h-10" />,
      link: "/resources/physical-health",
      cta: "Explore Physical Health"
    },
    {
      title: "Substance Abuse",
      description: "Access critical recovery tools, prevention education, and a safe community dedicated to breaking the cycle of addiction.",
      icon: <Shield className="w-10 h-10" />,
      link: "/resources/substance-abuse",
      cta: "Explore Prevention & Recovery"
    }
  ];

  const familyCards = [
    {
      title: "Family: Mental Health",
      description: "Support for families navigating mental health challenges together. Find guidance on how to support your loved ones.",
      icon: <Users className="w-10 h-10" />,
      link: "/resources/family-mental-health",
      cta: "Family Support"
    },
    {
      title: "Family: Physical Health",
      description: "Resources for parents and families managing physical health needs and fostering healthy environments at home.",
      icon: <Heart className="w-10 h-10" />,
      link: "/resources/family-physical-health",
      cta: "Family Wellness"
    },
    {
      title: "Family: Substance Abuse",
      description: "Support groups and recovery tools specifically designed for the families and friends of those on the journey to recovery.",
      icon: <ShieldCheck className="w-10 h-10" />,
      link: "/resources/family-substance-abuse",
      cta: "Family Recovery"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-brand-navy to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop" 
            alt="Supportive group" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Health & Recovery Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering you with the knowledge, tools, and community support to take charge of your well-being. Select a topic below to explore our dedicated resources.
          </motion.p>
        </div>
      </section>

      {/* Personal Resources Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl font-bold text-brand-navy mb-4">Personal Resources</h2>
          <p className="text-slate-500 text-lg">Tools and support for your individual journey.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {resourceCards.map((card, idx) => (
            <motion.div 
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col"
            >
              <div className="w-20 h-20 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <h2 className="text-3xl font-bold text-brand-navy mb-4">{card.title}</h2>
              <p className="text-slate-600 mb-10 flex-grow leading-relaxed">
                {card.description}
              </p>
              <Link 
                to={card.link}
                className="inline-flex items-center gap-2 text-brand-navy font-bold group-hover:text-brand-orange transition-colors"
              >
                {card.cta} <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Family & Friends Resources Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-bold text-brand-navy mb-4">Family & Friends Resources</h2>
            <p className="text-slate-500 text-lg">Support systems for those standing by their loved ones.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {familyCards.map((card, idx) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-slate-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col"
              >
                <div className="w-20 h-20 bg-brand-navy/5 text-brand-navy rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                <h2 className="text-3xl font-bold text-brand-navy mb-4">{card.title}</h2>
                <p className="text-slate-600 mb-10 flex-grow leading-relaxed">
                  {card.description}
                </p>
                <Link 
                  to={card.link}
                  className="inline-flex items-center gap-2 text-brand-navy font-bold group-hover:text-brand-orange transition-colors"
                >
                  {card.cta} <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Callout */}
      <section className="bg-brand-orange py-20">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 leading-tight">
              Want to take our resources on the go?
            </h3>
            <p className="text-brand-navy/80 text-xl font-medium">
              Download the comprehensive Runner's High Resource Brochure for 2026.
            </p>
          </div>
          <a 
            href="https://drive.google.com/file/d/1I3KTsX62PkWE6hiawC9ABTP8phQGYow3/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-navy text-brand-orange px-10 py-5 rounded-full font-bold text-xl flex items-center gap-3 hover:bg-white transition-all shadow-xl whitespace-nowrap"
          >
            <Download className="w-6 h-6" /> Download Brochure (PDF)
          </a>
        </div>
      </section>
    </div>
  );
};

const ResourceDetail = ({ title, type, icon: Icon }: { title: string, type: Resource['type'], icon: any }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userLocation, setUserLocation] = useState<{ city: string; region: string; country: string } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showNearMeOnly, setShowNearMeOnly] = useState(false);

  useEffect(() => {
    // Detect location on mount
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserLocation({
        city: data.city,
        region: data.region,
        country: data.country_name
      });
    } catch (error) {
      console.error("Failed to detect location:", error);
    } finally {
      setIsDetecting(false);
    }
  };

  const filteredResources = resources.filter(res => {
    if (res.type !== type) return false;
    
    const matchesSearch = 
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.areasOfService.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    
    const matchesLocation = !showNearMeOnly || (
      res.areasOfService.toLowerCase().includes("national") ||
      (userLocation && (
        res.areasOfService.toLowerCase().includes(userLocation.region.toLowerCase()) ||
        res.areasOfService.toLowerCase().includes(userLocation.city.toLowerCase()) ||
        (userLocation.region === "Texas" && res.areasOfService.toLowerCase().includes("texas"))
      ))
    );

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = ["All", ...new Set(resources.filter(r => r.type === type).map(r => r.category))];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/resources" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-brand-orange transition-colors">
            <X className="w-4 h-4 rotate-45" /> Back to Resources
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-orange text-brand-navy rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-navy tracking-tight">{title}</h1>
                <p className="text-slate-500 font-medium mt-1">Explore verified resources and support networks.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <MapPin className="w-4 h-4 text-brand-orange" />
                {isDetecting ? "Detecting location..." : userLocation ? `${userLocation.city}, ${userLocation.region}` : "Location not detected"}
                <button onClick={detectLocation} className="ml-2 text-brand-orange hover:underline">Refresh</button>
              </div>
              <button 
                onClick={() => setShowNearMeOnly(!showNearMeOnly)}
                className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${showNearMeOnly ? 'bg-brand-orange text-brand-navy' : 'bg-brand-navy text-white hover:bg-slate-800'}`}
              >
                <Navigation className="w-4 h-4" />
                {showNearMeOnly ? "Showing Local + National" : "Show Near Me Only"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, category, or area..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="text-slate-400 w-5 h-5 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-brand-navy text-brand-orange' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Resource List */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res, idx) => (
              <motion.div 
                key={res.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {res.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase">
                    <Clock className="w-3 h-3" /> {res.hours}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-orange transition-colors">{res.name}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Users className="w-4 h-4 mt-1 text-brand-orange shrink-0" />
                    <span>{res.populationsServed}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mt-1 text-brand-orange shrink-0" />
                    <span>{res.areasOfService}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Globe className="w-4 h-4 mt-1 text-brand-orange shrink-0" />
                    <span className="break-all">{res.address}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={`tel:${res.contact}`}
                    className="flex items-center justify-center gap-2 bg-slate-50 text-brand-navy py-3 rounded-xl font-bold hover:bg-brand-orange hover:text-white transition-all"
                  >
                    <Phone className="w-4 h-4" /> {res.contact}
                  </a>
                  <a 
                    href={res.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-navy text-white py-3 rounded-xl font-bold hover:bg-brand-orange hover:text-brand-navy transition-all"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-brand-navy mb-2">No resources found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setShowNearMeOnly(false); }}
              className="mt-6 text-brand-orange font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Crisis Banner */}
      <section className="bg-brand-navy py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <h4 className="text-2xl font-bold mb-2">Need Immediate Support?</h4>
            <p className="text-slate-400">Help is available 24/7. You are not alone.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <Phone className="text-brand-orange w-8 h-8" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Crisis Line</p>
                <p className="text-xl font-black text-white">988</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <Mail className="text-brand-orange w-8 h-8" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Text Support</p>
                <p className="text-xl font-black text-white">HOME to 741741</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WhoWeAre = () => {
  const stats = [
    { number: "10+", label: "Annual Race Events" },
    { number: "$5,302+", label: "Funds Raised for Youth Health" },
    { number: "1", label: "Unified Supportive Community" }
  ];

  const team = [
    {
      name: "William Rossi",
      role: "Founder & Executive Director",
      bio: "Driven by personal loss and a passion for community health, William founded Runner's High to ensure no one runs their recovery journey alone.",
      image: "https://drive.google.com/file/d/1KCyC3FTlMW6gPL21ZA-qgDrvZJdkL-e7/view?usp=drive_link"
    },
    {
      name: "Colin Hoth",
      role: "Leadership & Strategy",
      bio: "Dedicated to advancing youth wellness programs and building supportive, inclusive communities through athletic events.",
      image: ""
    },
    {
      name: "Raheel Amnsury",
      role: "Community Outreach & Programs",
      bio: "Passionate about youth advocacy, organizing non-competitive 5Ks, and establishing peer health support circles.",
      image: ""
    },
    {
      name: "Josh Burt",
      role: "Operations & Wellness Director",
      bio: "Focuses on event logistics, youth wellness initiatives, and developing active peer support networks.",
      image: "https://drive.google.com/file/d/1E6Bvm2dI3LpBJb-bc5oNn2clKUT44JMz/view?usp=drive_link",
      imagePosition: "70% 20%"
    },
    {
      name: "Julia Rhinehart",
      role: "Youth & Peer Support Specialist",
      bio: "Empowering students and young adults through fitness education, mental health awareness, and peer guidance.",
      image: ""
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=2070&auto=format&fit=crop" 
            alt="Group of diverse young adults running" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-navy/60" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            More Than Just a Run.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            We are a community dedicated to outrunning addiction, breaking mental health stigmas, and empowering students through the transformative power of physical fitness.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-brand-orange/20 text-brand-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
              How We Started
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed">
              Runner's High was born out of a simple but powerful idea: that physical movement can be a catalyst for profound mental and emotional healing. Recognizing the rising challenges of substance abuse and mental health struggles among students and young adults, we created a safe, inclusive space where individuals can find support, purpose, and community through running.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-brand-orange pl-6">
              "We believe that every step taken on the pavement is a step away from isolation and a step closer to a healthier, more connected life."
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop" 
                alt="Early race event" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-orange leading-tight">
                Our Mission: Runner's High is committed to providing support, raising awareness, and fostering a community where students empower one another.
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We envision a world where every young adult has the resources, resilience, and community backing to choose health and recovery over isolation and addiction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-6xl font-black text-brand-navy tracking-tighter">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-brand-orange uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">The People Behind the Stride</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all text-center group flex flex-col justify-between"
            >
              <div>
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-brand-orange transition-colors bg-slate-100 flex items-center justify-center shadow-inner">
                  {member.image ? (
                    <img 
                      src={formatDriveImageUrl(member.image)} 
                      alt={member.name} 
                      className="w-full h-full object-cover" 
                      style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                      referrerPolicy="no-referrer" 
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 text-slate-400 flex flex-col items-center justify-center">
                      <User className="w-16 h-16 stroke-[1.5]" />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-1">{member.name}</h3>
                <p className="text-brand-orange font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy">Ready to make an impact?</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Whether you want to lace up your shoes for our next race or help fund our recovery resources, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/events"
              className="w-full sm:w-auto bg-brand-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-orange hover:text-brand-navy transition-all shadow-lg"
            >
              View Upcoming Events
            </Link>
            <a 
              href="https://givebutter.com/Xw31DB"
              target="_blank"
              rel="noopener noreferrer"
              data-givebutter-widget-id="Xw31DB"
              data-account="runnershigh"
              className="w-full sm:w-auto bg-brand-orange text-brand-navy px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-lg text-center"
            >
              Donate Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const UpcomingEvents = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      month: "OCT",
      day: "12",
      title: "Runner's High Annual 5K for Recovery",
      location: "The Woodlands, TX",
      description: "Join our flagship 5K run! All proceeds go directly toward funding our 2026 youth mental health resources.",
      type: "Hosted by Runner's High",
      monthName: "October"
    },
    {
      id: 2,
      month: "NOV",
      day: "05",
      title: "Community Wellness Mile",
      location: "Houston, TX",
      description: "A family-friendly mile walk/run focused on community connection and mental health awareness.",
      type: "Hosted by Runner's High",
      monthName: "November"
    },
    {
      id: 3,
      month: "NOV",
      day: "18",
      title: "Turkey Trot for Teens",
      location: "Austin, TX",
      description: "Partnering with local schools to raise funds for substance abuse prevention programs.",
      type: "Partner Races",
      monthName: "November"
    },
    {
      id: 4,
      month: "DEC",
      day: "02",
      title: "Holiday Lights Night Run",
      location: "The Woodlands, TX",
      description: "A festive night run through the holiday lights to support our winter outreach initiatives.",
      type: "Hosted by Runner's High",
      monthName: "December"
    },
    {
      id: 5,
      month: "JAN",
      day: "15",
      title: "New Year, New Stride 10K",
      location: "Virtual Event",
      description: "Start the year strong with our virtual 10K. Run anywhere, anytime, for the cause.",
      type: "Hosted by Runner's High",
      monthName: "January"
    },
    {
      id: 6,
      month: "FEB",
      day: "10",
      title: "Heart & Sole Half Marathon",
      location: "Galveston, TX",
      description: "A beautiful coastal run supporting physical health and resilience in young adults.",
      type: "Partner Races",
      monthName: "February"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === "All" || event.type === filter || event.monthName === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = ["All", "Hosted by Runner's High", "Partner Races", "October", "November", "December", "January", "February"];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?q=80&w=2070&auto=format&fit=crop" 
            alt="Runners at a starting line" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-navy/60" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Lace Up For a Cause.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            Come join us in the 10+ race events we host and participate in. Every mile you run helps build a healthier future for teens and young adults.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-slate-50 border-b border-slate-100 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search events or locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-sans"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="text-brand-navy w-5 h-5 shrink-0" />
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                  filter === option 
                    ? "bg-brand-navy text-brand-orange shadow-lg" 
                    : "bg-white text-slate-600 border border-slate-200 hover:border-brand-orange"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Roster */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        {filteredEvents.length > 0 ? (
          <div className="grid gap-8">
            {filteredEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Date Box */}
                <div className="bg-brand-navy text-brand-orange w-32 h-32 rounded-3xl flex flex-col items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-sm font-black uppercase tracking-widest">{event.month}</span>
                  <span className="text-4xl font-black">{event.day}</span>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left space-y-4">
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="bg-brand-orange/10 text-brand-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {event.type}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                    {event.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto shrink-0">
                  <button className="bg-brand-orange text-brand-navy px-8 py-4 rounded-2xl font-bold hover:bg-brand-navy hover:text-white transition-all shadow-md whitespace-nowrap">
                    Register Now
                  </button>
                  <button className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all whitespace-nowrap">
                    Volunteer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-3xl font-bold text-brand-navy mb-4">No events found</h3>
            <p className="text-slate-500 text-lg">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setFilter("All"); setSearchQuery(""); }}
              className="mt-8 text-brand-orange font-bold hover:underline text-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Why Run With Us Banner */}
      <section className="bg-brand-navy py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Not a runner? You can still make a difference.</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                You don't need a fast pace to be part of our community. We are always looking for enthusiastic volunteers to hand out water, manage registration, and cheer on our participants.
              </p>
            </div>
            <button className="bg-brand-orange text-brand-navy px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white transition-all shadow-2xl whitespace-nowrap">
              Sign Up to Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Integration */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          <div className="w-20 h-20 bg-brand-orange/10 text-brand-orange rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy">Never miss a starting gun.</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Sign up for our weekly newsletter to get notified about new race additions, training tips, and community meetups.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-8 py-5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-sans text-lg"
              required
            />
            <button className="bg-brand-navy text-brand-orange px-12 py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg">
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

const Donate = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-brand-navy tracking-tight">
            Support Our Mission
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your contribution helps us provide mental health resources and recovery support to our community.
          </p>
        </motion.div>

        {/* Centered Widget Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white rounded-[3rem] shadow-2xl shadow-brand-navy/5 border border-slate-100 overflow-hidden p-8 min-h-[600px] flex flex-col items-center justify-center"
        >
          <div className="w-full" dangerouslySetInnerHTML={{ __html: '<givebutter-widget id="Xw31DB" account="runnershigh"></givebutter-widget>' }} />
          
          {/* Fallback Button */}
          <div className="mt-12 pt-8 border-t border-slate-100 w-full">
            <p className="text-slate-500 mb-4">Having trouble with the widget?</p>
            <a 
              href="https://givebutter.com/Xw31DB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-orange text-brand-navy px-10 py-4 rounded-2xl font-bold text-lg hover:bg-brand-navy hover:text-white transition-all shadow-lg"
            >
              Donate via Givebutter
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const OurSupporters = () => {
  const corporatePartners = [
    { 
      name: "Walmart", 
      filename: "Walmart Logo.png",
      logo: formatDriveImageUrl(
        localStorage.getItem("runners_high_logo_Walmart") || "",
        "https://logo.clearbit.com/walmart.com"
      ) 
    },
    { 
      name: "Chipotle", 
      filename: "Chipotle Logo.png",
      logo: formatDriveImageUrl(
        localStorage.getItem("runners_high_logo_Chipotle") || "",
        "https://logo.clearbit.com/chipotle.com"
      ) 
    },
    { 
      name: "Costco", 
      filename: "Costco Logo.jpg",
      logo: formatDriveImageUrl(
        localStorage.getItem("runners_high_logo_Costco") || "",
        "https://logo.clearbit.com/costco.com"
      ) 
    },
    { 
      name: "H-E-B", 
      filename: "HEB LOGO.jpg",
      logo: formatDriveImageUrl(
        localStorage.getItem("runners_high_logo_HEB") || "",
        "https://logo.clearbit.com/heb.com"
      ) 
    }
  ];

  const individualDonors = {
    champions: ["The Henderson Family", "Michael R.", "Sarah J.", "The Miller Foundation", "Robert & Linda K."],
    friends: ["Emily Chen", "David Thompson", "Jessica Williams", "The Garcia Family", "Mark Stevens", "Amanda L.", "Chris P.", "The O'Connor Family"],
    supporters: ["John D.", "Lisa M.", "Kevin S.", "Rachel B.", "Tom H.", "Stephanie W.", "Brian G.", "Nicole R.", "Jason F.", "Maria V.", "Daniel K.", "Laura S."]
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 tracking-tight"
          >
            The Heart of Our Mission.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Runner’s High is powered by the generosity of our corporate partners and the dedicated individuals who believe in a healthier future for our youth.
          </motion.p>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-brand-navy">Corporate Partners</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A special thanks to the businesses and organizations that sponsor our 10+ annual race events and fund our recovery resources.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-20">
          {corporatePartners.map((partner, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center transition-all hover:shadow-xl hover:border-brand-orange/30 group"
            >
              <div className="h-16 w-full flex items-center justify-center mb-4">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-14 max-w-full w-auto object-contain transition-transform group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-brand-navy text-sm md:text-base group-hover:text-brand-orange transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-3xl p-10 text-center max-w-2xl mx-auto border border-slate-100">
          <p className="text-lg text-slate-600 mb-6">Interested in becoming a corporate sponsor?</p>
          <button className="bg-brand-navy text-brand-orange px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-md">
            Partner With Us
          </button>
        </div>
      </section>

      {/* Impact Bar */}
      <section className="bg-brand-orange py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-brand-navy font-black text-2xl uppercase tracking-tighter mx-8">
              Total Impact: $3,203 raised and counting! • Every step matters • Join the movement •
            </span>
          ))}
        </div>
      </section>

      {/* Individual Donors Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-bold text-brand-navy">Individual Supporters</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Every dollar is a step toward a healthier tomorrow. We are incredibly grateful to the following individuals for their contributions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 mb-24">
          {/* Champion Supporters */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center text-brand-orange">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Champion Supporters</h3>
            </div>
            <div className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-4">$500+ Contribution</div>
            <ul className="space-y-3">
              {individualDonors.champions.map((name, i) => (
                <li key={i} className="text-lg text-slate-700 font-medium border-b border-slate-50 pb-2">{name}</li>
              ))}
            </ul>
          </div>

          {/* Community Friends */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center text-brand-navy">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Community Friends</h3>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">$100+ Contribution</div>
            <ul className="space-y-3">
              {individualDonors.friends.map((name, i) => (
                <li key={i} className="text-lg text-slate-600 border-b border-slate-50 pb-2">{name}</li>
              ))}
            </ul>
          </div>

          {/* Supporters */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Supporters</h3>
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Valued Contributors</div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {individualDonors.supporters.map((name, i) => (
                <li key={i} className="text-base text-slate-500 border-b border-slate-50 pb-2">{name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center space-y-8">
          <h3 className="text-3xl font-bold text-brand-navy">Join these heroes in making a difference.</h3>
          <a 
            href="https://givebutter.com/Xw31DB"
            target="_blank"
            rel="noopener noreferrer"
            data-givebutter-widget-id="Xw31DB"
            data-account="runnershigh"
            className="inline-block bg-brand-orange text-brand-navy px-12 py-5 rounded-2xl font-bold text-xl hover:bg-brand-navy hover:text-white transition-all shadow-xl"
          >
            Donate Today
          </a>
        </div>
      </section>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const faqData = [
    {
      category: "About Runner's High & Our Resources",
      questions: [
        {
          id: "q1",
          q: "Who can use the resources provided by Runner's High?",
          a: "Our resources and community are primarily tailored for students, teens, and young adults seeking support for mental health, physical health, or substance abuse recovery. However, anyone in need is welcome to use our free guides and brochures."
        },
        {
          id: "q2",
          q: "Are your resources a replacement for professional medical help?",
          a: "No. While we provide robust community support, education, and coping strategies, we always encourage individuals experiencing severe mental health crises or addiction to seek help from licensed medical professionals."
        }
      ]
    },
    {
      category: "Events & Participation",
      questions: [
        {
          id: "q3",
          q: "How do I sign up for the 10+ race events you host?",
          a: "You can view all upcoming races and register directly through our 'Upcoming events' page. We welcome runners of all experience levels!"
        },
        {
          id: "q4",
          q: "Do I have to be a runner to participate in the community?",
          a: "Not at all! You can volunteer at our events, join our educational sessions, or simply be part of our supportive network."
        }
      ]
    },
    {
      category: "Donations & Partnerships",
      questions: [
        {
          id: "q5",
          q: "Where exactly does my donation go?",
          a: "Every dollar goes toward a healthier future for teens and young adults. Funds are used to organize our 10+ race events, develop educational materials (like our annual Resource Brochure), and support our community outreach programs."
        },
        {
          id: "q6",
          q: "How can my company partner with Runner's High?",
          a: "We love collaborating with health-conscious and community-driven brands! Please visit our 'Partners' page or reach out to us directly to discuss sponsorship opportunities."
        }
      ]
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-brand-navy mb-6 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Got questions? We've got answers. Learn more about how Runner's High operates, how you can get involved, and where your donations go.
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <div className="space-y-16">
          {faqData.map((category, catIdx) => (
            <div key={category.category} className="space-y-6">
              <h2 className="text-2xl font-bold text-brand-navy uppercase tracking-wider border-l-4 border-brand-orange pl-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    <button 
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                      <span className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors pr-4">
                        {item.q}
                      </span>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === item.id ? 'bg-brand-orange text-brand-navy rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                        {openIndex === item.id ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-8 pb-8 text-slate-600 leading-relaxed text-lg border-t border-slate-50 pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="bg-brand-navy rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full -ml-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Still have questions or need to reach out?</h2>
            <p className="text-xl text-slate-400 mb-12">
              Our team is here for you. Whether you want to partner with us or just need someone to talk to, don't hesitate to connect.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:info@runnershighngo.org"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-orange text-brand-navy px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all shadow-lg"
              >
                <Mail className="w-6 h-6" /> Email Us
              </a>
              <a 
                href="tel:+13462688315"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-brand-navy transition-all"
              >
                <Phone className="w-6 h-6" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
    <h1 className="text-5xl font-bold text-brand-navy mb-6">{title}</h1>
    <p className="text-xl text-slate-600 max-w-2xl">
      We are currently building this page to provide you with the best possible experience. Please check back soon!
    </p>
    <Link to="/" className="mt-10 bg-brand-navy text-brand-orange px-8 py-3 rounded-full font-bold">
      Back to Home
    </Link>
  </div>
);

const Newsletter = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-brand-navy mb-6">CHECK OUT OUR NEWSLETTER</h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-10">
          Each week we send out our newsletter to your email notifying you of upcoming events, interesting facts about mental health & drug addiction recovery, new sponsors and companies we partner up with, and new resources & research to keep y'all up to date in the health-conscious world!
        </p>
        
        <div id="mc_embed_shell" className="max-w-xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div id="mc_embed_signup">
            <form 
              action="https://runnershighngo.us20.list-manage.com/subscribe/post?u=a55dd708170ea525e783386c2&amp;id=b08ac864c8&amp;f_id=004b64eef0" 
              method="post" 
              id="mc-embedded-subscribe-form" 
              name="mc-embedded-subscribe-form" 
              className="validate flex flex-col gap-4" 
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group text-left mb-4">
                  <label htmlFor="mce-EMAIL" className="block text-sm font-bold text-brand-navy mb-2">
                    Email Address <span className="text-brand-orange">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="EMAIL" 
                    className="required email w-full px-5 py-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange text-slate-800 transition-all" 
                    id="mce-EMAIL" 
                    placeholder="Enter your email address"
                    required 
                    defaultValue="" 
                  />
                </div>

                <div id="mce-responses" className="clear foot">
                  <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                  <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                </div>

                {/* Real people should not fill this in to prevent form bot signups */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                  <input 
                    type="text" 
                    name="b_a55dd708170ea525e783386c2_b08ac864c8" 
                    tabIndex={-1} 
                    defaultValue="" 
                  />
                </div>

                <div className="optionalParent mt-4">
                  <div className="clear foot flex flex-col items-center gap-4">
                    <button 
                      type="submit" 
                      name="subscribe" 
                      id="mc-embedded-subscribe" 
                      className="button w-full bg-brand-navy text-brand-orange hover:bg-slate-800 font-extrabold px-8 py-4 rounded-xl text-lg transition-all shadow-md cursor-pointer"
                    >
                      Subscribe
                    </button>
                    
                    <p style={{ margin: "0px auto" }}>
                      <a 
                        href="http://eepurl.com/jvWK0Q" 
                        title="Mailchimp - email marketing made easy and fun"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="inline-block bg-transparent rounded-md">
                          <img 
                            className="refferal_badge" 
                            src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" 
                            alt="Intuit Mailchimp" 
                            style={{ width: "220px", height: "40px", display: "flex", padding: "2px 0px", justifyContent: "center", alignItems: "center" }} 
                          />
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourcesHub />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/resources/mental-health" element={<ResourceDetail title="Mental Health" type="mental-health" icon={Brain} />} />
          <Route path="/resources/physical-health" element={<ResourceDetail title="Physical Health" type="physical-health" icon={Activity} />} />
          <Route path="/resources/substance-abuse" element={<ResourceDetail title="Substance Abuse" type="substance-abuse" icon={Shield} />} />
          <Route path="/resources/family-mental-health" element={<ResourceDetail title="Family Mental Health" type="family-mental-health" icon={Users} />} />
          <Route path="/resources/family-physical-health" element={<ResourceDetail title="Family Physical Health" type="family-physical-health" icon={Heart} />} />
          <Route path="/resources/family-substance-abuse" element={<ResourceDetail title="Family Substance Abuse" type="family-substance-abuse" icon={ShieldCheck} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/partners" element={<OurSupporters />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ai-security" element={<SecurityDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}



