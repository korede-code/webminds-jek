import { Target, Shield, Zap, Users } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="py-12 md:py-20">
        {/* Story Section */}
        <section className="mb-24 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <div className="space-y-4 text-brand-muted text-lg leading-relaxed">
              <p>
                Founded on the belief that technology should empower businesses, Web Minds started as a small collective of passionate developers and designers. Today, we've grown into a full-scale digital agency serving forward-thinking brands worldwide.
              </p>
              <p>
                We don't just write code; we solve problems. By bridging the gap between innovative engineering and human-centered design, we build products that look incredible and perform flawlessly.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative rounded-3xl overflow-hidden border border-brand-border h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent" />
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-brand-muted">The principles that drive our decisions, shape our culture, and define our results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-brand-card rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">Excellence</h3>
              <p className="text-sm text-brand-muted">We never settle for "good enough". We push boundaries to deliver exceptional work.</p>
            </div>
            
            <div className="p-6 bg-brand-card rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Integrity</h3>
              <p className="text-sm text-brand-muted">Honest communication, transparent processes, and keeping our promises.</p>
            </div>
            
            <div className="p-6 bg-brand-card rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Innovation</h3>
              <p className="text-sm text-brand-muted">Embracing new technologies to stay ahead of the curve and provide better solutions.</p>
            </div>
            
            <div className="p-6 bg-brand-card rounded-2xl border border-brand-border text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Collaboration</h3>
              <p className="text-sm text-brand-muted">We view our clients as partners, working closely to achieve shared success.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-brand-muted">The talented minds behind our digital creations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex Rivera', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
              { name: 'Sarah Chen', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
              { name: 'Marcus Johnson', role: 'Lead Developer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
              { name: 'Emma Davis', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' }
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-2 border-brand-border group-hover:border-brand-accent transition-colors">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-brand-accent text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
