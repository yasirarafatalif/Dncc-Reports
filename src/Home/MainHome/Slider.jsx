import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom css
// import "./Slider.css";

// Swiper module
import { Autoplay, Pagination } from "swiper/modules";
import AOS from "aos";

const Slider = () => {
    const pagination = {
        clickable: true,
        renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
        },

    };

    return (
        <Swiper


            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={pagination}
            modules={[Pagination, Autoplay]}
            loop={true}
            onSlideChange={() => {
                AOS.refresh();
            }}
            className="mySwiper"
        >
            {/* Slide 1 */}
            <SwiperSlide>
                <div
                    className="min-h-screen flex items-center justify-center relative"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1523760957528-55d1d540360d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="relative z-10 max-w-2xl text-center px-6">
                        <h1
                            data-aos="fade-up"
                            className="text-white text-5xl md:text-6xl font-bold mb-4"
                        >
                             A sharp and narrow blade designed
                            
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-200 text-lg mb-6"
                        >
                            A sharp and narrow blade designed for precision cutting.
                            Perfect for removing bones from meat, poultry, and fish.
                        </p>

                        <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 bg-[#75b519] text-white font-semibold rounded hover:bg-green-400 transition"
                        >
                            Learn More
                        </button>
                        <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 ms-3 bg-white text-black font-semibold rounded hover:bg-[#75b519] hover:text-white hover:cursor-pointer transition"
                        >
                            Our Services
                        </button>
                    </div>
                </div>


            </SwiperSlide>




            {/* Slide 2 */}
            <SwiperSlide>
                <div
                    className="min-h-screen flex items-center justify-center relative"
                    style={{
                        backgroundImage: "url('  https://images.unsplash.com/photo-1647235862575-a4bfaa6add07?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="relative z-10 max-w-2xl text-center px-6">
                        <h1
                            data-aos="fade-up"
                            className="text-white text-5xl md:text-6xl font-bold mb-4"
                        >
                            Professional Kitchen Tools
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-200 text-lg mb-6"
                        >
                            Crafted for chefs who demand performance, durability,
                            and precision in every cut.
                        </p>


                           <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 bg-[#75b519] text-white font-semibold rounded hover:text-white hover:cursor-pointer transition"
                        >
                            Explore Collection
                        </button>
                        <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 ms-3 bg-white text-black font-semibold rounded hover:bg-[#75b519] hover:text-white hover:cursor-pointer transition"
                        >
                            Our Services
                        </button>

                       
                    </div>

                </div>

            </SwiperSlide>


            {/* Slide 3 */}

            <SwiperSlide>
                <div
                    className="min-h-screen flex items-center justify-center relative"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1610932975716-df20896edfe5?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="relative z-10 max-w-2xl text-center px-6">
                        <h1
                            data-aos="fade-up"
                            className="text-white text-5xl md:text-6xl font-bold mb-4"
                        >
                            Precision & Performance
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="text-gray-200 text-lg mb-6"
                        >
                            Experience effortless cutting with ergonomic design
                            and razor-sharp blades.
                        </p>

                        
                        <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 bg-[#75b519] text-white font-semibold rounded hover:bg-green-400 transition"
                        >
                            Learn More
                        </button>
                        <button
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="px-6 py-3 ms-3 bg-white text-black font-semibold rounded hover:bg-[#75b519] hover:text-white hover:cursor-pointer transition"
                        >
                            Our Services
                        </button>

                     
                    </div>

                </div>

            </SwiperSlide>

        </Swiper>
    );
};

export default Slider;
