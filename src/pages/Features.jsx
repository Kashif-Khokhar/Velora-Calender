import { motion } from 'framer-motion';
import { Sparkles, Zap, Smartphone, Globe, Shield, Palette } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <Palette className="w-6 h-6" />, title: "Designer Templates", desc: "Access hundreds of professionally crafted templates for any occasion." },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Customization", desc: "Real-time editing with our powerful, intuitive drag-and-drop editor." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Optimized", desc: "Invitations look stunning on every device, from desktop to mobile." },
    { icon: <Globe className="w-6 h-6" />, title: "Global Reach", desc: "Send invitations anywhere in the world with instant delivery tracking." },
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Private", desc: "Your event data is encrypted and private by default." },
    { icon: <Sparkles className="w-6 h-6" />, title: "AI Assistance", desc: "Let Velora AI help you write the perfect invitation text." }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
        >
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
                Powerful Features. <br />
                <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">Zero Complexity.</span>
            </h1>
            <p className="text-xl text-slate-600">Everything you need to host the perfect event, built right in.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-1"
                >
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                        {f.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                    <p className="text-slate-600">{f.desc}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
