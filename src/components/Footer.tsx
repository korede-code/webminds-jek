import { Link } from 'react-router-dom';
import { Code2, Globe, MessageSquare, Briefcase, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-6 h-6 text-brand-accent" />
              <span className="text-lg font-bold">Web Minds</span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              Innovative, custom web and app development solutions designed to grow your business and scale your digital presence.
            </p>
            <div className="flex items-center gap-4 text-brand-muted">
              <a href="#" className="hover:text-brand-accent transition-colors"><MessageSquare className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Briefcase className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to="/services" className="hover:text-brand-accent transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-brand-accent transition-colors">App Development</Link></li>
              <li><Link to="/services" className="hover:text-brand-accent transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services" className="hover:text-brand-accent transition-colors">E-commerce</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-accent transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-accent" />
                <a href="mailto:koredejoseph3@gmail.com" className="hover:text-brand-accent transition-colors">koredejoseph3@gmail.com</a>
              </li>
              <li>+234-8124461183</li>
              <li>No.9, Yalinga Street<br />Wuse II Abuja.</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between text-xs text-brand-muted">
          <p>&copy; {new Date().getFullYear()} Web Minds. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
