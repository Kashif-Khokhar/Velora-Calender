import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, Share2, Type, Calendar as CalendarIcon, 
  MapPin, Check, Cake, Heart, Sun, Laptop, Image as ImageIcon, Upload, Camera
} from 'lucide-react';
import html2canvas from 'html2canvas';

const MiniCalendar = ({ theme }) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // Static February 2026 grid for demo matching reference
  const calendarDays = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28
  ];

  return (
    <div className="w-full max-w-[200px] text-[10px] font-bold p-2 bg-white/40 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-slate-900 border-b-2" style={{ borderColor: theme.primary }}>February</span>
        <span className="text-slate-900">2026</span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {days.map(d => (
          <span key={d} className="text-[6px] text-orange-600/70">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(d => (
          <div key={d} className="relative flex items-center justify-center p-0.5">
            {d === 16 && (
              <div className="absolute inset-0 border-2 border-red-500 rounded-full scale-125 -rotate-12 opacity-80" />
            )}
            <span className={d === 16 ? 'text-red-600 z-10' : 'text-slate-700'}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const themes = {
    summer: {
      name: 'Summer Bash',
      primary: '#ea580c', // orange-600
      secondary: '#e11d48', // rose-600
      accent: '#fbbf24', // amber-400
      bgGradient: 'linear-gradient(to right, #fb923c, #fb7185, #fbbf24)',
      blobColor1: '#ffedd5', // orange-100
      blobColor2: '#ffe4e6', // rose-100
      textColor: '#0f172a',
      subtextColor: '#ea580c',
      iconColor: '#ea580c',
      iconBg: '#ffedd5',
      icon: Sun
    },
    birthday: {
      name: 'Modern Birthday',
      primary: '#7c3aed', // violet-600
      secondary: '#e11d48', // rose-600
      accent: '#fb7185', // rose-400
      bgGradient: 'linear-gradient(to right, #7c3aed, #e11d48, #fb7185)',
      blobColor1: '#f5f3ff', // violet-50
      blobColor2: '#fff1f2', // rose-50
      textColor: '#0f172a',
      subtextColor: '#7c3aed',
      iconColor: '#7c3aed',
      iconBg: '#f5f3ff',
      icon: Cake
    },
    wedding: {
      name: 'Classic Wedding',
      primary: '#334155', // slate-700
      secondary: '#e11d48', // rose-600
      accent: '#94a3b8', // slate-400
      bgGradient: 'linear-gradient(to right, #334155, #64748b, #94a3b8)',
      blobColor1: '#f1f5f9', // slate-100
      blobColor2: '#fff1f2', // rose-50
      textColor: '#0f172a',
      subtextColor: '#334155',
      iconColor: '#334155',
      iconBg: '#f1f5f9',
      icon: Heart
    },
    tech: {
      name: 'Tech Night',
      primary: '#0f172a', // slate-900
      secondary: '#ea580c', // orange-600
      accent: '#64748b', // slate-500
      bgGradient: 'linear-gradient(to right, #0f172a, #334155, #64748b)',
      blobColor1: '#1e293b', // slate-800
      blobColor2: '#334155', // slate-700
      textColor: '#0f172a',
      subtextColor: '#ea580c',
      iconColor: '#ea580c',
      iconBg: '#ffedd5',
      icon: Laptop
    },
    scrapbook: {
      name: 'Scrapbook Birthday',
      primary: '#f59e0b', // amber-500
      secondary: '#ef4444', // red-500
      accent: '#3f3f46', // zinc-700
      bgGradient: 'linear-gradient(to bottom right, #fafaf9, #f5f5f4)',
      blobColor1: '#fef3c7', // amber-100
      blobColor2: '#fee2e2', // red-100
      textColor: '#18181b', // zinc-900
      subtextColor: '#71717a', // zinc-500
      iconColor: '#f59e0b',
      iconBg: '#fef3c7',
      icon: Cake,
      layout: 'scrapbook'
    }
  };

export default function Editor() {
  const [searchParams] = useSearchParams();
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: searchParams.get('title') || 'Amy\'s 25th Birthday',
    date: 'Oct 24, 2026',
    time: '8:00 PM',
    location: 'Rooftop Bar, NYC'
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    const themeParam = searchParams.get('theme');
    return themes[themeParam] ? themeParam : 'summer';
  });
  const theme = themes[activeTheme];

  // Update theme if URL changes
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam && themes[themeParam]) {
      setActiveTheme(themeParam);
    }
    const titleParam = searchParams.get('title');
    if (titleParam) {
      setFormData(prev => ({ ...prev, title: titleParam }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!previewRef.current) return;
    
    try {
      console.log('Starting invitation capture...');
      const canvas = await html2canvas(previewRef.current, {
        scale: 1, // Reduced scale for better compatibility/memory
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: true,
        onclone: () => {
          console.log('DOM cloned for capture');
        }
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${formData.title.replace(/\s+/g, '_')}_invite.png`;
      link.click();
      console.log('Invitation saved successfully');
    } catch (err) {
      console.error('Detailed error saving image:', err);
      alert(`Failed to save invitation image: ${err.message || 'Unknown error'}. Please check the console for details.`);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: formData.title,
      text: `Check out my invitation for ${formData.title}!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        alert('Failed to copy link.');
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 lg:py-20 h-auto lg:min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Sidebar Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/3 bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-lg flex flex-col justify-between"
          style={{ height: '500px' }}
        >
          <div className="overflow-y-auto pr-2 custom-scrollbar">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Type className="w-5 h-5 text-orange-600" /> Customize Invite
            </h2>
            
            <div className="space-y-6">
              <div>
                  <label className="block text-sm text-slate-600 mb-1 font-medium">Event Title</label>
                  <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                  />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm text-slate-600 mb-2 font-medium">Friend's Photo</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex-1 py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:border-orange-500 hover:text-orange-600 transition-all bg-white/50"
                  >
                    {imagePreview ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                    {imagePreview ? 'Photo Selected' : 'Upload Photo'}
                  </button>
                  {imagePreview && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
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
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                      />
                  </div>
                   <div>
                      <label className="block text-sm text-slate-600 mb-1 font-medium">Time</label>
                       <input 
                          type="text" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange}
                           className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
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
                      className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                  />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/50 flex gap-4">
            <button 
              onClick={handleShare}
              className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5"
            >
                {isSharing ? (
                  <>
                    <Check className="w-4 h-4" /> Linked!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" /> Share
                  </>
                )}
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-3 bg-white/60 border border-white/60 hover:bg-white/90 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
            >
                <Download className="w-4 h-4" /> Save
            </button>
          </div>
        </motion.div>

        {/* Live Preview */}
        <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden relative p-8">
            
            <div 
                ref={previewRef}
                className="w-full max-w-lg bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-8 border border-slate-200"
                style={{ height: '500px' }}
            >
                {theme.layout === 'scrapbook' ? (
                  <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#fafaf9]">
                    {/* Retro Headers */}
                    <div className="pt-4 flex flex-col items-center">
                      <h2 className="text-5xl font-black tracking-tighter text-slate-800 drop-shadow-sm mb-0 flex gap-1">
                        <span className="bg-white px-1 border border-slate-300 -rotate-3">H</span>
                        <span className="bg-white px-1 border border-slate-300 rotate-2">a</span>
                        <span className="bg-white px-1 border border-slate-300 -rotate-2">P</span>
                        <span className="bg-white px-1 border border-slate-300 rotate-3">p</span>
                        <span className="bg-white px-1 border border-slate-300 -rotate-1">Y</span>
                      </h2>
                      <h1 className="text-6xl font-black tracking-tighter text-slate-900 drop-shadow-md flex gap-2 -mt-2">
                        <span className="bg-white px-2 border-2 border-slate-400 rotate-1 shadow-sm">B</span>
                        <span className="bg-white px-2 border-2 border-slate-400 -rotate-2 shadow-sm">I</span>
                        <span className="bg-white px-2 border-2 border-slate-400 rotate-3 shadow-sm">R</span>
                        <span className="bg-white px-2 border-2 border-slate-400 -rotate-1 shadow-sm">T</span>
                        <span className="bg-white px-1 border-2 border-slate-400 rotate-2 shadow-sm">h</span>
                        <span className="bg-white px-1 border-2 border-slate-400 -rotate-2 shadow-sm">D</span>
                        <span className="bg-white px-1 border-2 border-slate-400 rotate-1 shadow-sm">a</span>
                        <span className="bg-white px-1 border-2 border-slate-400 -rotate-1 shadow-sm">Y</span>
                      </h1>
                    </div>

                    <div className="flex flex-1 w-full gap-4 p-4 items-center">
                      {/* Left: Photos Collage */}
                      <div className="flex-1 space-y-3 flex flex-col items-center">
                        <div className="relative w-full aspect-[4/5] bg-slate-100 border-4 border-white shadow-lg rotate-[-4deg] overflow-hidden">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Friend" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="w-12 h-12" />
                            </div>
                          )}
                          {/* Tape effect */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/60 backdrop-blur-sm -rotate-2 shadow-sm" />
                        </div>
                        <div className="relative w-3/4 aspect-[4/3] bg-slate-100 border-4 border-white shadow-lg rotate-[3deg] overflow-hidden">
                           {imagePreview ? (
                            <img src={imagePreview} alt="Friend 2" className="w-full h-full object-cover scale-150 grayscale-[0.2]" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <ImageIcon className="w-10 h-10" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Info & Calendar */}
                      <div className="flex-1 flex flex-col items-center gap-6">
                        <div className="italic text-4xl font-serif text-slate-800 -rotate-6">
                          {formData.date.split(',')[0]}
                        </div>
                        
                        <div className="relative group">
                           <MiniCalendar theme={theme} />
                           <div className="absolute -top-4 -right-4 w-12 h-12 rotate-12 opacity-80">
                             <Cake className="w-full h-full text-amber-500" />
                           </div>
                        </div>

                        <div className="text-left w-full space-y-1 pl-4 border-l-2 border-dashed border-slate-300">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Join the Celebration</p>
                          <p className="font-black text-slate-800 leading-tight">{formData.title}</p>
                          <p className="text-xs font-bold text-slate-600">{formData.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Fun footer elements */}
                    <div className="absolute bottom-2 right-2 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-amber-400" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Decorative Elements - Dynamic by Theme */}
                    <div 
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ background: theme.bgGradient }}
                    ></div>
                    
                    <div 
                        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-70"
                        style={{ backgroundColor: theme.blobColor1 }}
                    ></div>
                    
                    <div 
                        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-70"
                        style={{ backgroundColor: theme.blobColor2 }}
                    ></div>

                    <div className="relative z-10 space-y-6 flex flex-col items-center w-full">
                        {imagePreview && (
                          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden -mt-4 mb-2 animate-in zoom-in duration-300">
                             <img src={imagePreview} alt="Target" className="w-full h-full object-cover" />
                          </div>
                        )}
                        
                        <div className="text-slate-900">
                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight mb-2" style={{ color: theme.textColor }}>
                                {formData.title || 'Event Title'}
                            </h1>
                            <p className="text-sm uppercase tracking-[0.2em] font-bold" style={{ color: theme.subtextColor }}>You are invited</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 w-full space-y-4 border border-slate-100 shadow-sm" style={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9' }}>
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.iconBg }}>
                                    <theme.icon className="w-5 h-5" style={{ color: theme.iconColor }} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold" style={{ color: '#94a3b8' }}>When</p>
                                    <p className="font-bold" style={{ color: '#475569' }}>{formData.date} • {formData.time}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-left">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.iconBg }}>
                                    <MapPin className="w-5 h-5" style={{ color: theme.iconColor }} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold" style={{ color: '#94a3b8' }}>Where</p>
                                    <p className="font-bold" style={{ color: '#475569' }}>{formData.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                  </>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
