import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahat Chowdhury",
    role: "Local Citizen",
    text: "The response time is incredible! I reported a broken streetlight in Mirpur, and it was fixed within 48 hours. This is the digital Bangladesh we dreamed of.",
    img: "https://i.pravatar.cc/150?u=rahat",
    rating: 5
  },
  {
    name: "Anika Tabassum",
    role: "Premium Member",
    text: "Being a premium member gives me direct access to status updates. The transparency of this system is what impressed me the most. Highly recommended!",
    img: "https://i.pravatar.cc/150?u=anika",
    rating: 5
  },
  {
    name: "Yasir",
    role: "City Corporation Staff",
    text: "As a staff member, managing issues has never been easier. The assignment and tracking system helps us stay organized and serve citizens better.",
    img: "https://i.pravatar.cc/150?u=arif",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]  blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            <div className="p-3 bg-[#aa84fc]/10 rounded-2xl text-[#aa84fc]">
              <Quote size={32} fill="currentColor" className="opacity-50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mt-4">
              Voices of <span className="text-primary">Change</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mt-4">
              See how citizens and city officials are working together to build a better infrastructure through Nagorik Sheba.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-[2.5rem] bg-base-100 border border-white/5 backdrop-blur-xl group hover:bg-slate-800/50 transition-all duration-500"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-300 italic leading-relaxed mb-8">
                "{item.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#aa84fc] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full border-2 border-[#aa84fc]/50 relative z-10"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-[#aa84fc] text-[10px] font-bold uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Background Quote Decoration */}
              <div className="absolute bottom-6 right-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                 <Quote size={80} fill="white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {/* Apni ekhane City Corporation ba Govt logos dite paren */}
          <span className="text-secondary font-black tracking-widest text-xl italic">DHAKA NORTH</span>
          <span className="text-secondary font-black tracking-widest text-xl italic">WASA</span>
          <span className="text-secondary font-black tracking-widest text-xl italic">DESCO</span>
          <span className="text-secondary font-black tracking-widest text-xl italic">DIGITAL BD</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;