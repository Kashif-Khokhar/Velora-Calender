import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle, ChevronDown, Sparkles, Star, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Free",
      price: "0",
      description: "Perfect for small personal events",
      features: ["Up to 50 guests", "Basic Templates", "Email Support", "Live RSVP Tracking"],
      buttonText: "Get Started",
      recommended: false
    },
    {
      title: "Pro",
      price: isYearly ? "23" : "29",
      description: "Best for professionals and heavy users",
      features: ["Unlimited guests", "Premium Templates", "Custom Branding", "RSVP Tracking", "Priority Support", "No Velora Watermark"],
      buttonText: "Go Pro",
      recommended: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored for large organizations",
      features: ["Dedicated Manager", "White-labeled Domain", "API Access", "SSO & SAML Auth", "SLA Guarantee", "24/7 Phone Support"],
      buttonText: "Contact Sales",
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-slate-50">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-violet-200/30 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-6 shadow-sm border border-orange-200"
            >
                <Sparkles className="w-4 h-4" />
                <span>Flexible Plans for Everyone</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 tracking-tight leading-tight">
                Simple, Transparent <br />
                <span className="bg-gradient-to-r from-orange-600 to-rose-500 bg-clip-text text-transparent">Pricing.</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium">Choose the plan that's right for your next big moment.</p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-20">
            <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button 
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-16 h-8 rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-300"
            >
                <motion.div 
                    animate={{ x: isYearly ? 32 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow-md"
                />
            </button>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>Yearly</span>
                <motion.span 
                    animate={{ scale: isYearly ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-200"
                >
                    Save 20%
                </motion.span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
            {plans.map((plan, index) => (
                <PricingCard key={index} {...plan} isYearly={isYearly} delay={index * 0.1} />
            ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mb-32">
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-10">Trusted by event hosts worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <TrustLogo icon={<Star className="w-5 h-5" />} text="WeddingPro" />
                <TrustLogo icon={<Users className="w-5 h-5" />} text="Hostly" />
                <TrustLogo icon={<Sparkles className="w-5 h-5" />} text="Eventify" />
                <TrustLogo icon={<Star className="w-5 h-5" />} text="Celebra" />
            </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pb-20">
            <div className="text-center mb-16">
                <div className="inline-flex p-3 rounded-2xl bg-slate-100 text-slate-400 mb-4">
                    <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-600 font-medium font-medium">Everything you need to know about Velora pricing.</p>
            </div>
            <div className="space-y-4">
                <FAQItem 
                    question="Can I upgrade or downgrade my plan later?" 
                    answer="Yes, you can change your plan at any time from your account settings. If you upgrade, the change will be immediate. If you downgrade, it will take effect at the end of your current billing cycle."
                />
                <FAQItem 
                    question="What payment methods do you accept?" 
                    answer="We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also support bank transfers and invoicing."
                />
                <FAQItem 
                    question="Is there a free trial for the Pro plan?" 
                    answer="We don't offer a traditional trial, but our Free plan lets you explore most basic features. You can upgrade to Pro and cancel anytime if it's not the right fit."
                />
                <FAQItem 
                    question="Do you offer discounts for non-profits?" 
                    answer="Absolutely! We love supporting good causes. Contact our support team with your non-profit documentation for a special 50% discount on Pro plans."
                />
            </div>
        </div>
      </div>
    </div>
  );
}

function TrustLogo({ icon, text }) {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-slate-200 p-2 rounded-lg">{icon}</div>
            <span className="font-black text-slate-800 text-lg tracking-tight">{text}</span>
        </div>
    )
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'bg-white border-orange-200 shadow-lg shadow-orange-900/5' : 'bg-white/50 border-slate-200'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-6 flex justify-between items-center gap-4"
            >
                <span className="font-bold text-slate-900 text-lg">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-slate-600 leading-relaxed font-medium">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function PricingCard({ title, price, description, features, buttonText, recommended = false, isYearly, delay }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className={`p-10 rounded-[2.5rem] border flex flex-col relative transition-all duration-500 ${
                recommended 
                ? 'bg-white border-orange-400 shadow-[0_20px_50px_rgba(234,88,12,0.15)] ring-4 ring-orange-50' 
                : 'bg-white/70 border-white shadow-xl backdrop-blur-xl hover:shadow-2xl'
            }`}
        >
            {recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-600 to-rose-500 text-white px-6 py-1.5 rounded-full text-xs font-black shadow-lg uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                </div>
            )}
            
            <div className="mb-10">
                <h3 className={`text-2xl font-black mb-2 ${recommended ? 'text-orange-600' : 'text-slate-900'}`}>{title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
            </div>

            <div className="mb-10 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 tracking-tight">
                    {price !== "Custom" ? `$${price}` : "Custom"}
                </span>
                {price !== "Custom" && (
                    <span className="text-slate-500 font-bold text-lg">
                        /{isYearly ? 'yr' : 'mo'}
                    </span>
                )}
            </div>

            <button className={`w-full py-5 rounded-[1.25rem] font-black text-lg transition-all duration-300 flex items-center justify-center gap-2 mb-10 ${
                recommended 
                ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-900/20 active:scale-[0.98]' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}>
                {buttonText} {recommended && <ArrowRight className="w-5 h-5" />}
            </button>

            <div className="space-y-5 mt-auto">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">What's included</p>
                {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-4 text-slate-700">
                        <div className={`mt-0.5 min-w-[20px] h-[20px] rounded-full flex items-center justify-center ${recommended ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-[15px] font-semibold leading-snug">{f}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

