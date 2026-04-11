import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Layers, LayoutTemplate, Smartphone, Zap, Menu, X, Check, Phone } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');

  const handleNavClick = (view: 'home' | 'privacy' | 'terms') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (view === 'privacy' || view === 'terms') {
      window.scrollTo(0, 0);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/f8ce940c3f7f0e18446dd628a5e2b135", {
        method: "POST",
        headers: { 
          'Accept': 'application/json'
        },
        body: formData
      });
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl py-3 px-6 rounded-full w-full max-w-3xl' 
              : 'bg-transparent py-4 px-6 w-full max-w-7xl'
          }`}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); window.scrollTo(0, 0); }} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="https://i.ibb.co/Kx19hn4C/VF-new-logo-revised.png" alt="Vertex Flows" className="w-8 h-8 object-contain rounded-full" referrerPolicy="no-referrer" />
            <span className="text-lg font-bold tracking-tight">Vertex Flows</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#services" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">Services</a>
            <a href="#pricing" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">About</a>
            <a href="tel:7411180551" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              74111 80551
            </a>
            <a href="#contact" onClick={() => handleNavClick('home')} className="bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-neutral-200 transition-transform hover:scale-105 active:scale-95">
              Let's Talk
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <a href="#services" className="text-3xl font-bold tracking-tighter hover:text-neutral-400 transition-colors" onClick={() => handleNavClick('home')}>Services</a>
          <a href="#pricing" className="text-3xl font-bold tracking-tighter hover:text-neutral-400 transition-colors" onClick={() => handleNavClick('home')}>Pricing</a>
          <a href="#about" className="text-3xl font-bold tracking-tighter hover:text-neutral-400 transition-colors" onClick={() => handleNavClick('home')}>About</a>
          <a href="tel:7411180551" className="text-3xl font-bold tracking-tighter hover:text-neutral-400 transition-colors flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <Phone className="w-8 h-8" />
            74111 80551
          </a>
          <a href="#contact" onClick={() => handleNavClick('home')} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg mt-4">
            Let's Talk
          </a>
        </div>
      )}

      {/* Main Content Area */}
      {currentView === 'home' ? (
        <main>
          {/* Hero Section */}
          <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new projects
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tighter max-w-[1000px] mx-auto mb-8"
        >
          We build websites that bring customers to your <span className="text-neutral-500">businesses.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 font-medium"
        >
          Vertex Flows is a premium design and deployment agency that help businesses grow with fast and modern websites.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a href="#contact" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
            Start a project <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 md:py-40 px-6 bg-[#050505] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">About Us</h2>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Vertex Flows is a premium digital agency dedicated to crafting exceptional online experiences. We believe that a website should be more than just a digital brochure—it should be a powerful growth engine for your business.
              </p>
              <p className="text-xl text-neutral-400 leading-relaxed">
                Our team combines strategic thinking, cutting-edge design, and robust engineering to deliver fast, modern, and scalable websites that convert visitors into loyal customers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-3 md:gap-6"
            >
              <div className="bg-[#0A0A0A] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-white mb-1 md:mb-2 leading-tight">Fast<br className="hidden sm:block" /> Delivery</div>
                <div className="text-neutral-400 font-medium text-sm md:text-base mt-1">3-5 days</div>
              </div>
              <div className="bg-[#0A0A0A] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 flex flex-col justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 md:mb-2 leading-none">99<span className="text-[#FF6B00]">%</span></div>
                <div className="text-neutral-400 font-medium text-sm md:text-base mt-1">Client Satisfaction</div>
              </div>
              <div className="bg-[#0A0A0A] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 flex flex-col justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 md:mb-2 leading-none">24<span className="text-[#FF6B00]">/</span>7</div>
                <div className="text-neutral-400 font-medium text-sm md:text-base mt-1">Support</div>
              </div>
              <div className="bg-[#0A0A0A] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 flex flex-col justify-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-1 md:mb-2 leading-none">10<span className="text-[#FF6B00]">x</span></div>
                <div className="text-neutral-400 font-medium text-sm md:text-base mt-1">Growth Potential</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Our services</h2>
            <p className="text-xl text-neutral-400 max-w-2xl">We combine strategic thinking with high-end design and robust engineering to deliver websites that perform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-colors"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                <LayoutTemplate className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-4">Web Design</h3>
                <p className="text-neutral-400 text-lg max-w-md">We craft visually stunning, user-centric interfaces that elevate your brand and engage your audience from the first click.</p>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-colors"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Development</h3>
                <p className="text-neutral-400">Lightning-fast, scalable, and secure websites built with modern frameworks.</p>
              </div>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-colors"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Responsive</h3>
                <p className="text-neutral-400">Flawless experiences across all devices, from desktop to mobile.</p>
              </div>
            </motion.div>

            {/* Large Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-colors"
            >
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight mb-4">Performance & SEO</h3>
                <p className="text-neutral-400 text-lg max-w-md">Optimized architecture that ranks higher on Google and converts visitors faster with sub-second load times.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-40 px-6 relative border-t border-white/10 bg-[#050505] overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Transparent Pricing</h2>
            <p className="text-xl text-neutral-400">Choose the plan that fits your growth stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-neutral-400 mb-8">Essential digital presence.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold">₹2499 - ₹4499</span>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['5 Page Website', 'Basic SEO Setup', 'Mobile Responsive', 'Contact Form'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check className="w-5 h-5 text-[#FF6B00]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full block text-center py-4 rounded-xl bg-[#111] hover:bg-[#222] border border-white/10 font-semibold transition-colors">
                Get Started
              </a>
            </motion.div>

            {/* Standard Plan (Highlighted) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#0A0A0A] border border-[#FF6B00] rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_-10px_rgba(255,107,0,0.15)]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard</h3>
              <p className="text-neutral-400 mb-8">Scale your business.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold">₹5499 - ₹8499</span>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['10+ Page Website', 'CMS Integration', 'Advanced Analytics', 'Technical SEO Audit'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check className="w-5 h-5 text-[#FF6B00]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full block text-center py-4 rounded-xl bg-[#FF6B00] hover:bg-[#FF8533] text-black font-bold transition-colors shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                Get Started
              </a>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-neutral-400 mb-8">Custom complex solutions.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold">₹9999+</span>
              </div>
              <ul className="space-y-4 mb-12 flex-1">
                {['Unlimited Pages', 'Custom Web App', 'Priority Support', 'Dedicated Manager'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <Check className="w-5 h-5 text-[#FF6B00]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full block text-center py-4 rounded-xl bg-[#111] hover:bg-[#222] border border-white/10 font-semibold transition-colors">
                Contact Sales
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-32 md:py-48 px-6 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none mb-12"
        >
          LET'S TALK.
        </motion.h2>
        <motion.a 
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-neutral-200 transition-transform hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          Start your project <ArrowUpRight className="w-6 h-6" />
        </motion.a>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 md:py-40 px-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Contact Us</h2>
            <p className="text-xl text-neutral-400">Ready to start your project? Fill out the form below and we'll get back to you shortly.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Honeypot */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            {/* Disable reCAPTCHA */}
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
                <input type="text" id="name" name="name" required className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#FF6B00] transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
                <input type="email" id="email" name="email" required className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#FF6B00] transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label htmlFor="message" className="text-sm font-medium text-neutral-400">Project Details</label>
              <textarea id="message" name="message" required rows={6} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#FF6B00] transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 font-medium text-center mt-4 bg-green-500/10 py-3 rounded-xl border border-green-500/20"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
          </form>
        </div>
      </section>
      </main>
      ) : currentView === 'privacy' ? (
        <PrivacyPolicy />
      ) : (
        <TermsOfService />
      )}

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="https://i.ibb.co/Kx19hn4C/VF-new-logo-revised.png" alt="Vertex Flows" className="w-8 h-8 object-contain rounded-full" referrerPolicy="no-referrer" />
                <span className="text-2xl font-bold tracking-tight">Vertex Flows</span>
              </div>
              <p className="text-neutral-400 max-w-sm text-lg">
                Building digital experiences that define tomorrow's leading brands.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Navigation</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Socials</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">Twitter <ArrowUpRight className="w-4 h-4" /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">LinkedIn <ArrowUpRight className="w-4 h-4" /></a></li>
                <li><a href="https://www.instagram.com/vertexflows.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">Instagram <ArrowUpRight className="w-4 h-4" /></a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-neutral-500 font-medium">
            <p>© {new Date().getFullYear()} Vertex Flows. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('privacy'); }} className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('terms'); }} className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <main className="pt-40 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
        <div className="space-y-8 text-neutral-300 leading-relaxed text-lg">
          <p>
            At Vertex Flows, we value your privacy and are committed to protecting your personal information.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p>
              We may collect personal information such as your name, phone number, email address, and any details you provide when contacting us through forms or WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries</li>
              <li>Provide our website development services</li>
              <li>Improve our website and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties. Your data is kept secure and used only for communication and service purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <p>
              Our website may use third-party tools like analytics or hosting services to improve performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us via WhatsApp or email.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function TermsOfService() {
  return (
    <main className="pt-40 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Terms of Service</h1>
        <div className="space-y-8 text-neutral-300 leading-relaxed text-lg">
          <p>
            By using our website, you agree to the following terms and conditions.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
            <p>
              Vertex Flows provides website design and development services for businesses. The scope of work will be discussed and agreed upon before starting any project.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Payments</h2>
            <p>
              Payments must be made as agreed before or during the project. Work may begin only after confirmation of payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Client Responsibility</h2>
            <p>
              Clients are responsible for providing accurate information, content, and materials required for the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p>
              Vertex Flows is not responsible for any business losses, damages, or issues resulting from the use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to Services</h2>
            <p>
              We reserve the right to modify or update our services or terms at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p>
              For any questions regarding these terms, please contact us directly.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

