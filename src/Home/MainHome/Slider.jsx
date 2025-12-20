
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import { ChefHat, Sparkles, Award, ArrowRight } from "lucide-react"
import {
  AlertTriangle,
  MapPin,
  ShieldCheck,
} from "lucide-react";


// Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Link } from "react-router";

export default function CreativeSlider() {
  const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className} !bg-white/40 !w-3 !h-3 hover:!bg-white transition-all"></span>`
    },
  }


const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1920&auto=format&fit=crop",
    icon: AlertTriangle,
    badge: "Report Issues",
    title: "Report Public Issues Easily",
    subtitle: "Your City, Your Responsibility",
    description:
      "Report real-world infrastructure issues like potholes, broken streetlights, water leakage, and garbage overflow in just a few clicks.",
    cta: "Report an Issue",
    accent: "from-red-500 to-orange-500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=1920&auto=format&fit=crop",
    icon: ShieldCheck,
    badge: "Fast Resolution",
    title: "Track & Resolve Issues Faster",
    subtitle: "Transparency at Every Step",
    description:
      "Government staff and admins verify, assign, and resolve issues efficiently with real-time status tracking and timeline updates.",
    cta: "View All Issues",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop",
    icon: MapPin,
    badge: "Smart City",
    title: "Building Smarter Cities Together",
    subtitle: "Data-Driven Infrastructure Management",
    description:
      "Collect, analyze, and manage infrastructure data to improve city services and reduce response time for public issues.",
    cta: "Explore Dashboard",
    accent: "from-blue-500 to-cyan-600",
  },
];
const linkMap = {
  "Explore Dashboard": "/dashboard",
  "View All Issues": "/all-issue",
  "Report an Issue": "/submit-issue",
};


  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        pagination={pagination}
        modules={[Pagination, Autoplay, EffectFade]}
        loop={true}
        speed={1000}
        className="h-screen"
      >
        {slides.map((slide, index) => {
          const Icon = slide.icon
          return (
            <SwiperSlide key={index}>
              <div className="relative h-screen w-full">
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  {/* Sophisticated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accent} opacity-20 mix-blend-multiply`} />
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full flex items-center justify-center px-6">
                  <div className="max-w-4xl mx-auto text-center space-y-8">
                  

                    {/* Subtitle */}
                    <p
                      className="text-emerald-400 text-sm md:text-base font-semibold tracking-widest uppercase animate-fade-in"
                      style={{ animationDelay: "0.4s" }}
                    >
                      {slide.subtitle}
                    </p>

                    {/* Main Title */}
                    <h1
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight text-balance animate-fade-in"
                      style={{
                        animationDelay: "0.6s",
                        textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p
                      className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed text-pretty animate-fade-in"
                      style={{ animationDelay: "0.8s" }}
                    >
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div
                      className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in"
                      style={{ animationDelay: "1s" }}
                    >
                      
                      <Link  to={linkMap[slide.cta]}
                      className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 flex items-center gap-2">
                      {slide.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    
                      <Link to='/about'>
                      <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:scale-105">
                        Learn More
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 3rem !important;
        }
        .swiper-pagination-bullet {
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 2rem !important;
          border-radius: 1rem !important;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
