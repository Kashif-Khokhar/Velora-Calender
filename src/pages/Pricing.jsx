import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
        >
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
                Simple Pricing
            </h1>
            <p className="text-xl text-slate-600">Start for free. Upgrade when you need more.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard title="Free" price="$0" features={["Up to 50 guests", "Basic Templates", "Email Support"]} />
            <PricingCard title="Pro" price="$29" recommended={true} features={["Unlimited guests", "Premium Templates", "RSVP Tracking", "Priority Support"]} />
            <PricingCard title="Enterprise" price="Custom" features={["Dedicated Manager", "Custom Branding", "API Access", "SLA"]} />
        </div>
      </div>
    </div>
  );
}

function PricingCard({ title, price, features, recommended = false }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border ${recommended ? 'bg-white/80 border-orange-200 shadow-orange-900/10 scale-105 z-10' : 'bg-white/40 border-white/50'} shadow-xl backdrop-blur-xl relative`}
        >
            {recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <div className="text-4xl font-black text-slate-900 mb-8">{price}</div>
            <ul className="space-y-4 mb-8">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                        <div className="bg-green-100 p-1 rounded-full text-green-600"><Check className="w-3 h-3" /></div>
                        {f}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${recommended ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg disabled' : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'}`}>
                Get Started
            </button>
        </motion.div>
    )
}
