import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-28 pb-20">
       <div className="container mx-auto px-6 max-w-5xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Get in touch</h1>
                    <p className="text-slate-600 text-lg mb-12">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm"><Mail className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-slate-900">Email</h4>
                                <p className="text-slate-600">hello@velora.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm"><Phone className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-slate-900">Phone</h4>
                                <p className="text-slate-600">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm"><MapPin className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-bold text-slate-900">Office</h4>
                                <p className="text-slate-600">123 Design Street, Creative City</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-orange-500" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-orange-500" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                            <textarea className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-orange-500 h-32" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20">
                            Send Message
                        </button>
                    </form>
                </div>
            </motion.div>
       </div>
    </div>
  );
}
