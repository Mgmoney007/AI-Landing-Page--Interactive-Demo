
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
  Activity,
  User
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
}

const Button = ({ variant = 'primary', size = 'md', children, icon, className = '', href, target, style, ...props }: ButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const baseStyles = "relative overflow-hidden font-bold inline-flex items-center justify-center gap-3 transition-colors duration-300 ease-out group rounded-full";
  
  const sizeStyles = {
    sm: "px-6 py-3 text-xs uppercase tracking-widest mono",
    md: "px-8 py-4 text-sm md:text-base",
    lg: "px-10 py-5 md:px-12 md:py-6 text-lg md:text-xl"
  };

  const getVariantStyles = () => {
    if (isClicked) {
      return "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30";
    }
    switch (variant) {
      case 'primary':
        return "bg-black text-white hover:bg-gray-900 shadow-xl shadow-black/10";
      case 'secondary':
        return "bg-white text-black hover:bg-gray-50 shadow-xl shadow-black/5";
      case 'outline':
        return "border border-black/10 bg-white/50 backdrop-blur-xl text-black hover:bg-white shadow-sm";
      default:
        return "";
    }
  };

  const handlePress = (e: any) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (props.onClick) props.onClick(e);
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
      </span>
      <AnimatePresence>
        {isClicked && (
          <motion.div 
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white/20 rounded-full pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${getVariantStyles()} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (href) {
    return (
      <motion.a 
        href={href}
        target={target}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePress as any}
        className={combinedClassName}
        style={style}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button 
      whileHover={props.disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={props.disabled ? {} : { scale: 0.98 }}
      onClick={handlePress}
      className={combinedClassName}
      style={style}
      {...props}
    >
      {content}
    </motion.button>
  );
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
          <Button href="https://calendly.com" target="_blank" size="sm" variant="primary">
            Start Strategy
          </Button>
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
            <Button size="md" variant="primary" className="w-full">Book Strategy Call</Button>
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

          <h1 className="text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] mb-10 leading-[0.8] tracking-tighter overflow-hidden pb-4">
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
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pb-32 md:pb-40"
          >
            <Button size="lg" variant="primary" icon={<ArrowRight size={22} />} className="w-full sm:w-auto">
              Start Your Evolution
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Case Studies
            </Button>
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
          <h2 className="text-5xl md:text-8xl lg:text-9xl mb-6 font-bold tracking-tighter text-black">Our Capabilities</h2>
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
          <span className="mono text-blue-400 font-bold mb-8 block tracking-[0.3em] text-[10px] uppercase text-center md:text-left">MANIFESTO v.2</span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl leading-[0.85] mb-12 tracking-tighter text-center md:text-left">
            Intelligence is a <span className="premium-serif italic font-normal text-blue-300">Reflex.</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/70 font-light leading-relaxed mb-12 text-center md:text-left">
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
                <motion.div 
                  initial={{ width: "10%" }} 
                  animate={{ width: ["10%", "85%", "75%", "90%", "85%"] }} 
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} 
                  className="h-2.5 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]" 
                />
                <motion.div 
                  initial={{ width: "10%" }} 
                  animate={{ width: ["10%", "60%", "45%", "65%", "60%"] }} 
                  transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.2 }} 
                  className="h-2.5 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,0.5)]" 
                />
                <motion.div 
                  initial={{ width: "10%" }} 
                  animate={{ width: ["10%", "95%", "80%", "100%", "95%"] }} 
                  transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }} 
                  className="h-2.5 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]" 
                />
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
  const [nodes, setNodes] = useState(() => 
    Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      chaosX: 10 + Math.random() * 80,
      chaosY: 5 + Math.random() * 60,
      gridX: 20 + (i % 4) * 20,
      gridY: 10 + Math.floor(i / 4) * 18,
    }))
  );

  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    let ws: WebSocket;

    const connect = () => {
      ws = new WebSocket(wsUrl);
      setWsConnection(ws);
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NODES_INIT' || data.type === 'NODES_UPDATE') {
            setNodes(data.payload);
          }
        } catch (e) {
          console.error("WebSocket message error", e);
        }
      };

      ws.onclose = () => {
        setWsConnection(null);
        // Reconnect after 1 second if connection drops
        setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const fetchLatestData = () => {
    if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
      wsConnection.send(JSON.stringify({ type: 'FETCH_LATEST' }));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

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
              <span className="mono text-blue-400 font-bold mb-6 block tracking-[0.3em] text-[10px] uppercase flex items-center justify-center md:justify-start gap-2">
                <Activity size={14} /> LIVE_SIMULATION
              </span>
              <h2 className="text-5xl md:text-8xl lg:text-9xl mb-6 font-bold tracking-tighter leading-[0.85] text-center md:text-left">
                Chaos to <span className="premium-serif italic font-normal" style={{ color: currentModel.color }}>Clarity.</span>
              </h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-8 text-center md:text-left">
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setIsOptimized(!isOptimized);
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  style={isOptimized ? {
                    backgroundColor: currentModel.color,
                    boxShadow: `0 0 40px -10px ${currentModel.color}`
                  } : {}}
                  icon={isOptimized ? <RefreshCw size={18} /> : <Play size={18} fill="currentColor" />}
                  className="w-full sm:w-auto"
                >
                  {isOptimized ? "Reset Simulation" : "Run Optimization"}
                </Button>

                <Button 
                  size="md"
                  variant="outline"
                  onClick={fetchLatestData}
                  icon={<Activity size={18} />}
                  className="w-full sm:w-auto !text-white !border-white/20 hover:!bg-white/10"
                >
                  Sync Data
                </Button>
              </div>
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
                 whileHover={{
                   scale: 1.5,
                   boxShadow: `0 0 20px 5px ${isOptimized ? currentModel.color : '#F87171'}80`,
                   zIndex: 30
                 }}
                 whileTap={{
                   scale: 2,
                   boxShadow: `0 0 30px 10px ${isOptimized ? currentModel.color : '#F87171'}80`,
                 }}
                 transition={{
                   type: "spring",
                   stiffness: 40,
                   damping: 15,
                   delay: isOptimized ? node.id * (0.02 * currentModel.speed) : 0 // Stagger effect
                 }}
                 className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 cursor-pointer"
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
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${isOptimized ? '' : 'bg-red-400'} animate-pulse`} style={{ backgroundColor: isOptimized ? currentModel.color : undefined }} />
                  <span className="text-xs mono uppercase tracking-widest text-white/70 font-bold">
                    {isOptimized ? `OPTIMIZED: ${currentModel.name}` : 'DETECTING_ANOMALIES'}
                  </span>
                </div>
                <div className="text-xs mono text-white/50 font-bold">
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setName('');
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
          className="max-w-4xl mx-auto bg-[#f9f9f8] border border-gray-100 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 flex flex-col items-center gap-12 lg:gap-16 relative overflow-hidden"
        >
          <div className="w-full text-center relative z-10 flex flex-col items-center">
            <span className="mono text-blue-600 font-bold mb-6 block tracking-[0.4em] text-[10px] uppercase">Insights</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tighter font-bold leading-[0.9]">The Front Line of <span className="premium-serif italic font-normal text-blue-600">Intelligence.</span></h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg md:text-xl max-w-md mx-auto">
              Weekly state-of-the-art insights on autonomous systems. No noise.
            </p>
          </div>
          
          <div className="w-full max-w-xl relative z-10">
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
                    <User className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-gray-400 md:w-6 md:h-6" size={20} />
                    <input 
                      type="text" 
                      placeholder="Your name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] py-5 md:py-8 pl-16 md:pl-20 pr-8 md:pr-10 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-lg md:text-xl"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-gray-400 md:w-6 md:h-6" size={20} />
                    <input 
                      type="email" 
                      placeholder="Work email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] py-5 md:py-8 pl-16 md:pl-20 pr-8 md:pr-10 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-lg md:text-xl"
                    />
                  </div>
                  <Button 
                    size="lg"
                    variant="primary"
                    disabled={status === 'loading'}
                    className="w-full"
                    icon={<ArrowRight size={20} className="md:w-6 md:h-6" />}
                  >
                    {status === 'loading' ? 'Syncing...' : 'Get Access'} 
                  </Button>
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
          
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] mb-8 md:mb-12 relative z-10 tracking-tighter font-bold leading-[0.8]">
            Build the <span className="premium-serif italic font-normal text-blue-200">Future.</span>
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-gray-400 mb-12 md:mb-16 max-w-3xl mx-auto relative z-10 font-light leading-relaxed">
            Partner with ATLAS AI to redefine your enterprise logic. Limited Q3 availability.
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="mx-auto"
            icon={<ArrowRight size={24} className="md:w-8 md:h-8" />}
          >
            Start Conversation
          </Button>
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
