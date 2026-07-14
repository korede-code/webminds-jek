import { Code, Smartphone, Palette, PenTool, ShoppingCart, Headset } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const services = [
  {
    title: 'Custom Website Development',
    description: 'Bespoke, high-performance web applications built from the ground up to solve your unique business challenges. We use modern stacks like React, Node.js, and Tailwind CSS.',
    icon: Code,
    color: 'text-brand-accent'
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile applications for iOS and Android. We create seamless, intuitive experiences that users love to engage with.',
    icon: Smartphone,
    color: 'text-blue-500'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that looks beautiful and converts. From wireframes to high-fidelity prototypes, we ensure your product is intuitive and engaging.',
    icon: Palette,
    color: 'text-purple-500'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Scalable online stores that drive sales. We build custom e-commerce platforms and integrate with Shopify, Stripe, and other modern commerce tools.',
    icon: ShoppingCart,
    color: 'text-green-500'
  },
  {
    title: 'Maintenance & Support',
    description: 'We don’t just launch and leave. Our dedicated support team ensures your digital products stay secure, updated, and performing optimally.',
    icon: Headset,
    color: 'text-orange-500'
  },
  {
    title: 'Brand Strategy',
    description: 'Strategic consulting to align your digital presence with your long-term business goals. We help you position your brand effectively in the digital space.',
    icon: PenTool,
    color: 'text-pink-500'
  }
];

export default function Services() {
  return (
    <PageTransition>
      <div className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-brand-muted text-lg">
            Comprehensive digital solutions tailored to your business needs. We combine technical excellence with strategic thinking to deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-brand-card p-8 rounded-2xl border border-brand-border hover:border-brand-accent/50 transition-all hover:-translate-y-1 duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-brand-bg flex items-center justify-center mb-6 border border-brand-border group-hover:border-brand-accent/30 transition-colors`}>
                  <Icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-brand-muted leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
