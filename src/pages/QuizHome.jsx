import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, CheckCircle2, Star } from "lucide-react";

const QuizHome = () => {
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    
    const startDate = new Date("2026-02-18");
    const currentDate = new Date();
    const diff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    setCurrentDay(currentDate < startDate ? 0 : Math.min(diff + 1, 30));
  }, []);

  const handleDayClick = (day) => {
    localStorage.setItem("thisDay", JSON.stringify(day));
    navigate("/quiz-page");
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <main className="min-h-screen bg-mainbg text-slate-100 font-sans p-5 pb-10 selection:bg-secondary/30">
      {/* Header Navigation */}
      <header className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Daily Quiz
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      <section className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold mb-2"
          >
            السلام عليكم 🌙
          </motion.h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Strengthen your knowledge this Ramadan. Unlock a new challenge every day and track your journey.
          </p>
        </div>

        {/* Progress Card */}
        {currentDay > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 backdrop-blur-sm"
          >
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Your Journey</p>
                <p className="text-lg font-bold">Day {currentDay} <span className="text-slate-500 font-normal">/ 30</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-secondary font-bold">{Math.round((currentDay/30)*100)}% Complete</p>
              </div>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentDay / 30) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-400 to-secondary rounded-full"
              />
            </div>
          </motion.div>
        )}

        {/* Quiz Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 md:grid-cols-5 gap-3"
        >
          {[...Array(30).keys()].map((i) => {
            const day = i + 1;
            const isUnlocked = day <= currentDay;
            const isToday = day === currentDay;
            const isCompleted = day < currentDay; // Assuming past days are completed

            return (
              <motion.button
                key={day}
                variants={itemVars}
                whileHover={isUnlocked ? { y: -4, transition: { duration: 0.2 } } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && handleDayClick(day)}
                disabled={!isUnlocked}
                className={`
                  relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300
                  ${isToday 
                    ? "bg-secondary shadow-[0_0_20px_rgba(var(--secondary-rgb),0.4)] border-2 border-white/20" 
                    : isUnlocked 
                      ? "bg-white/10 border border-white/5 hover:bg-white/20" 
                      : "bg-white/[0.02] border border-white/[0.05] opacity-50 cursor-not-allowed"}
                `}
              >
                <span className={`text-[10px] uppercase tracking-tighter mb-0.5 ${isToday ? "text-white/80" : "text-slate-700"}`}>
                  Day
                </span>
                <span className={`text-xl font-black ${isToday ? "text-white" : "text-slate-900"}`}>
                  {day}
                </span>

                {/* Status Icons */}
                <div className="absolute top-1.5 right-1.5">
                  {!isUnlocked ? (
                    <Lock className="w-3 h-3 text-slate-600" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isToday ? (
                    <Star className="w-3 h-3 text-yellow-300 animate-pulse" />
                  ) : null}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Empty State / Not Started */}
        {currentDay === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-10 p-8 rounded-3xl bg-white/5 border border-dashed border-white/20 text-center"
          >
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-slate-500" />
            </div>
            <h3 className="text-xl font-bold">Ramadan Awaits</h3>
            <p className="text-slate-400 text-sm mt-2">
              The first quiz unlocks on <span className="text-secondary font-semibold">Feb 18, 2026</span>. 
              Prepare yourself for a month of learning!
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default QuizHome;