import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Rocket className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight">
                {title}
            </h1>
            <p className="text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
                We're working hard to bring you something amazing. Stay tuned!
            </p>
            <Link to="/" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                Back to Home
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
