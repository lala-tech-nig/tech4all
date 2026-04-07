'use client';
import { useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from './WhatsAppButton';
import Confetti from 'react-confetti';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const triggerConfetti = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    };

    window.addEventListener('show-confetti', triggerConfetti);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('show-confetti', triggerConfetti);
    };
  }, []);

  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#111',
            color: '#fff',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px 20px',
          },
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          gravity={0.15}
          colors={['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#111827']}
        />
      )}
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "pt-20" : ""}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}


