
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Bot, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin,
  Zap,
  Cpu,
  Mail,
  CheckCircle2,
  Play,
  RefreshCw,
  Activity
} from 'lucide-react';

// Refined Animation Variants
const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier for a high-end feel
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const wordAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  }
};

// Common Viewport Config
const viewportConfig = { once: true, amount: 0.15, margin: "0px 0px -50px 0px" };

const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

// Shared Types
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase mono">ATLAS AI</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#services" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors mono">Services</a>
          <a href="#manifesto" className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors mono">Manifesto</a>
          <motion.a 
            href="https://calendly.com" 
            target="_blank" 
            className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest mono shadow-xl shadow-black/10"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Strategy
          </motion.a>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 px-6 py-8 flex flex-col gap-6 md:hidden shadow-2xl overflow-hidden"
          >
            <a href="#services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#manifesto" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Manifesto</a>
            <button className="bg-black text-white px-6 py-4 rounded-xl text-lg font-bold">Book Strategy Call</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const headline = "Intelligence that Evolves with Your Work.";
  const words = headline.split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#fbfaf8]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-[150vw] h-[150vw] border-[1px] border-black rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-[100vw] h-[100vw] border-[1px] border-black border-dashed rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 text-center max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={sectionReveal} className="mb-10">
            <span className="inline-block px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] mono border border-blue-100">
              Future of Enterprise Autonomy
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] mb-10 leading-[0.85] tracking-tighter overflow-hidden pb-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordAnimation}
                className={`inline-block mr-2 md:mr-6 ${word === "Evolves" ? "premium-serif italic font-normal text-blue-600" : "font-bold text-black"}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            variants={sectionReveal}
            className="text-lg md:text-2xl text-gray-500 mb-14 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Custom autonomous systems that don't just follow rules—they build intuition. Scale your impact with ATLAS AI.
          </motion.p>
          
          <motion.div 
            variants={sectionReveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-black text-white px-12 py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 group transition-all"
            >
              Start Evolution <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,1)", scale: 1.05 }}
              className="w-full sm:w-auto border border-black/5 bg-white/50 backdrop-blur-xl px-12 py-5 rounded-full text-lg font-bold text-black shadow-sm"
            >
              Case Studies
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="hidden lg:block absolute left-20 bottom-24 animate-float"
      >
        <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white flex items-center gap-5">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mono">Performance</p>
            <p className="text-xl font-bold tracking-tight">+42% ROI</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TrustMarquee = () => {
  const partners = ["OpenAI", "Anthropic", "Stripe", "Goldman Sachs", "Nvidia", "Meta", "Google", "Mistral"];
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={sectionReveal}
      className="bg-white py-16 border-y border-gray-100 overflow-hidden whitespace-nowrap"
    >
      <div className="flex gap-24 animate-marquee">
        {[...partners, ...partners].map((name, i) => (
          <span key={i} className="text-2xl font-bold text-gray-200 uppercase tracking-tighter mono italic flex items-center gap-6">
            <div className="w-1.5 h-1.5 bg-gray-100 rounded-full"></div>
            {name}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

const Services = () => {
  const services: ServiceCard[] = [
    {
      id: 'strategy',
      title: 'AI Strategy',
      description: 'We audit your infrastructure and design a roadmap to inject intelligence into every workflow.',
      icon: <Bot className="text-blue-600" size={32} />
    },
    {
      id: 'automation',
      title: 'Autonomous Agents',
      description: 'Building custom LLM-powered agents that take real-world actions across your existing tech stack.',
      icon: <Settings className="text-orange-600" size={32} />
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      description: 'Turn your raw data into a competitive advantage with machine learning models designed for decision makers.',
      icon: <BarChart3 className="text-green-600" size={32} />
    }
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl mb-6 font-bold tracking-tighter text-black">Our Capabilities</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xl font-light leading-relaxed">Infrastructure audits and roadmap design for adaptive intelligence.</p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-10"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={sectionReveal}
              whileHover={{ y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.05)" }}
              className="p-12 border border-gray-100 rounded-[2.5rem] bg-gray-50/30 hover:bg-white transition-all duration-500 group"
            >
              <div className="mb-8 p-5 w-fit bg-white rounded-3xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light text-lg">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section id="manifesto" className="py-40 bg-[#020044] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="flex-1"
        >
          <span className="mono text-blue-400 font-bold mb-8 block tracking-[0.3em] text-[10px] uppercase">MANIFESTO v.2</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-12 tracking-tighter">
            Intelligence <br/> is a <span className="premium-serif italic font-normal text-blue-300">Reflex.</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/70 font-light leading-relaxed mb-12">
            In a world flooded with raw data, intelligence without action is a liability. 
            We build adaptive layers that turn strategy into automation.
          </p>
          <div className="space-y-6">
            {['Agentic Architecture', 'Privacy-First Logic', 'Cross-Stack Interoperability'].map((text, idx) => (
              <motion.div 
                key={text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                viewport={viewportConfig}
                className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-green-400/20 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ShieldCheck className="text-green-400" size={20} />
                </div>
                <span className="text-xl font-medium tracking-tight">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex-1 relative"
        >
           <div className="w-full aspect-square bg-white/5 rounded-[5rem] border border-white/20 backdrop-blur-3xl p-16 flex flex-col justify-between shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
              <div className="mono text-[10px] text-blue-400 animate-pulse relative z-10 uppercase tracking-widest">
                // SYSTEM_SYNC_ACTIVE
              </div>
              <div className="space-y-8 relative z-10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ delay: 0.5, duration: 2.5 }} className="h-2.5 bg-blue-400/30 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} transition={{ delay: 0.7, duration: 1.8 }} className="h-2.5 bg-blue-400/30 rounded-full" />
                <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ delay: 0.9, duration: 2.2 }} className="h-2.5 bg-blue-400/30 rounded-full" />
              </div>
              <div className="flex justify-between items-end relative z-10">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ delay: 1.5 }} 
                  className="text-5xl md:text-7xl font-bold mono tracking-tighter"
                >
                  99.8%
                </motion.div>
                <div className="text-[10px] text-right text-blue-400 mono uppercase tracking-widest leading-loose">
                  STABILITY<br/>RATING
                </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const InteractiveDemo = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  type ModelType = 'turbo' | 'atlas' | 'quantum';
  const models = {
    turbo: { name: 'Turbo-V3', color: '#EAB308', efficiency: 85, latency: 4, speed: 0.5, label: 'Speed' }, // Yellow
    atlas: { name: 'Atlas-Pro', color: '#60A5FA', efficiency: 98, latency: 12, speed: 0.8, label: 'Balanced' }, // Blue
    quantum: { name: 'Quantum-X', color: '#A855F7', efficiency: 99.9, latency: 45, speed: 1.2, label: 'Precision' } // Purple
  };
  const [selectedModel, setSelectedModel] = useState<ModelType>('atlas');
  const currentModel = models[selectedModel];

  // Generate deterministic random positions for the "chaos" state
  // We use a fixed seed concept by just hardcoding or using stable math if needed, 
  // but for this demo, simple random is fine as long as it doesn't re-render on every tick.
  // actually, we want them stable.
  const [nodes] = useState(() => 
    Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      chaosX: 10 + Math.random() * 80,
      chaosY: 10 + Math.random() * 80,
      gridX: 20 + (i % 4) * 20,
      gridY: 20 + Math.floor(i / 4) * 20,
    }))
  );

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="flex-1 lg:max-w-md">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionReveal}
            >
              <span className="mono text-blue-400 font-bold mb-6 block tracking-[0.3em] text-[10px] uppercase flex items-center gap-2">
                <Activity size={14} /> LIVE_SIMULATION
              </span>
              <h2 className="text-4xl md:text-5xl mb-6 font-bold tracking-tighter leading-[0.9]">
                Chaos to <br/>
                <span className="premium-serif italic font-normal" style={{ color: currentModel.color }}>Clarity.</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                Watch how our autonomous agents identify bottlenecks and restructure workflows in milliseconds.
              </p>

              {/* Model Selector */}
              <div className="flex flex-wrap gap-2 mb-8 p-1 bg-white/5 rounded-xl w-fit border border-white/10">
                {(Object.keys(models) as ModelType[]).map((modelKey) => {
                  const isSelected = selectedModel === modelKey;
                  const model = models[modelKey];
                  return (
                    <motion.button
                      key={modelKey}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedModel(modelKey);
                        setIsOptimized(false);
                      }}
                      style={{
                        backgroundColor: isSelected ? model.color : 'transparent',
                        color: isSelected ? '#000000' : '#9CA3AF', // gray-400
                        boxShadow: isSelected ? `0 0 20px -5px ${model.color}80` : 'none'
                      }}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        !isSelected ? 'hover:bg-white/10 hover:text-white' : ''
                      }`}
                    >
                      {model.name}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Metrics Dashboard */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-[10px] mono uppercase tracking-widest mb-1">Efficiency</div>
                  <div className="text-3xl font-bold mono flex items-end gap-2">
                    <AnimatedNumber value={isOptimized ? currentModel.efficiency : 42} />
                    <span className="text-sm text-gray-500 mb-1">%</span>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-gray-400 text-[10px] mono uppercase tracking-widest mb-1">Latency</div>
                  <div className="text-3xl font-bold mono flex items-end gap-2">
                    <AnimatedNumber value={isOptimized ? currentModel.latency : 840} />
                    <span className="text-sm text-gray-500 mb-1">ms</span>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsOptimized(!isOptimized);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                style={{
                  backgroundColor: isOptimized ? currentModel.color : '#ffffff',
                  color: '#000000',
                  boxShadow: isOptimized 
                    ? `0 0 40px -10px ${currentModel.color}` 
                    : '0 0 40px -10px rgba(255,255,255,0.3)'
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-bold flex items-center justify-center gap-3 transition-colors text-sm relative overflow-hidden"
              >
                <AnimatePresence>
                  {isAnimating && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-black/20 rounded-full pointer-events-none"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 flex items-center gap-3">
                  {isOptimized ? <RefreshCw size={18} /> : <Play size={18} fill="currentColor" />}
                  {isOptimized ? "Reset Simulation" : "Run Optimization"}
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Visualization Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ 
              boxShadow: isAnimating 
                ? `0 0 40px 0px ${currentModel.color}40` 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
            }}
            viewport={viewportConfig}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 rounded-[2.5rem] border border-white/10 relative overflow-hidden backdrop-blur-md p-8 transition-shadow duration-500"
          >
             {/* Connection Lines (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
               {isOptimized && nodes.map((node, i) => {
                 // Connect to right neighbor if exists in grid
                 const rightNeighbor = (i + 1) % 4 !== 0 ? nodes[i + 1] : null;
                 // Connect to bottom neighbor
                 const bottomNeighbor = i + 4 < 16 ? nodes[i + 4] : null;
                 
                 return (
                   <g key={i}>
                     {rightNeighbor && (
                       <motion.line 
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ pathLength: 1, opacity: 1 }}
                         transition={{ duration: currentModel.speed, delay: 0.2 }}
                         x1={`${node.gridX}%`} y1={`${node.gridY}%`} 
                         x2={`${rightNeighbor.gridX}%`} y2={`${rightNeighbor.gridY}%`} 
                         stroke="white" strokeWidth="1" 
                       />
                     )}
                     {bottomNeighbor && (
                       <motion.line 
                         initial={{ pathLength: 0, opacity: 0 }}
                         animate={{ pathLength: 1, opacity: 1 }}
                         transition={{ duration: currentModel.speed, delay: 0.2 }}
                         x1={`${node.gridX}%`} y1={`${node.gridY}%`} 
                         x2={`${bottomNeighbor.gridX}%`} y2={`${bottomNeighbor.gridY}%`} 
                         stroke="white" strokeWidth="1" 
                       />
                     )}
                   </g>
                 );
               })}
             </svg>

             {/* Nodes */}
             {nodes.map((node) => (
               <motion.div
                 key={node.id}
                 layout
                 initial={false}
                 animate={{
                   left: isOptimized ? `${node.gridX}%` : `${node.chaosX}%`,
                   top: isOptimized ? `${node.gridY}%` : `${node.chaosY}%`,
                   backgroundColor: isOptimized ? currentModel.color : '#F87171',
                   scale: 1,
                 }}
                 transition={{
                   type: "spring",
                   stiffness: 40,
                   damping: 15,
                   delay: isOptimized ? node.id * (0.02 * currentModel.speed) : 0 // Stagger effect
                 }}
                 className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10"
               >
                 {/* Pulse effect when chaotic */}
                 {!isOptimized && (
                   <motion.div 
                     animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                     transition={{ repeat: Infinity, duration: 2, delay: Math.random() * 2 }}
                     className="absolute inset-0 bg-red-400 rounded-full"
                   />
                 )}
                 {/* Glow effect when optimized */}
                 {isOptimized && (
                   <div className="absolute inset-0 blur-[4px] rounded-full" style={{ backgroundColor: currentModel.color }} />
                 )}
               </motion.div>
             ))}

             {/* Scanning Line Effect */}
             <AnimatePresence>
               {isOptimized && (
                 <motion.div
                   initial={{ top: "-10%", opacity: 0 }}
                   animate={{ top: "110%", opacity: [0, 1, 0] }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1.5 * currentModel.speed, ease: "easeInOut" }}
                   className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_2px_rgba(255,255,255,0.5)] z-20"
                 />
               )}
             </AnimatePresence>

             {/* Status Label */}
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOptimized ? '' : 'bg-red-400'} animate-pulse`} style={{ backgroundColor: isOptimized ? currentModel.color : undefined }} />
                  <span className="text-[10px] mono uppercase tracking-widest text-white/50">
                    {isOptimized ? `OPTIMIZED: ${currentModel.name}` : 'DETECTING_ANOMALIES'}
                  </span>
                </div>
                <div className="text-[10px] mono text-white/30">
                  ID: 8492-X
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="max-w-6xl mx-auto bg-[#f9f9f8] border border-gray-100 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative overflow-hidden"
        >
          <div className="flex-1 text-left relative z-10">
            <span className="mono text-blue-600 font-bold mb-6 block tracking-[0.4em] text-[10px] uppercase">Insights</span>
            <h2 className="text-4xl md:text-6xl mb-8 tracking-tighter font-bold leading-[0.95]">The <br/>Front Line of <span className="premium-serif italic font-normal text-blue-600">Intelligence.</span></h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg md:text-xl max-w-sm">
              Weekly state-of-the-art insights on autonomous systems. No noise.
            </p>
          </div>
          
          <div className="flex-1 w-full relative z-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-green-100 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 size={32} className="md:w-10 md:h-10" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight">Access Granted.</h4>
                  <button onClick={() => setStatus('idle')} className="text-[10px] font-bold uppercase tracking-widest mono text-blue-600 hover:underline">Resubscribe</button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 md:gap-6"
                >
                  <div className="relative">
                    <Mail className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-gray-400" size={20} className="md:w-6 md:h-6" />
                    <input 
                      type="email" 
                      placeholder="Work email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] py-5 md:py-8 pl-16 md:pl-20 pr-8 md:pr-10 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-lg md:text-xl"
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                    className="w-full bg-black text-white py-5 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-bold text-xl md:text-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Syncing...' : 'Get Access'} 
                    <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 bg-[#fbfaf8]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionReveal}
          className="bg-black text-white p-10 md:p-24 lg:p-32 rounded-[3rem] md:rounded-[5rem] text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-50 pointer-events-none"></div>
          
          <h2 className="text-5xl md:text-7xl lg:text-9xl mb-8 md:mb-12 relative z-10 tracking-tighter font-bold leading-[0.8]">
            Build the <span className="premium-serif italic font-normal text-blue-200">Future.</span>
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto relative z-10 font-light leading-relaxed">
            Partner with ATLAS AI to redefine your enterprise logic. Limited Q3 availability.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 bg-white text-black px-8 py-4 md:px-14 md:py-7 rounded-full text-lg md:text-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-3 md:gap-5 mx-auto"
          >
            Start Conversation <ArrowRight size={24} className="md:w-8 md:h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 md:pt-40 pb-10 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-20 md:mb-32">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center">
                <span className="text-black font-black text-xl md:text-2xl tracking-tighter">A</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mono">ATLAS AI</span>
            </div>
            <p className="text-gray-500 text-xl md:text-2xl max-w-sm mb-10 md:mb-12 font-light leading-relaxed">
              Autonomous enterprise systems. Built for the modern foundation.
            </p>
            <div className="flex gap-4 md:gap-6">
              {[Twitter, Github, Linkedin].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#" 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-[1rem] md:rounded-[1.25rem] border border-white/10 flex items-center justify-center transition-all"
                >
                  <Icon size={20} className="md:w-6 md:h-6" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 col-span-1 md:col-span-2 gap-10 md:gap-24">
            <div>
              <h4 className="font-bold mb-8 md:mb-10 mono uppercase text-[10px] tracking-[0.4em] text-gray-500">Core</h4>
              <ul className="space-y-4 md:space-y-6 text-gray-500 text-lg md:text-xl font-light">
                <li><a href="#" className="hover:text-white transition-colors">Strategy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agents</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Scale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 md:mb-10 mono uppercase text-[10px] tracking-[0.4em] text-gray-500">Legal</h4>
              <ul className="space-y-4 md:space-y-6 text-gray-500 text-lg md:text-xl font-light">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ethics</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-10 md:pt-20 border-t border-white/5 gap-6 md:gap-10">
          <p className="text-gray-600 text-xs md:text-sm mono font-medium">© 2025 ATLAS AI AGENCY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 md:gap-10 text-[10px] mono text-gray-700 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-2 h-2 bg-green-500/30 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span>Status: Operational</span>
            </div>
            <span>Build 3.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden scroll-smooth">
      <Navbar />
      <Hero />
      
      {/* Scroll delay wrapper for subsequent sections */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.1 }}
      >
        <TrustMarquee />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.15 }}
      >
        <Manifesto />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.2 }}
      >
        <Services />
      </motion.div>

      <InteractiveDemo />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.25 }}
      >
        <Newsletter />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.3 }}
      >
        <CTASection />
      </motion.div>
      
      <Footer />
    </div>
  );
}
