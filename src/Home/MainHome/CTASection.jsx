import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone, ShieldCheck, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Dynamic Background Animated Shapes */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-[#aa84fc] blur-[100px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-emerald-500 blur-[120px] rounded-full"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Glassmorphism Decorative Icons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
          >
            <Zap size={16} className="text-[#aa84fc] fill-[#aa84fc]" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Take Action Today</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          >
            Ready to Build a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aa84fc] to-[#4ade80]">
              Smarter City?
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            <p>
            Join thousands of active citizens. Report your first issue now or upgrade to Premium for priority resolution and exclusive tracking tools.
          </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(170, 132, 252, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-[#aa84fc] text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl transition-all"
            >
              <Megaphone size={22} />
              REPORT AN ISSUE
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/5 border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all backdrop-blur-md"
            >
              <ShieldCheck size={22} className="text-[#4ade80]" />
              GET PREMIUM
            </motion.button>
          </motion.div>

          {/* Bottom Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-50">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs text-white font-bold uppercase tracking-widest">Live in Dhaka</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#aa84fc] animate-pulse" />
               <span className="text-xs text-white font-bold uppercase tracking-widest">2.4k Issues Fixed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;