import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-01T00:00:00');
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center text-white relative overflow-hidden">
      <div className="text-center p-6 max-w-lg mx-auto z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.days}</span>
            <p className="text-sm">Days</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</span>
            <p className="text-sm">Hours</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</span>
            <p className="text-sm">Minutes</p>
          </div>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <span className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</span>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email for updates"
            className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Subscribe
          </button>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-pink-500 bg-opacity-20 rounded-full -top-48 -left-48 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-indigo-500 bg-opacity-20 rounded-full bottom-0 right-0 animate-blob animation-delay-2000"></div>
      </div>
      <style jsx>{`
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(50px, 50px); }
          50% { transform: translate(0, 100px); }
          75% { transform: translate(-50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;