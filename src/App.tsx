import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, ArrowRight, ShieldCheck, Gem, Clock, MapPin, Phone, Mail, Car, MessageCircle, CalendarDays, CalendarRange, Calendar, Settings2, Search, Sparkles, Users, Fuel, ArrowUpDown, Send, Star } from 'lucide-react';
import { translations, Language } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{name: string, price: string, image: string} | null>(null);
  
  const defaultToday = new Date().toISOString().split('T')[0];
  const defaultTomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const computedDays = useMemo(() => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [fromDate, toDate]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const navLinks = [
    { name: t.navHome, href: "#home", onClick: () => { setCurrentView('home'); setIsMenuOpen(false); } },
    { name: t.navAllCars, href: currentView === 'home' ? "#all-cars" : "#", onClick: () => { setCurrentView('catalog'); setIsMenuOpen(false); window.scrollTo(0,0); } },
    { name: t.navServices, href: "#services", onClick: () => { setCurrentView('home'); setIsMenuOpen(false); } },
    { name: t.navContact, href: "#contact", onClick: () => { setCurrentView('home'); setIsMenuOpen(false); } },
  ];

  const defaultCarImage = "https://images.unsplash.com/photo-1606664824334-fcba8f19dafe?auto=format&fit=crop&q=80&w=800";
  const allCarsList = [
    { name: "VW Touareg Extreme", price: "900", category: "premium", image: "/vw-touareg-extreme.png" },
    { name: "Mercedes Classe E", price: "800", category: "premium", image: "/mercedesE.png" },
    { name: "Mercedes Classe V", price: "1200", category: "premium", image: "/MercedesclasseV.png" },
    { name: "Golf 8 R", price: "900", category: "premium", image: "/golf8r.png" },
    { name: "Cupra Formentor", price: "800", category: "premium", image: "/cupra-formentor.png" },
    { name: "Kia Sportage", price: "700", category: "standard", image: "/2026-Kia-Sportage.png" },
    { name: "Hyundai Tucson", price: "600", category: "standard", image: "/hyundaiucson.png" },
    { name: "Audi A3", price: "1000", category: "standard", image: "/audi-a3.png" },
    { name: "VW T-Roc", price: "700", category: "standard", image: "/troc.png" },
    { name: "VW Golf 8", price: "800", category: "compact", image: "/golf8.png" },
    { name: "Mercedes Classe A", price: "1000", category: "compact", image: "/mercedesclassA.png" },
    { name: "Mercedes Classe A Black", price: "1000", category: "compact", image: "/mercedesclassAblack.png" },
    { name: "Seat Ibiza", price: "350", category: "economy", image: "/seat-ibiza.png" },
    { name: "Hyundai Accent", price: "350", category: "economy", image: "/Hyundai-Accent.webp" },
    { name: "Renault Clio 5", price: "400", category: "economy", image: "/clio5.png" },
    { name: "Dacia Logan", price: "250", category: "economy", image: "/dacia-logan.png" },
  ];

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'economy', label: t.filterEconomy },
    { id: 'compact', label: t.filterCompact },
    { id: 'standard', label: t.filterStandard },
    { id: 'premium', label: t.filterPremium },
  ];

  const filteredCars = activeCategory === 'all' 
    ? allCarsList 
    : allCarsList.filter(car => car.category === activeCategory);

  const catalogCars = useMemo(() => {
    const filtered = allCarsList.filter(car => {
      const matchSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = selectedBrand === 'all' || car.name.split(' ')[0] === selectedBrand;
      return matchSearch && matchBrand;
    });

    return filtered.sort((a, b) => {
      const priceA = parseInt(a.price);
      const priceB = parseInt(b.price);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }, [searchQuery, selectedBrand, sortOrder]);

  const brands = useMemo(() => {
    return Array.from(new Set(allCarsList.map(c => c.name.split(' ')[0])));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-500/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#home" onClick={() => setCurrentView('home')} className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 border border-amber-500/30 rotate-45 group-hover:rotate-90 transition-all duration-700 ease-out">
              <div className="absolute inset-1 border border-amber-500/20" />
              <span className="font-serif text-amber-500 -rotate-45 group-hover:-rotate-90 transition-all duration-700 ease-out text-xl">B</span>
            </div>
            <div className="flex flex-col items-start rtl:items-end">
              <span className="text-2xl font-serif tracking-[0.2em] bg-gradient-to-r from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent">BOUDADEN</span>
              <span className="text-[0.55rem] tracking-[0.4em] text-zinc-400 uppercase">Luxury Cars</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    onClick={link.onClick}
                    className="text-sm uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-amber-500 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              className="p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-24 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-6 flex flex-col gap-6"
          >
            {navLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.href} 
                onClick={link.onClick}
                className="text-sm uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { toggleLang(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-300 hover:text-amber-500 transition-colors pt-4 border-t border-zinc-800"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Changer en Arabe' : 'التبديل للفرنسية'}</span>
            </button>
          </motion.div>
        )}
      </nav>

      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-950">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Mercedes-AMG_S_63_%28W223%29_IMG_8215.jpg" 
            alt="Luxury Mercedes Showcase" 
            className="w-full h-full object-cover opacity-60 scale-105 contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light"
          >
            {t.heroSubtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => setCurrentView('catalog')}
              className="bg-gold-gradient border-none text-zinc-950 px-8 py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-gold-gradient-light transition-colors w-full sm:w-auto"
            >
              {t.navAllCars}
            </button>
            <a href="#contact" className="border border-zinc-700 px-8 py-4 uppercase tracking-[0.2em] text-sm hover:border-amber-500 hover:text-amber-500 transition-colors w-full sm:w-auto">
              {t.bookNow}
            </a>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block border border-amber-500/30 text-[#cbb26a] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-8">
              {t.bookOnlineBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-lg mx-auto">
              {t.stepsTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 md:gap-12 relative">
            <div className="relative text-left py-10 border-b border-zinc-800/60 md:border-none md:py-0">
              <div className="text-7xl font-black bg-gradient-to-b from-[#d4af37] to-[#7a5c13] bg-clip-text text-transparent mb-2 tracking-tighter">
                {t.step1Num}
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{t.step1Title}</h3>
              <p className="text-zinc-400 font-light text-[15px] leading-relaxed">{t.step1Desc}</p>
            </div>
            
            <div className="relative text-left py-10 border-b border-zinc-800/60 md:border-none md:py-0">
              <div className="text-7xl font-black bg-gradient-to-b from-[#eed48f] to-[#997920] bg-clip-text text-transparent mb-2 tracking-tighter">
                {t.step2Num}
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{t.step2Title}</h3>
              <p className="text-zinc-400 font-light text-[15px] leading-relaxed">{t.step2Desc}</p>
            </div>
            
            <div className="relative text-left pt-10 md:pt-0">
              <div className="text-7xl font-black bg-gradient-to-b from-[#d4af37] to-[#7a5c13] bg-clip-text text-transparent mb-2 tracking-tighter">
                {t.step3Num}
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{t.step3Title}</h3>
              <p className="text-zinc-400 font-light text-[15px] leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Cars Section */}
      <section id="all-cars" className="py-32 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-amber-500 uppercase tracking-[0.3em] text-sm block mb-4">{t.navAllCars}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{t.allCarsTitle}</h2>
            <p className="text-zinc-400 font-light text-lg max-w-2xl mx-auto">{t.allCarsDesc}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full border text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-transparent bg-gold-gradient text-zinc-950 font-semibold'
                    : 'border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-500'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCars.slice(0, 6).map((car, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={car.name} 
                  className="group relative overflow-hidden bg-zinc-950 aspect-[4/5] sm:aspect-[4/3] rounded-xl cursor-pointer border border-zinc-800 hover:border-amber-500/50 transition-colors"
                >
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col items-start transition-transform duration-500">
                    <h3 className="text-lg sm:text-xl font-serif mb-2">{car.name}</h3>
                    <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-4">
                      <p className="text-zinc-300 font-light flex items-center gap-1">
                        <span className="text-[10px] sm:text-xs">{t.pricePrefix}</span>
                        <span className="text-amber-500 text-base sm:text-lg font-bold">{car.price}</span>
                        <span className="text-[10px] sm:text-xs">{t.priceSuffix}</span>
                      </p>
                      <button 
                        onClick={() => { setSelectedCar(car); setFromDate(''); setToDate(''); }}
                        className="text-[10px] sm:text-xs tracking-widest uppercase bg-gold-gradient border-none text-zinc-950 px-4 py-2 hover:bg-gold-gradient-light transition-colors font-semibold cursor-pointer w-full sm:w-auto text-center"
                      >
                        {t.bookNow}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 flex justify-center">
            <button
              onClick={() => {
                setCurrentView('catalog');
                window.scrollTo(0, 0);
              }}
              className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-white px-8 py-4 rounded-xl transition-all duration-300"
            >
              <span className="uppercase tracking-[0.2em] text-sm">{t.viewFullCatalog}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-amber-500 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-700">
            <span className="text-amber-500 uppercase tracking-[0.3em] text-sm block mb-4">{t.whyChooseUs}</span>
            <h2 className="text-4xl md:text-5xl font-serif">{t.servicesHeading}</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              { icon: <CalendarDays className="w-10 h-10 stroke-1" />, title: t.serviceDailyTitle, desc: t.serviceDailyDesc },
              { icon: <CalendarRange className="w-10 h-10 stroke-1" />, title: t.serviceWeeklyTitle, desc: t.serviceWeeklyDesc },
              { icon: <Calendar className="w-10 h-10 stroke-1" />, title: t.serviceMonthlyTitle, desc: t.serviceMonthlyDesc },
              { icon: <Settings2 className="w-10 h-10 stroke-1" />, title: t.serviceFlexibleTitle, desc: t.serviceFlexibleDesc },
              { icon: <Clock className="w-10 h-10 stroke-1" />, title: t.service247Title, desc: t.service247Desc }
            ].map((feature, idx) => (
              <div key={idx} className="group flex flex-col items-start p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-amber-500/30 transition-colors">
                <div className="text-amber-500 mb-8 p-4 rounded-full bg-zinc-950 border border-zinc-800 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City/Stats Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <span className="flex items-center gap-2 border border-amber-500/30 text-[#cbb26a] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase px-5 py-2 rounded-full bg-zinc-950/50 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5" />
              {t.statsSectionBadge}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            {lang === 'fr' ? t.statsSectionTitle.split('Skhirate')[0] : t.statsSectionTitle.split('الصخيرات')[0]}
            <span className="text-amber-500">
              {lang === 'fr' ? 'Skhirate' : 'الصخيرات'}
            </span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent relative">
              <Send className="w-4 h-4 text-amber-500 absolute -top-2 left-1/2 -translate-x-1/2 rotate-[-20deg]" />
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-zinc-400 font-light text-lg md:text-xl max-w-2xl mx-auto mb-20 leading-relaxed"
          >
            {t.statsSectionDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto grid grid-cols-3 gap-0 border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900/20 backdrop-blur-sm"
          >
            <div className="p-4 sm:p-10 border-r border-white/5 flex flex-col items-center justify-center group hover:bg-zinc-900 transition-all duration-500">
              <span className="text-2xl sm:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-amber-500 transition-colors duration-500">{t.statsVehiclesValue}</span>
              <span className="text-[7px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-zinc-500 uppercase font-bold">{t.statsVehiclesLabel}</span>
            </div>
            <div className="p-4 sm:p-10 border-r border-white/5 flex flex-col items-center justify-center group hover:bg-zinc-900 transition-all duration-500">
              <span className="text-2xl sm:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-amber-500 transition-colors duration-500">{t.statsClientsValue}</span>
              <span className="text-[7px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-zinc-500 uppercase font-bold text-center">{t.statsClientsLabel}</span>
            </div>
            <div className="p-4 sm:p-10 flex flex-col items-center justify-center group hover:bg-zinc-900 transition-all duration-500">
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <span className="text-2xl sm:text-5xl font-black text-white tracking-tighter group-hover:text-amber-500 transition-colors duration-500">{t.statsGoogleValue}</span>
                <Star className="w-3 h-3 sm:w-6 sm:h-6 text-amber-500 fill-amber-500 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <span className="text-[7px] sm:text-[10px] md:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-zinc-500 uppercase font-bold text-center">{t.statsGoogleLabel}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-amber-500 uppercase tracking-[0.3em] text-sm block mb-4">{t.navContact}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">{t.contactTitle}</h2>
            <p className="text-zinc-400 font-light text-lg mb-12 max-w-md">
              {t.contactDesc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.whatsapp || 'WhatsApp'}</p>
                  <a href="https://wa.me/212622065312" target="_blank" rel="noreferrer" className="font-serif text-xl mt-1 block hover:text-[#25D366] transition-colors" dir="ltr">+212 622 065 312</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.phone}</p>
                  <a href="tel:+212622065312" className="font-serif text-xl mt-1 block hover:text-amber-500 transition-colors" dir="ltr">+212 622 065 312</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.email}</p>
                  <a href="mailto:booking@boudadencars.com" className="font-serif text-xl mt-1 block hover:text-amber-500 transition-colors">booking@boudadencars.com</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.location || 'Location'}</p>
                  <a href="https://maps.app.goo.gl/CKccBDfxHDJs6kZ16" target="_blank" rel="noreferrer" className="font-serif text-xl mt-1 block hover:text-amber-500 transition-colors">{t.addressValue}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-2xl h-[400px] lg:h-auto min-h-[400px] relative overflow-hidden group">
            <iframe 
              src="https://maps.google.com/maps?q=Skhirate,+Morocco&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl w-full h-full object-cover"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-amber-500/20 rounded-xl" />
          </div>
        </div>
      </section>
        </>
      ) : (
        <div className="pt-32 pb-24 min-h-screen relative z-10 bg-[#161614] text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            
            {/* Header and filters */}
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="bg-[#1f1e1a]/80 border border-zinc-800 rounded-3xl p-6 md:p-8 mb-8 text-left md:text-center text-white">
                <div className="flex items-center justify-start md:justify-center mb-4">
                  <span className="flex items-center gap-2 border border-[#cbb26a]/30 text-[#cbb26a] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.collectionBadge}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.ourCatalog}</h1>
                <p className="text-zinc-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                  {t.catalogSubtitleText.replace('{count}', allCarsList.length.toString())}
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-4 mb-12">
                <div className="bg-[#181816]/90 border border-[#2a2a26] rounded-2xl p-4 flex gap-3 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`shrink-0 px-6 py-2.5 rounded-full text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 ${
                      selectedBrand === 'all'
                        ? 'bg-[#d4af37] text-black'
                        : 'border border-[#2a2a26] text-zinc-400 hover:border-[#cbb26a] hover:text-[#cbb26a]'
                    }`}
                  >
                    {t.allBrands}
                  </button>
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`shrink-0 px-6 py-2.5 rounded-full text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase transition-all duration-300 ${
                        selectedBrand === brand
                          ? 'bg-[#d4af37] text-black'
                          : 'border border-[#2a2a26] text-zinc-400 hover:border-[#cbb26a] hover:text-[#cbb26a]'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="text" 
                      placeholder={t.searchCar}
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-[#1c1c1a]/90 border border-[#2a2a26] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#d4af37] transition-colors placeholder:text-zinc-500 text-sm font-medium"
                    />
                  </div>

                  <div className="relative md:w-64">
                    <ArrowUpDown className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <select 
                      value={sortOrder}
                      onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                      className="w-full appearance-none bg-[#1c1c1a]/90 border border-[#2a2a26] rounded-xl pl-12 pr-12 py-4 text-xs font-bold tracking-[0.1em] uppercase text-zinc-300 focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="asc">{t.priceAscending}</option>
                      <option value="desc">{t.priceDescending}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Cars Grid */}
            {catalogCars.length > 0 ? (
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {catalogCars.map(car => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      key={car.name} 
                      className="group bg-[#181816] border border-[#2a2a26] rounded-3xl overflow-hidden flex flex-col relative"
                    >
                      {/* Badges */}
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="bg-black/80 backdrop-blur-md border border-[#cbb26a]/30 text-[#cbb26a] text-[9px] md:text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                          {car.category === 'economy' ? t.economyBadge : (car.category === 'premium' ? t.premiumBadge : t.standardBadge)}
                        </span>
                      </div>

                      {/* Image Section */}
                      <div className="w-full bg-[#111110] relative pt-16 pb-8 px-6 flex items-center justify-center min-h-[260px] md:min-h-[300px]">
                        <img 
                          src={car.image} 
                          alt={car.name} 
                          className="w-full max-w-[400px] h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-5 md:p-8 flex-1 flex flex-col justify-between border-t border-[#2a2a26]">
                        <div className="mb-4">
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{car.name}</h3>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-auto">
                          <div className="w-full sm:w-auto">
                            <div className="flex items-baseline gap-1.5 border-b border-zinc-800 pb-1 mb-1 w-fit">
                              <span className="text-2xl md:text-3xl font-bold text-[#d4af37] leading-none whitespace-nowrap">{car.price} {t.currency}</span>
                              <span className="text-[10px] md:text-xs text-zinc-500 font-medium">/jour</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => { setSelectedCar(car); setFromDate(''); setToDate(''); }}
                            className="w-full sm:w-auto text-[10px] md:text-xs tracking-widest uppercase bg-gold-gradient border-none text-zinc-950 px-6 py-3 hover:bg-gold-gradient-light transition-colors font-bold cursor-pointer rounded-lg shadow-lg shadow-amber-500/10"
                          >
                            {t.bookNow}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-[#181816] border border-[#2a2a26] rounded-3xl">
                <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium">{t.noCarsFound}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 border-t border-zinc-800 text-start">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <a href="#home" className="flex items-center gap-3 group mb-6 w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 border border-amber-500/30 rotate-45 transition-all duration-700 ease-out">
                <div className="absolute inset-1 border border-amber-500/20" />
                <span className="font-serif text-amber-500 -rotate-45 text-xl">B</span>
              </div>
              <div className="flex flex-col items-start rtl:items-end">
                <span className="text-2xl font-serif tracking-[0.2em] bg-gradient-to-r from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent">BOUDADEN</span>
                <span className="text-[0.55rem] tracking-[0.4em] text-zinc-400 uppercase">Luxury Cars</span>
              </div>
            </a>
            <p className="text-zinc-500 font-light max-w-sm mx-auto md:mx-0">
              {t.footerAbout}
            </p>
          </div>
          <div className="md:text-end text-zinc-500 text-sm font-light">
            © {new Date().getFullYear()} Boudaden Luxury Cars. {t.rights}
          </div>
        </div>
      </footer>

      {/* WhatsApp Booking Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
            >
              <div className="h-48 relative">
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-950/50 text-white hover:bg-gold-gradient-light hover:text-zinc-950 transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{selectedCar.name}</h3>
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-amber-500 font-bold text-lg">
                    {t.pricePrefix} {selectedCar.price} {t.priceSuffix}
                  </p>
                  <span className="text-xs text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-full text-center whitespace-nowrap">
                    {computedDays > 0 ? `${computedDays} jour(s)` : 'Sélectionnez les dates'}
                  </span>
                </div>
                
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fromDate" className="block text-sm text-zinc-400 mb-2">{t.fromDate}</label>
                    <input
                      type="date"
                      id="fromDate"
                      min={defaultToday}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                  <div>
                    <label htmlFor="toDate" className="block text-sm text-zinc-400 mb-2">{t.toDate}</label>
                    <input
                      type="date"
                      id="toDate"
                      min={fromDate || defaultToday}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a 
                    href={fromDate && toDate ? `https://wa.me/212622065312?text=${encodeURIComponent(`Bonjour, je suis intéressé par la location de la ${selectedCar.name} du ${fromDate} au ${toDate} (${computedDays} jour(s)).`)}` : '#'}
                    target={fromDate && toDate ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!fromDate || !toDate) {
                        e.preventDefault();
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-semibold transition-all ${
                      fromDate && toDate 
                        ? 'bg-[#25D366] hover:bg-[#20bd5a]' 
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-70'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.bookOnWhatsapp}
                  </a>
                  
                  <button 
                    onClick={() => setSelectedCar(null)}
                    className="w-full py-4 text-sm uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {t.closeModal}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/212622065312"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
