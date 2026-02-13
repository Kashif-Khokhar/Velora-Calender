import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-orange-100 selection:text-orange-600 relative">
        <div className="fixed inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2070&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    </div>
  );
}
