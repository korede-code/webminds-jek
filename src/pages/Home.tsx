import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Zap } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center pt-20 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Innovating the Digital Future</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
        >
          Custom Web & App Solutions to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500">Grow Your Business</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-muted max-w-2xl mb-10 leading-relaxed"
        >
          We build high-performance, scalable, and beautifully designed digital products that help modern brands stay ahead of the curve.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/portfolio"
            className="px-8 py-4 rounded-full bg-brand-accent text-brand-bg font-bold text-lg hover:bg-brand-accent-dark transition-all shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:shadow-[0_0_30px_rgba(0,194,255,0.6)] flex items-center justify-center gap-2"
          >
            View Work <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-brand-card border border-brand-border text-brand-light font-bold text-lg hover:border-brand-accent transition-all flex items-center justify-center"
          >
            Get a Quote
          </Link>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-brand-border/50 bg-brand-bg/50 mb-20">
        <p className="text-center text-sm text-brand-muted mb-8 font-medium uppercase tracking-widest">Trusted by innovative companies</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
          {/* Placeholder Logos */}
          <div className="text-2xl font-bold font-serif">Acme Corp</div>
          <div className="text-2xl font-bold tracking-tighter">GlobalTech</div>
          <div className="text-2xl font-bold italic">Nexus</div>
          <div className="text-2xl font-bold font-mono">Quantum</div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-colors">
            <Code className="w-12 h-12 text-brand-accent mb-6" />
            <h3 className="text-2xl font-bold mb-4">Web Development</h3>
            <p className="text-brand-muted mb-6">Cutting-edge web applications built with modern frameworks like React and Next.js for blazing fast performance.</p>
            <Link to="/services" className="text-brand-accent font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-8 rounded-3xl bg-brand-card border border-brand-border hover:border-brand-accent/50 transition-colors">
            <Smartphone className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">App Development</h3>
            <p className="text-brand-muted mb-6">Native and cross-platform mobile experiences that users love, built for both iOS and Android ecosystems.</p>
            <Link to="/services" className="text-blue-500 font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
