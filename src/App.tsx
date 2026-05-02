import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, ArrowRight, ShieldCheck, Gem, Clock, MapPin, Phone, Mail, Car, MessageCircle, CalendarDays, CalendarRange, Calendar, Settings2 } from 'lucide-react';
import { translations, Language } from './translations';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{name: string, price: string, image: string} | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const navLinks = [
    { name: t.navHome, href: "#home" },
    { name: t.navAllCars, href: "#all-cars" },
    { name: t.navServices, href: "#services" },
    { name: t.navContact, href: "#contact" },
  ];

  const allCarsList = [
    { name: t.car1Name, price: "1500", category: "premium", image: "https://images.unsplash.com/photo-1631269411306-6bd28eb079c6?auto=format&fit=crop&q=80&w=800" },
    { name: t.car2Name, price: "1200", category: "premium", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800" },
    { name: t.car3Name, price: "2000", category: "premium", image: "https://images.unsplash.com/photo-1544636331-e26879ce2e6e?auto=format&fit=crop&q=80&w=800" },
    { name: t.car4Name, price: "1100", category: "premium", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800" },
    { name: "Porsche 911 GT3", price: "1800", category: "premium", image: "https://images.unsplash.com/photo-1503376713214-e0e640b615da?auto=format&fit=crop&q=80&w=800" },
    { name: "Audi RS Q8", price: "950", category: "standard", image: "https://images.unsplash.com/photo-1606152421802-db97517c5b6b?auto=format&fit=crop&q=80&w=800" },
    { name: "Range Rover SV", price: "1000", category: "premium", image: "https://images.unsplash.com/photo-1629897048514-3dd7414df75a?auto=format&fit=crop&q=80&w=800" },
    { name: "BMW 4 Series Gran Coupe", price: "350", category: "standard", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" },
    { name: "VW Golf R", price: "250", category: "compact", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800" },
    { name: "Renault Clio", price: "80", category: "economy", image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800" },
    { name: "Peugeot 208", price: "85", category: "economy", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800" },
    { name: "Mercedes A-Class", price: "180", category: "compact", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800" },
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-500/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 border border-amber-500/30 rotate-45 group-hover:rotate-90 transition-all duration-700 ease-out">
              <div className="absolute inset-1 border border-amber-500/20" />
              <span className="font-serif text-amber-500 -rotate-45 group-hover:-rotate-90 transition-all duration-700 ease-out text-xl">O</span>
            </div>
            <div className="flex flex-col items-start rtl:items-end">
              <span className="text-2xl font-serif tracking-[0.2em] bg-gradient-to-r from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent">OMAR</span>
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
                    className="text-sm uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              <a 
                href="https://wa.me/212636503982" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#25D366] hover:text-[#20bd5a] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
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
            <a 
              href="https://wa.me/212636503982" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#25D366] hover:text-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
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
                onClick={() => setIsMenuOpen(false)}
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
            <a href="#all-cars" className="bg-amber-500 text-zinc-950 px-8 py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:bg-amber-400 transition-colors w-full sm:w-auto">
              {t.navAllCars}
            </a>
            <a href="#contact" className="border border-zinc-700 px-8 py-4 uppercase tracking-[0.2em] text-sm hover:border-amber-500 hover:text-amber-500 transition-colors w-full sm:w-auto">
              {t.bookNow}
            </a>
          </motion.div>
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
                    ? 'border-amber-500 bg-amber-500 text-zinc-950 font-semibold'
                    : 'border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-500'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCars.map((car, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={car.name} 
                  className="group relative overflow-hidden bg-zinc-950 aspect-[4/3] rounded-xl cursor-pointer border border-zinc-800 hover:border-amber-500/50 transition-colors"
                >
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
                  <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-start transition-transform duration-500">
                    <h3 className="text-xl font-serif mb-2">{car.name}</h3>
                    <div className="flex justify-between w-full items-center">
                      <p className="text-zinc-300 font-light flex items-center gap-1">
                        <span className="text-xs">{t.pricePrefix}</span>
                        <span className="text-amber-500 text-lg">{car.price}</span>
                        <span className="text-xs">{t.priceSuffix}</span>
                      </p>
                      <button 
                        onClick={() => setSelectedCar(car)}
                        className="text-xs tracking-widest uppercase bg-amber-500 text-zinc-950 px-4 py-2 hover:bg-amber-400 transition-colors font-semibold cursor-pointer"
                      >
                        {t.bookNow}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
                  <a href="https://wa.me/212636503982" target="_blank" rel="noreferrer" className="font-serif text-xl mt-1 block hover:text-[#25D366] transition-colors" dir="ltr">+212 636 503 982</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.phone}</p>
                  <a href="tel:+212636503982" className="font-serif text-xl mt-1 block hover:text-amber-500 transition-colors" dir="ltr">+212 636 503 982</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.email}</p>
                  <a href="mailto:booking@omarcars.com" className="font-serif text-xl mt-1 block hover:text-amber-500 transition-colors">booking@omarcars.com</a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-amber-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">{t.location || 'Location'}</p>
                  <p className="font-serif text-xl mt-1">Paris • Dubai • Monaco</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-2xl h-[400px] lg:h-auto min-h-[400px] relative overflow-hidden group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081493!2d2.292292615674404!3d48.8583736086627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1689620000000!5m2!1sen!2sfr" 
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

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 border-t border-zinc-800 text-center md:text-start">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <a href="#home" className="flex items-center justify-center md:justify-start gap-3 group mb-6 w-fit mx-auto md:mx-0">
              <div className="relative flex items-center justify-center w-10 h-10 border border-amber-500/30 rotate-45 transition-all duration-700 ease-out">
                <div className="absolute inset-1 border border-amber-500/20" />
                <span className="font-serif text-amber-500 -rotate-45 text-xl">O</span>
              </div>
              <div className="flex flex-col items-start rtl:items-end">
                <span className="text-2xl font-serif tracking-[0.2em] bg-gradient-to-r from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent">OMAR</span>
                <span className="text-[0.55rem] tracking-[0.4em] text-zinc-400 uppercase">Luxury Cars</span>
              </div>
            </a>
            <p className="text-zinc-500 font-light max-w-sm mx-auto md:mx-0">
              {t.footerAbout}
            </p>
          </div>
          <div className="md:text-end text-zinc-500 text-sm font-light">
            © {new Date().getFullYear()} OMAR Luxury Cars. {t.rights}
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
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-950/50 text-white hover:bg-amber-500 transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{selectedCar.name}</h3>
                <p className="text-amber-500 font-medium mb-6">
                  {t.pricePrefix} {selectedCar.price} {t.priceSuffix}
                </p>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href={`https://wa.me/212636503982?text=${encodeURIComponent(`Bonjour, je suis intéressé par la location de la ${selectedCar.name}. / Hello, I am interested in renting the ${selectedCar.name}.`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-colors"
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
    </div>
  );
}
