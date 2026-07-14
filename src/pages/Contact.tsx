import { Mail, Phone, MapPin, MessageSquare, ArrowRight, X, Send } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  userName?: string;
}

interface FormStatus {
  type: string;
  message: string;
}

export default function Contact() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: '', message: '' });

  // Initialize socket connection
  useEffect(() => {
    if (isChatOpen && !socket) {
      setIsConnecting(true);
      const newSocket = io('http://localhost:3001');
      
      newSocket.on('connect', () => {
        console.log('Connected to chat server');
        setIsConnecting(false);
      });
      
      newSocket.on('chat history', (history: ChatMessage[]) => {
        setChatMessages(history);
      });
      
      newSocket.on('new message', (message: ChatMessage) => {
        setChatMessages(prev => {
          const exists = prev.some(msg => msg.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
      });
      
      newSocket.on('bot message', (message: ChatMessage) => {
        setChatMessages(prev => {
          const exists = prev.some(msg => msg.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
        setIsTyping(false);
      });
      
      setSocket(newSocket);
      
      return () => {
        newSocket.close();
      };
    }
  }, [isChatOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle user name submission
  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsNameSet(true);
      if (socket) {
        socket.emit('user join', userName);
      }
    }
  };

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !socket) return;
    
    const messageText = chatInput;
    setChatInput('');
    setIsTyping(true);
    
    // Send to server only once
    socket.emit('user message', { message: messageText });
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    // Validation
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      setFormStatus({ type: 'error', message: 'Please fill in all fields' });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send to your backend server
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you within 24 hours.' });
        setFormData({ name: '', email: '', projectType: '', message: '' });
        console.log('Form submitted successfully:', data);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => prev.type === 'success' ? { type: '', message: '' } : prev);
      }, 5000);
    }
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something Great</h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Ready to start your next project? Fill out the form below to request a free consultation, and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div>
            <div className="bg-brand-card p-8 rounded-3xl border border-brand-border mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted mb-1">Email us at</p>
                    <a href="mailto:koredejoseph3@gmail.com" className="font-medium hover:text-brand-accent transition-colors">koredejoseph3@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted mb-1">Call us</p>
                    <a href="tel:+2348124461183" className="font-medium hover:text-blue-500 transition-colors">+234-8124461183</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-muted mb-1">Visit our office</p>
                    <p className="font-medium">No.9, Yalinga Street<br />Wuse II Abuja.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-brand-accent rounded-3xl p-8 text-brand-bg relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
              <MessageSquare className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Need a quick answer?</h3>
              <p className="text-brand-bg/80 mb-6 text-sm">Our live chat support is available Monday to Friday, 9am - 5pm</p>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full py-3 bg-brand-bg text-brand-light font-bold rounded-xl hover:bg-brand-card transition-colors flex items-center justify-center gap-2"
              >
                Start Live Chat <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-brand-card p-8 lg:p-10 rounded-3xl border border-brand-border">
            <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
            
            {formStatus.message && (
              <div className={`mb-6 p-4 rounded-xl ${
                formStatus.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-500' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-500'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-brand-muted">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors"
                    placeholder="Joseph"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-brand-muted">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors"
                    placeholder="joseph@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-medium text-brand-muted">Project Type</label>
                <select 
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleFormChange}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                >
                  <option value="">Select a service...</option>
                  <option value="web">Web Development</option>
                  <option value="app">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-brand-muted">Project Details</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-brand-accent text-brand-bg font-bold text-lg hover:bg-brand-accent-dark transition-all shadow-[0_0_15px_rgba(0,194,255,0.4)] hover:shadow-[0_0_25px_rgba(0,194,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Request Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-card rounded-2xl w-full max-w-md border border-brand-border shadow-2xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h3 className="font-bold">Live Chat Support</h3>
                  <p className="text-xs text-brand-muted">
                    {isConnecting ? 'Connecting...' : 'Online - Real-time messaging'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsChatOpen(false);
                  if (socket) socket.close();
                  setSocket(null);
                  setIsNameSet(false);
                  setUserName('');
                  setChatMessages([]);
                }}
                className="p-1 hover:bg-brand-bg rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {!isNameSet ? (
                <form onSubmit={handleSetName} className="space-y-4">
                  <p className="text-center text-brand-muted text-sm">
                    Please enter your name to start chatting
                  </p>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-brand-light focus:outline-none focus:border-brand-accent transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-brand-accent text-brand-bg rounded-xl font-medium"
                  >
                    Start Chat
                  </button>
                </form>
              ) : (
                <>
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl ${
                          msg.type === 'user'
                            ? 'bg-brand-accent text-brand-bg'
                            : 'bg-brand-bg border border-brand-border text-brand-light'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        {msg.timestamp && (
                          <p className="text-xs opacity-50 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-brand-bg border border-brand-border rounded-xl p-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce delay-100" />
                          <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Chat Input */}
            {isNameSet && (
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-brand-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-brand-bg border border-brand-border rounded-xl px-4 py-2 text-brand-light focus:outline-none focus:border-brand-accent transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-accent text-brand-bg rounded-xl hover:bg-brand-accent-dark transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
}