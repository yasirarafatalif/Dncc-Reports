import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { ArrowRight, Sparkles } from 'lucide-react';

const OurTeam = () => {
    const team = [
        {
            name: "Shayan Ahmed",
            role: "Co-Founder",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxbxbfsLX1b9RPlakAP7E08PnZiNqiTT8Eg&s",
        },
        {
            name: "Jenny Wilson",
            role: "Chief Engineer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEEJmujpumK3aOEmOGWy65K1s2vM9-Qi4Z5A&s",
        },
        {
            name: "Zayan Becker",
            role: "Safety Officer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1e4LZxa3qZTVVKcPSxAFaiuB4IhyEeb5wRA&s",
        },
        {
            name: "Alina Jasmine",
            role: "System Architect",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-udytpDEX68zHEPHoeNSTY7AUuThjLvBqw&s",
        },
    ];

    return (
        <section className="bg-base-100 py-24 px-6 relative overflow-hidden">
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[100px] rounded-full -z-10" />
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-yellow-500" size={20} />
                            <span className="text-yellow-600 font-black tracking-[0.2em] text-xs uppercase">Expert Panel</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-secondary leading-tight">
                            The Brilliant Minds Behind <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                                Nagorik Sheba
                            </span>
                        </h2>
                    </motion.div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-yellow-500/20 transition-all"
                    >
                        Explore More
                        <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
                            <ArrowRight size={18} />
                        </div>
                    </motion.button>
                </div>

                {/* Team Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            {/* Card Body */}
                            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:border-yellow-200">
                                
                                {/* Image Container */}
                                <div className="relative h-72 w-full overflow-hidden rounded-[2rem] mb-6">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />

                                    {/* Social Overlay - Shows on Hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                                        {[
                                            { icon: <FaFacebookF />, link: "#" },
                                            { icon: <FaTwitter />, link: "#" },
                                            { icon: <FaLinkedinIn />, link: "#" },
                                            { icon: <FaInstagram />, link: "#" }
                                        ].map((s, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={s.link}
                                                initial={{ y: 20, opacity: 0 }}
                                                whileInView={{ y: 0, opacity: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center text-black hover:bg-white transition-colors"
                                            >
                                                {s.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-2 pb-4 text-center">
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-yellow-600 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-none">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTeam;