import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, Heart, Music, Cake, Sun, GlassWater, Plane, Laptop, Trophy } from 'lucide-react';

const categories = ["All", "Birthday", "Wedding", "Party", "Professional", "Holiday"];

const templates = [
  { id: 1, title: 'Neon Birthday', category: 'Birthday', icon: <Cake className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: 'Summer Bash', category: 'Party', icon: <Sun className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: 'Wedding Bliss', category: 'Wedding', icon: <Heart className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: 'Tech Conference', category: 'Professional', icon: <Laptop className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: 'Cocktail Night', category: 'Party', icon: <GlassWater className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: 'Holiday Feast', category: 'Holiday', icon: <Gift className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: 'Live Concert', category: 'Party', icon: <Music className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: 'Award Ceremony', category: 'Professional', icon: <Trophy className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=800&q=80" },
  { id: 9, title: 'Island Wedding', category: 'Wedding', icon: <Plane className="w-5 h-5 text-white"/>, image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80" },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-20">
      
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
                Find Your <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">Perfect Design.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Start with a professionally crafted template and make it yours in seconds.
            </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                        px-6 py-3 rounded-full font-bold transition-all
                        ${activeCategory === cat 
                            ? 'bg-slate-900 text-white shadow-lg scale-105' 
                            : 'bg-white/50 text-slate-600 hover:bg-white hover:text-orange-600 shadow-sm'
                        }
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Template Grid */}
      <motion.div 
        layout
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
            {filteredTemplates.map((template) => (
              <motion.div 
                layout
                key={template.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Link to="/editor" className="block group">
                  <div className={`aspect-[4/5] bg-slate-900 rounded-3xl relative overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                    
                    {/* Background Image */}
                    <img 
                        src={template.image} 
                        alt={template.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="h-full flex flex-col justify-between relative z-10 p-8">
                        {/* Icon Badge */}
                        <div className="self-start">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white">
                                {template.icon}
                            </div>
                        </div>
                        
                        <div>
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase text-white/90 mb-3 border border-white/10">
                                {template.category}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {template.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm font-bold text-orange-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                Customize Template → 
                            </div>
                        </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No templates found for this category.</p>
          </div>
      )}
    </div>
  );
}
