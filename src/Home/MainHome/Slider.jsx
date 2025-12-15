import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Custom css
// import "./Slider.css";

// Swiper module
import { Pagination } from "swiper/modules";

const Slider = () => {
    const pagination = {
        clickable: true,
        renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
        },
    };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            {/* Slide 1 */}
            <SwiperSlide>
                <div
                    className="min-h-screen flex items-center justify-center relative"
                    style={{
                        backgroundImage: "url('https://media.licdn.com/dms/image/v2/D4D12AQGxQ9PljDqmPQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696387669689?e=2147483647&v=beta&t=YcnjGqUpcR2ygZykulQJyD6UvMOrW1YhHwWYY8PbrKk')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <h1
                    data-aos="fade-up"
     data-aos-anchor-placement="center-bottom"
                    className="relative z-10 text-white text-4xl font-bold">
                        Hero Slider
                    </h1>
                </div>

            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
                <div className="min-h-screen flex items-center justify-center bg-blue-100">
                    <h1 className="text-4xl font-bold">Slide 2</h1>
                </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
                <div className="min-h-screen flex items-center justify-center bg-green-100">
                    <h1 className="text-4xl font-bold">Slide 3</h1>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
