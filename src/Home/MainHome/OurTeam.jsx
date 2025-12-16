import React from 'react';

const OurTeam = () => {
    const team = [
        {
            name: "Shayan Ahmed",
            role: "Co-Founder",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxbxbfsLX1b9RPlakAP7E08PnZiNqiTT8Eg&s",
        },
        {
            name: "Jenny Wilson",
            role: "Engineer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEEJmujpumK3aOEmOGWy65K1s2vM9-Qi4Z5A&s",
        },
        {
            name: "Zayan Becker",
            role: "Safety Officer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1e4LZxa3qZTVVKcPSxAFaiuB4IhyEeb5wRA&s",
        },
        {
            name: "Alina Jasmine",
            role: "Engineer",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-udytpDEX68zHEPHoeNSTY7AUuThjLvBqw&s",
        },
    ];

    return (
        <section className="bg-[#faf7f2] py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-14 gap-6">
                    <div
                    data-aos="fade-right"
                    >
                        <p className="text-yellow-500 font-semibold tracking-widest uppercase mb-2">
                            Our Team
                        </p>
                        <h2 className="text-5xl font-extrabold text-gray-900">
                            Meet Our Team <br />
                            <span className="text-yellow-500">Professionals</span>
                        </h2>
                    </div>


                    <div
                    data-aos="fade-left"
                    className="max-w-md">
                       
                        <button className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-full font-semibold">
                            More Members
                            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">→</span>
                        </button>
                    </div>
                </div>


                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            className="bg-[#faf7f2] hover:scale-105 hover:cursor-pointer border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-bold text-gray-900">
                                {member.name}
                            </h3>
                            <p className="text-gray-500 mb-6">{member.role}</p>


                            <div className="relative">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-50 object-cover rounded-xl"
                                />


                                {/* Social Icons */}
                                <div
                                
                                
                                className="absolute bottom-4 left-4 flex flex-col gap-3">
                                    {["f", "x", "p", "i"].map((icon, idx) => (
                                        <span
                                            key={idx}
                                            className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold cursor-pointer hover:scale-110 transition"
                                        >
                                            {icon}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTeam;