import { ExternalLink, Code2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const projects = [
  {
    title: 'FinTech Dashboard',
    description: 'A comprehensive financial analytics dashboard for enterprise clients. Features real-time data visualization and secure transaction management.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tech: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://jamb-utme-preparation-platform.web.app'
  },
  {
    title: 'HealthStyle App',
    description: 'A cross-platform mobile application for personalized fitness tracking, meal planning, and live coaching sessions.',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    title: 'E-Commerce Platform',
    description: 'A high-conversion headless e-commerce experience for a premium fashion brand, capable of handling high traffic spikes.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tech: ['Next.js', 'Shopify', 'Stripe'],
    link: '#'
  },
  {
    title: 'Real Estate Portal',
    description: 'Advanced property search engine with 3D virtual tours and interactive map integrations for a nationwide agency.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    tech: ['Vue.js', 'Laravel', 'PostgreSQL'],
    link: '#'
  },
  {
    title: 'Crypto Exchange',
    description: 'Secure, high-frequency trading platform with live order books, charting tools, and multi-wallet support.',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800',
    tech: ['React', 'WebSockets', 'Go'],
    link: '#'
  },
  {
    title: 'AI Content Generator',
    description: 'SaaS platform leveraging generative AI to help marketers create blog posts, ad copy, and social media content.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tech: ['React', 'Python', 'OpenAI API'],
    link: '#'
  }
];

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Work</h1>
          <p className="text-brand-muted text-lg">
            Explore a selection of our recent projects. We take pride in delivering robust, scalable, and visually stunning digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border group hover:border-brand-accent/50 transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a href={project.link} className="p-3 bg-brand-accent text-brand-bg rounded-full hover:scale-110 transition-transform">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href={project.link} className="p-3 bg-brand-bg text-brand-light rounded-full hover:scale-110 transition-transform border border-brand-border">
                    <Code2 className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-brand-muted text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-brand-bg border border-brand-border text-brand-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
