"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Zap, Star } from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "New Season 2025",
    title: "Upgrade Your Style",
    subtitle: "Discover our new collection of premium products designed for the modern lifestyle.",
    cta: "Shop Now",
    ctaLink: "/products",
    bg: "from-indigo-950 via-slate-900 to-purple-950",
    accent: "from-indigo-500 to-purple-500",
    icon: <ShoppingBag size={20} />,
    stat1: { value: "10K+", label: "Products" },
    stat2: { value: "4.9★", label: "Rating" },
  },
  {
    id: 2,
    badge: "Best Sellers",
    title: "Top Brands, Best Prices",
    subtitle: "Shop from world-renowned brands at unbeatable prices. Free shipping on orders over $50.",
    cta: "Explore Brands",
    ctaLink: "/brands",
    bg: "from-rose-950 via-slate-900 to-orange-950",
    accent: "from-rose-500 to-orange-500",
    icon: <Star size={20} />,
    stat1: { value: "500+", label: "Brands" },
    stat2: { value: "Free", label: "Shipping" },
  },
  {
    id: 3,
    badge: "Flash Deals",
    title: "Save Up to 70% Off",
    subtitle: "Limited time offers on thousands of items. Grab your favorites before they're gone.",
    cta: "View Deals",
    ctaLink: "/products",
    bg: "from-emerald-950 via-slate-900 to-teal-950",
    accent: "from-emerald-500 to-teal-500",
    icon: <Zap size={20} />,
    stat1: { value: "70%", label: "Discount" },
    stat2: { value: "24h", label: "Limited" },
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative min-h-[540px] md:min-h-[620px] bg-gradient-to-br ${slide.bg} flex items-center overflow-hidden`}
            >
              {/* Decorative blobs */}
              <div
                className={`absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br ${slide.accent} opacity-20 blur-3xl`}
              />
              <div
                className={`absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br ${slide.accent} opacity-15 blur-3xl`}
              />
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-w-2xl"
                >
                  {/* Badge */}
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-gradient-to-r ${slide.accent} text-white shadow-lg`}
                  >
                    {slide.icon}
                    {slide.badge}
                  </span>

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-300 text-lg mb-8 max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* CTA + Stats */}
                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      href={slide.ctaLink}
                      className={`group inline-flex items-center gap-2 bg-gradient-to-r ${slide.accent} text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                    >
                      {slide.cta}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>

                    <div className="flex gap-6">
                      <div>
                        <div className="text-2xl font-black text-white">{slide.stat1.value}</div>
                        <div className="text-slate-400 text-xs">{slide.stat1.label}</div>
                      </div>
                      <div className="w-px bg-slate-600" />
                      <div>
                        <div className="text-2xl font-black text-white">{slide.stat2.value}</div>
                        <div className="text-slate-400 text-xs">{slide.stat2.label}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 8px;
          height: 8px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transition: width 0.3s;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: 900;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </section>
  );
}
