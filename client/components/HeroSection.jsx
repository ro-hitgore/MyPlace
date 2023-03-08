import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./CategoryCard";
import illustration from "../assets/illustration.webp";
import music from "../assets/music.webp";
import sports from "../assets/sports.webp";
import photography from "../assets/photography.webp";
import art from "../assets/art.webp";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";

export default function HeroSection() {
  return (
    <div className="gradient-bg">
      <section className="max-w-screen-2xl mx-auto flex flex-col items-center py-12">
        <h1 className="font-bold text-center text-2xl md:text-4xl lg:text-6xl uppercase text-white">
          Explore, collect, and sell NFTs
        </h1>
        <div className=" mt-8 py-12 px-8 w-full">
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            breakpoints={{
              320: {
                slidesPerView: 1.25,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 2.25,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.25,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.15,
                spaceBetween: 20,
              },
            }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
          >
            <SwiperSlide>
              <CategoryCard imgSrc={art} category="art" />
            </SwiperSlide>
            <SwiperSlide>
              <CategoryCard imgSrc={illustration} category="illustration" />
            </SwiperSlide>
            <SwiperSlide>
              <CategoryCard imgSrc={music} category="threeD" />
            </SwiperSlide>
            <SwiperSlide>
              <CategoryCard imgSrc={sports} category="sports" />
            </SwiperSlide>
            <SwiperSlide>
              <CategoryCard imgSrc={photography} category="photography" />
            </SwiperSlide>
          </Swiper>{" "}
        </div>
      </section>
    </div>
  );
}
