import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-md border-brand-border py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Code2 className="w-8 h-8 text-brand-accent group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold tracking-tight">Web <span className="text-brand-accent">Minds</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-accent ${isActive ? 'text-brand-accent' : 'text-brand-light/80'}`}
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-brand-accent text-brand-bg font-semibold text-sm hover:bg-brand-accent-dark transition-all shadow-[0_0_15px_rgba(0,194,255,0.4)] hover:shadow-[0_0_25px_rgba(0,194,255,0.6)]"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-light" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-brand-bg flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Code2 className="w-8 h-8 text-brand-accent" />
                <span className="text-xl font-bold">Web Minds</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-brand-light" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `font-medium ${isActive ? 'text-brand-accent' : 'text-brand-light'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
