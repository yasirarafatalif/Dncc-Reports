import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Silder2 = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-[90vh]"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div
          className="h-full flex items-center justify-center text-center px-6"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092334431-5a2e8d97d3a2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-3xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Report Public Infrastructure Issues Easily
            </h1>
            <p className="text-lg">
              Citizens can report potholes, broken streetlights, water leakage,
              garbage overflow and more — all in one centralized platform.
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div
          className="h-full flex items-center justify-center text-center px-6"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-3xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Faster Government Response & Tracking
            </h1>
            <p className="text-lg">
              Admins and government staff can verify, assign, track and resolve
              issues efficiently with real-time updates.
            </p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div
          className="h-full flex items-center justify-center text-center px-6"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-4b46a572b786')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 p-10 rounded-2xl max-w-3xl text-white">
            <h1 className="text-4xl font-bold mb-4">
              Transparent & Smart Issue Management
            </h1>
            <p className="text-lg">
              A smart digital system that improves transparency, accountability
              and faster resolution of municipal problems.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold">
              Report an Issue
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Silder2;
