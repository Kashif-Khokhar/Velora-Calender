import { motion } from 'framer-motion';

export default function Legal({ title, lastUpdated }) {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{title}</h1>
            <p className="text-slate-500 mb-12">Last Updated: {lastUpdated}</p>
            
            <div className="prose prose-lg prose-slate max-w-none">
                <p>
                    Welcome to Velora. This is a placeholder for the {title}. 
                    In a real application, this page would contain the full legal text prepared by your legal team.
                </p>
                <h3>1. Introduction</h3>
                <p>
                    By using our service, you agree to these terms. We value your privacy and are committed to protecting your personal data.
                </p>
                <h3>2. Data Collection</h3>
                <p>
                    We collect minimal data necessary to provide our services, such as your email address for account management and event details for your invitations.
                </p>
                <h3>3. User Rights</h3>
                <p>
                    You have the right to access, correct, or delete your data at any time. Contact us for assistance.
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
