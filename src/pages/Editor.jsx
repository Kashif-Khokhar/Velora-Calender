import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Type, Calendar as CalendarIcon, MapPin } from 'lucide-react';

export default function Editor() {
  const [formData, setFormData] = useState({
    title: 'Amy\'s 25th Birthday',
    date: 'Oct 24, 2026',
    time: '8:00 PM',
    location: 'Rooftop Bar, NYC'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-6 py-10 lg:py-20 h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Sidebar Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/3 space-y-6 bg-white/60 backdrop-blur-xl p-6 rounded-2xl h-fit border border-white/50 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <Type className="w-5 h-5 text-orange-600" /> Customize Invite
          </h2>
          
          <div className="space-y-4">
            <div>
                <label className="block text-sm text-slate-600 mb-1 font-medium">Event Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium backdrop-blur-sm"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 mb-1 font-medium">Date</label>
                    <input 
                        type="text" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium backdrop-blur-sm"
                    />
                </div>
                 <div>
                    <label className="block text-sm text-slate-600 mb-1 font-medium">Time</label>
                     <input 
                        type="text" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange}
                         className="w-full bg-white/50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium backdrop-blur-sm"
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm text-slate-600 mb-1 font-medium">Location</label>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium backdrop-blur-sm"
                />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/50 flex gap-4">
            <button className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5">
                <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex-1 py-3 bg-white/60 border border-white/60 hover:bg-white/90 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md backdrop-blur-sm">
                <Download className="w-4 h-4" /> Save
            </button>
          </div>
        </motion.div>

        {/* Live Preview */}
        <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden relative p-8">
            
            <motion.div 
                layout
                className="w-full max-w-md aspect-[4/5] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-8 border border-white/20"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-amber-400"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

                <div className="relative z-10 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={formData.title}
                        className="text-slate-900"
                    >
                         <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-sm text-slate-900">
                            {formData.title || 'Event Title'}
                        </h1>
                        <p className="text-orange-600 text-sm uppercase tracking-[0.2em] font-bold">You are invited</p>
                    </motion.div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 w-full space-y-4 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <CalendarIcon className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">When</p>
                                <p className="text-slate-700 font-bold">{formData.date} • {formData.time}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Where</p>
                                <p className="text-slate-700 font-bold">{formData.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 font-mono text-xs text-slate-300">
                    evite.pro/u/amy
                </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
}
